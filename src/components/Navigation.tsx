'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Palette, Star, Settings } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const navItems = [
    { href: '/', icon: Home, label: 'Home', color: 'bg-kid-blue' },
    { href: '/abc', icon: BookOpen, label: 'ABC', color: 'bg-kid-green' },
    { href: '/numbers', icon: Star, label: '123', color: 'bg-kid-yellow' },
    { href: '/shapes', icon: Star, label: 'Shapes', color: 'bg-kid-orange' },
    { href: '/stories', icon: BookOpen, label: 'Stories', color: 'bg-kid-purple' },
    { href: '/drawing', icon: Palette, label: 'Draw', color: 'bg-kid-pink' },
    { href: '/parent', icon: Settings, label: 'Parents', color: 'bg-gray-500' },
  ];

  if (isHome) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-kid-blue shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? `${item.color} text-white scale-110` : 'text-gray-500'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-bold mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
