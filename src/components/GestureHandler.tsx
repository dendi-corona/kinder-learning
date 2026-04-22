'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

interface GestureHandlerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onPinch?: (scale: number) => void;
  threshold?: number;
  className?: string;
}

export default function GestureHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onDoubleTap,
  onPinch,
  threshold = 100,
  className,
}: GestureHandlerProps) {
  const [lastTap, setLastTap] = useState(0);
  const startX = useMotionValue(0);
  const startY = useMotionValue(0);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  
  const rotateY = useTransform(offsetX, [-200, 0, 200], [-15, 0, 15]);
  const rotateX = useTransform(offsetY, [-200, 0, 200], [15, 0, -15]);
  const scale = useTransform(offsetX, [-200, 0, 200], [0.9, 1, 0.9]);

  const handlePanEnd = useCallback(
    (_: any, info: PanInfo) => {
      const { offset, velocity } = info;
      const absX = Math.abs(offset.x);
      const absY = Math.abs(offset.y);

      // Determine if it's a swipe based on distance and velocity
      const isSwipe = Math.max(absX, absY) > threshold || 
                     Math.max(velocity.x, velocity.y) > 500;

      if (!isSwipe) return;

      if (absX > absY) {
        // Horizontal swipe
        if (offset.x > threshold && onSwipeRight) {
          onSwipeRight();
        } else if (offset.x < -threshold && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (offset.y > threshold && onSwipeDown) {
          onSwipeDown();
        } else if (offset.y < -threshold && onSwipeUp) {
          onSwipeUp();
        }
      }
    },
    [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]
  );

  const handleTap = useCallback(() => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      onDoubleTap?.();
    } else {
      onTap?.();
    }
    setLastTap(now);
  }, [lastTap, onTap, onDoubleTap]);

  return (
    <motion.div
      className={className}
      style={{
        x: offsetX,
        y: offsetY,
        rotateY,
        rotateX,
        scale,
        z: 0,
        transformPerspective: 800,
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onPanEnd={handlePanEnd}
      onTap={handleTap}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Pull to refresh component
interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  className?: string;
}

export function PullToRefresh({
  children,
  onRefresh,
  threshold = 150,
  className,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && !isRefreshing) {
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY.current);
      setPullDistance(distance);
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
  };

  const opacity = Math.min(pullDistance / threshold, 1);
  const scale = 1 + (pullDistance / threshold) * 0.2;

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      {pullDistance > 0 && (
        <div
          className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-50"
          style={{ opacity }}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg"
            style={{ scale }}
          >
            {isRefreshing ? (
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <span className="font-bold text-gray-700">Refreshing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl">👇</span>
                <span className="font-bold text-gray-700">
                  {pullDistance > threshold ? 'Release to refresh!' : 'Pull to refresh'}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {children}
    </div>
  );
}

// Swipeable card
interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  className,
}: SwipeableCardProps) {
  const x = useMotionValue(0);

  const handlePanEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipeRight?.();
    } else if (info.offset.x < -100) {
      onSwipeLeft?.();
    }
  };

  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  return (
    <motion.div
      className={className}
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onPanEnd={handlePanEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      {children}
    </motion.div>
  );
}
