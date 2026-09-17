import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AIContact() {
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: '' });
  
  // AI Chat State
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Nitin's live Gemini AI assistant. Ask me anything about his MERN stack skills, projects, or background!" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Contact form handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: '' });
    setTimeout(() => {
      setFormStatus({ submitting: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  // Real Gemini API Call directly from the frontend
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputMessage('');
    setIsTyping(true);

    callGeminiAPI(userText);
  };

  const callGeminiAPI = async (promptText) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      // Check if API key is present or contains placeholder text
      if (!apiKey || apiKey.includes('your_actual')) {
        setMessages(prev => [...prev, { role: 'assistant', text: "Please set your VITE_GEMINI_API_KEY in your frontend .env file and restart your Vite server." }]);
        setIsTyping(false);
        return;
      }

      // Initialize GoogleGenAI safely inside the function call
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are an AI portfolio assistant for Nitin Chauhan. Nitin is a MERN Stack Developer (MongoDB, Express, React, Node.js) with projects like Shubh Yogshala (shubhyogshala.com). His GitHub is https://github.com/Nitin0264. Answer questions professionally, concisely, and accurately on his behalf based on this profile. User question: ${promptText}`
              }
            ]
          }
        ]
      });

      const reply = response.text || "I couldn't generate a response right now.";
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (error) {
      console.error('Gemini Frontend Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I encountered an error connecting to Gemini. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-slate-950 text-white relative border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50 mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-slate-400 text-lg">
            Have an opportunity or project in mind? Send a message or chat with the live Gemini AI assistant below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Form Column */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-xl backdrop-blur-md">
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-cyan-400" /> Send a Message
            </h3>

            {formStatus.success ? (
              <div className="bg-emerald-950/50 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-200">Message Sent Successfully!</h4>
                <p className="text-sm text-emerald-300">Thank you for reaching out. Nitin will respond to your inquiry soon.</p>
                <button
                  onClick={() => setFormStatus({ submitting: false, success: false, error: '' })}
                  className="mt-4 px-4 py-2 bg-slate-800 text-xs font-semibold rounded-xl text-slate-200 hover:bg-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or job opening..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  ></textarea>
                </div>
                {formStatus.error && <p className="text-red-400 text-xs">{formStatus.error}</p>}
                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 text-sm"
                >
                  {formStatus.submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Gemini AI Assistant Column */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-xl backdrop-blur-md flex flex-col h-[520px]">
            <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6 text-cyan-400" /> Live Gemini AI Assistant <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            
            {/* Chat Messages Area */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-2 mb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm max-w-[80%] leading-relaxed ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-slate-950 border border-slate-800 text-slate-300 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleChatSubmit} className="flex gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Gemini anything about Nitin..."
                className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-3 rounded-xl transition-colors shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}