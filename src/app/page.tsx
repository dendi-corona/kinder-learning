'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Mascot from '@/components/Mascot';
import { loadProgress } from '@/lib/storage';
import { BookOpen, Star, Triangle, Book, Palette, Trophy } from 'lucide-react';

export default function Home() {
  const [stars, setStars] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const progress = loadProgress();
    setStars(progress.stars);
    setBadges(progress.badges);
  }, []);

  const modules = [
    {
      href: '/abc',
      title: 'ABC Adventure',
      description: 'Learn letters A-Z!',
      icon: BookOpen,
      color: 'bg-kid-green',
      emoji: '🅰️',
    },
    {
      href: '/numbers',
      title: '123 Counting',
      description: 'Count to 20!',
      icon: Star,
      color: 'bg-kid-yellow',
      emoji: '🔢',
    },
    {
      href: '/shapes',
      title: 'Shapes & Colors',
      description: 'Learn shapes!',
      icon: Triangle,
      color: 'bg-kid-orange',
      emoji: '🔺',
    },
    {
      href: '/stories',
      title: 'Mini Stories',
      description: 'Read & learn!',
      icon: Book,
      color: 'bg-kid-purple',
      emoji: '📖',
    },
    {
      href: '/drawing',
      title: 'Drawing',
      description: 'Create art!',
      icon: Palette,
      color: 'bg-kid-pink',
      emoji: '🎨',
    },
    {
      href: '/parent',
      title: 'Parents',
      description: 'Progress & settings',
      icon: Trophy,
      color: 'bg-gray-500',
      emoji: '👨‍👩‍👧',
    },
  ];

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-kid-blue text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Kinder Quest! 🌟</h1>
            <p className="text-lg opacity-90">Let's learn and play!</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-2xl font-bold">{stars}</span>
            </div>
          </div>
        </div>
        
        {/* Badges preview */}
        {badges.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {badges.slice(0, 5).map((badge, index) => (
              <div key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                🏆 {badge}
              </div>
            ))}
            {badges.length > 5 && (
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                +{badges.length - 5} more
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mascot greeting */}
      <div className="flex justify-center -mt-8 mb-6">
        <Mascot emotion="happy" size="large" />
      </div>

      {/* Learning modules */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Choose Your Adventure! 🎮
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className={`${module.color} text-white p-6 rounded-3xl shadow-lg 
                transform transition-all duration-200 hover:scale-105 active:scale-95
                flex flex-col items-center justify-center min-h-[180px]`}
            >
              <div className="text-5xl mb-3">{module.emoji}</div>
              <h3 className="text-xl font-bold text-center mb-1">{module.title}</h3>
              <p className="text-sm opacity-90 text-center">{module.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Daily encouragement */}
      <div className="px-4 mt-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-kid-yellow">
          <div className="flex items-center gap-4">
            <Mascot emotion="excited" size="small" />
            <div>
              <p className="font-bold text-gray-700">You're doing amazing! 🌟</p>
              <p className="text-sm text-gray-600">Keep learning and have fun!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
