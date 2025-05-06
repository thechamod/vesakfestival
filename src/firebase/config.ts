import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7SDDKQRL_sjDKfRPB4ifuHp8oBdB9-VE",
  authDomain: "al-master-1cd6e.firebaseapp.com",
  databaseURL: "https://al-master-1cd6e-default-rtdb.firebaseio.com",
  projectId: "al-master-1cd6e",
  storageBucket: "al-master-1cd6e.firebasestorage.app",
  messagingSenderId: "932509501027",
  appId: "1:932509501027:web:880015a9d5e088775dda56"
};

let app;
let database;

export const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    console.log('Firebase initialized successfully');
    return { app, database };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

export const getFirebaseDatabase = () => {
  if (!database) {
    throw new Error('Firebase database not initialized. Call initializeFirebase() first.');
  }
  return database;
};

export default { initializeFirebase, getFirebaseDatabase };