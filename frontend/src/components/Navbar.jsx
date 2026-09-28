import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Code2 } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add background blur/shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 text-white font-black text-xl tracking-wider group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            N
          </div>
          <span>NITIN<span className="text-cyan-400">.</span>DEV</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Resume Action */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/nitinreact.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold bg-slate-900 border border-slate-700 text-cyan-400 px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" /> Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-4 pb-6 shadow-2xl flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-900/60 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/nitinreact.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-slate-900 border border-slate-700 text-cyan-400 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all mt-2"
          >
            <FileText className="w-4 h-4" /> View Resume
          </a>
        </div>
      )}
    </header>
  );
}