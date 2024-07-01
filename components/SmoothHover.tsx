"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus } from 'lucide-react'; // Import the icon you want to use

const CardWithCustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPosition({ x, y });
    }
  }, []);

  const animate = useCallback(() => {
    if (isHovering) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [isHovering]);

  useEffect(() => {
    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovering, handleMouseMove, animate]);

  return (
    <div 
      ref={cardRef}
      className="relative w-64 h-40 bg-gray-200 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-600">Smooth hover</h2>
        <p></p>
      </div>
      <div 
        className={`absolute w-8 h-8 rounded-full border-2 border-blue-500 pointer-events-none transition-opacity duration-300 ease-out flex items-center justify-center ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        style={{
          left: `${cursorPosition.x - 16}px`,
          top: `${cursorPosition.y - 16}px`,
        }}>
        <Plus size={16} color="#3B82F6" /> 
      </div>
    </div>
  );
};

export default CardWithCustomCursor;
