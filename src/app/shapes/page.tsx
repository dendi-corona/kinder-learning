'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Mascot from '@/components/Mascot';
import Confetti, { triggerConfetti } from '@/components/Confetti';
import { loadProgress, saveProgress, addStars, checkBadges } from '@/lib/storage';
import { ArrowLeft, Check, Volume2, RefreshCw } from 'lucide-react';

const shapes = [
  { id: 'circle', name: 'Circle', color: '#FF6B6B', realWorld: ['🌞', '🍕', '⚽'] },
  { id: 'square', name: 'Square', color: '#4ECDC4', realWorld: ['📦', '🖼️', '🧊'] },
  { id: 'triangle', name: 'Triangle', color: '#FFE66D', realWorld: ['🎂', '⛰️', '🚩'] },
  { id: 'rectangle', name: 'Rectangle', color: '#95E1D3', realWorld: ['📱', '🚪', '📖'] },
  { id: 'star', name: 'Star', color: '#F38181', realWorld: ['⭐', '🌟', '✨'] },
  { id: 'heart', name: 'Heart', color: '#FF69B4', realWorld: ['❤️', '💝', '💕'] },
];

const colors = [
  { id: 'red', name: 'Red', hex: '#FF6B6B', emoji: '🔴' },
  { id: 'blue', name: 'Blue', hex: '#4FC3F7', emoji: '🔵' },
  { id: 'green', name: 'Green', hex: '#81C784', emoji: '🟢' },
  { id: 'yellow', name: 'Yellow', hex: '#FFF176', emoji: '🟡' },
  { id: 'orange', name: 'Orange', hex: '#FFB74D', emoji: '🟠' },
  { id: 'purple', name: 'Purple', hex: '#BA68C8', emoji: '🟣' },
  { id: 'pink', name: 'Pink', hex: '#F48FB1', emoji: '🩷' },
];

