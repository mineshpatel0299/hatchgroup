import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, project } = await req.json();

    if (!name || !email || !phone || !project) {
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

    await transporter.sendMail({
      from: `"Hatch Group" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `${project} — Brochure from Hatch Group`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 40px;">
          <div style="border-bottom: 1px solid #c9a96e; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 28px; color: #1a1a1a; margin: 0; letter-spacing: -0.5px;">Hatch Group</h1>
          </div>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Thank you for your interest in <strong>${project}</strong>. Please find the project brochure attached below.
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Should you have any questions or wish to schedule a site visit, our team is happy to assist.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0d5c5;">
            <p style="color: #888; font-size: 13px; margin: 0;">Warm regards,</p>
            <p style="color: #333; font-size: 15px; font-weight: bold; margin: 4px 0 0;">The Hatch Group Team</p>
          </div>
        </div>
      `,
    });

    // Notify Hatch Group about the lead
    await transporter.sendMail({
      from: `"Hatch Group Website" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_EMAIL || process.env.SMTP_USER,
      subject: `New Brochure Request — ${project}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="margin: 0 0 16px;">New Brochure Download Lead</h2>
          <table style="border-collapse: collapse;">
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Name</td><td style="padding: 6px 0;">${name}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Email</td><td style="padding: 6px 0;">${email}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Phone</td><td style="padding: 6px 0;">${phone}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Project</td><td style="padding: 6px 0;">${project}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Brochure email error:", error);
    return NextResponse.json({ error: "Failed to send brochure. Please try again." }, { status: 500 });
  }
}
