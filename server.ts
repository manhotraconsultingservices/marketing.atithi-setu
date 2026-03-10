import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("atithisetu.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    state TEXT,
    city TEXT,
    restaurant_name TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT,
    subject TEXT,
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Add missing columns if they don't exist
try {
  db.prepare("ALTER TABLE leads ADD COLUMN phone TEXT").run();
} catch (e) {}
try {
  db.prepare("ALTER TABLE leads ADD COLUMN state TEXT").run();
} catch (e) {}
try {
  db.prepare("ALTER TABLE leads ADD COLUMN city TEXT").run();
} catch (e) {}

// SMTP Transporter Setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/leads", async (req, res) => {
    const { name, email, phone, state, city, restaurantName, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO leads (name, email, phone, state, city, restaurant_name, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
      stmt.run(name, email, phone, state, city, restaurantName, message);
      
      console.log(`Lead received: ${name} (${email})`);

      // Send Email Notification
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.NOTIFICATION_EMAIL) {
        const mailOptions = {
          from: `"AtithiSetu Leads" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL,
          subject: `New Lead: ${name} from ${city}, ${state}`,
          text: `
            New lead received from AtithiSetu ERP website:
            
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Location: ${city}, ${state}
            Business: ${restaurantName || 'N/A'}
            Message: ${message || 'No message provided'}
            
            Date: ${new Date().toLocaleString()}
          `,
          html: `
            <h3>New Lead Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${city}, ${state}</p>
            <p><strong>Business:</strong> ${restaurantName || 'N/A'}</p>
            <p><strong>Message:</strong> ${message || 'No message provided'}</p>
            <hr />
            <p><small>Sent from AtithiSetu ERP System</small></p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully.");
      } else {
        console.log("SMTP not configured. Skipping email notification.");
      }

      res.json({ success: true });
    } catch (err) {
      console.error("Lead error:", err);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.post("/api/complaints", (req, res) => {
    const { email, subject, description } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO complaints (user_email, subject, description) VALUES (?, ?, ?)");
      stmt.run(email, subject, description);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to save complaint" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
