import React, { useState } from 'react';
import './FactCheck.css';

interface FactCheckProps {
  onBack: () => void;
}

interface MythCard {
  id: string;
  statement: string;
  type: 'myth' | 'reality';
  explanation: string;
}

const mythCards: MythCard[] = [
  {
    id: '1',
    statement: '10,000 steps a day is the only way to stay healthy',
    type: 'myth',
    explanation: 'Movement matters, but there\'s no magic number. Any amount of movement that feels good for your body is valid.',
  },
  {
    id: '2',
    statement: 'You need to eat 1200 calories to lose weight',
    type: 'myth',
    explanation: 'This is dangerously low, especially for teens. Your body needs adequate fuel to function. Restrictive diets can harm your metabolism and mental health.',
  },
  {
    id: '3',
    statement: 'Teenagers must lift heavy to be fit',
    type: 'myth',
    explanation: 'Fitness looks different for everyone. Walking, dancing, sports, yoga—all movement counts. Heavy lifting isn\'t required.',
  },
  {
    id: '4',
    statement: 'Most influencers edit their bodies',
    type: 'reality',
    explanation: 'Many influencers use filters, editing apps, and strategic angles. What you see online often isn\'t reality.',
  },
  {
    id: '5',
    statement: 'Abs don\'t equal health',
    type: 'reality',
    explanation: 'Visible abs are mostly about genetics and body fat percentage, not overall health. Health includes mental wellness, energy, and how you feel.',
  },
];

const redFlags = [
  'Claims without credentials',
  'Extreme before/after photos',
  'Promoting supplements',
  '"What I eat in a day" with unrealistic portions',
  'Hiding sponsorships',
  'Moralizing food ("good" vs "bad")',
];

const helpResources = [
  'Talk to friends',
  'Ask a professional trainer',
  'Ask a nutritionist',
  'Talk to your family physician',
  'Talk to a therapist',
];

const FactCheck: React.FC<FactCheckProps> = ({ onBack }) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<'myths' | 'red-flags' | 'help'>('myths');

  const toggleCard = (id: string) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);
  };

  return (
    <div className="fact-check">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="fact-check-content">
        <h2>Fact-Check Hub</h2>
        <p className="subtitle">Separating fitness myths from reality</p>

        <div className="section-tabs">
          <button
            className={`tab-btn ${activeSection === 'myths' ? 'active' : ''}`}
            onClick={() => setActiveSection('myths')}
          >
            Myth vs Reality
          </button>
          <button
            className={`tab-btn ${activeSection === 'red-flags' ? 'active' : ''}`}
            onClick={() => setActiveSection('red-flags')}
          >
            Red Flags
          </button>
          <button
            className={`tab-btn ${activeSection === 'help' ? 'active' : ''}`}
            onClick={() => setActiveSection('help')}
          >
            Who To Ask
          </button>
        </div>

        {/* Myth vs Reality Section */}
        {activeSection === 'myths' && (
          <div className="myths-section">
            <p className="section-description">Flip the cards to see the truth</p>
            <div className="myth-cards-grid">
              {mythCards.map((card) => {
                const isFlipped = flippedCards.has(card.id);
                return (
                  <div
                    key={card.id}
                    className={`myth-card ${isFlipped ? 'flipped' : ''} ${card.type}`}
                    onClick={() => toggleCard(card.id)}
                  >
                    <div className="card-front">
                      <p className="card-statement">{card.statement}</p>
                      <p className="flip-hint">Tap to flip</p>
                    </div>
                    <div className="card-back">
                      <div className="card-type-badge">{card.type === 'myth' ? 'Myth' : 'Reality'}</div>
                      <p className="card-explanation">{card.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Red Flags Section */}
        {activeSection === 'red-flags' && (
          <div className="red-flags-section">
            <p className="section-description">Watch out for these warning signs</p>
            <div className="red-flags-list">
              {redFlags.map((flag, index) => (
                <div key={index} className="red-flag-item">
                  <span className="flag-icon">⚠️</span>
                  <p>{flag}</p>
                </div>
              ))}
            </div>
            <div className="positive-reminder">
              <p><strong>Remember:</strong> Real health looks different for everyone.</p>
            </div>
          </div>
        )}

        {/* Who To Ask Section */}
        {activeSection === 'help' && (
          <div className="help-section">
            <p className="section-description">Reach out to trusted sources for support</p>
            <div className="help-resources-list">
              {helpResources.map((resource, index) => (
                <div key={index} className="help-resource-item">
                  <span className="help-icon">💬</span>
                  <p>{resource}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactCheck;

