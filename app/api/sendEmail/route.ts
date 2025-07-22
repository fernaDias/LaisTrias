import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const file = formData.get("file") as File | null;

  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,

    },
  });

  const attachments = [];

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name,
      content: buffer,
    });
  }

  try {
    const info = await transporter.sendMail({
      from: '"Lais Trias - 🎯" <lct@laistriasadvocacia.com.br.>',
      to: "lct@laistriasadvocacia.com.br",
      replyTo: email,
      subject: "📧 CONTATO SITE",
      text: message,
      html: `<b>${name}</b> <br /> ${email} <br /> ${message}`,
      attachments,
    });

    return NextResponse.json({ success: true, info });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
