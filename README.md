# Kindergarten Learning Quest 🌟📚

A fun, interactive learning app for kids ages 4-6! Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🎓 Learning Modules

1. **ABC Adventure** 🅰️
   - Learn all 26 letters (A-Z)
   - Letter recognition and phonics
   - Trace letters with finger
   - Find objects that start with each letter
   - Audio pronunciation

2. **123 Counting Quest** 🔢
   - Numbers 1-20
   - Count objects (toys, animals, fruits)
   - Number recognition
   - Simple addition games
   - Interactive counting activities

3. **Shapes & Colors** 🔺🔴
   - Basic shapes: circle, square, triangle, rectangle, star, heart
   - Basic colors: red, blue, green, yellow, orange, purple, pink
   - Shape matching games
   - Color sorting activities
   - Real-world examples

4. **Mini Stories** 📖
   - Simple 5-10 sentence stories
   - Reading comprehension questions
   - Track books read
   - Bedtime stories section
   - Read-aloud feature

5. **Drawing & Creativity** 🎨
   - Free drawing canvas
   - Multiple colors and brush sizes
   - Save artwork
   - Download drawings
   - Artwork gallery

### 🏆 Gamification

- **Stars System**: Earn stars for completing activities
- **Badges/Achievements**:
  - ABC Master - Complete all letters
  - Number Ninja - Master counting 1-20
  - Shape Explorer - Learn all shapes
  - Color Wizard - Know all colors
  - Super Reader - Read 10 stories
  - Artist - Create 5 drawings
- **Celebration Animations**: Confetti and fun effects
- **Progress Tracker**: Visual progress bars for each module

### 👨‍👩‍👧 Parent Dashboard

- Progress overview
- Time limit settings
- Export progress data
- Reset progress option
- See what child completed

### 🎨 Kid-Friendly Design

- BIG buttons (easy for small fingers)
- Bright, cheerful colors
- Friendly owl mascot guide
- Simple navigation (minimal text, more icons)
- Voice/audio cues
- Auto-save progress
- Soft rounded corners
- Large, readable fonts

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: localStorage (no backend needed)
- **PWA**: Installable on tablets
- **Audio**: Web Speech API for text-to-speech
- **Confetti**: canvas-confetti for celebrations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd kinder-learning
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

The build output will be in the `out/` directory (static export).

### PWA Installation

The app is PWA-ready! On tablets or phones:
1. Open in browser
2. Tap "Add to Home Screen" or "Install"
3. Launch as a standalone app

## Project Structure

```
kinder-learning/
├── src/
│   ├── app/
│   │   ├── abc/          # ABC Adventure module
│   │   ├── numbers/      # 123 Counting module
│   │   ├── shapes/       # Shapes & Colors module
│   │   ├── stories/      # Mini Stories module
│   │   ├── drawing/      # Drawing Studio module
│   │   ├── parent/       # Parent Dashboard
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   ├── Confetti.tsx  # Celebration effects
│   │   ├── Mascot.tsx    # Owl mascot character
│   │   └── Navigation.tsx # Bottom navigation
│   └── lib/
│       └── storage.ts    # localStorage utilities
├── public/
│   └── manifest.json     # PWA manifest
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Storage

All progress is saved to localStorage:
- Stars and badges
- Completed activities
- Learning progress per module
- Saved drawings
- Settings

Data persists across sessions and can be exported from the Parent Dashboard.

## Accessibility

- Large touch targets (60px minimum)
- High contrast colors
- Text-to-speech support
- Simple, clear navigation
- No complex menus

## License

MIT - Have fun learning! 🌟
