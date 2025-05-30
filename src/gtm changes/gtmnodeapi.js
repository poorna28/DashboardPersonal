require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Replace with your actual frontend IP or domain
const allowedOrigin =["http://localhost:5000",
    "http://localhost:3000"
] 

// CORS Configuration
const corsOptions = {
    // origin: function (origin, callback) {
    //     if (origin === allowedOrigin) {
    //         callback(null, true); 
    //     } else {
    //         callback(new Error("CORS Policy: This origin is not allowed"));
    //     }
    // },
    
    origin: function (origin, callback) {
        if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS Policy: This origin is not allowed"));
        }
    },
    
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Logs Setup block start
const logFilePath = path.join(__dirname, 'app.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const logMessage = (message, level = 'INFO') => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const formattedMessage = `[${level} - ${timestamp}]: ${message}\n`;
    logStream.write(formattedMessage);
    process.stdout.write(formattedMessage);
};

console.log = (...args) => logMessage(args.join(' '), 'LOG');
console.error = (...args) => logMessage(args.join(' '), 'ERROR');
console.warn = (...args) => logMessage(args.join(' '), 'WARNING');
// Logs Setup block end


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false, // Ignore self-signed certificate errors
    }
});

// test API
app.get('/api/', (req, res) => {
    res.send('API is working');
  });


// Contact Me API
app.post('/api/GTM/contactMe', async (req, res) => {
    try {
        console.log('New Process Started');

        const { name, email, designation,  contactNumber, companyName, websiteUrl, contactMessage, whyDouJOin} = req.body;

        console.log(`Request Body ${JSON.stringify(req.body)}`);

        if (!name || !email || !designation || !contactNumber || !websiteUrl || !contactMessage || !whyDouJOin || !companyName )  {
            console.error("Error: All fields are required");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "All fields are required" });
        }

        // Name validation
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            console.error("Error: Name must contain only alphabets and spaces");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "Name must contain only alphabets and spaces" });
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.error("Error: Invalid email format");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Designation validation
        if (!/^[a-zA-Z\s]+$/.test(designation)) {
            console.error("Error: Designation must contain only alphabets and spaces");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "Designation must contain only alphabets and spaces" });
        }

        // Contact number validation (10-digit number)
        if (!/^\d{10}$/.test(contactNumber)) {
            console.error("Error: Contact number must be exactly 10 digits");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "Contact number must be exactly 10 digits" });
        }

        // Company name validation (Alphabets, numbers, and spaces)
        if (!/^[a-zA-Z0-9\s]+$/.test(companyName)) {
            console.error("Error: Company name must contain only alphabets, numbers, and spaces");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "Company name must contain only alphabets, numbers, and spaces" });
        }

        // Website URL validation
        const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/?$/;
        if (!urlPattern.test(websiteUrl)) {
            console.error("Error: Invalid website URL");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "Invalid website URL" });
        }

        // Contact message validation (10-500 characters)
        if (contactMessage.length < 10 || contactMessage.length > 500) {
            console.error("Error: Brief discussion must be between 10 and 500 characters");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "Brief discussion must be between 10 and 500 characters" });
        }

        // Why do you join validation (10-300 characters)
        if (whyDouJOin.length < 10 || whyDouJOin.length > 300) {
            console.error("Error:  Why do you join must be between 10 and 300 characters");
            console.log('---------------------------------------------------------------');
            return res.status(400).json({ error: "Why do you join must be between 10 and 300 characters" });
        }


        // Email Template
        const mailOptions = {
            from: `Contact Form ${process.env.SMTP_USER}`,
            to: process.env.SMTP_TO,
            subject: `New Contact Request from ${name}`,
            html: `<p>Dear ${process.env.SMTP_USER_NAME},</p>
    
                <p>I hope this email finds you well. My name is <strong>${name}</strong>, and I am reaching out from <strong>${companyName}</strong>.</p>

                <h3>Contact Details:</h3>
                <ul>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Designation:</strong> ${designation}</li>
                    <li><strong>Contact Number:</strong> ${contactNumber}</li>
                    <li><strong>Company Website:</strong> <a href="${websiteUrl}" target="_blank">${websiteUrl}</a></li>
                </ul>

                <h3>Message:</h3>
                <p>${contactMessage}</p>

                <h3>Reason for Joining:</h3>
                <p>${whyDouJOin}</p>

                <p>I would love to discuss this further at your convenience. Please let me know a suitable time for a call or meeting.</p>

                <p>Looking forward to your response.</p>

                <p>Best regards,</p>
                <p><strong>${name}</strong><br>
                <strong>${companyName}</strong></p>`
        };

        // console.log(`Final Mail Templet: ${mailOptions.html}`);

        // Send Mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: "Email sent successfully!" });
        console.log('---------------------------------------------------------------');

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal Server Error" });
        console.log('---------------------------------------------------------------');
    }
});



app.use((err, req, res, next) => {
    if (err.message.includes("CORS Policy")) {
        console.error(`Access Denied: Unauthorized origin, message: ${JSON.stringify(err.message)}`);
        console.log('---------------------------------------------------------------');
        return res.status(403).json({ error: "Access Denied: Unauthorized origin" });
    }
    next(err);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
