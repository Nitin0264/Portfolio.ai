import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export default function AIContact() {
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'human'

  // AI Chat States
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm Nitin's virtual assistant. Ask me anything about his MERN stack skills, experience at CodewarIT, or projects like shubhyogshala.com!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Human Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle Live Gemini AI Chat Request
  const handleAIChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || aiLoading) return;

    const userMsg = chatInput;
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
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: data.error || "Sorry, I couldn't reach the AI service right now." }]);
      }
    } catch (err) {
      console.error('Frontend Fetch Error:', err);
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
        setFormError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setFormError('Network error connecting to backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Connect With Nitin
          </h2>
          <p className="mt-2 text-slate-400">
            Chat with his live AI assistant trained on his resume or dispatch a direct hiring message to his database.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Ask Nitin's Gemini AI
            </button>

            <button
              onClick={() => setActiveTab('human')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                activeTab === 'human'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Human Direct Message
            </button>
          </div>
        </div>

        {/* AI Chat Terminal View */}
        {activeTab === 'ai' && (
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-2xl">
            <div className="h-96 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-cyan-500 text-slate-950'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="flex items-center gap-3 text-cyan-400 text-sm animate-pulse">
                  <Bot className="w-5 h-5" /> Nitin's AI is analyzing and thinking...
                </div>
              )}
            </div>

            <form onSubmit={handleAIChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about Nitin's experience, skills, or projects..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 rounded-xl font-semibold flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Human Contact Form View */}
        {activeTab === 'human' && (
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto" />
                <h3 className="text-2xl font-bold">Message Dispatched!</h3>
                <p className="text-slate-400">Thanks for reaching out. Your note has been securely saved to Nitin's database.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {formError && <div className="p-3 bg-red-500/10 border border-red-500 text-red-400 rounded-xl text-sm">{formError}</div>}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="Recruiter or Hiring Manager Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="We would love to talk to you about a developer opportunity..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/20"
                >
                  {submitting ? 'Saving to Database...' : 'Send Direct Hiring Message'} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
}