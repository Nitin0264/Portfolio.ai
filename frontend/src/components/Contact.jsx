import React, { useState } from 'react';
import { Mail, Send, Terminal, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // You can hook this up to your Express backend later!
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-3">
          Communication Terminal
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Amazing</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Side: Info */}
        <div className="bg-cardBg border border-slate-800/80 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <h4 className="text-2xl font-bold text-white mb-4">Get in Touch</h4>
            <p className="text-slate-400 leading-relaxed mb-8">
              Whether you have an opening for a Full-Stack or AI role, want to collaborate on a MERN stack project, or just want to connect—my terminal is always open.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <span>nc8224140@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+91 9546 8227xx</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Uttarakhand, India</span>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-800 text-xs text-slate-500">
            © 2026 Nitin Chauhan. Hosted on avinish.online.
          </div>
        </div>

        {/* Right Side: Contact Form / Terminal */}
        <div className="bg-cardBg border border-slate-800/80 rounded-3xl p-8 relative">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
              <h4 className="text-2xl font-bold text-white mb-2">Message Dispatched!</h4>
              <p className="text-slate-400">Thank you for reaching out, Nitin will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-slate-400 text-sm font-mono">
                <Terminal className="w-4 h-4 text-sky-400" /> send_message.sh
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  placeholder="Hello Nitin, I'd like to discuss a project..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}