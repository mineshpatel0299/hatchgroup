import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const LEAD_EMAIL = "info@hatchgroup.in";

export async function POST(req: NextRequest) {
  try {
    const { name, projectType, phone, email, message } = await req.json();

    if (!name || !projectType || !phone || !email) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Notify Hatch Group about the new enquiry
    await transporter.sendMail({
      from: `"Hatch Group Website" <${process.env.SMTP_USER}>`,
      to: LEAD_EMAIL,
      replyTo: email,
      subject: `New Enquiry — ${projectType}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="margin: 0 0 16px;">New Website Enquiry</h2>
          <table style="border-collapse: collapse;">
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Name</td><td style="padding: 6px 0;">${name}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Email</td><td style="padding: 6px 0;">${email}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Phone</td><td style="padding: 6px 0;">${phone}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Project Type</td><td style="padding: 6px 0;">${projectType}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888; vertical-align: top;">Message</td><td style="padding: 6px 0;">${message || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry email error:", error);
    return NextResponse.json({ error: "Failed to send enquiry. Please try again." }, { status: 500 });
  }
}
