'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Music, Star } from 'lucide-react';
import { songs, Song } from '@/data/songs';
import SongPlayer from '@/components/SongPlayer';
import { loadProgress } from '@/lib/storage';

export default function SongsPage() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const progress = loadProgress();
    const favorites = (progress as any).favoriteSongs || [];
    setFavoriteIds(favorites);
  }, []);

  const filteredSongs = showFavorites
    ? songs.filter(song => favoriteIds.includes(song.id))
    : songs;

  if (selectedSong) {
    return <SongPlayer song={selectedSong} onClose={() => setSelectedSong(null)} />;
  }

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-kid-pink text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Sing-Along Songs 🎵</h1>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`p-2 rounded-full ${showFavorites ? 'bg-white text-red-500' : 'bg-white/20'}`}
          >
            <Heart className={`w-6 h-6 ${showFavorites ? 'fill-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="px-4 py-4">
        <div className="bg-kid-yellow/20 rounded-2xl p-4 border-4 border-kid-yellow">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎤</span>
            <div>
              <p className="font-bold text-gray-700">Sing & Move!</p>
              <p className="text-sm text-gray-600">Tap a song, sing along, and do the actions!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Songs list */}
      <div className="px-4">
        {showFavorites && (
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            ❤️ Your Favorite Songs ({filteredSongs.length})
          </h2>
        )}

        {filteredSongs.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl">💔</span>
            <p className="text-gray-600 mt-4 font-bold">
              {showFavorites 
                ? 'No favorites yet! Tap the heart on songs you love!' 
                : 'No songs found!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredSongs.map((song) => (
              <button
                key={song.id}
                onClick={() => setSelectedSong(song)}
                className={`${song.color} text-white p-6 rounded-3xl shadow-lg 
                  transform transition-all hover:scale-105 active:scale-95
                  flex items-center gap-4`}
              >
                <span className="text-5xl">{song.emoji}</span>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold">{song.title}</h3>
                  <p className="text-sm opacity-90">{song.lyrics.length} verses • Actions included!</p>
                </div>
                {favoriteIds.includes(song.id) && (
                  <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                )}
                <Music className="w-6 h-6 opacity-75" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tips section */}
      <div className="px-4 mt-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-kid-blue">
          <h3 className="font-bold text-gray-700 mb-3 text-lg">💡 Tips for Parents</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>🎵 Sing together and do the hand motions!</li>
            <li>🔁 Toddlers love repetition - play favorites again!</li>
            <li>💖 Heart button saves songs for quick access</li>
            <li>🎤 Encourage your child to sing along!</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