export default function ShapesAndColors() {
  const [mode, setMode] = useState<'shapes' | 'colors'>('shapes');
  const [selectedShape, setSelectedShape] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [learnedShapes, setLearnedShapes] = useState<string[]>([]);
  const [learnedColors, setLearnedColors] = useState<string[]>([]);
  const [showGame, setShowGame] = useState(false);
  const [gameType, setGameType] = useState<'match' | 'sort'>('match');
  const [gameScore, setGameScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const progress = loadProgress();
    setLearnedShapes(progress.shapesProgress.learned);
    setLearnedColors(progress.colorsProgress.learned);
  }, []);

  const handleShapeComplete = (shapeId: string) => {
    if (!learnedShapes.includes(shapeId)) {
      const newLearned = [...learnedShapes, shapeId];
      setLearnedShapes(newLearned);
      
      const progress = loadProgress();
      saveProgress({
        shapesProgress: { learned: newLearned },
      });
      
      addStars(3);
      triggerConfetti();
      setShowCelebration(true);
      checkBadges();
    }
  };

  const handleColorComplete = (colorId: string) => {
    if (!learnedColors.includes(colorId)) {
      const newLearned = [...learnedColors, colorId];
      setLearnedColors(newLearned);
      
      const progress = loadProgress();
      saveProgress({
        colorsProgress: { learned: newLearned },
      });
      
      addStars(3);
      triggerConfetti();
      setShowCelebration(true);
      checkBadges();
    }
  };

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const renderShape = (shape: typeof shapes[0], size: number = 100) => {
    switch (shape.id) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{ width: size, height: size, backgroundColor: shape.color }}
          />
        );
      case 'square':
        return (
          <div
            className="rounded-xl"
            style={{ width: size, height: size, backgroundColor: shape.color }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${shape.color}`,
            }}
          />
        );
      case 'rectangle':
        return (
          <div
            className="rounded-xl"
            style={{ width: size * 1.5, height: size, backgroundColor: shape.color }}
          />
        );
      case 'star':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <polygon
              points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
              fill={shape.color}
            />
          </svg>
        );
      case 'heart':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={shape.color}
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const startMatchingGame = () => {
    setGameType('match');
    setGameScore(0);
    setShowGame(true);
  };

  const startSortingGame = () => {
    setGameType('sort');
    setGameScore(0);
    setShowGame(true);
  };

  return (
    <main className="min-h-screen pb-24">
      <Confetti trigger={showCelebration} onFinished={() => setShowCelebration(false)} />
      
      {/* Header */}
      <div className="bg-kid-orange text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Shapes & Colors 🔺🔴</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Mode selector */}
      <div className="px-4 py-4 flex gap-4">
        <button
          onClick={() => setMode('shapes')}
          className={`flex-1 py-4 rounded-2xl font-bold text-xl transition-all ${
            mode === 'shapes'
              ? 'bg-kid-orange text-white shadow-lg scale-105'
              : 'bg-white text-gray-700'
          }`}
        >
          🔺 Shapes
        </button>
        <button
          onClick={() => setMode('colors')}
          className={`flex-1 py-4 rounded-2xl font-bold text-xl transition-all ${
            mode === 'colors'
              ? 'bg-kid-red text-white shadow-lg scale-105'
              : 'bg-white text-gray-700'
          }`}
        >
          🎨 Colors
        </button>
      </div>

      {mode === 'shapes' ? (
        <>
          {/* Progress */}
          <div className="px-4 mb-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">Shapes Learned</span>
                <span className="font-bold text-kid-orange">{learnedShapes.length}/{shapes.length}</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-kid-orange transition-all duration-500"
                  style={{ width: `${(learnedShapes.length / shapes.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Shape display */}
          <div className="px-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-kid-orange">
              <div className="flex flex-col items-center">
                {/* Shape */}
                <div className="mb-6 animate-float">
                  {renderShape(shapes[selectedShape], 150)}
                </div>

                {/* Name */}
                <h2 className="text-3xl font-bold text-gray-700 mb-2">
                  {shapes[selectedShape].name}
                </h2>

                {/* Audio */}
                <button
                  onClick={() => speakWord(shapes[selectedShape].name)}
                  className="btn-kid-blue flex items-center gap-2 mb-4"
                >
                  <Volume2 className="w-6 h-6" />
                  Hear It! 🔊
                </button>

                {/* Real world examples */}
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Find this shape in:</p>
                  <div className="flex gap-3 text-4xl">
                    {shapes[selectedShape].realWorld.map((emoji, i) => (
                      <span key={i}>{emoji}</span>
                    ))}
                  </div>
                </div>

                {/* Complete button */}
                {!learnedShapes.includes(shapes[selectedShape].id) ? (
                  <button
                    onClick={() => handleShapeComplete(shapes[selectedShape].id)}
                    className="btn-kid-green flex items-center gap-2"
                  >
                    <Check className="w-6 h-6" />
                    I Learned It! ⭐
                  </button>
                ) : (
                  <div className="btn-kid-green flex items-center gap-2 opacity-50">
                    <Check className="w-6 h-6" />
                    Completed! ✓
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shape selector */}
          <div className="px-4 mt-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              {shapes.map((shape, index) => (
                <button
                  key={shape.id}
                  onClick={() => setSelectedShape(index)}
                  className={`flex-shrink-0 p-4 rounded-2xl transition-all ${
                    selectedShape === index
                      ? 'bg-kid-orange scale-110'
                      : 'bg-white'
                  }`}
                >
                  {renderShape(shape, 50)}
                </button>
              ))}
            </div>
          </div>

          {/* Games */}
          <div className="px-4 mt-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
              Play Games! 🎮
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={startMatchingGame}
                className="btn-kid-purple"
              >
                🔍 Match Shapes
              </button>
              <button
                onClick={startSortingGame}
                className="btn-kid-pink"
              >
                🗂️ Sort Colors
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Colors Progress */}
          <div className="px-4 mb-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">Colors Learned</span>
                <span className="font-bold text-kid-red">{learnedColors.length}/{colors.length}</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-kid-red transition-all duration-500"
                  style={{ width: `${(learnedColors.length / colors.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Color display */}
          <div className="px-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-kid-red">
              <div className="flex flex-col items-center">
                {/* Big color circle */}
                <div
                  className="w-40 h-40 rounded-full mb-6 animate-float shadow-lg"
                  style={{ backgroundColor: colors[selectedColor].hex }}
                />

                {/* Name */}
                <h2 className="text-3xl font-bold text-gray-700 mb-2">
                  {colors[selectedColor].name}
                </h2>

                {/* Emoji */}
                <p className="text-5xl mb-4">{colors[selectedColor].emoji}</p>

                {/* Audio */}
                <button
                  onClick={() => speakWord(colors[selectedColor].name)}
                  className="btn-kid-blue flex items-center gap-2 mb-4"
                >
                  <Volume2 className="w-6 h-6" />
                  Hear It! 🔊
                </button>

                {/* Complete button */}
                {!learnedColors.includes(colors[selectedColor].id) ? (
                  <button
                    onClick={() => handleColorComplete(colors[selectedColor].id)}
                    className="btn-kid-green flex items-center gap-2"
                  >
                    <Check className="w-6 h-6" />
                    I Learned It! ⭐
                  </button>
                ) : (
                  <div className="btn-kid-green flex items-center gap-2 opacity-50">
                    <Check className="w-6 h-6" />
                    Completed! ✓
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Color selector */}
          <div className="px-4 mt-4">
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color, index) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(index)}
                  className={`p-4 rounded-2xl transition-all ${
                    selectedColor === index ? 'scale-110 shadow-lg' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="text-2xl">{color.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Mascot */}
      <div className="flex justify-center mt-6">
        <Mascot emotion="happy" size="medium" />
      </div>

      {/* Game Modal */}
      {showGame && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {gameType === 'match' ? 'Match the Shapes!' : 'Sort the Colors!'}
              </h3>
              <button
                onClick={() => setShowGame(false)}
                className="p-2 bg-gray-200 rounded-full"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-gray-600">Score: <span className="font-bold text-kid-green">{gameScore}</span> ⭐</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {(gameType === 'match' ? shapes : colors).slice(0, 4).map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setGameScore(gameScore + 1);
                    if (gameScore >= 4) {
                      addStars(5);
                      triggerConfetti();
                      setTimeout(() => setShowGame(false), 2000);
                    }
                  }}
                  className="p-4 rounded-2xl bg-gray-100 hover:bg-kid-yellow/30 transition-all"
                >
                  {gameType === 'match' ? (
                    renderShape(item as typeof shapes[0], 60)
                  ) : (
                    <div
                      className="w-16 h-16 rounded-full mx-auto"
                      style={{ backgroundColor: (item as typeof colors[0]).hex }}
                    />
                  )}
                </button>
              ))}
            </div>

            <p className="text-center text-gray-600">
              {gameType === 'match' ? 'Tap matching pairs!' : 'Tap the colors!'}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
