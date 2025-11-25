import { UserData } from '../types';

const STORAGE_KEY = 'glowup-user-data';

export const getStoredData = (): UserData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading from localStorage', e);
  }
  return null;
};

export const saveStoredData = (data: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
};

export const getDefaultData = (name: string = 'Maya'): UserData => ({
  name: name,
  streak: 0,
  dailyLimit: 90,
  currentScrollTime: 0,
  moodEntries: [],
  challenges: [
    {
      id: '1',
      title: 'Post something authentic',
      description: 'Share a photo that makes you laugh instead of trying to impress',
      completed: false,
      category: 'be-real',
    },
    {
      id: '2',
      title: 'Take a mindful walk',
      description: '5-minute no-scroll walk and snap something that calms you',
      completed: false,
      category: 'recharge',
    },
    {
      id: '3',
      title: 'Body appreciation list',
      description: 'Write three things you appreciate about your body today',
      completed: false,
      category: 'self-hype',
    },
  ],
  completedChallenges: [],
  lastActiveDate: new Date().toDateString(),
});

export const initializeData = (name?: string): UserData => {
  const stored = getStoredData();
  const today = new Date().toDateString();
  
  if (!stored) {
    return getDefaultData(name);
  }

  // Reset daily data if it's a new day
  if (stored.lastActiveDate !== today) {
    // Check if streak should continue (had check-in yesterday)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    const hadCheckInYesterday = stored.moodEntries.some(e => e.date === yesterdayStr);
    
    // Only maintain streak if they checked in yesterday, otherwise reset
    const newStreak = hadCheckInYesterday ? stored.streak : 0;
    
    return {
      ...stored,
      currentScrollTime: 0,
      lastActiveDate: today,
      streak: newStreak,
      challenges: stored.challenges.map(c => ({
        ...c,
        completed: false,
      })),
    };
  }

  return stored;
};

