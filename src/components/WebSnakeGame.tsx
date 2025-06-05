
import React, { useState } from 'react';
import { GameLevel } from './LevelSelector';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameStatsDisplay from './game/GameStatsDisplay';
import GameBoard from './game/GameBoard';
import GameOverlay from './game/GameOverlay';
import GameControlsInfo from './game/GameControlsInfo';

const WebSnakeGame = () => {
  const [currentLevel, setCurrentLevel] = useState<GameLevel>('easy');
  
  const {
    snake,
    direction,
    fruit,
    score,
    lives,
    gameOver,
    gameStarted,
    paused,
    doublePointsTimer,
    levelConfig,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    GRID_SIZE,
    resetGame,
    startGame,
    user
  } = useGameLogic(currentLevel);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Game Stats */}
      <GameStatsDisplay 
        score={score}
        lives={lives}
        currentLevel={currentLevel}
        doublePointsTimer={doublePointsTimer}
      />

      {/* Game Board */}
      <GameBoard
        snake={snake}
        direction={direction}
        fruit={fruit}
        CANVAS_WIDTH={CANVAS_WIDTH}
        CANVAS_HEIGHT={CANVAS_HEIGHT}
        GRID_SIZE={GRID_SIZE}
      >
        <GameOverlay
          gameStarted={gameStarted}
          paused={paused}
          gameOver={gameOver}
          score={score}
          currentLevel={currentLevel}
          user={user}
          onLevelChange={setCurrentLevel}
          onStartGame={startGame}
          onResetGame={resetGame}
        />
      </GameBoard>

      {/* Controls Info */}
      <GameControlsInfo />
    </div>
  );
};

export default WebSnakeGame;
