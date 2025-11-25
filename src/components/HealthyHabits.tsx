import React, { useState } from 'react';
import './HealthyHabits.css';

interface HealthyHabitsProps {
  onBack: () => void;
}

interface Recipe {
  id: string;
  title: string;
  category: 'breakfast' | 'lunch-dinner' | 'snack';
  ingredients: string[];
  steps: string[];
  wellnessReminder: string;
}

const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Berry Yogurt Glow Bowl',
    category: 'breakfast',
    ingredients: [
      '1 cup yogurt (Greek or regular)',
      'A handful of berries (fresh or frozen)',
      '1–2 tbsp granola',
      'Honey or maple syrup',
      'Chia seeds (optional)',
    ],
    steps: [
      'Add yogurt to a bowl.',
      'Top with berries and granola.',
      'Drizzle honey and sprinkle chia.',
    ],
    wellnessReminder: 'This bowl fuels your brain and gives steady energy for the day.',
  },
  {
    id: '2',
    title: 'Avocado Toast Upgrade',
    category: 'breakfast',
    ingredients: [
      '1–2 slices whole grain bread',
      '½ ripe avocado',
      'Salt, pepper, lemon',
      'Optional: egg, tomato slices',
    ],
    steps: [
      'Toast bread.',
      'Mash avocado with lemon, salt, and pepper.',
      'Spread it on the toast and add toppings if you want.',
    ],
    wellnessReminder: 'Healthy fats support mood and focus.',
  },
  {
    id: '3',
    title: 'Pasta Primavera (15 minutes)',
    category: 'lunch-dinner',
    ingredients: [
      'Pasta',
      'Frozen mixed veggies or cherry tomatoes',
      'Olive oil or pesto',
      'Salt + garlic',
    ],
    steps: [
      'Boil pasta and cook veggies in the same pot.',
      'Drain and toss with olive oil or pesto.',
      'Season with salt and garlic.',
    ],
    wellnessReminder: 'Carbs give energy, veggies add color and nutrients.',
  },
  {
    id: '4',
    title: 'Peanut Butter Banana Wrap',
    category: 'snack',
    ingredients: [
      'Whole grain tortilla',
      '1–2 tbsp peanut butter or almond butter',
      '1 banana',
      'Cinnamon',
    ],
    steps: [
      'Spread peanut butter on tortilla.',
      'Add banana and roll it up.',
      'Sprinkle with cinnamon.',
    ],
    wellnessReminder: 'Great for quick energy before school or a workout.',
  },
  {
    id: '5',
    title: 'Cozy Veggie Rice Bowl',
    category: 'lunch-dinner',
    ingredients: [
      'Cooked rice (leftover works)',
      'Frozen vegetables',
      'Soy sauce + sesame oil',
      'Optional: scrambled egg or tofu',
    ],
    steps: [
      'Heat rice in a pan.',
      'Add vegetables and let them steam.',
      'Stir in soy sauce and sesame oil.',
      'Add scrambled egg if you want extra protein.',
    ],
    wellnessReminder: 'Warm, filling, grounding — a comfort meal that still nourishes.',
  },
  {
    id: '6',
    title: 'Quick Tuna or Chickpea Melt',
    category: 'lunch-dinner',
    ingredients: [
      'Whole grain bread',
      'Canned tuna or mashed chickpeas',
      'Mayo or hummus',
      'Cheese slice',
      'Salt + pepper',
    ],
    steps: [
      'Mix tuna/chickpeas with mayo or hummus.',
      'Spread on bread, add cheese.',
      'Toast or broil until melted.',
    ],
    wellnessReminder: 'Protein helps you stay satisfied and energized.',
  },
  {
    id: '7',
    title: 'Fruit + Nut Energy Snack Cups',
    category: 'snack',
    ingredients: [
      'Apple slices or grapes',
      'A small handful of nuts',
      'A few chocolate chips or raisins',
    ],
    steps: [
      'Combine fruit, nuts, and chocolate chips.',
      'Mix and eat as a balanced snack.',
    ],
    wellnessReminder: 'Snacks that mix carbs, fats, and protein keep energy steady.',
  },
  {
    id: '8',
    title: 'Smoothie for Focus',
    category: 'breakfast',
    ingredients: [
      '1 banana',
      'Frozen strawberries',
      'Spinach (optional)',
      'Milk or oat milk',
      'Nut butter or yogurt',
    ],
    steps: [
      'Add all ingredients to blender.',
      'Blend until smooth.',
    ],
    wellnessReminder: 'Smoothies are an easy way to hydrate and refuel.',
  },
  {
    id: '9',
    title: 'Simple Chicken or Tofu Stir-Fry',
    category: 'lunch-dinner',
    ingredients: [
      'Chicken strips or tofu cubes',
      'Any veggies',
      'Soy sauce + honey',
      'Rice or noodles',
    ],
    steps: [
      'Cook chicken or tofu in a pan.',
      'Add veggies.',
      'Pour a little soy sauce + honey.',
      'Serve over rice/noodles.',
    ],
    wellnessReminder: 'Balanced meals support stable mood and concentration.',
  },
  {
    id: '10',
    title: '"Everything-In-It" Wrap',
    category: 'lunch-dinner',
    ingredients: [
      'Tortilla',
      'Lettuce or spinach',
      'Any vegetables you like',
      'Cheese',
      'Hummus',
    ],
    steps: [
      'Spread hummus on wrap.',
      'Add veggies and cheese.',
      'Roll up and enjoy.',
    ],
    wellnessReminder: 'Colorful meals usually mean more nutrients.',
  },
];

