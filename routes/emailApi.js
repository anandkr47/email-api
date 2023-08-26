const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Define your route handler for /submit-query
router.post('/submit-query', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Received Body:", req.body);
  console.log("Received Name:", name);
  console.log("Received Email:", email);
  console.log("Received Message:", message);

  require('dotenv').config();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });
  
  // Compose the email message
  const mailOptions = {
    from: `<${email}>`,
    to: process.env.EMAIL_USER,
    subject: 'Contact From Tetratrion',
    html: `
      <h2>Contact Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p>This email was sent from the contact form on your website.</p>
    `,
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      req.flash('error', 'error sending email!');
      return res.json({ success: false, error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      req.flash('success', 'Query sent!');
      res.json({ success: true, receivedData: { name, email, message } });
    }
  });
});

module.exports = router;
