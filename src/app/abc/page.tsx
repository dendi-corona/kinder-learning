'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Mascot from '@/components/Mascot';
import Confetti, { triggerConfetti } from '@/components/Confetti';
import { loadProgress, saveProgress, addStars, markActivityComplete, checkBadges } from '@/lib/storage';
import { ArrowLeft, ArrowRight, Volume2, Check } from 'lucide-react';

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

  useEffect(() => {
    const progress = loadProgress();
    setCompleted(progress.abcProgress.completed);
  }, []);

  const currentLetter = alphabet[currentIndex];
  const isCompleted = completed.includes(currentLetter);

  const handleNext = () => {
    if (currentIndex < alphabet.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
    }
  };

  return (
    <main className="min-h-screen pb-24">
      <Confetti trigger={showCelebration} onFinished={() => setShowCelebration(false)} />
      
      {/* Header */}
      <div className="bg-kid-green text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">ABC Adventure 🅰️</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-700">Letters Learned</span>
            <span className="font-bold text-kid-green">{completed.length}/26</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-kid-green transition-all duration-500"
              style={{ width: `${(completed.length / 26) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Letter Card */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-kid-green">
          <div className="flex flex-col items-center">
            {/* Big Letter */}
            <div className="text-9xl font-bold text-kid-green mb-4 animate-float">
              {currentLetter}
              {currentLetter.toLowerCase()}
            </div>

            {/* Word and Emoji */}
            <div className="text-center mb-6">
              <p className="text-2xl font-bold text-gray-700">
                {currentLetter} is for {letterWords[currentLetter].word}
              </p>
              <p className="text-6xl mt-2">{letterWords[currentLetter].emoji}</p>
            </div>

            {/* Sound */}
            <div className="bg-kid-yellow/30 px-6 py-3 rounded-2xl mb-6">
              <p className="text-lg text-gray-700">
                The sound is: <span className="font-bold text-kid-green">"{letterSounds[currentLetter]}"</span>
              </p>
            </div>

            {/* Audio Button */}
            <button
              onClick={speakLetter}
              className="btn-kid-blue flex items-center gap-2 mb-4"
            >
              <Volume2 className="w-6 h-6" />
              Hear It! 🔊
            </button>

            {/* Tracing Button */}
            <button
              onClick={() => setShowTracing(true)}
              className="btn-kid-purple mb-4"
            >
              ✏️ Trace the Letter
            </button>

            {/* Complete Button */}
            {!isCompleted ? (
              <button
                onClick={handleComplete}
                className="btn-kid-green flex items-center gap-2"
              >
                <Check className="w-6 h-6" />
                I Learned It! ⭐
              </button>
            ) : (
              <div className="btn-kid-green flex items-center gap-2 opacity-50 cursor-not-allowed">
                <Check className="w-6 h-6" />
                Completed! ✓
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 mt-6 flex justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`btn-kid-blue flex-1 flex items-center justify-center gap-2 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === alphabet.length - 1}
          className={`btn-kid-blue flex-1 flex items-center justify-center gap-2 ${
            currentIndex === alphabet.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mascot */}
      <div className="flex justify-center mt-6">
        <Mascot 
          emotion={isCompleted ? 'proud' : 'happy'} 
          message={isCompleted ? 'Great job!' : 'You can do it!'}
          size="medium"
        />
      </div>

      {/* Tracing Modal */}
      {showTracing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-center mb-4">Trace the Letter {currentLetter}!</h3>
            <div className="bg-gray-100 rounded-2xl p-8 mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-64">
                {/* Dotted letter for tracing */}
                <text
                  x="100"
                  y="150"
                  fontSize="120"
                  fontFamily="Comic Sans MS"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="2"
                  strokeDasharray="10,10"
                  textAnchor="middle"
                >
                  {currentLetter.toUpperCase()}
                </text>
                <text
                  x="100"
                  y="150"
                  fontSize="120"
                  fontFamily="Comic Sans MS"
                  fill="#4FC3F7"
                  opacity="0.3"
                  textAnchor="middle"
                >
                  {currentLetter.toUpperCase()}
                </text>
              </svg>
            </div>
            <p className="text-center text-gray-600 mb-4">
              Use your finger to trace over the dotted letters!
            </p>
            <button
              onClick={() => setShowTracing(false)}
              className="btn-kid-blue w-full"
            >
              Done! ✓
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