const quickBreakOptions = [
  'Do five jumping jacks',
  'Walk for 5 minutes',
  'Do a quick stretch',
  '5 squats',
  '5 high knees',
];

const HealthyHabits: React.FC<HealthyHabitsProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'breakfast' | 'lunch-dinner' | 'snack'>('all');
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [currentQuickBreak, setCurrentQuickBreak] = useState<string>(
    quickBreakOptions[Math.floor(Math.random() * quickBreakOptions.length)]
  );

  const filteredRecipes = selectedCategory === 'all'
    ? recipes
    : recipes.filter(r => r.category === selectedCategory);

  const getNewQuickBreak = () => {
    const randomIndex = Math.floor(Math.random() * quickBreakOptions.length);
    setCurrentQuickBreak(quickBreakOptions[randomIndex]);
  };

  return (
    <div className="healthy-habits">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="healthy-habits-content">
        <h2>Healthy Habits</h2>
        <p className="subtitle">Safe, balanced alternatives to extreme routines</p>

        {/* Quick Break Section */}
        <div className="quick-break-section">
          <h3>Quick Break</h3>
          <p className="section-description">Take a gentle movement break</p>
          <div className="quick-break-card">
            <p className="quick-break-text">{currentQuickBreak}</p>
            <button className="primary" onClick={getNewQuickBreak}>
              Get New Activity
            </button>
          </div>
        </div>

        {/* Recipe Section */}
        <div className="recipes-section">
          <h3>Healthy Recipe Ideas</h3>
          <p className="section-description">Easy, balanced meals that nourish your body and mind</p>

          <div className="category-filters">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'breakfast' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('breakfast')}
            >
              Breakfast
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'lunch-dinner' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('lunch-dinner')}
            >
              Lunch/Dinner
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'snack' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('snack')}
            >
              Snacks
            </button>
          </div>

          <div className="recipes-list">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className={`recipe-card ${expandedRecipe === recipe.id ? 'expanded' : ''}`}
                onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
              >
                <div className="recipe-header">
                  <h4>{recipe.title}</h4>
                  <span className="recipe-category">{recipe.category}</span>
                </div>
                
                {expandedRecipe === recipe.id && (
                  <div className="recipe-details">
                    <div className="recipe-section">
                      <h5>Ingredients:</h5>
                      <ul>
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="recipe-section">
                      <h5>Steps:</h5>
                      <ol>
                        {recipe.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="wellness-reminder">
                      <strong>Wellness reminder:</strong> {recipe.wellnessReminder}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthyHabits;

