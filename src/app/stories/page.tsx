'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Mascot from '@/components/Mascot';
import Confetti, { triggerConfetti } from '@/components/Confetti';
import { loadProgress, saveProgress, addStars } from '@/lib/storage';
import { ArrowLeft, BookOpen, Check, Volume2, Star } from 'lucide-react';

const stories = [
  {
    id: 1,
    title: 'The Little Red Hen',
    emoji: '🐔',
    color: 'bg-kid-red',
    content: [
      'Once upon a time, there was a little red hen.',
      'She found some grains of wheat in the barn.',
      "Who will help me plant this wheat? asked the hen.",
      '"Not I!" said the cat. "Not I!" said the dog.',
      'So the little red hen planted it herself.',
      'The wheat grew tall and golden.',
      'Who will help me cut the wheat? asked the hen.',
      '"Not I!" said the cat. "Not I!" said the dog.',
      'So she cut it herself and made bread.',
      'Who will help me eat this bread? asked the hen.',
      '"I will!" said the cat. "I will!" said the dog.',
      '"No!" said the hen. "I will eat it myself!"',
    ],
    questions: [
      {
        question: 'What did the hen find?',
        options: ['Grains of wheat', 'An egg', 'A worm'],
        correct: 0,
      },
      {
        question: 'Who helped the hen?',
        options: ['The cat', 'Nobody', 'The dog'],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'The Three Little Pigs',
    emoji: '🐷',
    color: 'bg-kid-pink',
    content: [
      'Once there were three little pigs.',
      'They left home to build their own houses.',
      'The first pig built a house of straw.',
      'The second pig built a house of sticks.',
      'The third pig built a house of bricks.',
      'Along came a big bad wolf.',
      'He huffed and puffed at the straw house.',
      'He blew it down! The pig ran away.',
      'He huffed and puffed at the stick house.',
      'He blew it down too!',
      'But he could not blow down the brick house.',
      'The three pigs lived safely ever after.',
    ],
    questions: [
      {
        question: 'What was the third house made of?',
        options: ['Straw', 'Sticks', 'Bricks'],
        correct: 2,
      },
      {
        question: 'How many pigs were there?',
        options: ['Two', 'Three', 'Four'],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    title: 'The Tortoise and the Hare',
    emoji: '🐢',
    color: 'bg-kid-green',
    content: [
      'A hare made fun of a tortoise for being slow.',
      '"Let\'s have a race!" said the tortoise.',
      'The hare laughed. "You? Race me?"',
      'They started the race.',
      'The hare ran very fast.',
      'Soon he was far ahead.',
      '"I\'ll take a nap," said the hare.',
      'The tortoise kept walking slowly.',
      'Step by step, never stopping.',
      'The hare woke up and ran fast.',
      'But the tortoise was already at the finish!',
      '"Slow and steady wins the race!"',
    ],
    questions: [
      {
        question: 'Who won the race?',
        options: ['The hare', 'The tortoise', 'Nobody'],
        correct: 1,
      },
      {
        question: 'What did the hare do during the race?',
        options: ['Ran fast', 'Took a nap', 'Went home'],
        correct: 1,
      },
    ],
  },
  {
    id: 4,
    title: 'Goldilocks and the Bears',
    emoji: '🐻',
    color: 'bg-kid-yellow',
    content: [
      'Once there was a girl named Goldilocks.',
      'She walked into the forest.',
      'She saw a little house.',
      'The door was open, so she went in.',
      'There were three bowls of porridge.',
      'She tasted the first. "Too hot!"',
      'She tasted the second. "Too cold!"',
      'She tasted the third. "Just right!"',
      'She ate it all up.',
      'Then she saw three chairs.',
      'She sat in the big chair. "Too hard!"',
      'She sat in the middle chair. "Too soft!"',
      'She sat in the little chair. "Just right!"',
      'But then... CRASH! The chair broke!',
      'Goldilocks ran home and never came back.',
    ],
    questions: [
      {
        question: 'Whose house did Goldilocks enter?',
        options: ['A rabbit', 'Three bears', 'A wolf'],
        correct: 1,
      },
      {
        question: 'What happened to the little chair?',
        options: ['It broke', 'It was comfy', 'It disappeared'],
        correct: 0,
      },
    ],
  },
  {
    id: 5,
    title: 'The Very Hungry Caterpillar',
    emoji: '🐛',
    color: 'bg-kid-purple',
    content: [
      'In the light of the moon, a little egg lay on a leaf.',
      'One Sunday morning, the sun came up.',
      'A tiny caterpillar came out of the egg.',
      'He was very hungry.',
      'On Monday, he ate through one apple.',
      'But he was still hungry!',
      'On Tuesday, he ate through two pears.',
      'On Wednesday, three plums.',
      'On Thursday, four strawberries.',
      'On Friday, five oranges.',
      'That night, he had a stomachache!',
      'The next day was Sunday again.',
      'He ate one nice green leaf.',
      'He felt much better.',
      'He built a cocoon around himself.',
      'After two weeks, he came out.',
      'He was a beautiful butterfly!',
    ],
    questions: [
      {
        question: 'What did the caterpillar become?',
        options: ['A bee', 'A butterfly', 'A moth'],
        correct: 1,
      },
      {
        question: 'How many pears did he eat?',
        options: ['One', 'Two', 'Three'],
        correct: 1,
      },
    ],
  },
];

const bedtimeStories = [
  {
    id: 101,
    title: 'Goodnight Moon',
    emoji: '🌙',
    content: [
      'In the great green room,',
      'There was a telephone,',
      'And a red balloon,',
      'And a picture of the moon.',
      'Goodnight room.',
      'Goodnight moon.',
      'Goodnight cow jumping over the moon.',
      'Goodnight light, and the red balloon.',
      'Goodnight bears, goodnight chairs.',
      'Goodnight kittens, and goodnight mittens.',
      'Goodnight stars, goodnight air.',
      'Goodnight noises everywhere.',
    ],
  },
  {
    id: 102,
    title: 'Twinkle Twinkle',
    emoji: '⭐',
    content: [
      'Twinkle, twinkle, little star,',
      'How I wonder what you are.',
      'Up above the world so high,',
      'Like a diamond in the sky.',
      'When the blazing sun is gone,',
      'When he nothing shines upon,',
      'Then you show your little light,',
      'Twinkle, twinkle, all the night.',
      'Then the traveler in the dark,',
      'Thanks you for your tiny spark.',
      'He could not see which way to go,',
      'If you did not twinkle so.',
    ],
  },
];

export default function MiniStories() {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [storiesRead, setStoriesRead] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showBedtime, setShowBedtime] = useState(false);

  useEffect(() => {
    const progress = loadProgress();
    setStoriesRead(progress.storiesRead);
  }, []);

  const handleReadStory = (story: typeof stories[0]) => {
    setSelectedStory(story);
    setCurrentParagraph(0);
    setShowQuestions(false);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
  };

  const handleNextParagraph = () => {
    if (selectedStory && currentParagraph < selectedStory.content.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    } else if (selectedStory) {
      setShowQuestions(true);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (!selectedStory) return;
    
    setSelectedAnswer(answerIndex);
    const currentQuestion = selectedStory.questions[correctAnswers];
    
    if (answerIndex === currentQuestion.correct) {
      addStars(2);
      triggerConfetti();
      
      const newCorrect = correctAnswers + 1;
      setCorrectAnswers(newCorrect);
      
      if (newCorrect >= selectedStory.questions.length) {
        // Story complete!
        const progress = loadProgress();
        saveProgress({ storiesRead: progress.storiesRead + 1 });
        addStars(5);
        setShowCelebration(true);
        setTimeout(() => {
          setSelectedStory(null);
          setShowCelebration(false);
        }, 3000);
      } else {
        setTimeout(() => {
          setSelectedAnswer(null);
        }, 1500);
      }
    }
  };

  const speakParagraph = () => {
    if (!selectedStory) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(selectedStory.content[currentParagraph]);
      utterance.rate = 0.7;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen pb-24">
      <Confetti trigger={showCelebration} onFinished={() => setShowCelebration(false)} />
      
      {/* Header */}
      <div className="bg-kid-purple text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Mini Stories 📖</h1>
          <div className="w-10" />
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

      {!selectedStory ? (
        <>
          {/* Story selection */}
          <div className="px-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Pick a Story!</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {stories.map((story) => (
                <button
                  key={story.id}
                  onClick={() => handleReadStory(story)}
                  className={`${story.color} text-white p-6 rounded-3xl shadow-lg 
                    transform transition-all hover:scale-105 active:scale-95
                    flex items-center gap-4`}
                >
                  <span className="text-5xl">{story.emoji}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">{story.title}</h3>
                    <p className="text-sm opacity-90">{story.content.length} pages • {story.questions.length} questions</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bedtime stories section */}
          <div className="px-4 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-700">🌙 Bedtime Stories</h2>
              <button
                onClick={() => setShowBedtime(!showBedtime)}
                className="text-kid-purple font-bold"
              >
                {showBedtime ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showBedtime && (
              <div className="grid grid-cols-1 gap-4">
                {bedtimeStories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => handleReadStory(story as any)}
                    className="bg-indigo-100 text-gray-800 p-6 rounded-3xl shadow-lg 
                      transform transition-all hover:scale-105 active:scale-95
                      flex items-center gap-4"
                  >
                    <span className="text-5xl">{story.emoji}</span>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{story.title}</h3>
                      <p className="text-sm opacity-90">{story.content.length} pages</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Reading view */}
          <div className="px-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-kid-purple">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{selectedStory.emoji}</span>
                <h2 className="text-2xl font-bold text-gray-700">{selectedStory.title}</h2>
              </div>

              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Page {currentParagraph + 1} of {selectedStory.content.length}</span>
                  <span>{Math.round(((currentParagraph + 1) / selectedStory.content.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-kid-purple transition-all duration-300"
                    style={{ width: `${((currentParagraph + 1) / selectedStory.content.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Story content */}
              <div className="bg-kid-purple/10 rounded-2xl p-6 mb-6 min-h-[200px] flex items-center">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {selectedStory.content[currentParagraph]}
                </p>
              </div>

              {/* Audio button */}
              <button
                onClick={speakParagraph}
                className="btn-kid-blue flex items-center gap-2 mb-4 w-full"
              >
                <Volume2 className="w-6 h-6" />
                Read Aloud 🔊
              </button>

              {/* Navigation */}
              {!showQuestions ? (
                <button
                  onClick={handleNextParagraph}
                  className="btn-kid-purple w-full"
                >
                  {currentParagraph < selectedStory.content.length - 1 ? 'Next Page →' : 'Answer Questions!'}
                </button>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">
                    Question {correctAnswers + 1} of {selectedStory.questions.length}
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {selectedStory.questions[correctAnswers].question}
                  </p>
                  <div className="space-y-3">
                    {selectedStory.questions[correctAnswers].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full p-4 rounded-2xl text-left font-bold transition-all ${
                          selectedAnswer === index
                            ? index === selectedStory.questions[correctAnswers].correct
                              ? 'bg-kid-green text-white'
                              : 'bg-kid-red text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-kid-purple/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mascot */}
          <div className="flex justify-center mt-6">
            <Mascot emotion="happy" size="medium" />
          </div>
        </>
      )}
    </main>
  );
}
