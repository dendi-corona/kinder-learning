'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Star, BookOpen, Palette, Triangle, Settings, Trash2, Download } from 'lucide-react';
import { loadProgress, saveProgress, defaultProgress } from '@/lib/storage';

export default function ParentDashboard() {
  const [progress, setProgress] = useState<typeof defaultProgress | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);
  const [todayActivity, setTodayActivity] = useState<string[]>([]);

  useEffect(() => {
    const prog = loadProgress();
    setProgress(prog);
    
    // Load today's activity
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kinder-today-activity');
      if (saved) {
        setTodayActivity(JSON.parse(saved));
      }
    }
  }, []);

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kinder-quest-progress');
      localStorage.removeItem('kinder-drawings');
      localStorage.removeItem('kinder-today-activity');
      setProgress(loadProgress());
      setShowReset(false);
    }
  };

  const handleExport = () => {
    if (!progress) return;
    
    const data = {
      exportDate: new Date().toISOString(),
      progress: progress,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `kinder-quest-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.href = url;
    link.click();
  };

  const handleSaveSettings = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kinder-time-limit', timeLimit.toString());
      alert('Settings saved! ✓');
    }
  };

  if (!progress) return null;

  const badges = [
    { name: 'ABC Master', icon: '🅰️', earned: progress.badges.includes('ABC Master'), requirement: 'Learn all 26 letters' },
    { name: 'Number Ninja', icon: '🔢', earned: progress.badges.includes('Number Ninja'), requirement: 'Master counting 1-20' },
    { name: 'Shape Explorer', icon: '🔺', earned: progress.badges.includes('Shape Explorer'), requirement: 'Learn all shapes' },
    { name: 'Color Wizard', icon: '🎨', earned: progress.badges.includes('Color Wizard'), requirement: 'Know all colors' },
    { name: 'Super Reader', icon: '📖', earned: progress.badges.includes('Super Reader'), requirement: 'Read 10 stories' },
    { name: 'Artist', icon: '🖼️', earned: progress.badges.includes('Artist'), requirement: 'Create 5 drawings' },
  ];

  const activities = [
    { name: 'ABC Adventure', icon: BookOpen, completed: progress.abcProgress.completed.length, total: 26, color: 'text-kid-green' },
    { name: '123 Counting', icon: Star, completed: progress.numbersProgress.completed.length, total: 20, color: 'text-kid-yellow' },
    { name: 'Shapes', icon: Triangle, completed: progress.shapesProgress.learned.length, total: 6, color: 'text-kid-orange' },
    { name: 'Colors', icon: Palette, completed: progress.colorsProgress.learned.length, total: 7, color: 'text-kid-red' },
  ];

  return (
    <main className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Parent Dashboard 👨‍👩‍👧</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-6 h-6 text-kid-yellow fill-kid-yellow" />
              <span className="font-bold text-gray-700">Total Stars</span>
            </div>
            <p className="text-4xl font-bold text-kid-yellow">{progress.stars}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-kid-purple" />
              <span className="font-bold text-gray-700">Badges</span>
            </div>
            <p className="text-4xl font-bold text-kid-purple">{progress.badges.length}/6</p>
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Learning Progress 📊</h2>
        <div className="bg-white rounded-2xl p-4 shadow-lg space-y-4">
          {activities.map((activity) => (
            <div key={activity.name}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  <span className="font-bold text-gray-700">{activity.name}</span>
                </div>
                <span className={`font-bold ${activity.color}`}>
                  {activity.completed}/{activity.total}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${activity.color.replace('text-', 'bg-')}`}
                  style={{ width: `${(activity.completed / activity.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stories & Drawings */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-kid-purple" />
              <span className="font-bold text-gray-700">Stories Read</span>
            </div>
            <p className="text-3xl font-bold text-kid-purple">{progress.storiesRead}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-6 h-6 text-kid-pink" />
              <span className="font-bold text-gray-700">Drawings</span>
            </div>
            <p className="text-3xl font-bold text-kid-pink">{progress.drawingsCreated}</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Badges & Achievements 🏆</h2>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`p-4 rounded-2xl border-2 ${
                  badge.earned
                    ? 'bg-kid-yellow/20 border-kid-yellow'
                    : 'bg-gray-100 border-gray-300 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-bold text-gray-700">{badge.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{badge.requirement}</p>
                {badge.earned && (
                  <div className="mt-2 text-kid-green font-bold text-sm">✓ Earned!</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Settings
        </h2>
        <div className="bg-white rounded-2xl p-4 shadow-lg space-y-4">
          <div>
            <label className="font-bold text-gray-700 mb-2 block">
              Daily Time Limit: {timeLimit} minutes
            </label>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10 min</span>
              <span>2 hours</span>
            </div>
          </div>
          
          <button
            onClick={handleSaveSettings}
            className="btn-kid-blue w-full"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Data Management 💾</h2>
        <div className="bg-white rounded-2xl p-4 shadow-lg space-y-4">
          <button
            onClick={handleExport}
            className="btn-kid-green w-full flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Progress
          </button>
          
          <button
            onClick={() => setShowReset(true)}
            className="btn-kid-red w-full flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Reset All Progress
          </button>
        </div>
      </div>

      {/* Last Visit */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <p className="text-sm text-gray-500">
            Last visit: {new Date(progress.lastVisit).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showReset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
              Reset All Progress?
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              This will delete all stars, badges, and learning progress. This cannot be undone!
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowReset(false)}
                className="btn-kid-blue flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="btn-kid-red flex-1"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
