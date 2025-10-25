// app/api/availability/route.js
import { DateTime } from "luxon";
import { connectDB } from "../../../lib/mongodb";
import Booking from "../../../models/booking";
import { google } from "googleapis";
import path from "path";
import { promises as fs } from "fs";

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const date = url.searchParams.get("date");
  const userTz = url.searchParams.get("tz") || "UTC";
  const slotMinutes = Number(url.searchParams.get("slotMinutes") || 30);

  if (!date)
    return new Response(JSON.stringify({ error: "Missing date" }), { status: 400 });

  // 🔹 Your company base timezone
  const companyTz = "Asia/Karachi";
  let businessStart = "12:00";
  let businessEnd = "12:00";

  // 🔹 Handle 24-hour case and overnight shifts
  let dayStart = DateTime.fromISO(`${date}T${businessStart}`, { zone: companyTz });
  let dayEnd = DateTime.fromISO(`${date}T${businessEnd}`, { zone: companyTz });

  if (businessStart === businessEnd) {
    // 24-hour open — cover full day
    dayEnd = dayStart.plus({ days: 1 });
  } else if (dayEnd <= dayStart) {
    // overnight shift (e.g., 22:00 → 06:00)
    dayEnd = dayEnd.plus({ days: 1 });
  }

  // 🔹 Generate all possible slots
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

  // 🔹 Fetch existing bookings from MongoDB
  const windowStart = dayStart.toUTC().toJSDate();
  const windowEnd = dayEnd.toUTC().toJSDate();

  const mongoBookings = await Booking.find({
    start: { $lt: windowEnd },
    end: { $gt: windowStart },
  }).lean();

  // 🔹 Fetch events from Google Calendar
  const keyPath = path.join(process.cwd(), "lib/keys/calendar-key.json");
  const keyFile = JSON.parse(await fs.readFile(keyPath, "utf-8"));

  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

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

  const allBookings = [...mongoBookings, ...googleEvents];

  // 🔹 Filter out booked times
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
}
