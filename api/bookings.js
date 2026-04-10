import dbConnect from '../lib/db.js';
import { Booking } from '../lib/models.js';
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
    if (method === 'GET') {
      const bookings = await Booking.find({}).sort({ created_at: -1 });
      return res.status(200).json(bookings);
    }

    if (method === 'POST') {
      const { name, email, date, time, guests } = req.body;
      
      // Check if the slot is full (max 5 bookings per time slot)
      const count = await Booking.countDocuments({ date, time, status: { $ne: 'cancelled' } });

      if (count >= 5) {
        return res.status(400).json({ error: "This time slot is fully booked. Please choose another time." });
      }

      const booking = await Booking.create({ name, email, date, time, guests });

      // Send confirmation email
      await sendEmail(
        email,
        'Booking Received - Chook Cafe',
        `Hi ${name}, we've received your booking for ${date} at ${time} for ${guests} guests. We'll confirm it shortly!`,
        `<h1>Booking Received</h1><p>Hi ${name},</p><p>We've received your booking for <strong>${date}</strong> at <strong>${time}</strong> for <strong>${guests}</strong> guests.</p><p>We'll confirm it shortly!</p>`
      );

      return res.status(200).json({ id: booking._id, success: true });
    }

    if (method === 'PATCH') {
      const { id } = req.query;
      const { status } = req.body;

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      booking.status = status;
      await booking.save();

      // Send status update email
      if (status === 'confirmed') {
        await sendEmail(
          booking.email,
          'Booking Confirmed! - Chook Cafe',
          `Hi ${booking.name}, your booking for ${booking.date} at ${booking.time} has been confirmed. See you soon!`,
          `<h1>Booking Confirmed!</h1><p>Hi ${booking.name},</p><p>Your booking for <strong>${booking.date}</strong> at <strong>${booking.time}</strong> has been <strong>confirmed</strong>.</p><p>See you soon!</p>`
        );
      } else if (status === 'cancelled') {
        await sendEmail(
          booking.email,
          'Booking Cancelled - Chook Cafe',
          `Hi ${booking.name}, your booking for ${booking.date} at ${booking.time} has been cancelled.`,
          `<h1>Booking Cancelled</h1><p>Hi ${booking.name},</p><p>Your booking for <strong>${booking.date}</strong> at <strong>${booking.time}</strong> has been <strong>cancelled</strong>.</p>`
        );
      }

      return res.status(200).json({ success: true });
    }

    if (method === 'DELETE') {
      const { id } = req.query;
      await Booking.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
