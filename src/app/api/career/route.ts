import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const LEAD_EMAIL = "info@hatchgroup.in";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

const FIELDS: Array<[key: string, label: string]> = [
  ["name", "Applicant Name"],
  ["position", "Position Applied For"],
  ["age", "Age"],
  ["address", "Residence Address"],
  ["email", "Email Address"],
  ["phone", "Phone Number"],
  ["gradCourse", "Graduation Course"],
  ["postGradCourse", "Post Graduation Course"],
  ["gradCollege", "Graduation College / University"],
  ["postGradCollege", "Post Graduation College / University"],
  ["currentCompany", "Current Company Name"],
  ["reasonForChange", "Reason for Change"],
  ["designation", "Designation"],
  ["noticePeriod", "Notice Period"],
  ["duration", "Duration"],
  ["lastDrawnSalary", "Last Drawn Salary (Annual CTC)"],
  ["totalExperience", "Total Work Experience"],
  ["salaryExpected", "Salary Expected (Annual CTC)"],
  ["skillSets", "SkillSets / Software Knowledge"],
];

function readAttachment(file: FormDataEntryValue | null): Promise<{ filename: string; content: Buffer } | null> {
  if (!(file instanceof File) || file.size === 0) return Promise.resolve(null);
  return file.arrayBuffer().then((buf) => ({ filename: file.name, content: Buffer.from(buf) }));
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const values = Object.fromEntries(
      FIELDS.map(([key]) => [key, formData.get(key)?.toString().trim() || ""])
    );

    if (!values.name || !values.email) {
      return NextResponse.json({ error: "Applicant name and email are required." }, { status: 400 });
    }

    const resumeEntry = formData.get("resume");
    const portfolioEntry = formData.get("portfolio");

    if (!(resumeEntry instanceof File) || resumeEntry.size === 0) {
      return NextResponse.json({ error: "Resume attachment is required." }, { status: 400 });
    }
    for (const entry of [resumeEntry, portfolioEntry]) {
      if (entry instanceof File && entry.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "Attachments must be under 5MB each." }, { status: 400 });
      }
    }

    const attachments = (
      await Promise.all([readAttachment(resumeEntry), readAttachment(portfolioEntry)])
    ).filter((a): a is { filename: string; content: Buffer } => a !== null);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const rows = FIELDS.map(
      ([key, label]) =>
        `<tr><td style="padding: 6px 16px 6px 0; color: #888; vertical-align: top; white-space: nowrap;">${label}</td><td style="padding: 6px 0;">${values[key] || "—"}</td></tr>`
    ).join("");

    await transporter.sendMail({
      from: `"Hatch Group Website" <${process.env.SMTP_USER}>`,
      to: LEAD_EMAIL,
      replyTo: values.email,
      subject: `New Job Application — ${values.position || values.name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="margin: 0 0 16px;">New Career Application</h2>
          <table style="border-collapse: collapse;">
            ${rows}
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Portfolio</td><td style="padding: 6px 0;">${portfolioEntry instanceof File && portfolioEntry.size > 0 ? "Attached" : "Not provided"}</td></tr>
          </table>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career application email error:", error);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
