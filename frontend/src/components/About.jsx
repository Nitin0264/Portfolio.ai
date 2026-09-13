import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Globe, Rocket, Terminal, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-3">
          System Overview
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Performance</span>
        </h3>
      </div>

      {/* Bento Grid Layout */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Core Philosophy */}
        <div className="md:col-span-2 bg-cardBg border border-slate-800/80 rounded-3xl p-8 relative overflow-hidden group hover:border-sky-500/50 transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl group-hover:bg-sky-500/10 transition-all" />
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-6">
            <Code2 className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Full-Stack Architecture & Scale</h4>
          <p className="text-slate-400 leading-relaxed">
            I specialize in building robust MERN applications from the ground up. From structuring normalized MongoDB schemas to crafting responsive UIs with Tailwind CSS, I ensure every layer of the application is optimized for speed and reliability.
          </p>
        </div>

        {/* Card 2: AI Integration */}
        <div className="bg-cardBg border border-slate-800/80 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all" />
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
            <Cpu className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">AI Engineering</h4>
          <p className="text-slate-400 leading-relaxed">
            Integrating Google Gemini APIs to turn standard web platforms into smart, generative tools with real-time text parsing and automated workflows.
          </p>
        </div>

        {/* Card 3: Motion & UI */}
        <div className="bg-cardBg border border-slate-800/80 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
            <Rocket className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Cinematic Motion</h4>
          <p className="text-slate-400 leading-relaxed">
            Using GSAP and modern animation pipelines to create immersive, fluid user experiences that captivate visitors instantly.
          </p>
        </div>

        {/* Card 4: Database & Reliability */}
        <div className="md:col-span-2 bg-cardBg border border-slate-800/80 rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
            <Database className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Security & Database Optimization</h4>
          <p className="text-slate-400 leading-relaxed">
            Implementing robust Role-Based Access Control (RBAC), secure JWT authentication, and high-performance MongoDB query indexing for enterprise-grade SaaS environments.
          </p>
        </div>

      </div>
    </section>
  );
}