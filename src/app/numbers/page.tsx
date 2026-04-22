'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Mascot from '@/components/Mascot';
import Confetti, { triggerConfetti } from '@/components/Confetti';
import { loadProgress, saveProgress, addStars, checkBadges } from '@/lib/storage';
import { ArrowLeft, Plus, Star, Volume2 } from 'lucide-react';

const numberEmojis = ['🍎', '🍌', '🎈', '⭐', '🦋', '🌸', '🐠', '🍪', '🚗', '🐸'];

export default function NumbersQuest() {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [maxReached, setMaxReached] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showAddition, setShowAddition] = useState(false);
  const [additionProblem, setAdditionProblem] = useState({ a: 1, b: 1 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    const progress = loadProgress();
    setMaxReached(progress.numbersProgress.maxNumber);
    setCompleted(progress.numbersProgress.completed);
  }, []);

  const isCompleted = completed.includes(currentNumber);

  const handleNumberComplete = () => {
    if (!isCompleted) {
      const newCompleted = [...completed, currentNumber];
      setCompleted(newCompleted);
      
      const newMax = Math.max(maxReached, currentNumber);
      
      const progress = loadProgress();
      saveProgress({
        numbersProgress: {
          completed: newCompleted,
          maxNumber: newMax,
        },
      });
      
      addStars(3);
      triggerConfetti();
      setShowCelebration(true);
      checkBadges();
    }
  };

  const speakNumber = (num: number) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(num.toString());
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const generateAdditionProblem = () => {
    const max = Math.min(currentNumber, 5);
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * (max - a + 1)) + 1;
    setAdditionProblem({ a, b });
    setSelectedAnswer(null);
    setShowAddition(true);
  };

  const checkAdditionAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === additionProblem.a + additionProblem.b) {
      addStars(2);
      triggerConfetti();
      setTimeout(() => setShowAddition(false), 2000);
    }
  };

  const countObjects = () => {
    const objects = Array(currentNumber).fill(null).map((_, i) => ({
      emoji: numberEmojis[i % numberEmojis.length],
      id: i,
    }));
    
    return (
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {objects.map((obj, index) => (
          <div
            key={obj.id}
            className="text-4xl animate-float"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {obj.emoji}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen pb-24">
      <Confetti trigger={showCelebration} onFinished={() => setShowCelebration(false)} />
      
      {/* Header */}
      <div className="bg-kid-yellow text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">123 Counting Quest 🔢</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-700">Numbers Learned</span>
            <span className="font-bold text-kid-yellow">{completed.length}/20</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-kid-yellow transition-all duration-500"
              style={{ width: `${(completed.length / 20) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Number selector */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <p className="text-center font-bold text-gray-700 mb-3">Pick a number!</p>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  setCurrentNumber(num);
                  setSelectedAnswer(null);
                }}
                className={`p-3 rounded-xl font-bold text-lg transition-all ${
                  num === currentNumber
                    ? 'bg-kid-yellow text-white scale-110'
                    : completed.includes(num)
                    ? 'bg-kid-green text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Number Card */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-kid-yellow">
          <div className="flex flex-col items-center">
            {/* Big Number */}
            <div className="text-8xl font-bold text-kid-yellow mb-2 animate-float">
              {currentNumber}
            </div>

            {/* Number word */}
            <p className="text-xl text-gray-600 mb-4">
              {['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
                'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'][currentNumber]}
            </p>

            {/* Count objects */}
            {countObjects()}

            {/* Audio Button */}
            <button
              onClick={() => speakNumber(currentNumber)}
              className="btn-kid-blue flex items-center gap-2 mb-4"
            >
              <Volume2 className="w-6 h-6" />
              Hear It! 🔊
            </button>

            {/* Addition for bigger numbers */}
            {currentNumber >= 2 && (
              <button
                onClick={generateAdditionProblem}
                className="btn-kid-purple flex items-center gap-2 mb-4"
              >
                <Plus className="w-6 h-6" />
                Practice Adding!
              </button>
            )}

            {/* Complete Button */}
            {!isCompleted ? (
              <button
                onClick={handleNumberComplete}
                className="btn-kid-green flex items-center gap-2"
              >
                <Star className="w-6 h-6" />
                I Know This! ⭐
              </button>
            ) : (
              <div className="btn-kid-green flex items-center gap-2 opacity-50 cursor-not-allowed">
                <Star className="w-6 h-6" />
                Completed! ✓
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mascot */}
      <div className="flex justify-center mt-6">
        <Mascot 
          emotion={isCompleted ? 'proud' : 'happy'} 
          message={isCompleted ? 'Awesome!' : 'Let\'s count!'}
          size="medium"
        />
      </div>

      {/* Addition Modal */}
      {showAddition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-center mb-4">Let's Add! ➕</h3>
            
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl mb-2">{additionProblem.a}</div>
                <div className="flex gap-1">
                  {Array(additionProblem.a).fill('🍎').map((e, i) => (
                    <span key={i} className="text-2xl">{e}</span>
                  ))}
                </div>
              </div>
              
              <Plus className="w-8 h-8 text-kid-purple" />
              
              <div className="text-center">
                <div className="text-4xl mb-2">{additionProblem.b}</div>
                <div className="flex gap-1">
                  {Array(additionProblem.b).fill('🍎').map((e, i) => (
                    <span key={i} className="text-2xl">{e}</span>
                  ))}
                </div>
              </div>
              
              <span className="text-4xl">=</span>
              
              <div className="text-4xl font-bold text-kid-yellow">?</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[additionProblem.a + additionProblem.b - 1, additionProblem.a + additionProblem.b, additionProblem.a + additionProblem.b + 1]
                .sort(() => Math.random() - 0.5)
                .map((answer) => (
                  <button
                    key={answer}
                    onClick={() => checkAdditionAnswer(answer)}
                    className={`p-4 rounded-2xl text-2xl font-bold transition-all ${
                      selectedAnswer === answer
                        ? answer === additionProblem.a + additionProblem.b
                          ? 'bg-kid-green text-white'
                          : 'bg-kid-red text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-kid-yellow/30'
                    }`}
                  >
                    {answer}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
