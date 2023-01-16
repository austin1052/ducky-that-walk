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


// {
//   username: "austincox",
//   name: "Austin",
//   houseName: "Shartier",
//   totalPoints: 50
// },
// {
//   username: "amandasanders",
//   name: "Amanda",
//   houseName: "broke my damn toe",
//   totalPoints: 85
// },
// {
//   username: "jackdodge",
//   name: "Jack",
//   houseName: "House the boots down",
//   totalPoints: 102
// },
// {
//   username: "carsonm",
//   name: "Carson",
//   houseName: "boot boots boots slay",
//   totalPoints: 78
// },
// {
//   username: "alexc",
//   name: "Alex",
//   houseName: "Alex's Queen Team",
//   totalPoints: 150
// },
// {
//   username: "ariel",
//   name: "Ariel",
//   houseName: "House House House Bootsed",
//   totalPoints: 124
// },
// {
//   username: "caroline",
//   name: "Caroline",
//   houseName: "Sop you up like a biscuit!",
//   totalPoints: 106
// },
// {
//   username: "hotdog",
//   name: "Hotdog",
//   houseName: "kitty kitty purr",
//   totalPoints: 188
// },
// {
//   username: "cowboy",
//   name: "Cowboy",
//   houseName: "stinky lips",
//   totalPoints: 68
// }