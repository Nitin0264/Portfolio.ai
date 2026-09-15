import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const portraitRef = useRef(null);

  // Mouse move parallax effect for the portrait cutout
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!portraitRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // max 20px movement
      const y = (e.clientY / innerHeight - 0.5) * 20;
      
      portraitRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-slate-950 text-white flex flex-col justify-between pt-28 pb-12 overflow-hidden px-4 sm:px-6 lg:px-8">
      
      {/* Navigation or top spacing marker if needed */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto">
        
        {/* Left Side: Intro & Summary copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> MERN Stack & AI Developer
          </div>
          
          {/* Massive Typography Backdrop */}
          <div className="relative">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-slate-300 uppercase leading-none select-none opacity-90">
              HI, I'M <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">NITIN</span>
            </h1>
          </div>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Front-End & MERN Stack Developer driven by crafting responsive, high-performance web applications and seamless digital user experiences.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
            >
              Contact Me <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Explore Projects
            </a>
          </div>
        </div>

        {/* Right Side: Floating Moving Portrait Cutout */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-cyan-500/20 to-indigo-600/20 rounded-full blur-3xl -z-10"></div>
          
          {/* Portrait Container with Parallax Ref */}
          <div 
            ref={portraitRef}
            className="relative transition-transform duration-100 ease-out w-72 h-72 sm:w-85 sm:h-85 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-900"
          >
            {/* Replace this src with Nitin's actual portrait/headshot asset */}
            <img 
              src="/nitin-portrait.png" 
              alt="Nitin Chauhan" 
              className="w-full h-full object-cover object-top scale-105"
              onError={(e) => {
                // Fallback placeholder if image path isn't set up yet
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
          </div>
        </div>

      </div>
    </section>
  );
}