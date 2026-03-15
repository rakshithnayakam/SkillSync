import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"SkillSync" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await sendEmail({
    to: email,
    subject: "SkillSync — Reset Your Password",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9fafb;border-radius:16px;">
        <h2 style="color:#4f46e5;margin-bottom:8px;">Reset Your Password</h2>
        <p style="color:#374151;">You requested a password reset for your SkillSync account.</p>
        <p style="color:#374151;">Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}"
           style="display:inline-block;margin:24px 0;padding:12px 28px;background:#4f46e5;color:#fff;border-radius:10px;text-decoration:none;font-weight:600;">
          Reset Password
        </a>
        <p style="color:#6b7280;font-size:13px;">If you didn't request this, ignore this email.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
        <p style="color:#9ca3af;font-size:12px;">SkillSync — Learn by Teaching, Teach by Learning</p>
      </div>
    `,
  });
};

export const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await sendEmail({
    to: email,
    subject: "SkillSync — Verify Your Email",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9fafb;border-radius:16px;">
        <h2 style="color:#4f46e5;margin-bottom:8px;">Verify Your Email</h2>
        <p style="color:#374151;">Welcome to SkillSync! Please verify your email address to get started.</p>
        <p style="color:#374151;">Click the button below. This link expires in <strong>24 hours</strong>.</p>
        <a href="${verifyUrl}"
           style="display:inline-block;margin:24px 0;padding:12px 28px;background:#4f46e5;color:#fff;border-radius:10px;text-decoration:none;font-weight:600;">
          Verify Email
        </a>
        <p style="color:#6b7280;font-size:13px;">If you didn't create an account, ignore this email.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
        <p style="color:#9ca3af;font-size:12px;">SkillSync — Learn by Teaching, Teach by Learning</p>
      </div>
    `,
  });
};