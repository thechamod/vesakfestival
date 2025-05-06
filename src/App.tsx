import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Moon, Sun } from 'lucide-react';
import NavBar from './components/NavBar';
import GameSection from './components/GameSection';
import AboutSection from './components/AboutSection';
import LeaderboardSection from './components/LeaderboardSection';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import FloatingElements from './components/FloatingElements';
import { initializeFirebase } from './firebase/config';

function App() {
  const [loading, setLoading] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Initialize Firebase
    initializeFirebase();
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    
    return () => clearTimeout(timer);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-secondary/10 dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-medium text-primary mb-4">Vesak Festival</h1>
          <p className="text-slate-600 dark:text-slate-400">Loading celebration...</p>
          <div className="mt-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-t-primary border-r-secondary border-b-accent border-l-transparent rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 overflow-hidden">
      <FloatingElements />
      
      <NavBar />
      
      <main>
        <GameSection />
        <LeaderboardSection />
        <AboutSection />
      </main>
      
      <Footer />
      
      <AudioPlayer isPlaying={audioPlaying} setIsPlaying={setAudioPlaying} />
      
      <div className="fixed bottom-4 left-4 flex flex-col gap-4 z-50">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-slate-700" />
          )}
        </motion.button>
        
        {!audioPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAudioPlaying(true)}
            className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg"
            aria-label="Play Buddhist music"
          >
            <Music className="w-6 h-6 text-primary" />
            <span className="absolute -top-12 right-0 bg-white dark:bg-slate-800 px-3 py-1 rounded shadow-md text-sm whitespace-nowrap">
              Play Buddhist music
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default App;