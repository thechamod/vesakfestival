import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Loader2 } from 'lucide-react';
import { getTopScores, ScoreEntry } from '../firebase/leaderboard';

const LeaderboardSection: React.FC = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        const topScores = await getTopScores(10);
        setScores(topScores);
        setError('');
      } catch (err) {
        console.error('Error fetching scores:', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
    
    // Set up a refresh interval
    const interval = setInterval(fetchScores, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getLeaderIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-700" />;
      default:
        return <span className="text-sm font-medium">{position + 1}</span>;
    }
  };

  return (
    <section id="leaderboard" className="py-16 bg-gradient-to-b from-slate-50 to-purple-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">Vesak Celebration Leaderboard</h2>
          <p className="max-w-2xl mx-auto text-slate-600">
            The highest scores from players around the world celebrating Vesak through our game.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto"
        >
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <span className="ml-2 text-slate-600">Loading leaderboard...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-error mb-4">{error}</p>
              <p className="text-slate-600">Please try again later</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No scores yet!</p>
              <p className="text-slate-500">Be the first to submit your score</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Rank</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Player</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-700">Score</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-700 hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <motion.tr
                      key={score.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} ${
                        index < 3 ? 'font-medium' : ''
                      }`}
                    >
                      <td className="px-4 py-3 flex items-center">
                        <div className="w-8 flex justify-center">
                          {getLeaderIcon(index)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {score.playerName}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-800 font-medium">
                        {score.score.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600 text-sm hidden md:table-cell">
                        {formatDate(score.timestamp)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardSection;