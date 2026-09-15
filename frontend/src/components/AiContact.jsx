import React, { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AIContact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'human'

  // AI Chat States
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm Nitin's virtual assistant. Ask me anything about his MERN stack skills, experience at CodewarIT, or his projects like shubhyogshala.com!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Human Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // GSAP Animation for section entry
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  // Handle Main Section Gemini AI Chat Request
  const handleAIChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || aiLoading) return;

    const userMsg = chatInput;
    // Add user message to chat immediately
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setAiLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg })
      });
      const data = await res.json();

      if (data.success && data.reply) {
        // Add AI reply
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: data.error || "Sorry, I couldn't reach the AI service right now." }]);
      }
    } catch (err) {
      console.error('AI Fetch Error:', err);
      setMessages(prev => [...prev, { sender: 'ai', text: "Network error. Make sure your backend server is running on port 5000." }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Handle Human Direct Form Submission (Saved to MongoDB)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormError(data.error || 'Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      setFormError('Network error connecting to backend server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 bg-slate-950 text-white relative border-t border-slate-900 overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
        <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3">
          Get In Touch
        </p>
        <div ref={headingRef} className="overflow-hidden">
          <h2 className="text-5xl sm:text-8xl font-black tracking-tighter uppercase text-slate-100 select-none">
            CONTACT NITIN
          </h2>
        </div>
        <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Have an opportunity, a question about my stack, or want to collaborate? Choose your preferred method of communication below.
        </p>
      </div>

      {/* Interactive Contact Terminal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tab Switcher UI (Mimics Reference Style) */}
        <div className="flex justify-center mb-8 gap-3 bg-slate-900 p-1.5 rounded-full max-w-md mx-auto border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold transition-all w-1/2 justify-center text-sm ${
              activeTab === 'ai'
                ? 'bg-cyan-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Ask Gemini AI
          </button>
          <button
            onClick={() => setActiveTab('human')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold transition-all w-1/2 justify-center text-sm ${
              activeTab === 'human'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Direct Message
          </button>
        </div>

        {/* Terminal Container */}
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl shadow-black/30">
          
          {/* --- View 1: AI Chat Interface --- */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              {/* Chat History Display */}
              <div className="h-96 overflow-y-auto space-y-5 pr-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-cyan-500 text-slate-950'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`max-w-[80%] px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-xl ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex items-center gap-4 text-cyan-400 text-sm animate-pulse pl-14">
                    <Bot className="w-6 h-6" /> Nitin's AI is thinking...
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleAIChat} className="flex gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-700 focus-within:border-cyan-500 transition-colors">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about Nitin's MERN stack projects or experience..."
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder-slate-500 focus:outline-none text-sm"
                  disabled={aiLoading}
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 rounded-xl font-semibold flex items-center justify-center transition-colors disabled:opacity-50 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>
          )}

          {/* --- View 2: Human Contact Form Interface --- */}
          {activeTab === 'human' && (
            <div className="min-h-[460px] flex flex-col justify-center">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-20 h-20 text-cyan-400 mx-auto" />
                  <h3 className="text-3xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-slate-400 text-lg max-w-md mx-auto">Thanks for reaching out. Your message has been securely delivered to Nitin's database. He will get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 animate-fade-in">
                  {formError && <div className="p-4 bg-red-950/50 border border-red-700 text-red-300 rounded-2xl text-sm text-center">{formError}</div>}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g., Sarah Chen"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g., sarah@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Tell me about the opportunity or project requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto md:px-12 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-indigo-600/20 text-base"
                  >
                    {submitting ? 'Sending...' : 'Send Direct Message'} <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Final Decorative Elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-900/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </section>
  );
}