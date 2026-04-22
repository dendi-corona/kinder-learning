'use client';

import React from 'react';

interface MascotProps {
  emotion?: 'happy' | 'excited' | 'thinking' | 'proud' | 'sleepy';
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Mascot({ emotion = 'happy', message, size = 'medium' }: MascotProps) {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32',
    large: 'w-48 h-48',
  };

  const getEyeShape = () => {
    switch (emotion) {
      case 'happy': return 'M15,25 Q20,20 25,25 M45,25 Q50,20 55,25';
      case 'excited': return 'M15,25 Q20,15 25,25 M45,25 Q50,15 55,25';
      case 'thinking': return 'M18,25 Q20,28 22,25 M48,25 Q50,28 52,25';
      case 'proud': return 'M15,25 Q20,20 25,25 M45,25 Q50,20 55,25';
      case 'sleepy': return 'M15,27 Q20,27 25,27 M45,27 Q50,27 55,27';
      default: return 'M15,25 Q20,20 25,25 M45,25 Q50,20 55,25';
    }
  };

  const getMouthShape = () => {
    switch (emotion) {
      case 'happy': return 'M35,40 Q40,45 45,40';
      case 'excited': return 'M30,38 Q40,50 50,38';
      case 'thinking': return 'M35,45 Q40,45 45,45';
      case 'proud': return 'M30,40 Q40,50 50,40';
      case 'sleepy': return 'M35,45 Q40,48 45,45';
      default: return 'M35,40 Q40,45 45,40';
    }
  };

  return (
    <div className={`${sizeClasses[size]} animate-float`}>
      <svg viewBox="0 0 70 70" className="w-full h-full">
        {/* Body */}
        <ellipse cx="35" cy="40" rx="28" ry="25" fill="#8B4513" />
        
        {/* Belly */}
        <ellipse cx="35" cy="45" rx="18" ry="15" fill="#DEB887" />
        
        {/* Wings */}
        <ellipse cx="12" cy="40" rx="8" ry="12" fill="#A0522D" />
        <ellipse cx="58" cy="40" rx="8" ry="12" fill="#A0522D" />
        
        {/* Face area */}
        <ellipse cx="35" cy="30" rx="22" ry="18" fill="#DEB887" />
        
        {/* Eyes */}
        <circle cx="20" cy="25" r="8" fill="white" />
        <circle cx="50" cy="25" r="8" fill="white" />
        
        {/* Pupils */}
        <circle cx="20" cy="25" r="4" fill="#2C1810" />
        <circle cx="50" cy="25" r="4" fill="#2C1810" />
        
        {/* Eye highlights */}
        <circle cx="22" cy="23" r="2" fill="white" />
        <circle cx="52" cy="23" r="2" fill="white" />
        
        {/* Beak */}
        <polygon points="35,32 30,40 40,40" fill="#FFA500" />
        
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
      
      {message && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow-lg whitespace-nowrap">
          <p className="text-sm font-bold text-gray-700">{message}</p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
        </div>
      )}
    </div>
  );
}
