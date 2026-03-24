const https = require("https");
const nodemailer = require("nodemailer");

function verifyRecaptcha(token, secretKey) {
  return new Promise((resolve, reject) => {
    const postData = `secret=${secretKey}&response=${token}`;
    const options = {
      hostname: "www.google.com",
      path: "/recaptcha/api/siteverify",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error("Failed to parse reCAPTCHA response"));
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { name, email, message, captchaToken } = body;

  if (!name || !email || !message || !captchaToken) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
  }

  // Verify reCAPTCHA token server-side
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "reCAPTCHA secret key not configured" }) };
  }

  let recaptchaResult;
  try {
    recaptchaResult = await verifyRecaptcha(captchaToken, secretKey);
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "reCAPTCHA verification failed" }) };
  }

  if (!recaptchaResult.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "reCAPTCHA verification failed", codes: recaptchaResult["error-codes"] }),
    };
  }

  // Send email via Gmail SMTP
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `"Berk Bilek Web" <${gmailUser}>`,
        to: gmailUser,
        replyTo: email,
        subject: `Täze hat: ${name}`,
        text: `Ady: ${name}\nE-poçta: ${email}\n\nHat:\n${message}`,
        html: `<p><strong>Ady:</strong> ${name}</p><p><strong>E-poçta:</strong> ${email}</p><p><strong>Hat:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
      });
    } catch (err) {
      console.error("Email send error:", err.message);
      // Still return success — reCAPTCHA passed, just log the email error
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
