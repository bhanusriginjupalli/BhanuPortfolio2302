import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  receivedAt: string;
}

// In-memory store — persists for the lifetime of the server process
const submissions: ContactSubmission[] = [];

router.post("/contact", (req, res) => {
  const { name, email, company, message } = req.body as {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "name, email, and message are required" });
    return;
  }

  const entry: ContactSubmission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || undefined,
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  submissions.push(entry);

  logger.info(
    {
      from: entry.email,
      name: entry.name,
      company: entry.company,
      id: entry.id,
    },
    "📬 New contact form submission"
  );

  res.status(200).json({ ok: true, id: entry.id });
});

// Read-only endpoint to view submissions (dev convenience)
router.get("/contact/submissions", (_req, res) => {
  res.json({ count: submissions.length, submissions });
});

export default router;
