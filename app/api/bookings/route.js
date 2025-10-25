import { connectDB } from "../../../lib/mongodb";
import Booking from "../../../models/booking";
import { createEvent } from "ics";
import nodemailer from "nodemailer";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { name, email, company, website, phone, message, startUTC, endUTC, timezone } = body;

  if (!name || !email || !startUTC || !endUTC || !timezone) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  try {
    const start = new Date(startUTC);
    const end = new Date(endUTC);

    // ✅ 1. Create unique slot key (time + timezone)
    const slotKey = `${DateTime.fromJSDate(start).toUTC().toFormat("yyyyLLdd'T'HHmmss'Z'")}_${timezone}`;

    // ✅ 2. Check if this slot already exists
    const slotAlreadyBooked = await Booking.findOne({ slotKey });
    if (slotAlreadyBooked) {
      return new Response(JSON.stringify({ error: "This time slot has already been booked." }), { status: 409 });
    }

    // ✅ 3. Check if user already has an active booking
    const existingBooking = await Booking.findOne({ email });
    if (existingBooking && new Date(existingBooking.end) > new Date()) {
      return new Response(
        JSON.stringify({ error: "You already have an active booking." }),
        { status: 403 }
      );
    }

    // ✅ 4. Save new booking
    const booking = await Booking.create({
      slotKey,
      name,
      email,
      company,
      website,
      phone,
      message,
      start,
      end,
      timezone,
    });

    // === ICS EVENT CREATION ===
    const startArr = [
      start.getUTCFullYear(),
      start.getUTCMonth() + 1,
      start.getUTCDate(),
      start.getUTCHours(),
      start.getUTCMinutes(),
    ];
    const endArr = [
      end.getUTCFullYear(),
      end.getUTCMonth() + 1,
      end.getUTCDate(),
      end.getUTCHours(),
      end.getUTCMinutes(),
    ];

    const uid = uuidv4();
    const { error, value: ics } = createEvent({
      start: startArr,
      end: endArr,
      title: `Meeting with ${name}`,
      description: message || "Meeting scheduled via HKFinance",
      uid,
      productId: "HKFinance",
      status: "CONFIRMED",
      organizer: { name: "HKFinance", email: process.env.SMTP_FROM || process.env.SMTP_USER },
      attendees: [{ name, email }],
    });
    if (error) console.error("ICS Error:", error);

    // === EMAIL SENDING ===
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === "true"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `HAKFinancials Meeting - ${DateTime.fromJSDate(start).toFormat("dd LLL yyyy, HH:mm 'UTC'")}`;
    const formattedTime = DateTime.fromJSDate(start)
      .setZone(timezone)
      .toLocaleString(DateTime.DATETIME_FULL);

    const mailToUser = {
      from: `"HAKFinancials" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject,
      html: `
        <p>Hi ${name},</p>
        <p>Your free consultation meeting has been successfully scheduled.</p>
        <ul>
          <li><strong>Date & Time:</strong> ${formattedTime} (${timezone})</li>
          <li><strong>Duration:</strong> 30 Minutes</li>
        </ul>
        <p>We look forward to connecting with you.</p>
        <p>– HAKFinancials Team</p>
      `,
      attachments: [
        {
          filename: "invite.ics",
          content: ics,
          contentType: "text/calendar",
        },
      ],
    };

    const mailToAdmin = {
      from: `"HAKFinancials" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Meeting Booked by ${name} (${email})`,
      html: `
        <h2 style="color:#0B1E3D;">New Meeting Scheduled</h2>
        <p>A new meeting has been booked through your HAKFinancials scheduler.</p>
        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><th align="left" style="background:#0B1E3D;color:white;">Client Name</th><td>${name}</td></tr>
          <tr><th align="left" style="background:#0B1E3D;color:white;">Email</th><td>${email}</td></tr>
          <tr><th align="left" style="background:#0B1E3D;color:white;">Phone</th><td>${phone}</td></tr>
          <tr><th align="left" style="background:#0B1E3D;color:white;">Company</th><td>${company}</td></tr>
          <tr><th align="left" style="background:#0B1E3D;color:white;">Website</th><td><a href="${website.startsWith("http") ? website : "https://" + website}" target="_blank">${website}</a></td></tr>
          <tr><th align="left" style="background:#0B1E3D;color:white;">Timezone</th><td>${timezone}</td></tr>
          <tr><th align="left" style="background:#0B1E3D;color:white;">Meeting Date</th><td>${formattedTime}</td></tr>
          <tr><th align="left" style="background:#0B1E3D;color:white;">Message</th><td>${message || "No message provided"}</td></tr>
        </table>
        <p style="margin-top:16px;">You can add this meeting to your calendar by opening the attached ICS file.</p>
        <p>— HAKFinancials Scheduler</p>
      `,
      attachments: [
        {
          filename: "meeting-invite.ics",
          content: ics,
          contentType: "text/calendar",
        },
      ],
    };

    await transporter.sendMail(mailToUser);
    await transporter.sendMail(mailToAdmin);

    return new Response(
      JSON.stringify({
        success: true,
        bookingId: booking._id,
        email,
        startUTC,
        endUTC,
      }),
      { status: 201 }
    );
  } catch (err) {
    if (err.code === 11000) {
      return new Response(JSON.stringify({ error: "Slot already booked" }), { status: 409 });
    }
    console.error("Booking Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
