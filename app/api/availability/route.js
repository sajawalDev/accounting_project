// app/api/availability/route.js
import { DateTime } from "luxon";
import { connectDB } from "../../../lib/mongodb";
import Booking from "../../../models/booking";
import { google } from "googleapis";

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const date = url.searchParams.get("date");
    const userTz = url.searchParams.get("tz") || "UTC";
    const slotMinutes = Number(url.searchParams.get("slotMinutes") || 30);

    if (!date) {
      return new Response(JSON.stringify({ error: "Missing date" }), { status: 400 });
    }

    // Company timezone and working hours
    const companyTz = "Asia/Karachi";
    const businessStart = "12:00";
    const businessEnd = "12:00";

    let dayStart = DateTime.fromISO(`${date}T${businessStart}`, { zone: companyTz });
    let dayEnd = DateTime.fromISO(`${date}T${businessEnd}`, { zone: companyTz });

    if (businessStart === businessEnd) {
      dayEnd = dayStart.plus({ days: 1 });
    } else if (dayEnd <= dayStart) {
      dayEnd = dayEnd.plus({ days: 1 });
    }

    // Generate time slots
    const slots = [];
    let cur = dayStart;
    while (cur.plus({ minutes: slotMinutes }) <= dayEnd) {
      const start = cur;
      const end = cur.plus({ minutes: slotMinutes });

      slots.push({
        startUTC: start.toUTC().toISO(),
        endUTC: end.toUTC().toISO(),
        display: start.setZone(userTz).toFormat("h:mm a"),
      });

      cur = cur.plus({ minutes: slotMinutes });
    }

    // Fetch existing bookings from MongoDB
    const windowStart = dayStart.toUTC().toJSDate();
    const windowEnd = dayEnd.toUTC().toJSDate();

    const mongoBookings = await Booking.find({
      timezone: userTz,
      start: { $lt: windowEnd },
      end: { $gt: windowStart },
    }).lean();

    // 🔹 Google Calendar Authentication via Environment Variables
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    // Fetch events from Google Calendar
    const googleRes = await calendar.events.list({
      calendarId,
      timeMin: dayStart.toUTC().toISO(),
      timeMax: dayEnd.toUTC().toISO(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const googleEvents = (googleRes.data.items || []).map((e) => ({
      start: new Date(e.start.dateTime || e.start.date),
      end: new Date(e.end.dateTime || e.end.date),
    }));

    // Combine MongoDB and Google Calendar bookings
    const allBookings = [...mongoBookings, ...googleEvents];

    // 🔹 Filter out already booked slots
    const available = slots.filter((s) => {
      const sStart = new Date(s.startUTC);
      const sEnd = new Date(s.endUTC);
      return !allBookings.some(
        (b) => new Date(b.start) < sEnd && new Date(b.end) > sStart
      );
    });

    return new Response(
      JSON.stringify({
        currentDateInUserTZ: DateTime.now().setZone(userTz).toISODate(),
        slots: available,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching availability:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch availability", details: error.message }),
      { status: 500 }
    );
  }
}
