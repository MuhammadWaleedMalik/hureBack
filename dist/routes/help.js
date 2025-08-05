"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, Email, Message } = req.body;
    if (!name || !Email || !Message) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: name, Email, Message'
        });
    }
    const clientEmail = 'info@gethure.com';
    const mailOptions = {
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
        yield transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: 'Contact request sent successfully'
        });
    }
    catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send contact request',
            error: error.message
        });
    }
}));
exports.default = router;
