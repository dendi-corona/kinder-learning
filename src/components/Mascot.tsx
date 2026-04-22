'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MascotProps {
  emotion?: 'happy' | 'excited' | 'thinking' | 'proud' | 'sleepy' | 'surprised' | 'laughing';
  message?: string;
  size?: 'small' | 'medium' | 'large' | 'hero';
  animated?: boolean;
  className?: string;
}

export default function Mascot({ 
  emotion = 'happy', 
  message, 
  size = 'medium',
  animated = true,
  className 
}: MascotProps) {
  const sizeClasses = {
    small: 'w-16 h-16 md:w-20 md:h-20',
    medium: 'w-24 h-24 md:w-32 md:h-32',
    large: 'w-40 h-40 md:w-48 md:h-48',
    hero: 'w-56 h-56 md:w-64 md:h-64',
  };

  const getEyeShape = () => {
    switch (emotion) {
      case 'happy': return { left: 'M15,25 Q20,20 25,25', right: 'M45,25 Q50,20 55,25' };
      case 'excited': return { left: 'M15,25 Q20,15 25,25', right: 'M45,25 Q50,15 55,25' };
      case 'thinking': return { left: 'M18,25 Q20,28 22,25', right: 'M48,25 Q50,28 52,25' };
      case 'proud': return { left: 'M15,25 Q20,20 25,25', right: 'M45,25 Q50,20 55,25' };
      case 'sleepy': return { left: 'M15,27 Q20,27 25,27', right: 'M45,27 Q50,27 55,27' };
      case 'surprised': return { left: 'M20,25 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0', right: 'M50,25 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0' };
      case 'laughing': return { left: 'M15,25 Q20,18 25,25', right: 'M45,25 Q50,18 55,25' };
      default: return { left: 'M15,25 Q20,20 25,25', right: 'M45,25 Q50,20 55,25' };
    }
  };

  const getMouthShape = () => {
    switch (emotion) {
      case 'happy': return 'M35,40 Q40,45 45,40';
      case 'excited': return 'M30,38 Q40,50 50,38';
      case 'thinking': return 'M35,45 Q40,45 45,45';
      case 'proud': return 'M30,40 Q40,50 50,40';
      case 'sleepy': return 'M35,45 Q40,48 45,45';
      case 'surprised': return 'M35,40 Q40,55 45,40';
      case 'laughing': return 'M28,40 Q40,55 52,40';
      default: return 'M35,40 Q40,45 45,40';
    }
  };

  const eyeShapes = getEyeShape();
  const mouthShape = getMouthShape();

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className={sizeClasses[size]}
        animate={animated ? {
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 70 70" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A0522D" />
              <stop offset="100%" stopColor="#8B4513" />
            </linearGradient>
            <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DEB887" />
              <stop offset="100%" stopColor="#D2B48C" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Body */}
          <ellipse cx="35" cy="40" rx="28" ry="25" fill="url(#bodyGradient)" />
          
          {/* Belly */}
          <ellipse cx="35" cy="45" rx="18" ry="15" fill="url(#bellyGradient)" />
          
          {/* Wings/Arms */}
          <motion.ellipse 
            cx="12" cy="40" rx="8" ry="12" fill="#A0522D"
            animate={emotion === 'excited' || emotion === 'laughing' ? { rotate: [-10, 10, -10] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.ellipse 
            cx="58" cy="40" rx="8" ry="12" fill="#A0522D"
            animate={emotion === 'excited' || emotion === 'laughing' ? { rotate: [10, -10, 10] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Face area */}
          <ellipse cx="35" cy="30" rx="22" ry="18" fill="#DEB887" />
          
          {/* Eyes white */}
          <motion.circle 
            cx="20" cy="25" r="8" fill="white"
            animate={emotion === 'surprised' ? { scale: 1.2 } : {}}
          />
          <motion.circle 
            cx="50" cy="25" r="8" fill="white"
            animate={emotion === 'surprised' ? { scale: 1.2 } : {}}
          />
          
          {/* Pupils */}
          <circle cx="20" cy="25" r="4" fill="#2C1810" />
          <circle cx="50" cy="25" r="4" fill="#2C1810" />
          
          {/* Eye highlights */}
          <circle cx="22" cy="23" r="2" fill="white" />
          <circle cx="52" cy="23" r="2" fill="white" />
          
          {/* Beak */}
          <motion.polygon 
            points="35,32 30,40 40,40" 
            fill="#FFA500"
            animate={emotion === 'laughing' || emotion === 'excited' ? { scaleY: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          
          {/* Eyebrows based on emotion */}
          {emotion === 'excited' && (
            <>
              <path d="M15,18 Q20,15 25,18" stroke="#8B4513" strokeWidth="2" fill="none" />
              <path d="M45,18 Q50,15 55,18" stroke="#8B4513" strokeWidth="2" fill="none" />
            </>
          )}
          {emotion === 'thinking' && (
            <>
              <path d="M15,18 Q20,20 25,18" stroke="#8B4513" strokeWidth="2" fill="none" />
              <path d="M45,18 Q50,20 55,18" stroke="#8B4513" strokeWidth="2" fill="none" />
            </>
          )}
          {emotion === 'proud' && (
            <>
              <path d="M15,18 Q20,15 25,18" stroke="#8B4513" strokeWidth="2" fill="none" />
              <path d="M45,18 Q50,15 55,18" stroke="#8B4513" strokeWidth="2" fill="none" />
            </>
          )}
          
          {/* Feet */}
          <ellipse cx="25" cy="62" rx="5" ry="3" fill="#FFA500" />
          <ellipse cx="45" cy="62" rx="5" ry="3" fill="#FFA500" />
        </svg>
      </motion.div>
      
      {/* Speech bubble message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-5 py-3 rounded-2xl shadow-xl whitespace-nowrap border-2 border-blue-200 z-10"
        >
          <p className="text-sm font-bold text-gray-700">{message}</p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-blue-200 rotate-45"></div>
        </motion.div>
      )}
    </div>
  );
}
