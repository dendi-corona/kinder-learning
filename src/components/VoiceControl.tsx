'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Mic, MicOff, Volume2, Settings } from 'lucide-react';
import { cn, soundEffects } from '@/lib/utils';

interface VoiceCommand {
  pattern: RegExp;
  action: () => void;
  description: string;
}

interface VoiceControlProps {
  commands?: VoiceCommand[];
  onListen?: (transcript: string) => void;
  onError?: (error: string) => void;
  enabled?: boolean;
  className?: string;
}

export default function VoiceControl({
  commands = [],
  onListen,
  onError,
  enabled = true,
  className,
}: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          const current = event.resultIndex;
          const result = event.results[current][0].transcript;
          setTranscript(result);
          onListen?.(result);

          // Check commands
          if (event.results[current].isFinal) {
            const lowerTranscript = result.toLowerCase();
            commands.forEach((cmd) => {
              if (cmd.pattern.test(lowerTranscript)) {
                soundEffects.success();
                cmd.action();
              }
            });
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          onError?.(`Voice error: ${event.error}`);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [commands, onListen, onError]);

  const toggleListening = useCallback(() => {
    if (!isSupported || !recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      soundEffects.click();
    }
  }, [isSupported, recognition, isListening]);

  if (!isSupported || !enabled) {
    return null;
  }

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 w-72"
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Mic className="w-5 h-5 text-blue-500" />
                </motion.div>
                <span className="font-bold text-gray-700">Listening...</span>
              </div>
              
              {transcript && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-600 italic"
                >
                  "{transcript}"
                </motion.p>
              )}

              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="text-xs text-gray-500">Try:</span>
                {commands.slice(0, 3).map((cmd, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {cmd.description}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant={isListening ? 'primary' : 'glass'}
        size="sm"
        onClick={toggleListening}
        className={cn(
          'rounded-full w-14 h-14 p-0',
          isListening && 'animate-pulse-glow'
        )}
        withSound={false}
        withHaptic={false}
      >
        {isListening ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <MicOff className="w-6 h-6" />
          </motion.div>
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}

// Text-to-speech component
interface TextToSpeechProps {
  text: string;
  children?: React.ReactNode;
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  className?: string;
}

export function TextToSpeech({
  text,
  children,
  rate = 0.9,
  pitch = 1.1,
  volume = 1,
  lang = 'en-US',
  className,
}: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.lang = lang;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
    soundEffects.click();
  };

  return (
    <button
      onClick={handleSpeak}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full',
        'bg-blue-100 text-blue-700 hover:bg-blue-200',
        'transition-all duration-200',
        isSpeaking && 'animate-pulse bg-blue-200',
        className
      )}
    >
      <Volume2 className={cn('w-5 h-5', isSpeaking && 'animate-bounce')} />
      {children || 'Listen'}
    </button>
  );
}

// Voice command hints
interface VoiceHintsProps {
  commands: string[];
  className?: string;
}

export function VoiceHints({ commands, className }: VoiceHintsProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h4 className="font-bold text-gray-700 flex items-center gap-2">
        <Mic className="w-4 h-4" />
        Voice Commands:
      </h4>
      <ul className="space-y-1">
        {commands.map((cmd, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            {cmd}
          </li>
        ))}
      </ul>
    </div>
  );
}
