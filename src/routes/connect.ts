import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface ConnectRequest {
  userEmail: string;
  userName: string;
  clientEmail: string;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const router = Router();

// Configure Nodemailer with TypeScript typing
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

router.post('/', async (req: Request<{}, {}, ConnectRequest>, res: Response) => {
  const { userEmail, userName, clientEmail } = req.body;

  // Validate required fields
  if (!userEmail || !userName || !clientEmail) {
    return res.status(400).json({ 
      success: false,
      message: 'Missing required fields: userEmail, userName, clientEmail'
    });
  }

  // Create email template
  const mailOptions: MailOptions = {
    from: process.env.EMAIL_USERNAME || 'no-reply@example.com',
    to: clientEmail,
    subject: `Connection Request from ${userName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Connection Request</h2>
        <p>Hello,</p>
        <p>You have received a connection request from:</p>
        
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
        </div>
        
        <p style="font-style: italic;">"Here I am ${userName}, I want to connect with you."</p>
        
        <p>Please respond at your earliest convenience.</p>
        <p>Best regards,</p>
        <p>Your Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      success: true,
      message: 'Connection request sent successfully'
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send connection request',
      error: error.message
    });
  }
});

export default router;