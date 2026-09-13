import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import SkillsEducation from './components/SkillsEducation';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-darkBg text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <SkillsEducation />
      <Contact />
    </div>
  );
}