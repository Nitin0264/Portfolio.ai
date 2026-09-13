import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, GraduationCap, Wrench, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsEducation() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current.children,
        { y: 50, opacity: 0 },
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

  const skillCategories = [
    {
      title: "Core Languages & Frontend",
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      skills: ["HTML5", "CSS3", "Modern JavaScript (ES6+)", "React.js", "Tailwind CSS", "Bootstrap"]
    },
    {
      title: "Backend, Database & Tools",
      icon: <Wrench className="w-5 h-5 text-indigo-400" />,
      skills: ["Express.js", "MongoDB", "Git & GitHub", "Vite", "Chrome DevTools", "Vercel / Netlify"]
    }
  ];

  const education = [
    {
      degree: "Master of Computer Applications (Online MCA)",
      institution: "Uttaranchal University (UU), Dehradun",
      period: "2025 - 2027 (Expected)"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Omkarananda Institute of Management and Technology",
      period: "2022 - 2025"
    },
    {
      degree: "Higher & Secondary Education (12th & 10th)",
      institution: "SS International Sr. Sec. School, Karnal, Haryana",
      period: "Completed"
    }
  ];

  return (
    <section ref={sectionRef} id="skills-education" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-3">
          Expertise & Academics
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Education</span>
        </h3>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Skills Column */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" /> Technical Competencies
          </h4>
          
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="bg-cardBg border border-slate-800/80 rounded-3xl p-6 hover:border-sky-500/50 transition-all">
              <div className="flex items-center gap-2 mb-4">
                {cat.icon}
                <h5 className="font-semibold text-white">{cat.title}</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education Column */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" /> Academic Background
          </h4>

          <div className="bg-cardBg border border-slate-800/80 rounded-3xl p-6 space-y-6 hover:border-indigo-500/50 transition-all">
            {education.map((edu, idx) => (
              <div key={idx} className={`pb-4 ${idx !== education.length - 1 ? 'border-b border-slate-800/80' : ''}`}>
                <span className="text-xs text-sky-400 font-medium">{edu.period}</span>
                <h5 className="text-lg font-bold text-white mt-1">{edu.degree}</h5>
                <p className="text-sm text-slate-400 mt-0.5">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}