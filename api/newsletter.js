import dbConnect from '../lib/db.js';
import { Newsletter } from '../lib/models.js';
import { Resend } from 'resend';

// Email Setup (Resend)
let resendClient = null;

function getResend() {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      console.warn('Email configuration missing (RESEND_API_KEY). Emails will not be sent.');
      return null;
    }
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

async function sendEmail(to, subject, text, html) {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      text,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  try {
    if (method === 'POST') {
      const { email } = req.body;
      
      try {
        await Newsletter.create({ email });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ error: "Already subscribed" });
        }
        throw error;
      }

      // Send welcome email
      await sendEmail(
        email,
        'Welcome to Chook Cafe Newsletter',
        'Thank you for joining our newsletter! Stay tuned for seasonal specials and events.',
        '<h1>Welcome to Chook Cafe</h1><p>Thank you for joining our newsletter! Stay tuned for seasonal specials and events.</p>'
      );

      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
