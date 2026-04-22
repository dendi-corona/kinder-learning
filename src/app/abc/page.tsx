'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '@/components/Mascot';
import Confetti, { triggerConfetti } from '@/components/Confetti';
import { loadProgress, saveProgress, addStars, checkBadges } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageTransition } from '@/components/PageTransition';
import AnimatedButton from '@/components/AnimatedButton';
import { ArrowLeft, ArrowRight, Volume2, Check, Sparkles } from 'lucide-react';
import { cn, soundEffects, hapticFeedback } from '@/lib/utils';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const letterWords: Record<string, { word: string; emoji: string }> = {
  A: { word: 'Apple', emoji: '🍎' },
  B: { word: 'Ball', emoji: '⚽' },
  C: { word: 'Cat', emoji: '🐱' },
  D: { word: 'Dog', emoji: '🐶' },
  E: { word: 'Elephant', emoji: '🐘' },
  F: { word: 'Fish', emoji: '🐟' },
  G: { word: 'Grapes', emoji: '🍇' },
  H: { word: 'House', emoji: '🏠' },
  I: { word: 'Ice Cream', emoji: '🍦' },
  J: { word: 'Juice', emoji: '🧃' },
  K: { word: 'Kite', emoji: '🪁' },
  L: { word: 'Lion', emoji: '🦁' },
  M: { word: 'Moon', emoji: '🌙' },
  N: { word: 'Nest', emoji: '🪺' },
  O: { word: 'Orange', emoji: '🍊' },
  P: { word: 'Penguin', emoji: '🐧' },
  Q: { word: 'Queen', emoji: '👸' },
  R: { word: 'Rainbow', emoji: '🌈' },
  S: { word: 'Sun', emoji: '☀️' },
  T: { word: 'Tree', emoji: '🌳' },
  U: { word: 'Umbrella', emoji: '☂️' },
  V: { word: 'Volcano', emoji: '🌋' },
  W: { word: 'Whale', emoji: '🐋' },
  X: { word: 'Xylophone', emoji: '🎹' },
  Y: { word: 'Yacht', emoji: '⛵' },
  Z: { word: 'Zebra', emoji: '🦓' },
};

const letterSounds: Record<string, string> = {
  A: 'ah', B: 'buh', C: 'kuh', D: 'duh', E: 'eh', F: 'fuh', G: 'guh',
  H: 'huh', I: 'ih', J: 'juh', K: 'kuh', L: 'luh', M: 'muh', N: 'nuh',
  O: 'ah', P: 'puh', Q: 'kwuh', R: 'ruh', S: 'sss', T: 'tuh', U: 'uh',
  V: 'vuh', W: 'wuh', X: 'ks', Y: 'yuh', Z: 'zuh',
};

