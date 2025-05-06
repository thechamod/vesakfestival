import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  onControlInput: (direction: string) => void;
}

const ControlButton: React.FC<{
  direction: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ direction, icon, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={`Move ${direction}`}
      className="w-14 h-14 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-primary"
    >
      {icon}
    </motion.button>
  );
};

const GameControls: React.FC<GameControlsProps> = ({ onControlInput }) => {
  return (
    <div className="mobile-controls p-4 bg-transparent">
      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
        <div className="col-start-2">
          <ControlButton
            direction="up"
            icon={<ArrowUp size={24} />}
            onClick={() => onControlInput('up')}
          />
        </div>
        <div className="col-start-1 row-start-2">
          <ControlButton
            direction="left"
            icon={<ArrowLeft size={24} />}
            onClick={() => onControlInput('left')}
          />
        </div>
        <div className="col-start-2 row-start-2">
          <ControlButton
            direction="down"
            icon={<ArrowDown size={24} />}
            onClick={() => onControlInput('down')}
          />
        </div>
        <div className="col-start-3 row-start-2">
          <ControlButton
            direction="right"
            icon={<ArrowRight size={24} />}
            onClick={() => onControlInput('right')}
          />
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
        <p>PC Controls: Arrow keys or WASD</p>
      </div>
    </div>
  );
};

export default GameControls;