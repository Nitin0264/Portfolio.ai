const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nitin-portfolio')
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Contact Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// API Route for Contact Form / Direct Hiring Message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message securely dispatched to Nitin!' });
  } catch (error) {
    console.error('Contact Form Save Error:', error);
    res.status(500).json({ success: false, error: 'Server error while saving message.' });
  }
});

// API Route for Real Gemini AI Assistant
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received AI prompt from client:", prompt);

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required.' });
    }

    const systemInstruction = `You are Nitin Chauhan's official AI assistant on his portfolio website (nitin.online). 
    Here is Nitin's background info:
    - Role: Front-End & MERN Stack Developer.
    - Education: Pursuing Online MCA (2025-2027) from Uttaranchal University, completed BCA (2022-2025) from Omkarananda Institute.
    - Experience: 6-month onsite Front-End Development Intern at CodewarIT, Dehradun (Nov 2025 - May 2026), and Web Development Intern at Saiket Systems.
    - Projects: shubhyogshala.com (Yoga Studio Platform with React, Tailwind, Express, MongoDB, custom auth, RBAC, Cloudinary) and Pulse Clothing Store (E-commerce storefront with cart & checkout).
    - Tech Stack: React.js, Tailwind CSS, JavaScript (ES6+), Express.js, MongoDB, Git, GitHub, Vite.
    Answer questions professionally, concisely, and helpfully to recruiters or visitors inquiring about Nitin.`;

    // Updated to the current stable production model ID
 const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    console.log("Gemini response generated successfully.");
    res.status(200).json({ success: true, reply: response.text });
  } catch (error) {
    console.error('CRITICAL BACKEND GEMINI ERROR:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch AI response.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));