import { ref, push, query, orderByChild, limitToLast, get, DataSnapshot } from 'firebase/database';
import { getFirebaseDatabase } from './config';

export interface ScoreEntry {
  id?: string;
  playerName: string;
  score: number;
  timestamp: number;
}

const LEADERBOARD_REF = 'leaderboard';

// Save a new score entry
export const saveScore = async (playerName: string, score: number): Promise<string | null> => {
  try {
    const db = getFirebaseDatabase();
    const leaderboardRef = ref(db, LEADERBOARD_REF);
    
    const newScoreEntry = {
      playerName: playerName.trim(),
      score,
      timestamp: Date.now(),
    };
    
    const newEntryRef = await push(leaderboardRef, newScoreEntry);
    return newEntryRef.key;
  } catch (error) {
    console.error('Error saving score:', error);
    return null;
  }
};

// Get top scores (sorted by score in descending order)
export const getTopScores = async (limit = 10): Promise<ScoreEntry[]> => {
  try {
    const db = getFirebaseDatabase();
    const leaderboardRef = ref(db, LEADERBOARD_REF);
    
    // Query the top scores, ordered by score in descending order
    const topScoresQuery = query(
      leaderboardRef,
      orderByChild('score'),
      limitToLast(limit)
    );
    
    const snapshot = await get(topScoresQuery);
    
    if (!snapshot.exists()) {
      return [];
    }
    
    // Convert the snapshot to an array of score entries
    const scores: ScoreEntry[] = [];
    snapshot.forEach((childSnapshot: DataSnapshot) => {
      scores.push({
        id: childSnapshot.key || undefined,
        ...childSnapshot.val() as Omit<ScoreEntry, 'id'>
      });
    });
    
    // Sort scores in descending order
    return scores.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error getting top scores:', error);
    return [];
  }
};

export default {
  saveScore,
  getTopScores
};