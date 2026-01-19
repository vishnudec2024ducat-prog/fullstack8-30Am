import nodemailer from "nodemailer"
import { emailTemp } from "../public/emailHtml.js";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});
export const emailGenrator = async(otp,email)=>{
    const info = await transporter.sendMail({
      from: `"Prectice ON Code By Vishnu" <${process.env.GMAIL_ID}.email>`,
      to: email,
      subject: "Hello Khoshbooo About Journey ✔",
      text: "Hello Khushboo kesa lag raha hai apko bhvya k sath beth kar?", // Plain-text version of the message
      html: emailTemp.replace("{%otp%}",otp), // HTML version of the message
    });

    console.log("Message sent:", info.messageId);
} 