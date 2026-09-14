import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, FileText } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-darkBg/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
 
       
    {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Terminal className="w-4 h-4" />
          </div>
          <span>Nitin<span className="text-sky-400">.online</span></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-sky-400 transition-colors">Experience</a>
          <a href="#skills-education" className="hover:text-sky-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-sky-400 transition-colors">Contact</a>
        </nav>

        {/* Resume Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-semibold transition-all shadow-lg shadow-sky-500/20"
          >
            <FileText className="w-4 h-4" /> Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-darkBg/95 border-b border-slate-800 px-6 py-6 space-y-4 backdrop-blur-xl">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 font-medium">About</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 font-medium">Projects</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 font-medium">Experience</a>
          <a href="#skills-education" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 font-medium">Skills</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 font-medium">Contact</a>
        </div>
      )}
    </header>
  );
}