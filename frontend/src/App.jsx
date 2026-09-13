import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';

export default function App() {
  return (
    <div className="min-h-screen bg-darkBg text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      <Hero />
      <About />
      <Projects />
    </div>
  );
}