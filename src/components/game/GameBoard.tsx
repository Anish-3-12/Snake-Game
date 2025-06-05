
import React from 'react';
import SnakeSegment from './SnakeSegment';
import FruitComponent from './FruitComponent';

interface Position {
  x: number;
  y: number;
}

interface Fruit {
  position: Position;
  type: 'normal' | 'extra_life' | 'double_points';
  points: number;
}

interface GameBoardProps {
  snake: Position[];
  direction: Position;
  fruit: Fruit | null;
  CANVAS_WIDTH: number;
  CANVAS_HEIGHT: number;
  GRID_SIZE: number;
  children?: React.ReactNode;
}

const GameBoard = ({ 
  snake, 
  direction, 
  fruit, 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  GRID_SIZE,
  children 
}: GameBoardProps) => {
  return (
    <div className="relative">
      <div 
        className="relative border-4 border-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl"
        style={{ 
          width: CANVAS_WIDTH, 
          height: CANVAS_HEIGHT,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          boxShadow: '0 0 50px rgba(34, 197, 94, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <SnakeSegment
            key={index}
            segment={segment}
            index={index}
            snake={snake}
            direction={direction}
            GRID_SIZE={GRID_SIZE}
          />
        ))}

        {/* Fruit */}
        {fruit && (
          <FruitComponent fruit={fruit} GRID_SIZE={GRID_SIZE} />
        )}

        {/* Overlays */}
        {children}
      </div>
    </div>
  );
};

export default GameBoard;
