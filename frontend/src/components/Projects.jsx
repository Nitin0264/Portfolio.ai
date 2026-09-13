import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current.children,
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

  const projects = [
    {
      title: "shubhyogshala.com - Yoga Studio Platform",
      description: "End-to-end full-stack platform featuring a custom admin dashboard with authentication, role-based access control (RBAC), and a blog management system with Cloudinary uploads.",
      tech: ["React", "Tailwind CSS", "Express", "MongoDB"],
      link: "https://shubhyogshala.com",
      featured: true
    },
    {
      title: "Pulse Clothing Store - E-Commerce",
      description: "A full-scale modern e-commerce storefront featuring comprehensive cart management, size and quantity state handling, and a centralized real-time checkout flow.",
      tech: ["React", "Vite", "Tailwind CSS", "JavaScript"],
      link: "#",
      featured: false
    }
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-3">
          Featured Works
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Production-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Deployments</span>
        </h3>
      </div>

      <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-cardBg border border-slate-800/80 rounded-3xl p-8 flex flex-col justify-between hover:border-sky-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl group-hover:bg-sky-500/10 transition-all" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Layers className="w-6 h-6" />
                </div>
                {project.featured && (
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium">
                    Live Production
                  </span>
                )}
              </div>

              <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                {project.title}
              </h4>
              <p className="text-slate-400 leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold text-sm transition-colors"
                >
                  Visit Live Site <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}