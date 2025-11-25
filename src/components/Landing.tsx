import React, { useState } from 'react';
import './Landing.css';

interface LandingProps {
  onNameSubmit: (name: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        onNameSubmit(name.trim());
      }, 300);
    }
  };

  return (
    <div className={`landing ${isAnimating ? 'fade-out' : ''}`}>
      <div className="landing-content">
        <div className="landing-header">
          <div className="landing-icon">✨</div>
          <h1>Welcome to GlowUp</h1>
          <p className="landing-subtitle">Your mindful space for healthier scrolling</p>
        </div>

        <form onSubmit={handleSubmit} className="name-form">
          <label htmlFor="name-input" className="name-label">
            What should we call you?
          </label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="name-input"
            autoFocus
            maxLength={20}
          />
          <button
            type="submit"
            className="name-submit-btn"
            disabled={!name.trim()}
          >
            Let's Begin
          </button>
        </form>

        <div className="landing-features">
          <div className="feature-item">
            <span className="feature-icon">🌱</span>
            <p>Build healthy habits</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🧘</span>
            <p>Mindful moments</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💫</span>
            <p>Track your progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

