import React from 'react';
import { UserData, Challenge } from '../types';
import './Challenges.css';

interface ChallengesProps {
  userData: UserData;
  onCompleteChallenge: (id: string) => void;
  onBack: () => void;
}

const Challenges: React.FC<ChallengesProps> = ({ userData, onCompleteChallenge, onBack }) => {
  const incompleteChallenges = userData.challenges.filter(c => !c.completed);
  const completedChallenges = userData.challenges.filter(c => c.completed);

  const handleComplete = (id: string) => {
    onCompleteChallenge(id);
  };

  return (
    <div className="challenges">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="challenges-content">
        <h2>Wellness Challenges</h2>
        <p className="subtitle">Quick 1-3 minute tasks to build healthier habits</p>

        {incompleteChallenges.length > 0 && (
          <div className="challenges-section">
            <h3>Active Challenges</h3>
            <div className="challenges-list">
              {incompleteChallenges.map((challenge) => (
                <div key={challenge.id} className="challenge-item">
                  <div className="challenge-info">
                    <h4>{challenge.title}</h4>
                    <p>{challenge.description}</p>
                    <span className="challenge-badge">{challenge.category}</span>
                  </div>
                  <button
                    className="primary small"
                    onClick={() => handleComplete(challenge.id)}
                  >
                    Complete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedChallenges.length > 0 && (
          <div className="challenges-section">
            <h3>Completed Today ✨</h3>
            <div className="challenges-list">
              {completedChallenges.map((challenge) => (
                <div key={challenge.id} className="challenge-item completed">
                  <div className="challenge-info">
                    <h4>{challenge.title}</h4>
                    <p>{challenge.description}</p>
                  </div>
                  <span className="checkmark">✓</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {incompleteChallenges.length === 0 && completedChallenges.length === 0 && (
          <div className="empty-state">
            <p>No challenges available right now. Check back tomorrow!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;

