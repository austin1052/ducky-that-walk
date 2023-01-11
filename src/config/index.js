import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDWiLaRWqcWwk6WRbPGicndLrWDL6wQSgk",
  authDomain: "alex-s-queen-team.firebaseapp.com",
  databaseURL: "https://alex-s-queen-team-default-rtdb.firebaseio.com",
  projectId: "alex-s-queen-team",
  storageBucket: "alex-s-queen-team.appspot.com",
  messagingSenderId: "983806942956",
  appId: "1:983806942956:web:bc45147f127167bea20fc9",
  measurementId: "G-HG38KEVL4P"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Initialize Realtime Database and get a reference to the service
// const db = getDatabase(app);
