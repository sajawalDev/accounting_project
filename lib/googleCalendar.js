import { google } from "googleapis";
import path from "path";
import { promises as fs } from "fs";

export async function addEventToCalendar({ name, email, date, time, timezone }) {
  const keyPath = path.join(process.cwd(), "lib/keys/calendar-key.json");
  const keyFile = JSON.parse(await fs.readFile(keyPath, "utf-8"));

  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: `Meeting with ${name}`,
    description: `Scheduled via HKFinance. Contact: ${email}`,
    start: {
      dateTime: new Date(`${date} ${time}`).toISOString(),
      timeZone: timezone,
    },
    end: {
      dateTime: new Date(`${date} ${time}`).toISOString(),
      timeZone: timezone,
    },
  };

  // Replace with your own calendar ID (your Gmail address)
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  await calendar.events.insert({
    calendarId,
    resource: event,
  });

  return { success: true };
}
