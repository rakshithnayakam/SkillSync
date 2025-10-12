import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "SkillSync",
      link: "https://skillsynchub.org",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mail = {
    from: "mail.skillsynchub@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed silently. Check your mailtrap credentials",
    );
    console.error("Error: ", error);
  }
};

const verificationMailContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to our platform SkillShare! We are excited to have you on board",
      action: {
        instructions:
          "Please click the button to follow the verification process",
        button: {
          color: "#1be171ff",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help or have queries. Reply to this email we would love to reach out",
    },
  };
};
const forgotPasswordMailContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "Mail for resetting account password",
      action: {
        instructions: "Please click the button to follow the resetting process",
        button: {
          color: "#d92534ff",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help or have queries. Reply to this email we would love to reach out",
    },
  };
};

export { verificationMailContent, forgotPasswordMailContent, sendMail };
