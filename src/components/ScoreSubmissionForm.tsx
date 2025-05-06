import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { saveScore } from '../firebase/leaderboard';

interface ScoreSubmissionFormProps {
  score: number;
}

const ScoreSubmissionForm: React.FC<ScoreSubmissionFormProps> = ({ score }) => {
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setError('');
    setIsSaving(true);
    
    try {
      const result = await saveScore(playerName, score);
      if (result) {
        setIsSubmitted(true);
      } else {
        setError('Failed to save score. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error submitting score:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-4 bg-success/10 rounded-lg mb-4"
      >
        <p className="text-success font-medium">Score submitted successfully!</p>
        <p className="text-sm text-slate-600 mt-1">Check the leaderboard to see your ranking.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="playerName" className="block text-sm font-medium text-slate-700 mb-1">
          Enter your name for the leaderboard:
        </label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Your name"
          className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          disabled={isSaving}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full btn btn-primary"
        disabled={isSaving}
      >
        {isSaving ? 'Submitting...' : 'Submit Score'}
      </motion.button>
    </motion.form>
  );
};

export default ScoreSubmissionForm;