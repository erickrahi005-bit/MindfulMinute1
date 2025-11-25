import React, { useState, useEffect, useRef } from 'react';
import './Games.css';

interface GamesProps {
  onBack: () => void;
}

const Games: React.FC<GamesProps> = ({ onBack }) => {
  const [activeGame, setActiveGame] = useState<'bubbles' | 'breathing' | 'affirmations' | 'colors' | 'mandala' | null>(null);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; popped: boolean; animating: boolean }>>([]);
  const [score, setScore] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathProgress, setBreathProgress] = useState(0);
  
  // Floating Affirmations game state
  const [affirmations, setAffirmations] = useState<Array<{ id: number; text: string; x: number; y: number; caught: boolean }>>([]);
  const [affirmationScore, setAffirmationScore] = useState(0);
  const affirmationMessages = [
    "You're doing great",
    "Take your time",
    "You're enough",
    "Breathe deeply",
    "You've got this",
    "You're strong",
    "Be kind to yourself",
    "Progress, not perfection",
  ];
  
  // Color Therapy game state
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorIntensity, setColorIntensity] = useState(50);
  const colors = [
    { name: 'Calm Blue', hex: '#cdd8ff', emoji: '💙' },
    { name: 'Peaceful Green', hex: '#d1f1e2', emoji: '💚' },
    { name: 'Warm Pink', hex: '#f7d4e8', emoji: '💗' },
    { name: 'Soft Lavender', hex: '#d8ccff', emoji: '💜' },
    { name: 'Sunny Yellow', hex: '#fff4c1', emoji: '💛' },
  ];
  
  // Mandala Drawing game state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [currentColor, setCurrentColor] = useState('#9f7aea');

  // Bubble Pop - Remove limit and fix styling
  useEffect(() => {
    if (activeGame === 'bubbles') {
      const interval = setInterval(() => {
        setBubbles(prev => {
          // Remove popped bubbles after animation
          const activeBubbles = prev.filter(b => !b.popped || b.animating);
          // Add new bubble (no limit)
          return [
            ...activeBubbles,
            {
              id: Date.now() + Math.random(),
              x: Math.random() * 80 + 10,
              y: Math.random() * 60 + 20,
              popped: false,
              animating: false,
            },
          ];
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setBubbles([]);
      setScore(0);
    }
  }, [activeGame]);

  // Remove popped bubbles after animation
  useEffect(() => {
    if (activeGame === 'bubbles') {
      const timeout = setTimeout(() => {
        setBubbles(prev => prev.filter(b => !b.popped || b.animating));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [bubbles, activeGame]);

  // Breathing game
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

  // Floating Affirmations game
  useEffect(() => {
    if (activeGame === 'affirmations') {
      const interval = setInterval(() => {
        setAffirmations(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            text: affirmationMessages[Math.floor(Math.random() * affirmationMessages.length)],
            x: Math.random() * 80 + 10,
            y: -10,
            caught: false,
          },
        ]);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setAffirmations([]);
      setAffirmationScore(0);
    }
  }, [activeGame]);

  // Animate affirmations falling
  useEffect(() => {
    if (activeGame === 'affirmations') {
      const interval = setInterval(() => {
        setAffirmations(prev => prev.map(a => ({
          ...a,
          y: a.y + 0.5,
        })).filter(a => a.y < 110 && !a.caught));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [activeGame, affirmations]);

  // Mandala drawing setup
  useEffect(() => {
    if (activeGame === 'mandala' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#fdfbff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [activeGame]);

  const handleBubblePop = (id: number) => {
    setBubbles(prev => prev.map(b => 
      b.id === id ? { ...b, popped: true, animating: true } : b
    ));
    setScore(prev => prev + 1);
    // Remove after animation
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 300);
  };

  const handleAffirmationCatch = (id: number) => {
    setAffirmations(prev => prev.map(a => 
      a.id === id ? { ...a, caught: true } : a
    ));
    setAffirmationScore(prev => prev + 1);
    setTimeout(() => {
      setAffirmations(prev => prev.filter(a => a.id !== id));
    }, 200);
  };

  const handleMandalaDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = currentColor;
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const resetMandala = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#fdfbff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Bubble Pop Game
  if (activeGame === 'bubbles') {
    return (
      <div className="games">
        <button className="back-btn" onClick={() => setActiveGame(null)}>← Back</button>
        <div className="game-container">
          <h2>Pastel Bubble Pop</h2>
          <p className="score">Score: {score}</p>
          <div className="bubble-area">
            {bubbles.map(bubble => (
              <div
                key={bubble.id}
                className={`bubble ${bubble.popped ? 'popped' : ''}`}
                style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
                onClick={() => !bubble.popped && handleBubblePop(bubble.id)}
              >
                {bubble.popped ? '✨' : '💭'}
              </div>
            ))}
          </div>
          <p className="game-instruction">Tap the bubbles to pop them! No limits, just relax.</p>
        </div>
      </div>
    );
  }

  // Breathing Game
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

  // Floating Affirmations Game
  if (activeGame === 'affirmations') {
    return (
      <div className="games">
        <button className="back-btn" onClick={() => setActiveGame(null)}>← Back</button>
        <div className="game-container">
          <h2>Floating Affirmations</h2>
          <p className="score">Caught: {affirmationScore}</p>
          <div className="affirmations-area">
            {affirmations.map(affirmation => (
              <div
                key={affirmation.id}
                className={`floating-affirmation ${affirmation.caught ? 'caught' : ''}`}
                style={{ left: `${affirmation.x}%`, top: `${affirmation.y}%` }}
                onClick={() => !affirmation.caught && handleAffirmationCatch(affirmation.id)}
              >
                {affirmation.text}
              </div>
            ))}
          </div>
          <p className="game-instruction">Catch the affirmations as they float by!</p>
        </div>
      </div>
    );
  }

  // Color Therapy Game
  if (activeGame === 'colors') {
    return (
      <div className="games">
        <button className="back-btn" onClick={() => setActiveGame(null)}>← Back</button>
        <div className="game-container">
          <h2>Color Therapy</h2>
          <p className="game-instruction">Choose a color and adjust the intensity to create your calming space</p>
          <div className="color-therapy-area" style={{
            background: selectedColor ? `linear-gradient(135deg, ${selectedColor}, rgba(255,255,255,0.8))` : 'var(--gradient)',
            opacity: selectedColor ? colorIntensity / 100 : 1,
          }}>
            <div className="color-picker">
              {colors.map(color => (
                <button
                  key={color.hex}
                  className={`color-option ${selectedColor === color.hex ? 'selected' : ''}`}
                  style={{ background: color.hex }}
                  onClick={() => setSelectedColor(color.hex)}
                >
                  <span className="color-emoji">{color.emoji}</span>
                  <span className="color-name">{color.name}</span>
                </button>
              ))}
            </div>
            {selectedColor && (
              <div className="intensity-control">
                <label>Intensity: {colorIntensity}%</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={colorIntensity}
                  onChange={(e) => setColorIntensity(Number(e.target.value))}
                  className="intensity-slider"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mandala Drawing Game
  if (activeGame === 'mandala') {
    return (
      <div className="games">
        <button className="back-btn" onClick={() => setActiveGame(null)}>← Back</button>
        <div className="game-container">
          <h2>Mandala Drawing</h2>
          <p className="game-instruction">Draw freely and create your own calming mandala</p>
          <div className="mandala-container">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="mandala-canvas"
              onMouseDown={() => setIsDrawing(true)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              onMouseMove={handleMandalaDraw}
            />
            <div className="mandala-controls">
              <div className="brush-controls">
                <label>Brush Size: {brushSize}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                />
              </div>
              <div className="color-controls">
                {['#9f7aea', '#cdd8ff', '#f7d4e8', '#d1f1e2', '#ffdac1'].map(color => (
                  <button
                    key={color}
                    className={`color-btn ${currentColor === color ? 'active' : ''}`}
                    style={{ background: color }}
                    onClick={() => setCurrentColor(color)}
                  />
                ))}
              </div>
              <button className="primary small" onClick={resetMandala}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Selection Menu
  return (
    <div className="games">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="games-content">
        <h2>Calming Games</h2>
        <p className="subtitle">Quick resets instead of doomscrolling</p>

        <div className="games-grid">
          <div className="game-card" onClick={() => setActiveGame('bubbles')}>
            <h3>Pastel Bubble Pop</h3>
            <p>Tap floating bubbles to pop them - endless fun!</p>
            <button className="primary small">Play</button>
          </div>

          <div className="game-card" onClick={() => setActiveGame('breathing')}>
            <h3>Breathing Bloom</h3>
            <p>Follow the breathing guide and watch a flower bloom</p>
            <button className="primary small">Start</button>
          </div>

          <div className="game-card" onClick={() => setActiveGame('affirmations')}>
            <h3>Floating Affirmations</h3>
            <p>Catch gentle phrases to collect calm points</p>
            <button className="primary small">Play</button>
          </div>

          <div className="game-card" onClick={() => setActiveGame('colors')}>
            <h3>Color Therapy</h3>
            <p>Immerse yourself in calming colors</p>
            <button className="primary small">Start</button>
          </div>

          <div className="game-card" onClick={() => setActiveGame('mandala')}>
            <h3>Mandala Drawing</h3>
            <p>Draw freely and create your own calming patterns</p>
            <button className="primary small">Draw</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
