
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type GameLevel = 'easy' | 'medium' | 'hard';

interface LevelConfig {
  name: string;
  speed: number;
  canvasWidth: number;
  canvasHeight: number;
  multiplier: number;
  description: string;
}

export const LEVEL_CONFIGS: Record<GameLevel, LevelConfig> = {
  easy: {
    name: 'Easy',
    speed: 150,
    canvasWidth: 800,
    canvasHeight: 600,
    multiplier: 1,
    description: 'Relaxed pace, full area'
  },
  medium: {
    name: 'Medium',
    speed: 100,
    canvasWidth: 700,
    canvasHeight: 525,
    multiplier: 1.25,
    description: 'Faster speed, medium area'
  },
  hard: {
    name: 'Hard',
    speed: 70,
    canvasWidth: 600,
    canvasHeight: 450,
    multiplier: 1.5,
    description: 'High speed, smaller area'
  }
};

interface LevelSelectorProps {
  currentLevel: GameLevel;
  onLevelChange: (level: GameLevel) => void;
  onStartGame: () => void;
}

const LevelSelector = ({ currentLevel, onLevelChange, onStartGame }: LevelSelectorProps) => {
  const currentConfig = LEVEL_CONFIGS[currentLevel];

  return (
    <div className="text-center bg-white/10 rounded-3xl p-8 border border-white/20 backdrop-blur-lg">
      <h3 className="text-white text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        🐍 Choose Your Challenge
      </h3>
      
      <div className="mb-6">
        <Select value={currentLevel} onValueChange={(value: GameLevel) => onLevelChange(value)}>
          <SelectTrigger className="w-64 mx-auto bg-white/10 border-white/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            {Object.entries(LEVEL_CONFIGS).map(([key, config]) => (
              <SelectItem 
                key={key} 
                value={key}
                className="text-white hover:bg-gray-800 focus:bg-gray-800"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{config.name}</span>
                  <span className="text-sm text-gray-400">({config.multiplier}x score)</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
        <h4 className="text-lg font-bold text-white mb-2">{currentConfig.name} Level</h4>
        <p className="text-gray-300 text-sm mb-2">{currentConfig.description}</p>
        <div className="text-xs text-gray-400 space-y-1">
          <div>Game Area: {currentConfig.canvasWidth} × {currentConfig.canvasHeight}</div>
          <div>Score Multiplier: {currentConfig.multiplier}x</div>
        </div>
      </div>

      <Button 
        onClick={onStartGame} 
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        🎮 Start {currentConfig.name} Level
      </Button>
    </div>
  );
};

export default LevelSelector;
