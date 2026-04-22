'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  `transition-all duration-300`,
  {
    variants: {
      variant: {
        modern: 'bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl',
        glass: 'rounded-3xl p-6 backdrop-blur-md bg-white/70 border-2 border-white/50 shadow-glass hover:shadow-xl',
        neumorph: 'rounded-3xl p-6 bg-gradient-to-br from-white to-gray-100 shadow-neumorph',
        gradient: 'rounded-3xl p-6 bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-lg',
        outline: 'rounded-3xl p-6 border-2 border-gray-200 bg-white/50 hover:border-blue-300',
      },
      interactive: {
        true: 'cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'modern',
      interactive: false,
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, children, asChild, ...props }, ref) => {
    const Component = interactive ? motion.div : 'div';
    
    const motionProps = interactive ? {
      whileHover: { scale: 1.02, y: -4 },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring', stiffness: 400, damping: 17 },
    } : {};

    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, interactive, className }))}
        {...(motionProps as any)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

// Card Header
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

// Card Title
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function CardTitle({ children, className, level = 3 }: CardTitleProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Component
      className={cn('text-2xl font-bold mb-2', className)}
    >
      {children}
    </Component>
  );
}

// Card Description
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm opacity-70', className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

// Card Content
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

// Card Footer
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardDescription, CardContent, CardFooter };
