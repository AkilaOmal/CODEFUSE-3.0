import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as functions from "firebase-functions";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Default route
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Firebase Functions + Express + TypeScript!");
});

// Example dynamic route
app.get("/hello/:name", (req: Request, res: Response) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

// Single email endpoint (existing)
app.post("/send", async (req: Request, res: Response) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "CODEFUSE 2.0 <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) return res.status(400).json({ error });

    return res.status(200).json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err });
  }
});

// Batch email endpoint using Resend's native batch API
app.post("/send-batch", async (req: Request, res: Response) => {
  const { emails, subject, html } = req.body;

  // Validation
  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({
      error: "emails field is required and must be a non-empty array",
    });
  }

  if (!subject || !html) {
    return res.status(400).json({
      error: "subject and html fields are required",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidEmails = emails.filter((email) => !emailRegex.test(email));

  if (invalidEmails.length > 0) {
    return res.status(400).json({
      error: "Invalid email addresses found",
      invalidEmails,
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "whatsapp@codefuse.online",
      to: emails,
      subject,
      html,
    });

    if (error) return res.status(400).json({ error });

    return res.status(200).json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err });
  }
});

// Personalized batch email endpoint
app.post("/send-batch-personalized", async (req: Request, res: Response) => {
  const { recipients, subject, htmlTemplate } = req.body;

  // Validation
  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({
      error:
        "recipients field is required and must be a non-empty array of {email, data} objects",
    });
  }

  if (!subject || !htmlTemplate) {
    return res.status(400).json({
      error: "subject and htmlTemplate fields are required",
    });
  }

  // Validate recipient format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidRecipients = recipients.filter(
    (recipient: any) => !recipient.email || !emailRegex.test(recipient.email)
  );

  if (invalidRecipients.length > 0) {
    return res.status(400).json({
      error:
        "Invalid recipient format. Each recipient must have a valid email field",
      invalidRecipients,
    });
  }

  try {
    const results = {
      total: recipients.length,
      successful: 0,
      failed: 0,
      errors: [] as any[],
      batches: 0,
      batchResults: [] as any[],
    };

    // Split recipients into batches of 100
    const batches = [];
    for (let i = 0; i < recipients.length; i += 100) {
      batches.push(recipients.slice(i, i + 100));
    }

    results.batches = batches.length;

    // Process each batch
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];

      if (batchIndex > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      try {
        // Prepare personalized emails for this batch
        const personalizedEmails = batch.map((recipient: any) => {
          let personalizedHtml = htmlTemplate;
          if (recipient.data) {
            Object.keys(recipient.data).forEach((key) => {
              const placeholder = new RegExp(`{{${key}}}`, "g");
              personalizedHtml = personalizedHtml.replace(
                placeholder,
                recipient.data[key]
              );
            });
          }

          return {
            from: "CODEFUSE 2.0 <onboarding@resend.dev>",
            to: [recipient.email],
            subject,
            html: personalizedHtml,
          };
        });

        // Use Resend's batch API for personalized emails
        const { data, error } = await resend.batch.send(personalizedEmails);

        if (error) {
          results.failed += batch.length;
          results.errors.push({
            batch: batchIndex + 1,
            recipients: batch.map((r) => r.email),
            error: error,
          });
          results.batchResults.push({
            batch: batchIndex + 1,
            success: false,
            error,
            emailCount: batch.length,
          });
        } else {
          results.successful += batch.length;
          results.batchResults.push({
            batch: batchIndex + 1,
            success: true,
            data,
            emailCount: batch.length,
          });
        }

        console.log(
          `Personalized batch ${batchIndex + 1}/${batches.length} completed`
        );
      } catch (err) {
        results.failed += batch.length;
        results.errors.push({
          batch: batchIndex + 1,
          recipients: batch.map((r) => r.email),
          error: err,
        });
        results.batchResults.push({
          batch: batchIndex + 1,
          success: false,
          error: err,
          emailCount: batch.length,
        });
      }
    }

    return res.status(200).json({
      message: "Batch personalized email sending completed",
      results,
    });
  } catch (err) {
    console.error("Batch personalized email error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err,
    });
  }
});

// Export the Express app as a Firebase HTTPS Function
export const api = functions.https.onRequest(app);
