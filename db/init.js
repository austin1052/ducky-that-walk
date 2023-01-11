import { ref, set } from "firebase/database"
import { db } from "../src/config/index.js"
import { queenData, playerData } from "../src/utils/data.js";


function buildDB() {
  createInitialQueens(queenData);
  createTestPlayers(players);
}

function createInitialQueens(queenData) {

  const queenIDs = Object.keys(queenData);

  queenIDs.map((queenID) => {
    const { name, totalPoints, active } = queenData[queenID]
    return set(ref(db, 'queens/' + queenID), {
      name,
      totalPoints,
      active
    })
  }
  )
}


function createTestPlayers(players) {
  players.forEach(playerData => {
    const { username, name, houseName, queens } = playerData;
    const playerRef = ref(db, "testPlayers/" + username);
    set(playerRef, {
      name,
      houseName,
      totalPoints: 0
    });
    queens.forEach((queen) => {
      const queenRef = ref(db, "testPlayers/" + username + "/queens/" + queen[0]);
      set(queenRef, {
        multiplier: queen[1]
      })
    })
  })
}

const players = [
  {
    username: "carson",
    name: "Carson",
    houseName: "Big Juicy Ass",
    queens: [["sashacolby", 3], ["looseyladuca", 2], ["MIB", 2], ["anetra", 1], ["irenedubois", 1], ["princesspoppy", 1]]
  },
  {
    username: "eric",
    name: "Eric",
    houseName: "Spagliato",
    queens: [["looseyladuca", 3], ["robinfierce", 2], ["MIB", 2], ["salinaestitties", 1], ["jax", 1], ["irenedubois", 1]]
  },
  {
    username: "jack",
    name: "Jack",
    houseName: "The House Down",
    queens: [["sashacolby", 3], ["irenedubois", 2], ["MIB", 2], ["salinaestitties", 1], ["jax", 1], ["irenedubois", 1]]
  },
  {
    username: "alex",
    name: "Alex",
    houseName: "Alex's Queen Team",
    queens: [["princesspoppy", 3], ["irenedubois", 2], ["MBDF", 2], ["salinaestitties", 1], ["sashacolby", 1], ["auramayari", 1]]
  },
  {
    username: "jordan",
    name: "Jordan",
    houseName: "HOUSE on Fox Starring Stuart Little Star Hugh Laurie",
    queens: [["sashacolby", 3], ["luxxnoirlondon", 2], ["marciax3", 2], ["MIB", 1], ["salinaestitties", 1], ["looseyladuca", 1]]
  },
  {
    username: "caroline",
    name: "Caroline",
    houseName: "savage",
    queens: [["irenedubois", 3], ["sashacolby", 2], ["salinaestitties", 2], ["MIB", 1], ["luxxnoirlondon", 1], ["looseyladuca", 1]]
  },
  {
    username: "timiki",
    name: "Timiki",
    houseName: "the Mouse",
    queens: [["MIB", 3], ["anetra", 2], ["sashacolby", 2], ["jax", 1], ["salinaestitties", 1], ["auramayari", 1]]
  },
  {
    username: "ariel",
    name: "Ariel",
    houseName: "House The Boots Down House",
    queens: [["sashacolby", 3], ["auramayari", 2], ["MBDF", 2], ["robinfierce", 1], ["looseyladuca", 1], ["luxxnoirlondon", 1]]
  },
  {
    username: "austin",
    name: "Austin",
    houseName: "Shartier",
    queens: [["looseyladuca", 3], ["marciax3", 2], ["irenedubois", 2], ["salinaestitties", 1], ["spice", 1], ["MBDF", 1]]
  },
  {
    username: "isabel",
    name: "Isabel",
    houseName: "MINIONITA",
    queens: [["princesspoppy", 3], ["sashacolby", 2], ["salinaestittes", 2], ["MBDF", 1], ["irenedubois", 1], ["auramayari", 1]]
  }
]


createTestPlayers(players);

buildDB();
