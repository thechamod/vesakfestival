import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GameEngine from './GameEngine';
import GameControls from './GameControls';

interface VesakGameProps {
  onGameOver: (score: number) => void;
}

const VesakGame: React.FC<VesakGameProps> = ({ onGameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  
  // Setup game
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const gameEngine = new GameEngine(canvas, {
      onScoreUpdate: (newScore) => setScore(newScore),
      onLivesUpdate: (newLives) => setLives(newLives),
      onGameOver: (finalScore) => onGameOver(finalScore)
    });
    
    gameEngineRef.current = gameEngine;
    gameEngine.init();
    
    setIsLoading(false);
    
    return () => {
      gameEngine.destroy();
    };
  }, [onGameOver]);
  
  // Handle input
  const handleControlInput = (direction: string) => {
    if (!gameEngineRef.current) return;
    
    switch (direction) {
      case 'up':
        gameEngineRef.current.movePlayer(0, -1);
        break;
      case 'down':
        gameEngineRef.current.movePlayer(0, 1);
        break;
      case 'left':
        gameEngineRef.current.movePlayer(-1, 0);
        break;
      case 'right':
        gameEngineRef.current.movePlayer(1, 0);
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Game Score/Lives HUD */}
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800/80 text-white">
        <div className="text-sm font-medium">Score: {score}</div>
        <div className="flex">
          {Array.from({ length: lives }).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-5 h-5 mx-0.5 text-red-500"
            >
              ❤️
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Game Canvas */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/30 z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-t-primary border-r-primary border-b-primary border-l-transparent rounded-full"
            />
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          tabIndex={0}
        />
      </div>
      
      {/* Game Controls for Mobile */}
      <div className="mt-auto">
        <GameControls onControlInput={handleControlInput} />
      </div>
    </div>
  );
};

export default VesakGame;