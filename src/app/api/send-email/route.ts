import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formName, formValues } = body;

    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;
    // Prioritize delivery to the email address defined in .env
    const mailTo = process.env.MAIL_TO;

    if (!mailUser || !mailPass) {
      console.warn(
        "Mail credentials (MAIL_USER, MAIL_PASS) are not configured in environment variables.",
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Email credentials not configured. Please add MAIL_USER and MAIL_PASS in your .env file.",
        },
        { status: 500 },
      );
    }

    if (!mailTo) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipient email (toEmail or MAIL_TO) is missing.",
        },
        { status: 400 },
      );
    }

    // Extract the visitor's email and name dynamically from formValues
    const formEntries = Object.entries(formValues || {});

    const visitorEmail = formEntries.find(
      ([key, val]) =>
        typeof val === "string" &&
        (key.toLowerCase().includes("email") || val.includes("@")),
    )?.[1] as string | undefined;

    const visitorName = formEntries.find(
      ([key, val]) =>
        typeof val === "string" &&
        key.toLowerCase().includes("name") &&
        !key.toLowerCase().includes("form") &&
        !key.toLowerCase().includes("product"),
    )?.[1] as string | undefined;

    // Create Transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    // Format fields in HTML Table
    const formattedFields = Object.entries(formValues || {})
      .map(
        ([key, value]) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569; background: #f8fafc; font-size: 14px; width: 35%;">${key}</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;">${value}</td>
        </tr>`,
      )
      .join("");

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 40px auto; border: 1px solid #e2e8f0; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05); background-color: #ffffff;">
        <h2 style="color: #F7A707; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 8px; border-bottom: 2px solid #f8fafc; padding-bottom: 12px;">New Form Submission: ${formName || "Inquiry Form"}</h2>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">You have received a new inquiry submission. Details below:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tbody>
            ${formattedFields}
          </tbody>
        </table>
        <div style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">
            This email was automatically generated and sent from the Orange Hospital Website contact form.
          </p>
        </div>
      </div>
    `;

    // Format reply-to header using visitor name and email if available
    const replyToHeader = visitorEmail
      ? visitorName
        ? `"${visitorName}" <${visitorEmail}>`
        : visitorEmail
      : undefined;

    // Send the email
    await transporter.sendMail({
      from: `"Orange Hospital Website" <${mailUser}>`,
      to: mailTo,
      replyTo: replyToHeader,
      subject: `New Inquiry Submission: ${formName || "General Form"}`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: "Error sending email: " + errorMessage },
      { status: 500 },
    );
  }
}
