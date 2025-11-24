# GlowUp • Social Media Sidekick

An interactive TypeScript React MVP for a teen-friendly wellness app that encourages healthy social media habits.

## Features

- **Daily Reflection Prompts** - Interactive mood check-ins with simple questions
- **Wellness Challenges** - 1-3 minute tasks to build healthier habits
- **Calming Mini Games** - Bubble pop and breathing exercises
- **Time Limiters** - Gentle reminders for social media breaks
- **Insights Dashboard** - Visual mood tracking and statistics
- **Local Storage** - All data saved locally on your device

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS (no frameworks - pure pastel aesthetic)

## Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

The `dist` folder will contain the production-ready files.

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy" - no configuration needed!

### Option 2: Vercel CLI

```bash
npm i -g vercel
cd glowup
vercel
```

The `vercel.json` file is already configured, but Vercel's auto-detection should work without it.

## Project Structure

```
glowup/
├── src/
│   ├── components/     # React components
│   ├── types.ts        # TypeScript interfaces
│   ├── utils/          # Storage utilities
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

## Features in Detail

### Dashboard
- Personalized greeting based on time of day
- Daily affirmation
- Quick stats (mood, streak, screen time)
- Challenge preview

### Reflection
- Mood slider (0-100%)
- Multiple choice questions
- Progress tracking
- Completion summary

### Challenges
- Three categories: Be Real, Recharge, Self-Hype
- Mark challenges as complete
- Track completion history

### Games
- **Bubble Pop**: Tap pastel bubbles to pop them
- **Breathing Bloom**: Guided breathing exercise with visual feedback
- More games coming soon!

### Insights
- Mood vs. Scroll Time chart
- Glow Bank (saved affirmations)
- Personal statistics

### Settings
- Adjustable daily social media limit
- Data management
- App information

## Design Philosophy

- **Soft Pastel Aesthetic**: Calming colors and gradients
- **Teen-Friendly Tone**: Casual, supportive, never clinical
- **No Shame**: All messaging is encouraging and optional
- **Privacy First**: All data stored locally, nothing sent to servers

## Future Enhancements

- Push notifications for body image reminders
- More mini games
- Friend encouragement system
- Widget support for iOS/Android
- Social media time tracking integration
