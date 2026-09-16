import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;

    const onMouseMove = (e) => {
      // Immediate move for the tiny dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Smooth lag move for the outer ring follower
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add hover listener for links, buttons, and interactive elements
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Hide cursor on touch devices / small screens
  return (
    <div className="hidden lg:block pointer-events-none z-50">
      {/* Tiny inner dot */}
      <div
        id="custom-cursor"
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#22d3ee]"
      ></div>

      {/* Outer tracking ring */}
      <div
        id="cursor-follower"
        className={`fixed top-0 left-0 w-10 h-10 border border-cyan-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${
          isHovered ? 'scale-150 bg-cyan-500/15 border-cyan-400' : 'scale-100'
        }`}
      ></div>
    </div>
  );
}