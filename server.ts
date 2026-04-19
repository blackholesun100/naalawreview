import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON and form data
  app.use(express.json());
  
  // Configure Multer for file uploads (memory storage for simplicity in this environment)
  const storage = multer.memoryStorage();
  const upload = multer({ 
    storage,
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
  });

  // API Route for Manuscript Submission
  app.post('/api/submit-manuscript', upload.single('manuscript'), async (req, res) => {
    try {
      const { authorName, email, title, abstract } = req.body;
      const file = req.file;

      if (!authorName || !email || !title || !file) {
        return res.status(400).json({ error: 'Missing required fields or file.' });
      }

      // Configure Nodemailer
      let smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      // FALLBACK: If SMTP is not configured, use Demo Mode
      if (!smtpUser || !smtpPass) {
        console.log('--- MANUSCRIPT SUBMISSION (DEMO MODE) ---');
        console.log(`Author: ${authorName}`);
        console.log(`Email: ${email}`);
        console.log(`Title: ${title}`);
        console.log(`File: ${file.originalname} (${file.size} bytes)`);
        console.log('-----------------------------------------');
        
        return res.status(200).json({ 
          success: true, 
          message: 'Submission received in Demo Mode. Connect SMTP for real email delivery.' 
        });
      }

      // Auto-correct common mistake: using email as host
      if (smtpHost.includes('@')) {
        console.warn(`SMTP Configuration Warning: Host "${smtpHost}" looks like an email. Auto-correcting to server hostname.`);
        if (smtpHost.endsWith('@gmail.com') || smtpHost.includes('gmail')) {
          smtpHost = 'smtp.gmail.com';
        } else {
          const domain = smtpHost.split('@')[1];
          smtpHost = `smtp.${domain}`;
        }
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"NAA Law Review Portal" <${process.env.SMTP_USER || 'portal@naalawreview.org'}>`,
        to: 'info@naalawreview.org',
        subject: `New Manuscript Submission: ${title}`,
        text: `
          New manuscript submission received from the scholarly portal.
          
          Author: ${authorName}
          Email: ${email}
          Title: ${title}
          
          Abstract:
          ${abstract}
        `,
        attachments: [
          {
            filename: file.originalname,
            content: file.buffer,
          },
        ],
      };

      // Attempt to send email
      await transporter.sendMail(mailOptions);

      console.log(`Submission received from ${authorName} (${email}) for "${title}"`);
      res.status(200).json({ success: true, message: 'Submission received and email sent to editorial board.' });
    } catch (error: any) {
      console.error('Submission error:', error);
      let clientError = 'Internal server error processing submission.';
      
      if (error.code === 'ENOTFOUND') {
        clientError = `DNS Host lookup failed for "${error.hostname}". Please verify your SMTP_HOST setting. It should be a server address like "smtp.gmail.com".`;
      } else if (error.code === 'EAUTH') {
        clientError = 'Authentication failed. Please verify your SMTP_USER and SMTP_PASS (App Password).';
      }

      res.status(500).json({ error: clientError });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
