import React, { useEffect, useRef } from 'react';
import { UserData } from '../types';
import './Insights.css';

interface InsightsProps {
  userData: UserData;
  onBack: () => void;
}

const Insights: React.FC<InsightsProps> = ({ userData, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    // Generate sample data if not enough entries
    const data = userData.moodEntries.length >= 7
      ? userData.moodEntries.slice(-7)
      : Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 86400000).toDateString(),
          mood: 60 + Math.random() * 20,
          scrollTime: 30 + Math.random() * 40,
        }));

    const maxMood = 100;
    const maxScroll = 90;
    const innerWidth = width - padding * 2;
    const innerHeight = height - padding * 2;

    // Draw axes
    ctx.strokeStyle = 'rgba(29, 27, 37, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw mood line
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding + (index / (data.length - 1 || 1)) * innerWidth;
      const moodY = height - padding - (point.mood / maxMood) * innerHeight;
      if (index === 0) ctx.moveTo(x, moodY);
      else ctx.lineTo(x, moodY);
    });
    ctx.strokeStyle = '#caa6ff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw scroll bars
    const barWidth = innerWidth / data.length - 10;
    data.forEach((point, index) => {
      const x = padding + (index / data.length) * innerWidth + 5;
      const barHeight = (point.scrollTime / maxScroll) * innerHeight * 0.6;
      ctx.fillStyle = '#a6e3c7';
      ctx.fillRect(x, height - padding - barHeight, Math.max(barWidth, 12), barHeight);
    });

    // Draw labels
    ctx.fillStyle = 'rgba(29, 27, 37, 0.6)';
    ctx.font = '12px Space Grotesk';
    data.forEach((point, index) => {
      const x = padding + (index / (data.length - 1 || 1)) * innerWidth;
      const day = new Date(point.date).toLocaleDateString('en-US', { weekday: 'short' });
      ctx.fillText(day, x - 15, height - padding + 16);
    });
  }, [userData.moodEntries]);

  const affirmations = [
    "Nobody's glow is 24/7. Yours is still bright.",
    "You're already enough, no edits needed.",
    "Hydrate, stretch, breathe — repeat.",
    "Your progress is personal. Celebrate the journey.",
    "Bodies aren't filters. You're already enough.",
  ];

  return (
    <div className="insights">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="insights-content">
        <h2>Insights</h2>
        <p className="subtitle">Simple trends that keep things clear</p>

        <div className="insights-grid">
          <div className="insight-card">
            <h3>Mood vs. Scroll Time</h3>
            <canvas ref={canvasRef} width={400} height={250} />
            <p className="insight-note">
              "Looks like shorter scroll days = more chill vibes."
            </p>
          </div>

          <div className="insight-card">
            <h3>Glow Bank</h3>
            <div className="affirmations-list">
              {affirmations.map((affirmation, index) => (
                <div key={index} className="affirmation-item">
                  "{affirmation}"
                </div>
              ))}
            </div>
            <button className="primary small">Shuffle affirmation</button>
          </div>

          <div className="insight-card">
            <h3>Your Stats</h3>
            <div className="stats-list">
              <div className="stat-row">
                <span>Current Streak</span>
                <span className="stat-value">{userData.streak} days</span>
              </div>
              <div className="stat-row">
                <span>Challenges Completed</span>
                <span className="stat-value">{userData.completedChallenges.length}</span>
              </div>
              <div className="stat-row">
                <span>Average Mood</span>
                <span className="stat-value">
                  {userData.moodEntries.length > 0
                    ? Math.round(
                        userData.moodEntries.reduce((sum, e) => sum + e.mood, 0) /
                          userData.moodEntries.length
                      )
                    : 70}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;

