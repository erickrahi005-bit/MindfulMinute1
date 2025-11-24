import React, { useState, useEffect } from 'react';
import './Games.css';

interface GamesProps {
  onBack: () => void;
}

const Games: React.FC<GamesProps> = ({ onBack }) => {
  const [activeGame, setActiveGame] = useState<'bubbles' | 'breathing' | null>(null);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; popped: boolean }>>([]);
  const [score, setScore] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathProgress, setBreathProgress] = useState(0);

  const affirmations = [
    "You're doing fine",
    "Take a deep breath",
    "You're enough",
    "Breathe, you're okay",
    "You've got this",
  ];

  useEffect(() => {
    if (activeGame === 'bubbles') {
      const interval = setInterval(() => {
        if (bubbles.length < 10) {
          setBubbles(prev => [
            ...prev,
            {
              id: Date.now(),
              x: Math.random() * 80 + 10,
              y: Math.random() * 60 + 20,
              popped: false,
            },
          ]);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeGame, bubbles.length]);

  useEffect(() => {
    if (activeGame === 'breathing') {
      const interval = setInterval(() => {
        setBreathProgress(prev => {
          if (prev >= 100) {
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return 0;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return 0;
            } else {
              setBreathingPhase('inhale');
              return 0;
            }
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [activeGame, breathingPhase]);

  const handleBubblePop = (id: number) => {
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    setScore(prev => prev + 1);
  };

  if (activeGame === 'bubbles') {
    return (
      <div className="games">
        <button className="back-btn" onClick={() => setActiveGame(null)}>← Back</button>
        <div className="game-container">
          <h2>Pastel Bubble Pop</h2>
          <p className="score">Score: {score}</p>
          <div className="bubble-area">
            {bubbles.map(bubble => (
              <button
                key={bubble.id}
                className={`bubble ${bubble.popped ? 'popped' : ''}`}
                style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
                onClick={() => !bubble.popped && handleBubblePop(bubble.id)}
              >
                {bubble.popped ? '✨' : '💭'}
              </button>
            ))}
          </div>
          <p className="game-instruction">Tap the bubbles to pop them!</p>
        </div>
      </div>
    );
  }

  if (activeGame === 'breathing') {
    const size = 50 + (breathProgress / 2);
    return (
      <div className="games">
        <button className="back-btn" onClick={() => setActiveGame(null)}>← Back</button>
        <div className="game-container">
          <h2>Breathing Bloom</h2>
          <div className="breathing-container">
            <div
              className="breathing-circle"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: breathingPhase === 'inhale' 
                  ? 'linear-gradient(135deg, #f7d4e8, #cdd8ff)'
                  : breathingPhase === 'hold'
                  ? 'linear-gradient(135deg, #cdd8ff, #d1f1e2)'
                  : 'linear-gradient(135deg, #d1f1e2, #f7d4e8)',
              }}
            >
              <span className="breath-text">
                {breathingPhase === 'inhale' ? 'Breathe In' : breathingPhase === 'hold' ? 'Hold' : 'Breathe Out'}
              </span>
            </div>
          </div>
          <p className="game-instruction">
            {breathingPhase === 'inhale' && 'Breathe in slowly...'}
            {breathingPhase === 'hold' && 'Hold your breath...'}
            {breathingPhase === 'exhale' && 'Breathe out gently...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="games">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="games-content">
        <h2>Calming Games</h2>
        <p className="subtitle">Quick resets instead of doomscrolling</p>

        <div className="games-grid">
          <div className="game-card" onClick={() => setActiveGame('bubbles')}>
            <h3>Pastel Bubble Pop</h3>
            <p>Tap floating bubbles to reveal supportive notes</p>
            <button className="primary small">Play</button>
          </div>

          <div className="game-card" onClick={() => setActiveGame('breathing')}>
            <h3>Breathing Bloom</h3>
            <p>Follow the breathing guide and watch a flower bloom</p>
            <button className="primary small">Start</button>
          </div>

          <div className="game-card">
            <h3>Floating Affirmations</h3>
            <p>Catch gentle phrases to collect calm points</p>
            <button className="ghost small" disabled>Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;

