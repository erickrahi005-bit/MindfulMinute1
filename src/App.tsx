import React, { useState, useEffect } from 'react';
import { UserData, View, MoodEntry } from './types';
import { initializeData, saveStoredData } from './utils/storage';
import Dashboard from './components/Dashboard';
import Reflection from './components/Reflection';
import Challenges from './components/Challenges';
import Games from './components/Games';
import Insights from './components/Insights';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [userData, setUserData] = useState<UserData>(initializeData());
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    saveStoredData(userData);
  }, [userData]);

  const handleMoodUpdate = (mood: number, answers: string[]) => {
    const today = new Date().toDateString();
    const existingEntry = userData.moodEntries.find(e => e.date === today);
    
    const newEntry: MoodEntry = {
      date: today,
      mood,
      scrollTime: existingEntry?.scrollTime || userData.currentScrollTime,
    };

    const updatedEntries = existingEntry
      ? userData.moodEntries.map(e => e.date === today ? newEntry : e)
      : [...userData.moodEntries, newEntry];

    setUserData({
      ...userData,
      moodEntries: updatedEntries,
      streak: userData.streak + 1,
    });

    setCurrentView('home');
  };

  const handleCompleteChallenge = (id: string) => {
    setUserData({
      ...userData,
      challenges: userData.challenges.map(c =>
        c.id === id ? { ...c, completed: true } : c
      ),
      completedChallenges: [...userData.completedChallenges, id],
      streak: userData.streak + 1,
    });
  };

  const handleUpdateLimit = (limit: number) => {
    setUserData({
      ...userData,
      dailyLimit: limit,
    });
  };

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
            userData={userData}
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

