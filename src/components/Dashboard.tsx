import React from 'react';
import { UserData, View } from '../types';
import './Dashboard.css';

interface DashboardProps {
  userData: UserData;
  onViewChange: (view: View) => void;
  onMoodUpdate: (mood: number) => void;
}

const affirmations = [
  "Your vibe matters more than likes. Keep glowing.",
  "Bodies aren't filters. You're already enough.",
  "Your timeline doesn't define your worth.",
  "Progress is personal. Celebrate the journey.",
  "Nobody's glow is 24/7. Yours is still bright.",
];

// Shuffle array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
};

const Dashboard: React.FC<DashboardProps> = ({ userData, onViewChange, onMoodUpdate }) => {
  const todayMood = userData.moodEntries.find(
    e => e.date === new Date().toDateString()
  );
  const currentMood = todayMood?.mood || 70;
  
  // Shuffle affirmations and pick first one
  const shuffledAffirmations = shuffleArray(affirmations);
  const affirmation = shuffledAffirmations[0];
  
  const scrollPercentage = (userData.currentScrollTime / userData.dailyLimit) * 100;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <p className="greeting">
          {getGreeting()}, {userData.name} 👋
        </p>
        <p className="affirmation">"{affirmation}"</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" onClick={() => onViewChange('reflection')}>
          <p className="stat-label">Mood</p>
          <p className="stat-value">{currentMood}% chill</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Streak</p>
          <p className="stat-value">{userData.streak} days</p>
        </div>
        <div className="stat-card" onClick={() => onViewChange('settings')}>
          <p className="stat-label">Screen Time</p>
          <p className="stat-value">
            {userData.currentScrollTime}/{userData.dailyLimit}m
          </p>
          {scrollPercentage > 80 && (
            <p className="stat-warning">Time for a break?</p>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-btn primary" onClick={() => onViewChange('reflection')}>
          Daily Check-in
        </button>
        <button className="action-btn ghost" onClick={() => onViewChange('challenges')}>
          View Challenges
        </button>
        <button className="action-btn ghost" onClick={() => onViewChange('games')}>
          Calming Games
        </button>
      </div>

      {userData.challenges.filter(c => !c.completed).length > 0 && (
        <div className="challenge-preview">
          <h3>Today's Challenge</h3>
          <div className="challenge-card">
            <p className="challenge-title">
              {userData.challenges.find(c => !c.completed)?.title}
            </p>
            <button
              className="primary small"
              onClick={() => onViewChange('challenges')}
            >
              Start Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

