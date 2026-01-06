// src/routes/api/sendOTP/+server.js
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import https from "https";
import pool from "$lib/db"; // Adjust the path according to your structure

// // PostgreSQL connection with the corrected DB URI
// const client = new Client({
//   connectionString:
//     process.env.DB_URL ||
//     "postgres://hdfc_user:Admin%402024@65.1.113.133/hdfc_loan_new",
// });

// Connect to the database

// Function to get the current time in IST
function getISTTime() {
  const now = new Date();
  const istOffset = 5 * 60 + 30; // IST is UTC+5:30 in minutes
  const istTime = new Date(now.getTime() + istOffset * 60 * 1000); // Convert to IST
  return istTime;
}

async function sendTemplatedSMS({ to, var1, var2 }) {
  const apiUrl =
    "https://push3.aclgateway.com/servlet/com.aclwireless.pushconnectivity.listeners.TextListener";
  const appId = "mitmamfdc";
  const userId = "mitmamfdc";
  const password = "mitm_01";
  const from = "MAHGOV";

  // Templated message with a variable placeholder {#var#}
  const templateMessage = `Dear ${var2}, your OTP for mobile number verification is ${var1}. Please enter this OTP to verify your mobile number. - MAHGOV`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        appid: appId,
        userId: userId,
        pass: password,

        contenttype: 1,
        from: from,
        to: to,
        text: templateMessage,
        alert: 1,
        selfid: true,
      },
    });

    console.log("Templated SMS Sent:", response.data);
  } catch (error) {
    console.error("Error sending templated SMS:", error);
  }
}

// const sendTemplatedSMS = async ({ to, var1,var2 }) => {
//   let promise = new Promise((resolve, reject) => {
//     let validTillFormatted = "5 min";
//     let url = `https://m1.sarv.com/api/v2.0/sms_campaign.php?token=2284113065696b634b5734.94835809&user_id=11234401&route=OT&template_id=12739&sender_id=CKSOFT&language=EN&template=Thank+you+for+registering+on+our+portal.+Your+verification+code+is%3A+${var1}+This+verification+code+is+valid+till+${validTillFormatted}+Thank+you%2C+CKSOFT&contact_numbers=${to}`;
//     https
//       .get(url, (res) => {
//         let data = [];
//         const headerDate =
//           res.headers && res.headers.date
//             ? res.headers.date
//             : "no response date";
//         console.log("Status Code:", res.statusCode);
//         console.log("Date in Response header:", headerDate);
//         if (res.statusCode != 200) {
//           reject({ error: -1, errorMsg: "response code is not 200" });
//         }
//         res.on("data", (chunk) => {
//           data.push(chunk);
//         });

//         res.on("end", () => {
//           console.log("Response ended: ");
//           const resp = JSON.parse(Buffer.concat(data).toString());
//           console.log("resp is:", resp);
//           if (resp.msg !== "success") {
//             reject({
//               error: -2,
//               errorMsg: `send sms failed with msg ${resp.msg}`,
//             });
//           } else {
//             resolve({ error: 0 });
//           }
//         });
//       })
//       .on("error", (err) => {
//         console.log("Error: ", err.message);
//         reject({ error: -1, errorMsg: err.message });
//       });
//   });
//   return promise;
// };

export async function POST({ request }) {
  try {
    // Parse the incoming request body

    const { mobileNumber, id, name } = await request.json();

    // Generate a new UID
    const uid = uuidv4();
    console.log("send top to number: ", mobileNumber);
    // Generate OTP (for example, a 6-digit code)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Get the current IST time for `created_at`
    const createdAt = getISTTime();
    let sendOtp = await sendTemplatedSMS({
      to: mobileNumber,
      var1: otpCode,
      var2: name,
    });
    // Set OTP expiry time (e.g., 15 minutes from the IST current time)
    const expiresAt = new Date(createdAt.getTime() + 5 * 60 * 1000); // 15 minutes from IST
    if (id) {
      // Insert UID, OTP, created_at, and expires_at into the PostgreSQL table
      const insertQuery = `
      INSERT INTO otp (id,uid, otp_code, mobile, created_at, expires_at) 
      VALUES ($1, $2, $3, $4, $5,$6)
    `;
      await pool.query(insertQuery, [
        id,
        uid,
        otpCode,
        mobileNumber,
        createdAt,
        expiresAt,
      ]);
    } else {
      const insertQuery = `
      INSERT INTO otp (uid, otp_code, mobile, created_at, expires_at) 
      VALUES ($1, $2, $3, $4, $5)
    `;
      await pool.query(insertQuery, [
        uid,
        otpCode,
        mobileNumber,
        createdAt,
        expiresAt,
      ]);
    }
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
