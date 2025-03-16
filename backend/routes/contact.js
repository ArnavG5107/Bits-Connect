import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js';

const router = express.Router();
dotenv.config();



// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false // Helps with self-signed certificates
    }
  });
  
  // Verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log("SMTP connection error:", error);
    } else {
      console.log("SMTP server is ready to take our messages");
    }
  });

// POST route to handle contact form submissions
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Optional: Save contact form submission to database
    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });
    
    await newContact.save();
    
    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'arnavgupta5106@gmail.com', // Your receiving email
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ success: false, message: 'An error occurred while submitting the form' });
  }
});

export default router;