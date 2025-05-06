import React from 'react';
import { motion } from 'framer-motion';
import { Flower, Lamp } from 'lucide-react';

const floatingElements = [
  { icon: Flower, color: 'text-pink-400', delay: 0, duration: 12, x: '10%', y: '5%' },
  { icon: Lamp, color: 'text-yellow-500', delay: 1, duration: 15, x: '80%', y: '15%' },
  { icon: Flower, color: 'text-purple-400', delay: 2, duration: 18, x: '20%', y: '30%' },
  { icon: Lamp, color: 'text-amber-400', delay: 3, duration: 10, x: '70%', y: '40%' },
  { icon: Flower, color: 'text-pink-500', delay: 4, duration: 14, x: '30%', y: '80%' },
  { icon: Lamp, color: 'text-yellow-400', delay: 5, duration: 20, x: '80%', y: '70%' },
  { icon: Flower, color: 'text-violet-400', delay: 6, duration: 16, x: '40%', y: '60%' },
  { icon: Lamp, color: 'text-amber-500', delay: 7, duration: 13, x: '90%', y: '90%' },
];

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-10 sm:opacity-20`}
            initial={{ 
              x: element.x, 
              y: element.y, 
              opacity: 0 
            }}
            animate={{ 
              y: [`${element.y}`, `calc(${element.y} - 100px)`, `${element.y}`],
              opacity: [0, 1, 0.8, 0.5, 0.8, 1, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: element.duration, 
              delay: element.delay,
              repeatDelay: 2,
            }}
          >
            <Icon className="h-16 w-16 sm:h-24 sm:w-24" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingElements;