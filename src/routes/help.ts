import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface ContactRequest {
    name: string;
    Email: string;
    Message: string;
}

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

const router = Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.post('/', async (req: Request<{}, {}, ContactRequest>, res: Response) => {
    const { name, Email, Message } = req.body;

    // Validate required fields
    if (!name || !Email || !Message) {
        return res.status(400).json({ 
            success: false,
            message: 'Missing required fields: name, Email, Message'
        });
    }

    // Set clientEmail to the fixed address
    const clientEmail = 'pythonatewaleed@gmail.com';

    // Create email template
    const mailOptions: MailOptions = {
        from: process.env.EMAIL_USERNAME || 'no-reply@example.com',
        to: clientEmail,
        subject: 'Contact Us',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">Contact Us Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${Email}</p>
                <p><strong>Message:</strong></p>
                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                    <p>${Message}</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ 
            success: true,
            message: 'Contact request sent successfully'
        });
    } catch (error: any) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to send contact request',
            error: error.message
        });
    }
});

export default router;
