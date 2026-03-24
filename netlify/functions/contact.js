const https = require("https");
const nodemailer = require("nodemailer");

const SITE_KEY = "6Ledu4QsAAAAAPz5tBGwCKJF8-eQAYLwcxCBI5D";

function createEnterpriseAssessment(token, apiKey, projectId) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      event: {
        token,
        siteKey: SITE_KEY,
        expectedAction: "submit",
      },
    });

    const options = {
      hostname: "recaptchaenterprise.googleapis.com",
      path: `/v1/projects/${projectId}/assessments?key=${apiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          reject(new Error("Failed to parse reCAPTCHA Enterprise response"));
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

  // Verify reCAPTCHA Enterprise token server-side
  const apiKey = process.env.RECAPTCHA_API_KEY;
  const projectId = process.env.RECAPTCHA_PROJECT_ID || "vpn-project-2020";

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "reCAPTCHA API key not configured" }) };
  }

  let assessment;
  try {
    assessment = await createEnterpriseAssessment(captchaToken, apiKey, projectId);
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "reCAPTCHA assessment failed" }) };
  }

  // Enterprise returns tokenProperties.valid and riskAnalysis.score (0.0–1.0, higher = more human)
  if (!assessment.tokenProperties?.valid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid reCAPTCHA token", reason: assessment.tokenProperties?.invalidReason }),
    };
  }

  const score = assessment.riskAnalysis?.score ?? 0;
  if (score < 0.5) {
    return { statusCode: 400, body: JSON.stringify({ error: "reCAPTCHA score too low" }) };
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
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
