'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Repeat, Volume2, Play, ChevronRight, ChevronLeft } from 'lucide-react';
import { BabyStory } from '@/data/baby-stories';
import { loadProgress, saveProgress, addStars } from '@/lib/storage';
import Confetti, { triggerConfetti } from './Confetti';
import AudioNarrator from './AudioNarrator';

interface StoryReaderProps {
  story: BabyStory;
  onClose: () => void;
}

export default function StoryReader({ story, onClose }: StoryReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [storiesRead, setStoriesRead] = useState(0);

  useEffect(() => {
    const progress = loadProgress();
    const favorites = (progress as any).favoriteStories || [];
    setIsFavorite(favorites.includes(story.id));
    setStoriesRead(progress.storiesRead || 0);
  }, [story.id]);

  const handleNextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Story complete!
      const progress = loadProgress();
      saveProgress({ 
        storiesRead: (progress.storiesRead || 0) + 1,
      });
      addStars(5);
      triggerConfetti();
      
      if (story.quiz && story.quiz.length > 0) {
        setShowQuiz(true);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleFavorite = () => {
    const progress = loadProgress();
    const favorites = (progress as any).favoriteStories || [];
    
    if (isFavorite) {
      saveProgress({
        favoriteStories: favorites.filter((id: string) => id !== story.id),
      } as any);
    } else {
      saveProgress({
        favoriteStories: [...favorites, story.id],
      } as any);
    }
    setIsFavorite(!isFavorite);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!story.quiz) return;
    
    setSelectedAnswer(answerIndex);
    const currentQuestion = story.quiz[0]; // Simplified: just one question for babies
    
    if (answerIndex === currentQuestion.correct) {
      addStars(3);
      triggerConfetti();
      setQuizComplete(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const getPageText = () => {
    return story.pages[currentPage].text;
  };

  const totalStars = 5; // Stars earned for reading

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <Confetti trigger={quizComplete} onFinished={() => setQuizComplete(false)} />
      
      {/* Header */}
      <div className={`${story.color} text-white p-4 rounded-b-3xl shadow-lg`}>
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{story.title}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`p-2 rounded-full ${autoPlay ? 'bg-white text-kid-purple' : 'bg-white/20'}`}
            >
              <Play className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${isFavorite ? 'bg-white text-red-500' : 'bg-white/20'}`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {!showQuiz ? (
        <>
          {/* Progress bar */}
          <div className="px-4 py-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Page {currentPage + 1} of {story.pages.length}</span>
              <span>{Math.round(((currentPage + 1) / story.pages.length) * 100)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-kid-purple transition-all duration-300"
                style={{ width: `${((currentPage + 1) / story.pages.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Story content */}
          <div className="px-4">
            {/* Illustration */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 mb-4 aspect-video flex items-center justify-center">
              <div className="text-8xl">{story.emoji}</div>
            </div>

            {/* Text */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-kid-purple mb-4">
              <p className="text-3xl font-bold text-gray-700 text-center leading-relaxed mb-6">
                {getPageText()}
              </p>

              {/* Audio narrator */}
              <div className="flex justify-center mb-4">
                <AudioNarrator
                  text={getPageText()}
                  autoPlay={autoPlay}
                  onFinished={handleNextPage}
                  rate={0.6}
                  pitch={1.2}
                />
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  className="flex-1 btn-kid-purple disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-6 h-6" />
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className="flex-1 btn-kid-blue flex items-center justify-center gap-2"
                >
                  {currentPage < story.pages.length - 1 ? 'Next' : 'Finish!'}
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Repeat button */}
              <button
                onClick={() => setCurrentPage(0)}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold bg-gray-200 text-gray-700"
              >
                <Repeat className="w-6 h-6" />
                Read Again
              </button>
            </div>

            {/* Page dots */}
            <div className="flex justify-center gap-2 flex-wrap mb-4">
              {story.pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentPage
                      ? 'bg-kid-purple w-6'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Quiz */
        <div className="px-4 py-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-kid-green">
            <div className="text-center mb-6">
              <span className="text-6xl">🎉</span>
              <h2 className="text-2xl font-bold text-gray-700 mt-4">Great Job!</h2>
              <p className="text-gray-600">You finished the story!</p>
            </div>

            {story.quiz && !quizComplete && story.quiz.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  {story.quiz[0].question}
                </h3>
                <div className="space-y-3">
                  {story.quiz[0].options.map((option, index) => {
                    const isCorrect = index === story.quiz![0].correct;
                    return (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className={`w-full p-6 rounded-2xl text-left font-bold text-xl transition-all ${
                          selectedAnswer === index
                            ? isCorrect
                              ? 'bg-kid-green text-white'
                              : 'bg-kid-red text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-kid-purple/20'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {quizComplete && (
              <div className="text-center">
                <p className="text-2xl font-bold text-kid-green">⭐ +3 Stars!</p>
                <p className="text-gray-600 mt-2">You're so smart!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
