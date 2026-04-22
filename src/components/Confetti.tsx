'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean;
  onFinished?: () => void;
}

export default function Confetti({ trigger, onFinished }: ConfettiProps) {
  useEffect(() => {
    if (trigger) {
      // Fire confetti!
      const duration = 2000;
      const end = Date.now() + duration;

      const colors = ['#4FC3F7', '#81C784', '#FFF176', '#FFB74D', '#FF8A65', '#BA68C8', '#F48FB1'];

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else if (onFinished) {
          onFinished();
        }
      };

      frame();

      // Big burst in the middle
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors,
        });
      }, 500);

      return () => {
        confetti.reset();
      };
    }
  }, [trigger, onFinished]);

  return null;
}

export function triggerConfetti() {
  if (typeof window !== 'undefined') {
    const colors = ['#4FC3F7', '#81C784', '#FFF176', '#FFB74D', '#FF8A65', '#BA68C8', '#F48FB1'];
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
  }
}
