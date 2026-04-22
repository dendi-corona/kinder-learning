'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn, hapticFeedback, soundEffects } from '@/lib/utils';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'onDrag'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  withSound?: boolean;
  withHaptic?: boolean;
  withParticles?: boolean;
  isLoading?: boolean;
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  withSound = true,
  withHaptic = true,
  withParticles = false,
  isLoading = false,
  className,
  disabled,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [showParticles, setShowParticles] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    
    if (withHaptic) hapticFeedback(10);
    if (withSound) soundEffects.click();
    
    if (withParticles) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1000);
    }
    
    onClick?.(e);
  };

  const variants = {
    primary: 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-blue-200',
    secondary: 'bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white shadow-pink-200',
    success: 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-green-200',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-orange-200',
    glass: 'backdrop-blur-md bg-white/30 border-2 border-white/50 text-gray-700 hover:bg-white/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-base rounded-xl min-h-[48px]',
    md: 'px-6 py-4 text-lg rounded-2xl min-h-[60px]',
    lg: 'px-8 py-5 text-xl rounded-3xl min-h-[72px]',
    xl: 'px-10 py-6 text-2xl rounded-3xl min-h-[80px]',
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden font-bold transition-all duration-300',
        'flex items-center justify-center gap-2',
        'touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed',
        'shadow-lg hover:shadow-xl',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Particle effects */}
      {withParticles && showParticles && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: 0,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </>
      )}

      {/* Loading spinner */}
      {isLoading ? (
        <>
          <motion.svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {icon}
            </motion.span>
          )}
          
          <span className="relative z-10">{children}</span>
          
          {icon && iconPosition === 'right' && (
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: -10 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {icon}
            </motion.span>
          )}
        </>
      )}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
}
