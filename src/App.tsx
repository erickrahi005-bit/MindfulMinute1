import React, { useState, useEffect } from 'react';
import { UserData, View, MoodEntry } from './types';
import { initializeData, saveStoredData, getStoredData } from './utils/storage';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Reflection from './components/Reflection';
import Challenges from './components/Challenges';
import Games from './components/Games';
import Insights from './components/Insights';
import Settings from './components/Settings';
import HealthyHabits from './components/HealthyHabits';
import FactCheck from './components/FactCheck';
import './App.css';

function App() {
  const stored = getStoredData();
  const [userData, setUserData] = useState<UserData | null>(stored ? initializeData() : null);
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    if (userData) {
      saveStoredData(userData);
    }
  }, [userData]);

  const handleNameSubmit = (name: string) => {
    const newUserData = initializeData(name);
    setUserData(newUserData);
    saveStoredData(newUserData);
  };

  const handleMoodUpdate = (mood: number, answers: string[]) => {
    if (!userData) return;
    
    const today = new Date().toDateString();
    const existingEntry = userData.moodEntries.find(e => e.date === today);
    const lastCheckInDate = userData.lastActiveDate;
    
    const newEntry: MoodEntry = {
      date: today,
      mood,
      scrollTime: existingEntry?.scrollTime || userData.currentScrollTime,
    };

    const updatedEntries = existingEntry
      ? userData.moodEntries.map(e => e.date === today ? newEntry : e)
      : [...userData.moodEntries, newEntry];

    // Only increment streak if this is the first check-in today
    let newStreak = userData.streak;
    if (lastCheckInDate !== today) {
      // Check if yesterday had a check-in (for consecutive days)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();
      const hadCheckInYesterday = userData.moodEntries.some(e => e.date === yesterdayStr);
      
      if (hadCheckInYesterday || userData.streak === 0) {
        newStreak = userData.streak + 1;
      } else {
        // Reset streak if missed a day
        newStreak = 1;
      }
    }

    setUserData({
      ...userData,
      moodEntries: updatedEntries,
      streak: newStreak,
      lastActiveDate: today,
    });

    setCurrentView('home');
  };

  const handleCompleteChallenge = (id: string) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      challenges: userData.challenges.map(c =>
        c.id === id ? { ...c, completed: true } : c
      ),
      completedChallenges: [...userData.completedChallenges, id],
    });
  };

  const handleUpdateLimit = (limit: number) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      dailyLimit: limit,
    });
  };

  if (!userData) {
    return <Landing onNameSubmit={handleNameSubmit} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Dashboard
            userData={userData}
            onViewChange={setCurrentView}
            onMoodUpdate={handleMoodUpdate}
          />
        );
      case 'reflection':
        return (
          <Reflection
            onComplete={handleMoodUpdate}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'challenges':
        return (
          <Challenges
            userData={userData}
            onCompleteChallenge={handleCompleteChallenge}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'games':
        return <Games onBack={() => setCurrentView('home')} />;
      case 'insights':
        return (
          <Insights
            userData={userData}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'settings':
        return (
          <Settings
            userData={userData}
            onUpdateLimit={handleUpdateLimit}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'healthy-habits':
        return (
          <HealthyHabits
            onBack={() => setCurrentView('home')}
          />
        );
      case 'fact-check':
        return (
          <FactCheck
            onBack={() => setCurrentView('home')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <nav className="app-nav">
        <button
          className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          Home
        </button>
        <button
          className={`nav-btn ${currentView === 'insights' ? 'active' : ''}`}
          onClick={() => setCurrentView('insights')}
        >
          Insights
        </button>
        <button
          className={`nav-btn ${currentView === 'games' ? 'active' : ''}`}
          onClick={() => setCurrentView('games')}
        >
          Games
        </button>
        <button
          className={`nav-btn ${currentView === 'healthy-habits' ? 'active' : ''}`}
          onClick={() => setCurrentView('healthy-habits')}
        >
          Healthy Habits
        </button>
        <button
          className={`nav-btn ${currentView === 'fact-check' ? 'active' : ''}`}
          onClick={() => setCurrentView('fact-check')}
        >
          Fact-Check
        </button>
        <button
          className={`nav-btn ${currentView === 'settings' ? 'active' : ''}`}
          onClick={() => setCurrentView('settings')}
        >
          Settings
        </button>
      </nav>
      <main className="app-main">{renderView()}</main>
    </div>
  );
}

export default App;

