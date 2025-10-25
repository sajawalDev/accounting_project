import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, country, hearAbout, message } = body;

    // Validate input
    if (!name || !email || !company || !country || !hearAbout || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required." }),
        { status: 400 }
      );
    }

    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or "Outlook", "Yahoo", etc.
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // app password
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Heard About:</strong> ${hearAbout}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error sending email." }),
      { status: 500 }
    );
  }
}
