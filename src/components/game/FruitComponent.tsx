
import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface Fruit {
  position: Position;
  type: 'normal' | 'extra_life' | 'double_points';
  points: number;
}

interface FruitComponentProps {
  fruit: Fruit;
  GRID_SIZE: number;
}

const FruitComponent = ({ fruit, GRID_SIZE }: FruitComponentProps) => {
  const getFruitEmoji = (type: string) => {
    switch (type) {
      case 'extra_life': return '💎';
      case 'double_points': return '⭐';
      default: return '🍎';
    }
  };

  const getFruitGlow = (type: string) => {
    switch (type) {
      case 'extra_life': return 'shadow-[0_0_20px_rgba(0,255,255,0.6)]';
      case 'double_points': return 'shadow-[0_0_20px_rgba(128,0,128,0.6)]';
      default: return 'shadow-[0_0_15px_rgba(255,0,0,0.4)]';
    }
  };

  const getFruitBackground = (type: string) => {
    switch (type) {
      case 'extra_life': return 'linear-gradient(45deg, #00ffff, #0080ff)';
      case 'double_points': return 'linear-gradient(45deg, #800080, #ff00ff)';
      default: return 'linear-gradient(45deg, #ff4444, #ff0000)';
    }
  };

  return (
    <div
      className={`absolute flex items-center justify-center text-2xl transition-all duration-300 rounded-lg ${getFruitGlow(fruit.type)} animate-bounce`}
      style={{
        left: fruit.position.x * GRID_SIZE + 2,
        top: fruit.position.y * GRID_SIZE + 2,
        width: GRID_SIZE - 4,
        height: GRID_SIZE - 4,
        background: getFruitBackground(fruit.type),
      }}
    >
      <span className="animate-pulse">{getFruitEmoji(fruit.type)}</span>
    </div>
  );
};

export default FruitComponent;
