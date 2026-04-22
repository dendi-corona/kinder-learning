'use client';

import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';

interface AudioNarratorProps {
  text: string;
  autoPlay?: boolean;
  onFinished?: () => void;
  rate?: number;
  pitch?: number;
}

export default function AudioNarrator({
  text,
  autoPlay = false,
  onFinished,
  rate = 0.7,
  pitch = 1.1,
}: AudioNarratorProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  const speak = () => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onFinished) onFinished();
    };
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!isSupported) return;
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (autoPlay && isSupported) {
      speak();
    }
    return () => {
      if (isSupported) {
        speechSynthesis.cancel();
      }
    };
  }, [text, autoPlay]);

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={isSpeaking ? stop : speak}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 ${
        isSpeaking
          ? 'bg-kid-red text-white'
          : 'bg-kid-blue text-white'
      }`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-6 h-6" />
          Stop 🔇
        </>
      ) : (
        <>
          <Volume2 className="w-6 h-6" />
          Read Aloud 🔊
        </>
      )}
    </button>
  );
}
