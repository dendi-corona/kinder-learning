'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar';
import { PageTransition } from '@/components/PageTransition';
import { loadProgress, saveProgress } from '@/lib/storage';
import { 
  ArrowLeft, Trophy, Star, BookOpen, Palette, Triangle, Settings, 
  Trash2, Download, BarChart3, Clock, Award, TrendingUp 
} from 'lucide-react';
import { cn, soundEffects } from '@/lib/utils';

export default function ParentDashboard() {
  const [progress, setProgress] = useState<typeof import('@/lib/storage').defaultProgress | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'settings'>('overview');

  useEffect(() => {
    const prog = loadProgress();
    setProgress(prog);
    
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kinder-time-limit');
      if (saved) {
        setTimeLimit(Number(saved));
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
      soundEffects.success();
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
    soundEffects.success();
  };

  const handleSaveSettings = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kinder-time-limit', timeLimit.toString());
      soundEffects.success();
      alert('Settings saved! ✓');
    }
  };

  if (!progress) return null;

  const badges = [
    { name: 'ABC Master', icon: '🅰️', earned: progress.badges.includes('ABC Master'), requirement: 'Learn all 26 letters', color: 'from-green-400 to-emerald-500' },
    { name: 'Number Ninja', icon: '🔢', earned: progress.badges.includes('Number Ninja'), requirement: 'Master counting 1-20', color: 'from-yellow-400 to-orange-500' },
    { name: 'Shape Explorer', icon: '🔺', earned: progress.badges.includes('Shape Explorer'), requirement: 'Learn all shapes', color: 'from-orange-400 to-red-500' },
    { name: 'Color Wizard', icon: '🎨', earned: progress.badges.includes('Color Wizard'), requirement: 'Know all colors', color: 'from-pink-400 to-rose-500' },
    { name: 'Super Reader', icon: '📖', earned: progress.badges.includes('Super Reader'), requirement: 'Read 10 stories', color: 'from-purple-400 to-pink-500' },
    { name: 'Artist', icon: '🖼️', earned: progress.badges.includes('Artist'), requirement: 'Create 5 drawings', color: 'from-blue-400 to-indigo-500' },
  ];

  const activities = [
    { name: 'ABC Adventure', icon: BookOpen, completed: progress.abcProgress.completed.length, total: 26, color: 'text-green-500', bg: 'bg-green-500' },
    { name: '123 Counting', icon: Star, completed: progress.numbersProgress.completed.length, total: 20, color: 'text-yellow-500', bg: 'bg-yellow-500' },
    { name: 'Shapes', icon: Triangle, completed: progress.shapesProgress.learned.length, total: 6, color: 'text-orange-500', bg: 'bg-orange-500' },
    { name: 'Colors', icon: Palette, completed: progress.colorsProgress.learned.length, total: 7, color: 'text-pink-500', bg: 'bg-pink-500' },
  ];

  const totalProgress = activities.reduce((acc, act) => acc + (act.completed / act.total) * 100, 0) / activities.length;

  return (
    <PageTransition>
      <main className="min-h-screen pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Modern Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 pb-12 rounded-b-[2.5rem] shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="glass" size="sm" className="rounded-full w-12 h-12 p-0">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <motion.h1 
              className="text-2xl md:text-3xl font-extrabold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Parent Dashboard 👨‍👩‍👧
            </motion.h1>
            <div className="w-12" />
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-4 -mt-6 mb-6"
        >
          <Card variant="glass" className="p-2">
            <div className="flex gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'badges', label: 'Badges', icon: Award },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all duration-300',
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4 space-y-6"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card variant="glass" className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                  >
                    <Star className="w-10 h-10 text-yellow-500 fill-yellow-500 mx-auto mb-2" />
                  </motion.div>
                  <p className="text-sm font-bold text-gray-600 mb-1">Total Stars</p>
                  <p className="text-4xl font-extrabold text-yellow-500">{progress.stars}</p>
                </Card>
                
                <Card variant="glass" className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <Trophy className="w-10 h-10 text-purple-500 mx-auto mb-2" />
                  </motion.div>
                  <p className="text-sm font-bold text-gray-600 mb-1">Badges Earned</p>
                  <p className="text-4xl font-extrabold text-purple-500">{progress.badges.length}/6</p>
                </Card>
              </div>

              {/* Overall Progress Circle */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                    Overall Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <CircularProgress
                    value={Math.round(totalProgress)}
                    size={180}
                    strokeWidth={15}
                    color="#6366f1"
                  />
                </CardContent>
              </Card>

              {/* Activity Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-green-500" />
                    Learning Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <activity.icon className={`w-5 h-5 ${activity.color}`} />
                          <span className="font-bold text-gray-700">{activity.name}</span>
                        </div>
                        <span className={`font-extrabold ${activity.color}`}>
                          {activity.completed}/{activity.total}
                        </span>
                      </div>
                      <ProgressBar 
                        value={(activity.completed / activity.total) * 100}
                        className="h-4"
                        indicatorClassName={activity.bg.replace('bg-', 'bg-')}
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Stories & Drawings */}
              <div className="grid grid-cols-2 gap-4">
                <Card variant="glass">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-6 h-6 text-purple-500" />
                    <span className="font-bold text-gray-700">Stories Read</span>
                  </div>
                  <p className="text-3xl font-extrabold text-purple-500">{progress.storiesRead}</p>
                </Card>
                
                <Card variant="glass">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-6 h-6 text-pink-500" />
                    <span className="font-bold text-gray-700">Drawings</span>
                  </div>
                  <p className="text-3xl font-extrabold text-pink-500">{progress.drawingsCreated}</p>
                </Card>
              </div>

              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-6 h-6 text-gray-500" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleExport}
                    className="w-full"
                  >
                    <Download className="w-6 h-6" />
                    Export Progress
                  </Button>
                  
                  <Button
                    variant="warning"
                    size="lg"
                    onClick={() => setShowReset(true)}
                    className="w-full"
                  >
                    <Trash2 className="w-6 h-6" />
                    Reset All Progress
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Badges Tab */}
          {activeTab === 'badges' && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-500" />
                    Badges & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={badge.name}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1, type: 'spring' }}
                        className={cn(
                          'p-4 rounded-2xl border-2 text-center transition-all duration-300',
                          badge.earned
                            ? `bg-gradient-to-br ${badge.color} border-white text-white shadow-lg`
                            : 'bg-gray-100 border-gray-300 opacity-50'
                        )}
                      >
                        <motion.div
                          className="text-5xl mb-2"
                          animate={badge.earned ? { rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {badge.icon}
                        </motion.div>
                        <h3 className="font-extrabold mb-1">{badge.name}</h3>
                        <p className="text-xs opacity-80 mb-2">{badge.requirement}</p>
                        {badge.earned && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm font-bold"
                          >
                            ✓ Earned!
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-6 h-6 text-gray-500" />
                    App Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Daily Time Limit: {timeLimit} minutes
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      step="5"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>10 min</span>
                      <span>1 hour</span>
                      <span>2 hours</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSaveSettings}
                    className="w-full"
                  >
                    <Settings className="w-6 h-6" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Last Visit */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-4 pb-8 mt-8"
        >
          <Card variant="outline">
            <p className="text-sm text-gray-500 text-center">
              Last visit: {new Date(progress.lastVisit).toLocaleString()}
            </p>
          </Card>
        </motion.div>

        {/* Reset Confirmation Modal */}
        <AnimatePresence>
          {showReset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowReset(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">
                  ⚠️ Reset All Progress?
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  This will delete all stars, badges, and learning progress. This cannot be undone!
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="glass"
                    size="lg"
                    onClick={() => setShowReset(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="warning"
                    size="lg"
                    onClick={handleReset}
                    className="flex-1"
                  >
                    <Trash2 className="w-5 h-5" />
                    Yes, Reset
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}
