'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, BookOpen, Palette, Star, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const navItems = [
    { href: '/', icon: Home, label: 'Home', color: 'text-blue-500', bg: 'bg-blue-500' },
    { href: '/abc', icon: BookOpen, label: 'ABC', color: 'text-green-500', bg: 'bg-green-500' },
    { href: '/numbers', icon: Star, label: '123', color: 'text-yellow-500', bg: 'bg-yellow-500' },
    { href: '/shapes', icon: Star, label: 'Shapes', color: 'text-orange-500', bg: 'bg-orange-500' },
    { href: '/stories', icon: BookOpen, label: 'Stories', color: 'text-purple-500', bg: 'bg-purple-500' },
    { href: '/drawing', icon: Palette, label: 'Draw', color: 'text-pink-500', bg: 'bg-pink-500' },
    { href: '/parent', icon: Settings, label: 'Parents', color: 'text-gray-500', bg: 'bg-gray-500' },
  ];

  if (isHome) return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Glassmorphic navigation bar */}
      <div className="mx-4 mb-4 rounded-3xl glass shadow-2xl border border-white/50">
        <div className="flex justify-around items-center py-3 px-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center p-2 min-w-[60px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className={`absolute inset-0 ${item.bg} rounded-2xl opacity-20`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                <motion.div
                  className={cn(
                    'relative z-10 p-2 rounded-xl transition-colors duration-300',
                    isActive ? item.color : 'text-gray-400'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className={cn('w-6 h-6', isActive && 'fill-current')} />
                </motion.div>
                
                <motion.span
                  className={cn(
                    'text-xs font-bold mt-1 relative z-10',
                    isActive ? item.color.replace('text-', 'text-') : 'text-gray-400'
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
                >
                  {item.label}
                </motion.span>

                {/* Active dot indicator */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 ${item.bg} rounded-full`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

// Export default for backward compatibility
export default Navigation;
