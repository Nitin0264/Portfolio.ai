import React, { useEffect, useRef } from 'react';
import { FileText, Download, Award, Briefcase, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger animation for the big RESUME title
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

  return (
    <section id="about" ref={sectionRef} className="py-28 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Section Subtitle */}
        <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3">
          MY BACKGROUND & EXPERIENCE
        </p>

        {/* Massive Typography Heading */}
        <div ref={headingRef} className="overflow-hidden mb-6">
          <h2 className="text-5xl sm:text-8xl font-black tracking-tighter uppercase text-slate-100 select-none">
            RESUME
          </h2>
        </div>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Want to see my full professional history, technical stack, and education credentials? Explore my background or download a clean, print-friendly copy of my resume.
        </p>

        {/* Action Button */}
        <div className="flex justify-center gap-4 flex-wrap mb-16">
          <a
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl group"
          >
            <Download className="w-5 h-5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" /> 
            Download CV
          </a>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl hover:border-cyan-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Education</h3>
            <p className="text-sm text-slate-400">Pursuing Online MCA (2025-2027) from Uttaranchal University & BCA from Omkarananda Institute.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Experience</h3>
            <p className="text-sm text-slate-400">6-month onsite Front-End Intern at CodewarIT, Dehradun, and Web Intern at Saiket Systems.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl hover:border-cyan-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Projects</h3>
            <p className="text-sm text-slate-400">Built production platforms like shubhyogshala.com and full MERN e-commerce ecosystems.</p>
          </div>

        </div>

      </div>
    </section>
  );
}