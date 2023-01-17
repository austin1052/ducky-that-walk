import { ref, set, onValue } from "firebase/database";
import { db } from '../config/index.js';

export function writeUserData(userId, name) {
  set(ref(db, 'users/' + userId), {
    username: name,
  });
}

export function getAllQueens() {
  const queenRef = ref(db, 'queens/');
  onValue(queenRef, (snapshot) => {
    const queenData = snapshot.val();
    return queenData;
  });
}

export function addPlayer(players) {
  const { username, name, houseName, totalPoints } = players[0];
  const playerRef = ref(db, "testPlayers/" + username);
  set(playerRef, {
    name,
    houseName,
    totalPoints
  })
}

export function createNewPlayer(playerData) {
  const { username, name, houseName, queens } = playerData;

  const playerRef = ref(db, "testPlayers/" + username);
  set(playerRef, {
    name,
    houseName,
    totalPoints: 0
  })

  queens.map((queen) => {
    const queenRef = ref(db, "testPlayers/" + username + "/queens/" + queen[0]);
    return set(queenRef, {
      multiplier: queen[1]
    })
  })
}

// addPlayer(players);

