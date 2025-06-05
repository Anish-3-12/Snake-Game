
import React from 'react';

const GameControlsInfo = () => {
  return (
    <div className="text-center text-gray-300 text-sm bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
      <p className="mb-2 font-semibold text-white">🎮 Controls</p>
      <p>Use ⬅️ ➡️ ⬆️ ⬇️ arrow keys or WASD to move • Press SPACE to pause</p>
      <div className="mt-4 flex justify-center space-x-6 text-xs">
        <span className="flex items-center space-x-1">
          <span>🍎</span>
          <span className="text-red-400">🍎 Normal (+10 pts)</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>💎</span>
          <span className="text-cyan-400">💎 Extra Life (+1 life, +50 pts)</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>⭐</span>
          <span className="text-purple-400">⭐ Double Points (2x for 5s, +30 pts)</span>
        </span>
      </div>
    </div>
  );
};

export default GameControlsInfo;
