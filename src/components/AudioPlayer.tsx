import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import useSound from 'use-sound';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load Buddhist chanting sound
  // Using a public domain Buddhist chant
  const audioUrl = "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"; // Placeholder calming music

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Audio playback failed:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
      
      audioRef.current.muted = isMuted;
    }
  }, [isPlaying, isMuted, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="audio-player bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg flex items-center space-x-3"
    >
      <audio ref={audioRef} src={audioUrl} loop />
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="p-2 rounded-full bg-primary/10 text-primary"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </motion.button>
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="p-2 rounded-full bg-secondary/10 text-secondary"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </motion.button>
      
      <div className="text-sm text-slate-700">
        Buddhist Chant
      </div>
    </motion.div>
  );
};

export default AudioPlayer;