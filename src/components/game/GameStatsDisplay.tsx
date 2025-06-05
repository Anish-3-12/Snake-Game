
import React from 'react';
import { GameLevel, LEVEL_CONFIGS } from '@/components/LevelSelector';

interface GameStatsDisplayProps {
  score: number;
  lives: number;
  currentLevel: GameLevel;
  doublePointsTimer: number;
}

const GameStatsDisplay = ({ score, lives, currentLevel, doublePointsTimer }: GameStatsDisplayProps) => {
  const levelConfig = LEVEL_CONFIGS[currentLevel];
  const finalScore = Math.floor(score * levelConfig.multiplier);

  return (
    <div className="text-center">
      <div className="flex justify-center space-x-8 mb-4">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl px-6 py-3 border border-green-500/30">
          <span className="text-sm text-green-300 block">Score</span>
          <span className="text-2xl font-bold text-green-400">{score}</span>
          {levelConfig.multiplier > 1 && (
            <span className="text-xs text-green-300 block">Final: {finalScore}</span>
          )}
        </div>
        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl px-6 py-3 border border-red-500/30">
          <span className="text-sm text-red-300 block">Lives</span>
          <div className="text-2xl font-bold text-red-400 flex items-center justify-center space-x-1">
            {Array.from({ length: lives }, (_, i) => (
              <span key={i} className="animate-pulse">❤️</span>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl px-6 py-3 border border-blue-500/30">
          <span className="text-sm text-blue-300 block">Level</span>
          <span className="text-2xl font-bold text-blue-400">{levelConfig.name}</span>
          <span className="text-xs text-blue-300 block">{levelConfig.multiplier}x multiplier</span>
        </div>
      </div>
      
      {doublePointsTimer > 0 && (
        <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl px-6 py-2 border border-purple-500/50 animate-pulse">
          <div className="text-purple-300 font-bold flex items-center justify-center space-x-2">
            <span>⭐</span>
            <span>DOUBLE POINTS!</span>
            <span>⭐</span>
            <span className="text-purple-400">({Math.ceil(doublePointsTimer / 60)}s)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStatsDisplay;
