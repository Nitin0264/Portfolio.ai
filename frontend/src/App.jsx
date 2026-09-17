import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import SkillsEducation from './components/SkillsEducation';
import Projects from './components/Projects';
import AIContact from './components/AIContact';
import { Sparkles, X, Bot, Send, User } from 'lucide-react';
import SkillsCertificates from './components/SkillsCertificates';
import CustomCursor from './components/CustomCursor';
import { GoogleGenAI } from '@google/genai';

export default function App() {
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm Nitin's live Gemini AI assistant. Ask me anything about his MERN stack skills, experience, or projects!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Floating AI Widget Chat Handler using direct Gemini SDK (100% Frontend safe)
  const handleFloatingAIChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || aiLoading) return;

    const userMsg = chatInput;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setAiLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey || apiKey.includes('your_actual')) {
        setMessages(prev => [...prev, { sender: 'ai', text: "Please configure your VITE_GEMINI_API_KEY in the frontend .env file to enable live AI responses." }]);
        setAiLoading(false);
        return;
      }

      // Initialize GoogleGenAI locally inside the function call
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are an AI portfolio assistant for Nitin Chauhan. Nitin is a MERN Stack Developer (MongoDB, Express, React, Node.js) with projects like Shubh Yogshala (shubhyogshala.com) and a GitHub profile at https://github.com/Nitin0264. Answer questions professionally and concisely on his behalf. User question: ${userMsg}`
              }
            ]
          }
        ]
      });

      const reply = response.text || "I couldn't generate a response right now.";
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      console.error('Gemini Widget Error:', err);
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I encountered an error connecting to Gemini. Please try again." }]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            NITIN.ONLINE
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all text-sm font-semibold"
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* Main Sections */}
      <main>
        <CustomCursor />
        <Hero />
        <About />
        <SkillsEducation />
        <Projects />
        <AIContact />
        <SkillsCertificates /> 
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Nitin Chauhan. All rights reserved.</p>
      </footer>

      {/* Floating Bottom-Right AI Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isAiDrawerOpen ? (
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="relative group flex items-center gap-3 bg-slate-900 border border-slate-800 p-2.5 rounded-full shadow-2xl hover:border-cyan-500 transition-all"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400 bg-slate-800">
              <img 
                src="/nitin-portrait.png" 
                alt="Nitin" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"; }}
              />
            </div>
            <div className="pr-3 text-left hidden sm:block">
              <p className="text-xs font-bold text-white flex items-center gap-1">
                Ask Nitin AI <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              </p>
              <p className="text-[10px] text-slate-400">Online & Ready</p>
            </div>
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[450px]">
            {/* Widget Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold text-sm text-white">Nitin's AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsAiDrawerOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                    msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-cyan-500 text-slate-950 font-bold'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : 'AI'}
                  </div>
                  <div className={`max-w-[78%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs animate-pulse">
                  <Bot className="w-4 h-4" /> Gemini is thinking...
                </div>
              )}
            </div>

            {/* Widget Input Form */}
            <form onSubmit={handleFloatingAIChat} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about my skills or stack..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3.5 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}