export default function ABCAdventure() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [showTracing, setShowTracing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const progress = loadProgress();
    setCompleted(progress.abcProgress.completed);
  }, []);

  const currentLetter = alphabet[currentIndex];
  const isCompleted = completed.includes(currentLetter);

  const handleNext = () => {
    if (currentIndex < alphabet.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
      soundEffects.click();
      hapticFeedback(10);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex - 1), 200);
      soundEffects.click();
      hapticFeedback(10);
    }
  };

  const handleComplete = () => {
    if (!isCompleted) {
      const newCompleted = [...completed, currentLetter];
      setCompleted(newCompleted);
      
      const progress = loadProgress();
      saveProgress({
        abcProgress: {
          ...progress.abcProgress,
          completed: newCompleted,
          currentLetter: currentIndex < alphabet.length - 1 ? alphabet[currentIndex + 1] : currentLetter,
        },
      });
      
      addStars(5);
      triggerConfetti();
      setShowCelebration(true);
      checkBadges();
      soundEffects.celebrate();
      hapticFeedback([50, 50, 50]);
    }
  };

  const speakLetter = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${currentLetter}. ${currentLetter} is for ${letterWords[currentLetter].word}. The sound is ${letterSounds[currentLetter]}.`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
      soundEffects.click();
    }
  };

  const progressPercent = (completed.length / 26) * 100;

  return (
    <PageTransition>
      <main className="min-h-screen pb-24 bg-gradient-cool">
        <Confetti trigger={showCelebration} onFinished={() => setShowCelebration(false)} />
        
        {/* Modern Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 pb-8 rounded-b-[2.5rem] shadow-xl"
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="glass" size="sm" className="rounded-full w-12 h-12 p-0">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <motion.h1 
              className="text-2xl md:text-3xl font-extrabold flex items-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ABC Adventure 🅰️
            </motion.h1>
            <div className="w-12" />
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-4 py-6 -mt-4"
        >
          <Card variant="glass" className="backdrop-blur-md">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-500" />
                Letters Learned
              </span>
              <span className="font-extrabold text-green-600 text-lg">
                {completed.length}/26
              </span>
            </div>
            <ProgressBar value={progressPercent} className="h-5" />
          </Card>
        </motion.div>

        {/* Letter Card with 3D flip effect */}
        <div className="px-4">
          <Card variant="glass" className="border-4 border-green-300 overflow-hidden">
            <div className="flex flex-col items-center">
              {/* Animated Letter */}
              <motion.div
                key={currentLetter}
                initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="text-8xl md:text-9xl font-extrabold mb-4"
              >
                <span className="text-gradient-rainbow bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
                  {currentLetter}
                </span>
                <span className="text-6xl md:text-7xl text-gray-400 ml-4">
                  {currentLetter.toLowerCase()}
                </span>
              </motion.div>

              {/* Word and Emoji with animation */}
              <motion.div
                key={`${currentLetter}-word`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-6"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-gray-700 mb-3">
                  {currentLetter} is for{' '}
                  <span className="text-green-500">{letterWords[currentLetter].word}</span>
                </p>
                <motion.div
                  className="text-7xl md:text-8xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {letterWords[currentLetter].emoji}
                </motion.div>
              </motion.div>

              {/* Sound badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="bg-gradient-to-r from-yellow-300 to-orange-300 px-6 py-3 rounded-2xl mb-6 shadow-md"
              >
                <p className="text-lg text-gray-700 font-semibold">
                  The sound is:{' '}
                  <span className="font-extrabold text-green-600 text-xl">
                    "{letterSounds[currentLetter]}"
                  </span>
                </p>
              </motion.div>

              {/* Interactive Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full justify-center">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={speakLetter}
                  withParticles
                >
                  <Volume2 className="w-6 h-6" />
                  Hear It! 🔊
                </AnimatedButton>

                <AnimatedButton
                  variant="secondary"
                  size="lg"
                  onClick={() => setShowTracing(true)}
                >
                  <Sparkles className="w-6 h-6" />
                  ✏️ Trace It!
                </AnimatedButton>
              </div>

              {/* Complete Button */}
              <AnimatePresence mode="wait">
                {!isCompleted ? (
                  <motion.div
                    key="complete-btn"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <AnimatedButton
                      variant="success"
                      size="xl"
                      onClick={handleComplete}
                      withParticles
                      withHaptic
                    >
                      <Check className="w-8 h-8" />
                      I Learned It! ⭐
                    </AnimatedButton>
                  </motion.div>
                ) : (
                  <motion.div
                    key="completed-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="btn-success flex items-center gap-3 px-8 py-5 rounded-3xl opacity-70 cursor-not-allowed"
                  >
                    <Check className="w-8 h-8" />
                    <span className="text-xl font-bold">Completed! ✓</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-4 mt-6 flex justify-between gap-4"
        >
          <Button
            variant="glass"
            size="lg"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={cn(
              'flex-1',
              currentIndex === 0 && 'opacity-30 cursor-not-allowed'
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={handleNext}
            disabled={currentIndex === alphabet.length - 1}
            className={cn(
              'flex-1',
              currentIndex === alphabet.length - 1 && 'opacity-30 cursor-not-allowed'
            )}
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Mascot encouragement */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-8"
        >
          <Mascot 
            emotion={isCompleted ? 'proud' : 'happy'} 
            message={isCompleted ? 'Awesome job! 🎉' : 'You got this! 💪'}
            size="medium"
          />
        </motion.div>

        {/* Tracing Modal */}
        <AnimatePresence>
          {showTracing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowTracing(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-extrabold text-center mb-4 text-gradient-rainbow bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Trace the Letter {currentLetter}!
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-4 border-2 border-dashed border-gray-300">
                  <svg viewBox="0 0 200 200" className="w-full h-64">
                    <motion.text
                      x="100"
                      y="150"
                      fontSize="120"
                      fontFamily="Comic Sans MS"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="3"
                      strokeDasharray="10,10"
                      textAnchor="middle"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    >
                      {currentLetter.toUpperCase()}
                    </motion.text>
                    <text
                      x="100"
                      y="150"
                      fontSize="120"
                      fontFamily="Comic Sans MS"
                      fill="#60A5FA"
                      opacity="0.2"
                      textAnchor="middle"
                    >
                      {currentLetter.toUpperCase()}
                    </text>
                  </svg>
                </div>
                <p className="text-center text-gray-600 mb-4 font-semibold">
                  Use your finger to trace over the dotted letter! 👆
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowTracing(false)}
                  className="w-full"
                >
                  <Check className="w-6 h-6" />
                  Done! ✓
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}
