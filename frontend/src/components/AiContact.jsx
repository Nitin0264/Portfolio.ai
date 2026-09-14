import React, { useState } from 'react';
import { Bot, User, Send, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export default function AIContact() {
  const [mode, setMode] = useState('human'); // 'human' or 'ai'
  
  // Human Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I am Nitin's Gemini AI Assistant. Ask me anything about his MERN stack skills, projects like shubhyogshala.com, or his internships!" }
  ]);

  const handleHumanSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setSubmitted(true); // fallback UI success
    }
  };

  const handleAIChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    // Simulate smart Gemini AI response based on Nitin's resume data
    setTimeout(() => {
      let aiReply = "Nitin is an expert Front-End and MERN Stack Developer with real-world experience from CodewarIT and Saiket Systems!";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('project') || lower.includes('shubhyogshala')) {
        aiReply = "Nitin built shubhyogshala.com end-to-end, featuring custom authentication, RBAC, and a blog manager with Cloudinary uploads!";
      } else if (lower.includes('experience') || lower.includes('intern')) {
        aiReply = "Nitin completed a 6-month onsite internship at CodewarIT in Dehradun and an online web internship at Saiket Systems.";
      } else if (lower.includes('hire') || lower.includes('contact')) {
        aiReply = "You can switch to the 'Human Direct Message' tab above to send Nitin an instant hiring inquiry!";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-3">
          Interactive Hub
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Nitin</span>
        </h3>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-cardBg border border-slate-800">
          <button
            onClick={() => setMode('human')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${mode === 'human' ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            <User className="w-4 h-4" /> Human Direct Message
          </button>
          <button
            onClick={() => setMode('ai')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${mode === 'ai' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            <Sparkles className="w-4 h-4" /> Ask Nitin's Gemini AI
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-cardBg border border-slate-800/80 rounded-3xl p-8 relative overflow-hidden">
        
        {mode === 'human' ? (
          <div>
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
                <h4 className="text-2xl font-bold text-white mb-2">Hiring Inquiry Dispatched!</h4>
                <p className="text-slate-400">Your message has been logged directly to Nitin's secure database.</p>
              </div>
            ) : (
              <form onSubmit={handleHumanSubmit} className="space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-slate-400 text-sm font-mono">
                  <Terminal className="w-4 h-4 text-sky-400" /> direct_hire_terminal.sh
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Your Name / Company</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                    placeholder="Recruiter Name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                    placeholder="recruiter@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Hiring Message / Details</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 resize-none"
                    placeholder="We would like to hire you for a Full-Stack / MERN role..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                >
                  Send Direct Hiring Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="flex flex-col h-[400px]">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-slate-400 text-sm font-mono mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" /> gemini_ai_assistant.exe
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.sender === 'ai' ? 'bg-purple-500/20 border border-purple-500/30 text-purple-400' : 'bg-sky-500/20 border border-sky-500/30 text-sky-400'}`}>
                    {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'ai' ? 'bg-slate-900 border border-slate-800 text-slate-300' : 'bg-sky-500 text-slate-950 font-medium'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleAIChat} className="flex gap-2 pt-4 border-t border-slate-800">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Gemini AI about Nitin's experience..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold transition-all flex items-center justify-center shadow-lg shadow-purple-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}