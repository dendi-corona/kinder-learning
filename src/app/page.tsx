'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Mascot from '@/components/Mascot';
import { loadProgress } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageWrapper, StaggerContainer } from '@/components/PageTransition';
import { BookOpen, Star, Triangle, Book, Palette, Trophy, Sparkles } from 'lucide-react';

export default function Home() {
  const [stars, setStars] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      gradient: 'from-green-400 to-emerald-500',
      emoji: '🅰️',
    },
    {
      href: '/numbers',
      title: '123 Counting',
      description: 'Count to 20!',
      icon: Star,
      gradient: 'from-yellow-400 to-orange-500',
      emoji: '🔢',
    },
    {
      href: '/shapes',
      title: 'Shapes & Colors',
      description: 'Learn shapes!',
      icon: Triangle,
      gradient: 'from-orange-400 to-red-500',
      emoji: '🔺',
    },
    {
      href: '/stories',
      title: 'Mini Stories',
      description: 'Read & learn!',
      icon: Book,
      gradient: 'from-purple-400 to-pink-500',
      emoji: '📖',
    },
    {
      href: '/drawing',
      title: 'Drawing',
      description: 'Create art!',
      icon: Palette,
      gradient: 'from-pink-400 to-rose-500',
      emoji: '🎨',
    },
    {
      href: '/parent',
      title: 'Parents',
      description: 'Progress & settings',
      icon: Trophy,
      gradient: 'from-gray-500 to-gray-700',
      emoji: '👨‍👩‍👧',
    },
  ];

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-700">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <PageWrapper>
      <main className="min-h-screen pb-24 bg-gradient-warm">
        {/* Modern Header with Glassmorphism */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
          
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 pb-12 rounded-b-[3rem] shadow-2xl">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <motion.h1 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-extrabold mb-2 flex items-center gap-3"
                  >
                    Kinder Quest! <Sparkles className="w-8 h-8" />
                  </motion.h1>
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl opacity-90"
                  >
                    Let's learn and have fun! 🎉
                  </motion.p>
                </div>
                
                {/* Stars counter with animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  className="glass px-6 py-3 rounded-2xl"
                >
                  <div className="flex items-center gap-2">
                    <motion.span 
                      className="text-3xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐
                    </motion.span>
                    <span className="text-3xl font-extrabold">{stars}</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Badges preview */}
              {badges.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-2 overflow-x-auto no-scrollbar pb-2"
                >
                  {badges.slice(0, 5).map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="glass px-4 py-2 rounded-full text-sm whitespace-nowrap font-bold"
                    >
                      🏆 {badge}
                    </motion.div>
                  ))}
                  {badges.length > 5 && (
                    <div className="glass px-4 py-2 rounded-full text-sm whitespace-nowrap font-bold">
                      +{badges.length - 5} more
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Mascot greeting with floating animation */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center -mt-12 mb-8 relative z-10"
        >
          <div className="relative">
            <Mascot emotion="happy" size="large" />
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black/10 rounded-full blur-md"
              animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.2, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Learning modules grid */}
        <div className="px-4 max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-extrabold text-gray-800 mb-6 text-center"
          >
            Choose Your Adventure! 🎮
          </motion.h2>
          
          <StaggerContainer staggerDelay={0.1} delay={0.5}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {modules.map((module) => (
                <Link key={module.href} href={module.href} className="block">
                  <Card
                    variant="gradient"
                    interactive
                    className={`bg-gradient-to-br ${module.gradient} h-full min-h-[200px] flex flex-col items-center justify-center text-center p-6 border-0`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="text-6xl md:text-7xl mb-4"
                    >
                      {module.emoji}
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-extrabold mb-2">
                      {module.title}
                    </h3>
                    <p className="text-sm md:text-base opacity-90 font-semibold">
                      {module.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Daily encouragement card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="px-4 mt-12 max-w-2xl mx-auto"
        >
          <Card variant="glass" className="border-2 border-yellow-300">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mascot emotion="excited" size="small" />
              </motion.div>
              <div>
                <p className="font-extrabold text-xl text-gray-800">
                  You're doing amazing! 🌟
                </p>
                <p className="text-gray-600 font-semibold">
                  Keep learning and have fun every day!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Progress overview */}
        {badges.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-4 mt-8 max-w-2xl mx-auto"
          >
            <Card>
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-kid-purple" />
                Your Progress
              </h3>
              <ProgressBar 
                value={Math.min((badges.length / 6) * 100, 100)} 
                showLabel 
                label="Badges Earned"
              />
            </Card>
          </motion.div>
        )}
      </main>
    </PageWrapper>
  );
}
