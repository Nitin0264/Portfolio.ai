import React, { useEffect, useRef } from 'react';
import { Award, Zap, Database, LayoutGrid, Server, Cloud, FileCode2, Terminal, GitBranch, Layers3 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React.js', icon: LayoutGrid, color: 'text-cyan-400' },
  { name: 'Node.js', icon: Server, color: 'text-lime-400' },
  { name: 'MongoDB', icon: Database, color: 'text-emerald-400' },
  { name: 'Express.js', icon: Layers3, color: 'text-slate-300' },
  { name: 'Tailwind CSS', icon: Zap, color: 'text-sky-400' },
  { name: 'JavaScript', icon: FileCode2, color: 'text-yellow-400' },
  { name: 'AWS', icon: Cloud, color: 'text-orange-400' },
  { name: 'Git/GitHub', icon: GitBranch, color: 'text-red-400' },
  { name: 'Postman', icon: Terminal, color: 'text-amber-500' }, // Replaced Figma
  { name: 'VS Code', icon: FileCode2, color: 'text-blue-400' },
];

export default function SkillsCertificates() {
  const sectionRef = useRef(null);
  const skillRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      skillRefs.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const addToSkillRefs = (el) => {
    if (el && !skillRefs.current.includes(el)) {
      skillRefs.current.push(el);
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-28 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-100">
              Tech Stack &<br /> Credentials
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              I specialize in the MERN stack (MongoDB, Express, React, Node.js) combined with modern tools like Tailwind CSS and cloud services.
            </p>
            
            <div className="pt-4">
              <a
                href="#certificates"
                className="inline-flex items-center gap-2.5 bg-slate-50 text-slate-950 px-6 py-3 rounded-full font-semibold hover:bg-white transition-all group text-sm shadow-lg"
              >
                <Award className="w-5 h-5 text-indigo-600" />
                View All Certificates
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    ref={addToSkillRefs}
                    className="group flex flex-col items-center justify-center gap-3 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all aspect-square"
                  >
                    <Icon className={`w-9 h-9 ${skill.color} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
                    <span className="text-xs font-medium text-slate-300 text-center group-hover:text-white">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}