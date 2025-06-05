
import React from 'react';
import { Button } from '@/components/ui/button';
import LevelSelector, { GameLevel, LEVEL_CONFIGS } from '@/components/LevelSelector';

interface GameOverlayProps {
  gameStarted: boolean;
  paused: boolean;
  gameOver: boolean;
  score: number;
  currentLevel: GameLevel;
  user: any;
  onLevelChange: (level: GameLevel) => void;
  onStartGame: () => void;
  onResetGame: () => void;
}

const GameOverlay = ({
  gameStarted,
  paused,
  gameOver,
  score,
  currentLevel,
  user,
  onLevelChange,
  onStartGame,
  onResetGame
}: GameOverlayProps) => {
  const levelConfig = LEVEL_CONFIGS[currentLevel];
  const finalScore = Math.floor(score * levelConfig.multiplier);

  if (!gameStarted) {
    return (
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <LevelSelector 
          currentLevel={currentLevel}
          onLevelChange={onLevelChange}
          onStartGame={onStartGame}
        />
      </div>
    );
  }

  if (paused && gameStarted && !gameOver) {
    return (
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center bg-white/10 rounded-3xl p-8 border border-white/20 backdrop-blur-lg">
          <div className="text-white text-4xl font-bold mb-4 animate-pulse">⏸️ PAUSED</div>
          <p className="text-gray-300">Press SPACE to continue</p>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center bg-white/10 rounded-3xl p-8 border border-red-500/30 backdrop-blur-lg">
          <h3 className="text-red-400 text-4xl font-bold mb-4 animate-pulse">💀 GAME OVER</h3>
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-4 mb-6 border border-yellow-500/30">
            <p className="text-yellow-300 text-xl font-bold">Base Score: {score}</p>
            <p className="text-yellow-300 text-xl font-bold">Final Score: {finalScore}</p>
            <p className="text-gray-400 text-sm">({levelConfig.name} Level - {levelConfig.multiplier}x multiplier)</p>
          </div>
          {!user && (
            <p className="text-cyan-400 mb-6 animate-bounce">🔑 Sign in to save your score!</p>
          )}
          <Button 
            onClick={onResetGame} 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🎮 Play Again
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default GameOverlay;
