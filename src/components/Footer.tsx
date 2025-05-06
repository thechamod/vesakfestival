import React from 'react';
import { motion } from 'framer-motion';
import { Bot as Lotus, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center mb-6">
            <Lotus className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-medium">Vesak Festival</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a href="#game" className="text-slate-300 hover:text-white transition-colors">Game</a>
            <a href="#leaderboard" className="text-slate-300 hover:text-white transition-colors">Leaderboard</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">About Vesak</a>
          </div>
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-slate-300 mb-4">
              This website celebrates the Vesak festival, one of Buddhism's most sacred holidays that commemorates Buddha's birth, enlightenment, and passing. The game and interactive elements aim to spread joy and awareness about this important cultural celebration.
            </p>
          </div>
          
          <div className="flex items-center justify-center text-slate-300 mb-6">
            <Heart className="h-5 w-5 text-error mr-2" />
            <span>Created by Chamod Wijekoon</span>
          </div>
          
          <div className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Vesak Festival Celebration. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;