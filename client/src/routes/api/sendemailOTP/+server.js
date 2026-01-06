// src/routes/api/sendOTP/+server.js
import pkg from "pg";
const { Client } = pkg;
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import pool from "$lib/db"; // Adjust the path according to your structure

// PostgreSQL connection with the corrected DB URI
// const client = new Client({
//     connectionString:
//         process.env.DB_URL ||
//         "postgres://hdfc_user:Admin%402024@65.1.113.133/hdfc_loan_new",
// });

// Connect to the database

// Function to get the current time in IST
function getISTTime() {
  const now = new Date();
  const istOffset = 5 * 60 + 30; // IST is UTC+5:30 in minutes
  const istTime = new Date(now.getTime() + istOffset * 60 * 1000); // Convert to IST
  return istTime;
}

let transporter = nodemailer.createTransport({
  host: "email-smtp.ap-south-1.amazonaws.com", // AWS SES SMTP endpoint
  port: 465, // Port (you can also try 587 or 465 depending on your configuration)
  secure: true, // true for 465, false for other ports
  auth: {
    user: "AKIARSWCIJOZTTCUI7XB", // Your SMTP username
    pass: "BG05PhHQB/pSt+tGg7XACa473tOzpCE44hqMd7wSbnRF", // Your SMTP password
  },
});

export async function POST({ request }) {
  try {
    // Parse the incoming request body

    const { email, id } = await request.json();
    const createdAt = getISTTime();

    const expiresAt = new Date(createdAt.getTime() + 5 * 60 * 1000); // 15 minutes from IST
    // Generate a new UID
    const uid = uuidv4();
    console.log("send top to email: ", id);
    // Generate OTP (for example, a 6-digit code)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    let mailOptions = {
      from: "no-reply@mahaonline.gov.in", // Sender address
      to: email, // List of recipients
      subject: "OTP for Email verification", // Subject line
      text: `Hello, Your Email Verification Code is ${otpCode}`, // Plain text body
      html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maulana Azad Minority Financial Development Corporation Limited</title>
    <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    </style>
</head>
<body class="bg-gray-100">
    <div class="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
        <div class="bg-blue-600 p-4 text-center text-white">
            <h2 class="text-xl font-semibold">Maulana Azad Minority Financial Development Corporation Limited</h2>
        </div>
        <div class="p-6 text-left">
            <p class="text-lg">Dear User,</p>
            <p class="mt-4">Thank you for registering with our MAMFDC Portal! We're excited to have you on board.</p>
            <p class="mt-4">To complete the process, please use the following Verification Code:</p>
            <div class="mt-6 mb-6 text-center">
                <span class="text-3xl font-bold bg-gray-200 text-gray-700 py-2 px-4 rounded">
                    ${otpCode}
                </span>
            </div>
                    <p class="mt-6">Best regards,<br>MAMFDC</p>
        </div>
        <div class="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t">
            <p>Your security is our priority, and rest assured that this verification process is designed to keep your information safe.</p>
        </div>
         <div class="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t">
                        &copy; 2024 MAMFDC. All rights reserved.
                    </div>
    </div>
</body>
</html>
`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error occurred: ", error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

    const insertQuery = `
      INSERT INTO emailotp (id,uid, otp_code, email, created_at, expires_at) 
      VALUES ($1, $2, $3, $4, $5,$6)
    `;
    await pool.query(insertQuery, [
      id,
      uid,
      otpCode,
      email,
      createdAt,
      expiresAt,
    ]);
    console.log("uid: ", uid);
    console.log("otpCode: ", otpCode);

    // Respond with the generated UID and OTP (for testing/debugging purposes)
    return new Response(
      JSON.stringify({
        error: 0,
        errorMsg: "",
        uid: uid,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sendOTP endpoint:", error);
    return new Response(
      JSON.stringify({ error: -1, errorMsg: "An error occurred" }),
      { status: 500 }
    );
  } finally {
  }
}
