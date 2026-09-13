import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        timelineRef.current.children,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.3,
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

  const experiences = [
    {
      role: "Front-End Development Intern",
      company: "CodewarIT, Dehradun",
      period: "November 2025 - May 2026 (6 months)",
      type: "Onsite Internship",
      description: "Worked onsite in a professional software-development environment. Contributed to real-world web development tasks, built responsive user interfaces using React.js, Tailwind CSS, and Bootstrap, and strengthened debugging and git workflows.",
    },
    {
      role: "Web Development Intern",
      company: "Saiket Systems",
      period: "July 2025 - July 2026",
      type: "Online Internship",
      description: "Completed comprehensive web development assignments and challenges while pursuing Online MCA, strengthening practical development knowledge and problem-solving abilities.",
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-3">
          Career Path
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Experience</span>
        </h3>
      </div>

      <div ref={timelineRef} className="space-y-8 border-l-2 border-slate-800 ml-4 md:ml-6 pl-6 md:pl-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-sky-500 border-4 border-darkBg group-hover:scale-125 transition-transform" />

            <div className="bg-cardBg border border-slate-800/80 rounded-3xl p-8 hover:border-sky-500/50 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h4 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">
                  {exp.role}
                </h4>
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium w-fit">
                  {exp.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Briefcase className="w-4 h-4 text-sky-400" /> {exp.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" /> {exp.period}
                </span>
              </div>

              <p className="text-slate-400 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}