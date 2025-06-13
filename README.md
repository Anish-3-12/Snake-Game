
# 🐍 Snake Powerup Mania

A modern web-based Snake game with exciting powerups and special features, created as a college project by Anish Sabale.

## 🎮 Game Description

Snake Powerup Mania is an enhanced version of the classic Snake game featuring multiple types of fruits with special abilities, a lives system, and beautiful modern graphics. Players control a snake that grows as it eats fruits, with the goal of achieving the highest score possible while avoiding collisions.

## 🕹️ Game Rules

### Basic Gameplay
- Control the snake using arrow keys (⬅️ ➡️ ⬆️ ⬇️) or WASD keys
- The snake moves continuously in the current direction
- Eat fruits to grow the snake and increase your score
- Avoid hitting the walls or the snake's own body
- The game ends when all lives are lost

### Lives System
- Players start with 3 lives
- Lose a life when the snake hits a wall or itself
- Gain extra lives by eating special cyan fruits

### Fruit Types & Powerups
1. **🍎 Red Fruit (Normal)**
   - Points: +10
   - Effect: Standard fruit that grows the snake

2. **💎 Cyan Fruit (Extra Life)**
   - Points: +50
   - Effect: Adds one extra life to your total

3. **⭐ Purple Fruit (Double Points)**
   - Points: +30
   - Effect: Activates double points mode for 5 seconds

### Controls
- **Arrow Keys / WASD**: Move the snake
- **Spacebar**: Pause/Resume the game
- **Play Again Button**: Restart after game over

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - Beautiful and accessible UI component library

### Backend & Database
- **Supabase** - Backend-as-a-Service for authentication and data storage
- **PostgreSQL** - Relational database (via Supabase)

### State Management & Data Fetching
- **TanStack React Query** - Powerful data synchronization for React
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### UI & Icons
- **Lucide React** - Beautiful & consistent icon toolkit
- **Recharts** - Composable charting library for React
- **React Router DOM** - Declarative routing for React

### Additional Libraries
- **class-variance-authority** - Building type-safe component APIs
- **clsx & tailwind-merge** - Utility for constructing className strings
- **date-fns** - Modern JavaScript date utility library
- **Sonner** - Opinionated toast component for React

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd snake-powerup-mania
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🎯 Features

- **Responsive Design**: Works on both desktop and mobile devices
- **User Authentication**: Sign up/Sign in to save high scores
- **Online Leaderboard**: Compete with other players globally
- **Smooth Animations**: Beautiful visual effects and transitions
- **Pause/Resume**: Game state preservation
- **Multiple Difficulty Levels**: Easy, Medium, and Hard modes
- **Real-time Score Tracking**: Live score updates and statistics

## 🏆 Scoring System

- Normal fruit: 10 points
- Extra life fruit: 50 points
- Double points fruit: 30 points (+ 2x multiplier for 5 seconds)
- Bonus points for longer survival times

## 🎨 Game Design

The game features a modern dark theme with:
- Gradient backgrounds from purple to blue
- Glowing effects for special fruits
- Smooth animations and transitions
- Responsive design for all screen sizes
- Beautiful glassmorphism UI elements

## 👨‍💻 Author

**Anish Sabale**
- College Project
- Computer Science Student

## 📝 License

This project is created for educational purposes as part of a college assignment.

## 🐍 Python Version

A desktop version of this game is also available in Python using Pygame. To run the desktop version:

```bash
# Install pygame
pip install pygame

# Run the game
python src/snake_game.py
```

---

