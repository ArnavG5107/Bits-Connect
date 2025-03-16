import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js';

const router = express.Router();
dotenv.config();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

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
    
    // Send email notification using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use your verified domain
      to: 'arnavgupta5106@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending email notification' });
    }
    
    res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ success: false, message: 'An error occurred while submitting the form' });
  }
});

export default router;
