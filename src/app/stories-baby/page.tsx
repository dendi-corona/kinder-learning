'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, BookOpen, Star } from 'lucide-react';
import { babyStories, BabyStory } from '@/data/baby-stories';
import StoryReader from '@/components/StoryReader';
import { loadProgress } from '@/lib/storage';

export default function BabyStoriesPage() {
  const [selectedStory, setSelectedStory] = useState<BabyStory | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [storiesRead, setStoriesRead] = useState(0);

  useEffect(() => {
    const progress = loadProgress();
    const favorites = (progress as any).favoriteStories || [];
    setFavoriteIds(favorites);
    setStoriesRead(progress.storiesRead || 0);
  }, []);

  const filteredStories = showFavorites
    ? babyStories.filter(story => favoriteIds.includes(story.id))
    : babyStories;

  if (selectedStory) {
    return <StoryReader story={selectedStory} onClose={() => setSelectedStory(null)} />;
  }

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-kid-purple text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Baby Stories 📚</h1>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`p-2 rounded-full ${showFavorites ? 'bg-white text-red-500' : 'bg-white/20'}`}
          >
            <Heart className={`w-6 h-6 ${showFavorites ? 'fill-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Stories Read</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-kid-purple">{storiesRead}</span>
              <Star className="w-5 h-5 text-kid-purple fill-kid-purple" />
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-kid-purple transition-all duration-500"
              style={{ width: `${Math.min((storiesRead / 10) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Read 10 stories to earn Super Reader badge! 🏆</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="px-4">
        <div className="bg-kid-blue/20 rounded-2xl p-4 border-4 border-kid-blue">
          <div className="flex items-center gap-4">
            <span className="text-4xl">👶</span>
            <div>
              <p className="font-bold text-gray-700">Perfect for Ages 2+!</p>
              <p className="text-sm text-gray-600">Simple stories with big pictures & read-aloud!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories list */}
      <div className="px-4 mt-4">
        {showFavorites && (
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            ❤️ Favorite Stories ({filteredStories.length})
          </h2>
        )}

        {filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl">💔</span>
            <p className="text-gray-600 mt-4 font-bold">
              {showFavorites 
                ? 'No favorites yet! Tap the heart on stories you love!' 
                : 'No stories found!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredStories.map((story) => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`${story.color} text-white p-6 rounded-3xl shadow-lg 
                  transform transition-all hover:scale-105 active:scale-95
                  flex items-center gap-4`}
              >
                <span className="text-5xl">{story.emoji}</span>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold">{story.title}</h3>
                  <p className="text-sm opacity-90">
                    {story.pages.length} pages • Ages {story.ageRange}
                  </p>
                </div>
                {favoriteIds.includes(story.id) && (
                  <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                )}
                <BookOpen className="w-6 h-6 opacity-75" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Features section */}
      <div className="px-4 mt-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-kid-yellow">
          <h3 className="font-bold text-gray-700 mb-3 text-lg">✨ Features</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span>🔊</span>
              <span className="text-gray-600">Read Aloud</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎨</span>
              <span className="text-gray-600">Big Pictures</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔁</span>
              <span className="text-gray-600">Repeat</span>
            </div>
            <div className="flex items-center gap-2">
              <span>❤️</span>
              <span className="text-gray-600">Favorites</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📱</span>
              <span className="text-gray-600">Touch-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span className="text-gray-600">Simple Quiz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tips for parents */}
      <div className="px-4 mt-6 mb-8">
        <div className="bg-kid-green/10 rounded-3xl p-6 border-4 border-kid-green">
          <h3 className="font-bold text-gray-700 mb-3 text-lg">💡 Tips for Parents</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📖 Read together and point to the pictures!</li>
            <li>🔊 Use the read-aloud feature for independent listening</li>
            <li>❤️ Heart button saves favorite stories</li>
            <li>🎯 Simple quizzes help with comprehension</li>
            <li>🔁 Toddlers love hearing the same story again and again!</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
