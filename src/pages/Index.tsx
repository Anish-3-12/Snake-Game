
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import WebSnakeGame from '@/components/WebSnakeGame';
import GameStats from '@/components/GameStats';

const Index = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              🐍 Snake Game with Powerups
            </h1>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white">Welcome, {user.email}!</span>
                  <Button 
                    onClick={signOut}
                    variant="outline"
                    className="bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Sign In / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Web-based Snake Game */}
          <div className="mb-8">
            <WebSnakeGame />
          </div>

          {/* Game Stats */}
          <GameStats />
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">🎮 Game Features</h2>
              <ul className="text-left text-gray-300 space-y-2">
                <li>• Classic snake gameplay with smooth controls</li>
                <li>• Multiple lives system</li>
                <li>• Special powerup fruits with unique effects</li>
                <li>• Online leaderboard with user accounts</li>
                <li>• Beautiful retro-inspired graphics</li>
                <li>• Pause/resume functionality</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">🍎 Fruit Types</h2>
              <ul className="text-left text-gray-300 space-y-2">
                <li>• <span className="text-red-400">Red Fruit</span>: Normal (+10 points)</li>
                <li>• <span className="text-cyan-400">Cyan Fruit</span>: Extra Life (+1 life, +50 points)</li>
                <li>• <span className="text-purple-400">Purple Fruit</span>: Double Points (2x for 5s, +30 points)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">🎯 Controls</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white font-bold">Arrow Keys</div>
                <div className="text-gray-300">Move snake</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white font-bold">Spacebar</div>
                <div className="text-gray-300">Pause/Resume</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white font-bold">Play Again</div>
                <div className="text-gray-300">Restart game</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white font-bold">Sign In</div>
                <div className="text-gray-300">Save scores</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-500/30 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">🚀 Python Version Available</h2>
            <div className="text-left bg-black/30 rounded-xl p-4 font-mono text-sm">
              <div className="text-gray-300 mb-2"># Install pygame if you haven't already:</div>
              <div className="text-green-400 mb-4">pip install pygame</div>
              
              <div className="text-gray-300 mb-2"># Run the desktop version:</div>
              <div className="text-green-400">python src/snake_game.py</div>
            </div>
          </div>
          
          <div className="mt-8 text-gray-400 text-center">
            <p>Created by Anish Sabale</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
