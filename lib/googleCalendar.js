import { google } from "googleapis";

export async function addEventToCalendar({ name, email, date, time, timezone }) {
  try {
    // Initialize Google Auth using environment variables
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Create the calendar event
    const event = {
      summary: `Meeting with ${name}`,
      description: `Scheduled via HKFinance. Contact: ${email}`,
      start: {
        dateTime: new Date(`${date} ${time}`).toISOString(),
        timeZone: timezone,
      },
      end: {
        dateTime: new Date(
          new Date(`${date} ${time}`).getTime() + 30 * 60 * 1000 // adds 30 mins by default
        ).toISOString(),
        timeZone: timezone,
      },
    };

    // Calendar ID from environment variable
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    // Insert event
    await calendar.events.insert({
      calendarId,
      resource: event,
    });

    return { success: true };
  } catch (error) {
    console.error("Google Calendar API error:", error);
    return { success: false, error: error.message };
  }
}
