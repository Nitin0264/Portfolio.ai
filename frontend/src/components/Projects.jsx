import React, { useEffect, useRef } from 'react';
import { ExternalLink, Code2, Database, LayoutGrid, Server } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'Shubh Yogshala Platform',
    description: 'A comprehensive platform for a Yoga Studio with class scheduling, booking management, and content delivery.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    liveUrl: 'https://shubhyogshala.com',
    repoUrl: 'https://github.com/Nitin0264',
  },
  {
    title: 'MERN E-Commerce Storefront',
    description: 'A fully functional online clothing store with user authentication, product filtering, cart management, and payment integration.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176675c?q=80&w=600&auto=format&fit=crop',
    tags: ['MERN Stack', 'Redux Toolkit', 'Stripe', 'Styled Components'],
    liveUrl: '#',
    repoUrl: 'https://github.com/Nitin0264',
  },
  {
    title: 'Portfolio V1 (Legacy)',
    description: 'Previous iteration of my personal portfolio built with modern frontend technologies.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    tags: ['React', 'Vercel', 'CSS Modules'],
    liveUrl: '#',
    repoUrl: 'https://github.com/Nitin0264',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      }
    );

    projectRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const addToProjectRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-28 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">
            My Work
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50 mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg">
            Here are some of the key applications I have built, focusing on performance, user experience, and scalable backend architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={index}
              ref={addToProjectRefs}
              className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-cyan-800/50 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-950/80 backdrop-blur-sm p-2 rounded-full text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500"
                  >
                    <Code2 className="w-5 h-5" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-500 p-2 rounded-full text-slate-950 hover:bg-cyan-400"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-50 mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-slate-800 text-cyan-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
            <a href="https://github.com/Nitin0264" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-cyan-400 group">
                View more on my GitHub 
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </a>
        </div>

      </div>
    </section>
  );
}