import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, date, time, timezone } = body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"HAKFinancials" <${process.env.SMTP_USER}>`,
      to: [email, "hkfinance.admin@example.com"], 
      subject: `Meeting Scheduled with HAKFinancials`,
      html: `
        <h2>Meeting Scheduled</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time} (${timezone})</p>
        <p>We look forward to meeting you!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
