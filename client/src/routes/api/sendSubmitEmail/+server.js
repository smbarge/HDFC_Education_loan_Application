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

    const { email, id,applicantName,applicationDate,quotationAmount,districtName,buisnessName } = await request.json();
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
      subject: `Term-Loan | Application No.${id} | Submitted
`, // Subject line
    //   text: `Hello, Your Email Verification Code is ${otpCode}`, // Plain text body
    html:`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Application Submitted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background: #007bff;
            color: #ffffff;
            padding: 15px;
            font-size: 20px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
            line-height: 1.6;
        }
        .details {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
        }
        .details p {
            margin: 5px 0;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #666;
            padding: 15px;
            background: #f4f4f4;
            border-radius: 0 0 8px 8px;
        }
        .button {
            display: inline-block;
            background: #007bff;
            color: #ffffff;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        📩 <scheme_type> | Application No. ${id} | Submitted
    </div>
    <div class="content">
        <p>Dear <strong>${applicantName}</strong>,</p>
        <p>Your <strong>Term-Loan</strong> application has been successfully <strong>submitted</strong> and is currently pending scrutiny from the department.</p>

        <div class="details">
            <p><strong>📌 Application Number:</strong> ${id}</p>
            <p><strong>📅 Application Date:</strong> ${applicationDate}</p>
            <p><strong>📍 District Name:</strong> ${districtName}</p>
            <p><strong>🏢 Business Name:</strong> ${buisnessName}</p>
            <p><strong>💰 Quotation Amount (₹):</strong> ${quotationAmount}</p>
        </div>

        <p>You will be notified once your application is reviewed.</p>

        <p><a href="https://mamfdc.maharashtra.gov.in/" class="button" style="color:white">Visit Website</a></p>
    </div>

    <div class="footer">
        <p><strong>Maulana Azad Minorities Financial Development Corp. Ltd.</strong></p>
        <p>2nd Floor, D.D. Building, Old Customs House, Shahid Bhagat Singh Road, Fort, Mumbai, Maharashtra, 400023.</p>
        <p>🌐 <a href="https://mamfdc.maharashtra.gov.in/" target="_blank">mamfdc.maharashtra.gov.in</a></p>
    </div>
</div>

</body>
</html>
` 
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error occurred: ", error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });


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
