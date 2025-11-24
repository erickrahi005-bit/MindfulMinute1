export interface MoodEntry {
  date: string;
  mood: number;
  scrollTime: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'be-real' | 'recharge' | 'self-hype';
}

export interface UserData {
  name: string;
  streak: number;
  dailyLimit: number;
  currentScrollTime: number;
  moodEntries: MoodEntry[];
  challenges: Challenge[];
  completedChallenges: string[];
  lastActiveDate: string;
}

export type View = 'home' | 'reflection' | 'challenges' | 'games' | 'insights' | 'settings';

