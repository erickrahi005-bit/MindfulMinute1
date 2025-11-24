import React from 'react';
import { UserData } from '../types';
import './Settings.css';

interface SettingsProps {
  userData: UserData;
  onUpdateLimit: (limit: number) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userData, onUpdateLimit, onBack }) => {
  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateLimit(Number(e.target.value));
  };

  return (
    <div className="settings">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="settings-content">
        <h2>Settings</h2>

        <div className="setting-section">
          <label htmlFor="daily-limit">Daily Social Media Limit (minutes)</label>
          <div className="limit-control">
            <input
              type="range"
              id="daily-limit"
              min="30"
              max="180"
              step="15"
              value={userData.dailyLimit}
              onChange={handleLimitChange}
              className="limit-slider"
            />
            <span className="limit-value">{userData.dailyLimit} minutes</span>
          </div>
          <p className="setting-note">
            GlowUp will gently remind you when you're approaching this limit.
          </p>
        </div>

        <div className="setting-section">
          <h3>About GlowUp</h3>
          <p className="setting-description">
            GlowUp helps you build healthier relationships with social media and body image.
            All your data stays on your device — we don't collect anything.
          </p>
        </div>

        <div className="setting-section">
          <button
            className="ghost"
            onClick={() => {
              if (confirm('Clear all your data? This cannot be undone.')) {
                localStorage.removeItem('glowup-user-data');
                window.location.reload();
              }
            }}
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

