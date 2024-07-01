"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react'; // Import the icon you want to use

const CardWithCustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);

  const updateCursorPosition = (x: number, y: number) => {
    setCursorPosition({ x, y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      requestRef.current = requestAnimationFrame(() => updateCursorPosition(x, y));
    }
  };

  useEffect(() => {
    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovering]);

  return (
    <div 
      ref={cardRef}
      className="relative w-64 h-40 bg-gray-800 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-500">Lazy follow, appear & disappear</h2>
        <p></p>
      </div>
      <div 
        className={`absolute w-10 h-10 rounded-full border-2 border-white pointer-events-none transition-all duration-300 ease-out flex items-center justify-center ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        style={{
          left: `${cursorPosition.x - 16}px`,
          top: `${cursorPosition.y - 16}px`,
        }}>
        <Info size={16} color="#fff" /> 
      </div>
    </div>
  );
};

export default CardWithCustomCursor;
