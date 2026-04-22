'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn, hapticFeedback, soundEffects } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  `relative overflow-hidden font-bold text-lg transition-all duration-300 
   flex items-center justify-center gap-2 min-h-[60px] min-w-[60px] 
   touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed`,
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 shadow-lg hover:shadow-xl',
        secondary: 'bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 shadow-lg hover:shadow-xl',
        success: 'bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 shadow-lg hover:shadow-xl',
        warning: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl',
        glass: 'backdrop-blur-md bg-white/30 border-2 border-white/50 text-gray-700 hover:bg-white/50 shadow-lg',
        neumorph: 'bg-gray-100 text-gray-700 shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)]',
        outline: 'border-2 border-current bg-transparent hover:bg-white/20',
      },
      size: {
        sm: 'px-4 py-2 text-base rounded-xl min-h-[48px] min-w-[48px]',
        md: 'px-6 py-4 text-lg rounded-2xl',
        lg: 'px-8 py-5 text-xl rounded-3xl min-h-[72px]',
        xl: 'px-10 py-6 text-2xl rounded-3xl min-h-[80px]',
      },
      shape: {
        rounded: 'rounded-2xl',
        pill: 'rounded-full',
        square: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: 'rounded',
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  withSound?: boolean;
  withHaptic?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      children,
      withSound = true,
      withHaptic = true,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;
      
      if (withHaptic) hapticFeedback(10);
      if (withSound) soundEffects.click();
      
      props.onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape, className }))}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleClick}
        disabled={disabled || isLoading}
        {...props}
      >
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
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
