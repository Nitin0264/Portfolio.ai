import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Gemini Client explicitly passing the API key from process.env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Contact Form Schema & Route (Saves direct messages to MongoDB)
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    console.error('Contact Form Save Error:', error);
    res.status(500).json({ success: false, error: 'Server error saving message.' });
  }
});

// AI Chat Route (Powered by Gemini)
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    console.log('Received AI prompt from client:', prompt);

    // Call Gemini using the correct current model and configuration
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are an AI assistant for Nitin Chauhan's portfolio website. Nitin is a MERN Stack Developer (MongoDB, Express, React, Node.js) with experience at CodewarIT and projects like Shubh Yogshala (shubhyogshala.com) and e-commerce platforms. His GitHub is https://github.com/Nitin0264. Answer questions professionally and concisely on his behalf based on this profile. User question: ${prompt}`
            }
          ]
        }
      ]
    });

    const reply = response.text();
    console.log('Gemini response generated successfully.');
    res.json({ success: true, reply });

  } catch (error) {
    console.error('CRITICAL BACKEND GEMINI ERROR:', error);
    res.status(500).json({ success: false, error: error.message || 'AI service error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});