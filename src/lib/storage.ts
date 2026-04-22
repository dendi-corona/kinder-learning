// Storage utilities for saving/loading progress

export interface ProgressData {
  stars: number;
  badges: string[];
  completedActivities: string[];
  abcProgress: {
    completed: string[];
    currentLetter: string;
  };
  numbersProgress: {
    completed: number[];
    maxNumber: number;
  };
  shapesProgress: {
    learned: string[];
  };
  colorsProgress: {
    learned: string[];
  };
  storiesRead: number;
  drawingsCreated: number;
  favoriteSongs?: string[];
  favoriteStories?: string[];
  lastVisit: string;
}

export const defaultProgress: ProgressData = {
  stars: 0,
  badges: [],
  completedActivities: [],
  abcProgress: {
    completed: [],
    currentLetter: 'A',
  },
  numbersProgress: {
    completed: [],
    maxNumber: 1,
  },
  shapesProgress: {
    learned: [],
  },
  colorsProgress: {
    learned: [],
  },
  storiesRead: 0,
  drawingsCreated: 0,
  favoriteSongs: [],
  favoriteStories: [],
  lastVisit: new Date().toISOString(),
};

const STORAGE_KEY = 'kinder-quest-progress';

export function loadProgress(): ProgressData {
  if (typeof window === 'undefined') return defaultProgress;
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultProgress, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  
  return defaultProgress;
}

export function saveProgress(progress: Partial<ProgressData>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const current = loadProgress();
    const updated = { ...current, ...progress, lastVisit: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

export function addStars(count: number): void {
  const progress = loadProgress();
  saveProgress({ stars: progress.stars + count });
}

export function addBadge(badge: string): void {
  const progress = loadProgress();
  if (!progress.badges.includes(badge)) {
    saveProgress({ badges: [...progress.badges, badge] });
  }
}

export function markActivityComplete(activityId: string): void {
  const progress = loadProgress();
  if (!progress.completedActivities.includes(activityId)) {
    saveProgress({ 
      completedActivities: [...progress.completedActivities, activityId] 
    });
  }
}

export function checkBadges(): string[] {
  const progress = loadProgress();
  const newBadges: string[] = [];
  
  // ABC Master - Complete all letters
  if (progress.abcProgress.completed.length >= 26) {
    newBadges.push('ABC Master');
  }
  
  // Number Ninja - Master counting 1-20
  if (progress.numbersProgress.maxNumber >= 20) {
    newBadges.push('Number Ninja');
  }
  
  // Shape Explorer - Learn all shapes
  if (progress.shapesProgress.learned.length >= 6) {
    newBadges.push('Shape Explorer');
  }
  
  // Color Wizard - Know all colors
  if (progress.colorsProgress.learned.length >= 7) {
    newBadges.push('Color Wizard');
  }
  
  // Super Reader - Read 10 stories
  if (progress.storiesRead >= 10) {
    newBadges.push('Super Reader');
  }
  
  // Artist - Create 5 drawings
  if (progress.drawingsCreated >= 5) {
    newBadges.push('Artist');
  }
  
  newBadges.forEach(badge => addBadge(badge));
  
  return newBadges;
}
