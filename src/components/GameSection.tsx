import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VesakGame from '../game/VesakGame';
import ScoreSubmissionForm from './ScoreSubmissionForm';

const GameSection: React.FC = () => {
  const [gameScore, setGameScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameOver = (finalScore: number) => {
    setGameScore(finalScore);
    setGameOver(true);
    setGameStarted(false);
  };

  const handleStartGame = () => {
    setGameScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const handlePlayAgain = () => {
    setGameScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <section id="game" className="pt-24 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">Vesak Celebration Game</h2>
          <p className="max-w-2xl mx-auto text-slate-600">
            Light the lamps and collect lotus flowers to celebrate Vesak. Challenge yourself to get the highest score!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="game-container relative bg-gradient-to-b from-indigo-50 to-purple-50 rounded-xl shadow-lg overflow-hidden mx-auto"
        >
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/10 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5 
                }}
              >
                <h3 className="text-2xl md:text-3xl font-medium text-primary mb-6">Vesak Light Offerings</h3>
              </motion.div>
              <p className="text-slate-700 max-w-md text-center mb-8">
                Light lamps and collect lotus flowers to celebrate Vesak. Be careful of obstacles!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartGame}
                className="btn btn-primary"
              >
                Start Game
              </motion.button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/10 backdrop-blur-sm">
              <h3 className="text-2xl md:text-3xl font-medium text-primary mb-4">Game Over</h3>
              <p className="text-xl text-slate-700 mb-6">Your Score: <span className="font-bold">{gameScore}</span></p>
              
              <ScoreSubmissionForm score={gameScore} />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayAgain}
                className="btn btn-secondary mt-4"
              >
                Play Again
              </motion.button>
            </div>
          )}

          {gameStarted && (
            <VesakGame onGameOver={handleGameOver} />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GameSection;