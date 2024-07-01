"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react'; // Import the icon you want to use

const CardWithCustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  return (
    <div 
      ref={cardRef}
      className="relative w-64 h-40 bg-gray-200 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Hover over me!</h2>
        <p>You'll see a custom circular cursor appear.</p>
      </div>
      <div 
        className={`absolute w-8 h-8 rounded-full border-2 border-blue-500 pointer-events-none transition-all duration-300 ease-out flex items-center justify-center ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        style={{
          left: `${cursorPosition.x - 16}px`,
          top: `${cursorPosition.y - 16}px`,
          transition: 'left 0.2s, top 0.2s, opacity 0.4s, transform 0.4s',
        }}>
        <Plus size={16} color="#3B82F6" /> 
      </div>
    </div>
  );
};

export default CardWithCustomCursor;