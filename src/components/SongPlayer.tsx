'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Repeat, Heart, Volume2 } from 'lucide-react';
import { Song } from '@/data/songs';
import { loadProgress, saveProgress } from '@/lib/storage';
import AudioNarrator from './AudioNarrator';

interface SongPlayerProps {
  song: Song;
  onClose: () => void;
}

export default function SongPlayer({ song, onClose }: SongPlayerProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showActions, setShowActions] = useState(true);

  useEffect(() => {
    // Load favorites
    const progress = loadProgress();
    const favorites = (progress as any).favoriteSongs || [];
    setIsFavorite(favorites.includes(song.id));
  }, [song.id]);

  const handleNextLine = () => {
    if (currentLine < song.lyrics.length - 1) {
      setCurrentLine(currentLine + 1);
    } else {
      if (isRepeat) {
        setCurrentLine(0);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const toggleFavorite = () => {
    const progress = loadProgress();
    const favorites = (progress as any).favoriteSongs || [];
    
    if (isFavorite) {
      saveProgress({
        favoriteSongs: favorites.filter((id: string) => id !== song.id),
      } as any);
    } else {
      saveProgress({
        favoriteSongs: [...favorites, song.id],
      } as any);
    }
    setIsFavorite(!isFavorite);
  };

  const getLyricsText = () => {
    return song.lyrics[currentLine];
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className={`${song.color} text-white p-4 rounded-b-3xl shadow-lg`}>
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="p-2 bg-white/20 rounded-full">
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-xl font-bold">{song.title}</h1>
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${isFavorite ? 'bg-white text-red-500' : 'bg-white/20'}`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Illustration */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-6 mb-4 aspect-square flex items-center justify-center">
          <div className="text-9xl">{song.emoji}</div>
        </div>

        {/* Lyrics display */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-kid-blue mb-4">
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-gray-700 leading-relaxed">
              {song.lyrics[currentLine]}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-4">
            {song.lyrics.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentLine
                    ? 'bg-kid-blue w-6'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Audio narrator */}
          <div className="flex justify-center mb-4">
            <AudioNarrator
              text={song.lyrics[currentLine]}
              autoPlay={isPlaying}
              onFinished={handleNextLine}
              rate={0.6}
              pitch={1.2}
            />
          </div>

          {/* Action hint */}
          {showActions && (
            <div className="bg-kid-yellow/20 rounded-2xl p-4 mb-4">
              <p className="text-lg font-bold text-gray-700 text-center">
                🎵 {song.actions[currentLine]}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-kid-blue flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
                isRepeat ? 'bg-kid-green text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Repeat className="w-6 h-6" />
              Repeat
            </button>

            <button
              onClick={() => setShowActions(!showActions)}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold bg-gray-200 text-gray-700"
            >
              {showActions ? 'Hide' : 'Show'} Actions
            </button>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setCurrentLine(Math.max(0, currentLine - 1))}
              disabled={currentLine === 0}
              className="flex-1 btn-kid-purple disabled:opacity-50"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextLine}
              className="flex-1 btn-kid-blue"
            >
              Next →
            </button>
          </div>
        </div>

        {/* All lyrics reference */}
        <details className="bg-gray-50 rounded-2xl p-4">
          <summary className="font-bold text-gray-700 cursor-pointer">
            📝 View All Lyrics
          </summary>
          <div className="mt-4 space-y-2">
            {song.lyrics.map((line, index) => (
              <button
                key={index}
                onClick={() => setCurrentLine(index)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  index === currentLine
                    ? 'bg-kid-blue text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {line}
              </button>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
