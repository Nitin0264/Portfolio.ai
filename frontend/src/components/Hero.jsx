import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      )
      .fromTo(
        titleRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current.children,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, duration: 0.5 },
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-sky-400 text-xs sm:text-sm mb-6 shadow-lg shadow-sky-950/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Sparkles className="w-4 h-4" />
          Available for Full-Stack & AI Roles
        </div>

        <div ref={titleRef} className="space-y-2 mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500">Nitin</span>
          </h1>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-400">
            Architecting MERN & AI Solutions.
          </h2>
        </div>

        <p ref={subRef} className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Building industry-grade, high-performance web applications powered by modern JavaScript, MongoDB, GSAP animations, and Google Gemini AI integrations.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-all shadow-lg shadow-sky-500/25 hover:scale-105"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold transition-all hover:border-slate-700"
          >
            <Terminal className="w-4 h-4 text-sky-400" />
            Let's Talk
          </a>
        </div>

      </div>
    </section>
  );
}