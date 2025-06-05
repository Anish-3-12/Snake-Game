
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Score {
  id: string;
  score: number;
  created_at: string;
  profiles: {
    username: string;
  };
}

const GameStats = () => {
  const [topScores, setTopScores] = useState<Score[]>([]);
  const [userBestScore, setUserBestScore] = useState<number | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchTopScores();
    if (user) {
      fetchUserBestScore();
    }
  }, [user]);

  const fetchTopScores = async () => {
    try {
      const { data, error } = await supabase
        .from('scores')
        .select(`
          id,
          score,
          created_at,
          profiles!inner(username)
        `)
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching scores:', error);
        return;
      }

      setTopScores(data || []);
    } catch (error) {
      console.error('Error fetching top scores:', error);
    }
  };

  const fetchUserBestScore = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('scores')
        .select('score')
        .eq('user_id', user.id)
        .order('score', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user best score:', error);
        return;
      }

      setUserBestScore(data?.score || null);
    } catch (error) {
      console.error('Error fetching user best score:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">🏆 Top Scores</h2>
        {topScores.length > 0 ? (
          <div className="space-y-3">
            {topScores.map((score, index) => (
              <div key={score.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </span>
                  <span className="text-white font-medium">{score.profiles.username}</span>
                </div>
                <span className="text-green-400 font-bold">{score.score}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No scores yet. Be the first to play!</p>
        )}
      </div>

      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">📊 Your Stats</h2>
        {user ? (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-gray-300 text-sm">Best Score</div>
              <div className="text-green-400 font-bold text-xl">
                {userBestScore !== null ? userBestScore : 'No scores yet'}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-gray-300 text-sm">Player</div>
              <div className="text-white font-medium">{user.email}</div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-400 mb-4">Sign in to track your progress and compete on the leaderboard!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStats;
