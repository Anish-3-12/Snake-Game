
import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface SnakeSegmentProps {
  segment: Position;
  index: number;
  snake: Position[];
  direction: Position;
  GRID_SIZE: number;
}

const SnakeSegment = ({ segment, index, snake, direction, GRID_SIZE }: SnakeSegmentProps) => {
  const isHead = index === 0;
  const isTail = index === snake.length - 1;
  const nextSegment = snake[index + 1];
  const prevSegment = snake[index - 1];

  const getSegmentStyle = () => {
    let borderRadius = '';
    
    if (isHead) {
      if (direction.x === 1) borderRadius = 'rounded-r-full rounded-l-sm';
      else if (direction.x === -1) borderRadius = 'rounded-l-full rounded-r-sm';
      else if (direction.y === 1) borderRadius = 'rounded-b-full rounded-t-sm';
      else if (direction.y === -1) borderRadius = 'rounded-t-full rounded-b-sm';
    } else if (isTail && snake.length > 1) {
      const tailDirection = {
        x: segment.x - prevSegment!.x,
        y: segment.y - prevSegment!.y
      };
      if (tailDirection.x === 1) borderRadius = 'rounded-r-full rounded-l-sm';
      else if (tailDirection.x === -1) borderRadius = 'rounded-l-full rounded-r-sm';
      else if (tailDirection.y === 1) borderRadius = 'rounded-b-full rounded-t-sm';
      else if (tailDirection.y === -1) borderRadius = 'rounded-t-full rounded-b-sm';
    } else {
      borderRadius = 'rounded-sm';
    }

    return borderRadius;
  };

  const renderEyes = () => {
    if (!isHead) return null;

    const eyePositions = {
      right: (
        <>
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <div className="absolute top-2.5 right-2.5 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute bottom-2.5 right-2.5 w-1 h-1 bg-black rounded-full"></div>
        </>
      ),
      left: (
        <>
          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <div className="absolute top-2.5 left-2.5 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute bottom-2.5 left-2.5 w-1 h-1 bg-black rounded-full"></div>
        </>
      ),
      up: (
        <>
          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <div className="absolute top-2.5 left-2.5 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute top-2.5 right-2.5 w-1 h-1 bg-black rounded-full"></div>
        </>
      ),
      down: (
        <>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          <div className="absolute bottom-2.5 left-2.5 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute bottom-2.5 right-2.5 w-1 h-1 bg-black rounded-full"></div>
        </>
      )
    };

    if (direction.x === 1) return eyePositions.right;
    if (direction.x === -1) return eyePositions.left;
    if (direction.y === -1) return eyePositions.up;
    if (direction.y === 1) return eyePositions.down;

    return null;
  };

  return (
    <div
      className={`absolute transition-all duration-75 ${getSegmentStyle()} ${
        isHead 
          ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_15px_rgba(34,197,94,0.6)] border-2 border-green-300' 
          : 'bg-gradient-to-br from-green-500 to-green-700 shadow-[0_0_10px_rgba(34,197,94,0.4)] border border-green-400'
      }`}
      style={{
        left: segment.x * GRID_SIZE,
        top: segment.y * GRID_SIZE,
        width: GRID_SIZE,
        height: GRID_SIZE,
        transform: isHead ? 'scale(1.05)' : 'scale(1)',
        zIndex: isHead ? 10 : 5,
      }}
    >
      {isHead && (
        <div className="relative w-full h-full">
          {renderEyes()}
        </div>
      )}
    </div>
  );
};

export default SnakeSegment;
