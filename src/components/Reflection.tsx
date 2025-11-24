import React, { useState } from 'react';
import { UserData } from '../types';
import './Reflection.css';

interface ReflectionProps {
  userData: UserData;
  onComplete: (mood: number, answers: string[]) => void;
  onBack: () => void;
}

const questions = [
  {
    id: 'mood',
    question: "How's your scroll vibe right now?",
    options: ['Chill 😌', 'Meh 😐', 'Over it 😤'],
  },
  {
    id: 'smile',
    question: "Did anything online make you smile today?",
    options: ['Yes! 😊', 'Not really', "Haven't checked yet"],
  },
  {
    id: 'proud',
    question: "One thing you're proud of this week?",
    options: ['School stuff', 'Something creative', 'Helping someone', 'Just getting through it'],
  },
];

const Reflection: React.FC<ReflectionProps> = ({ userData, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [mood, setMood] = useState(70);

  const handleMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMood(Number(e.target.value));
  };

  if (currentQuestion === 0) {
    return (
      <div className="reflection">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="reflection-content">
          <h2>Daily Reflection</h2>
          <p className="subtitle">Let's check in with how you're feeling</p>
          
          <div className="mood-slider-container">
            <label>Overall mood today: {mood}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={mood}
              onChange={handleMoodChange}
              className="mood-slider"
            />
            <div className="mood-labels">
              <span>Not great</span>
              <span>Okay</span>
              <span>Amazing</span>
            </div>
          </div>

          <button
            className="primary"
            onClick={() => setCurrentQuestion(1)}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion - 1];

  return (
    <div className="reflection">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="reflection-content">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
          />
        </div>
        
        <h2>{question.question}</h2>
        
        <div className="options-list">
          {question.options.map((option) => (
            <button
              key={option}
              className="option-btn"
              onClick={() => {
                const newAnswers = { ...answers, [question.id]: option };
                setAnswers(newAnswers);
                
                if (currentQuestion < questions.length) {
                  const nextQuestion = currentQuestion + 1;
                  if (nextQuestion === questions.length) {
                    // Last question answered
                    onComplete(mood, Object.values(newAnswers));
                  } else {
                    setCurrentQuestion(nextQuestion);
                  }
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reflection;


