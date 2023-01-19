// need to comment out styles import and pointButtonStyles in data.js for this to run 

import { ref, set } from "firebase/database"
import { db } from "../src/config/local.js"
import { queenData, players } from "../src/utils/data.js";
import { createNewPlayer } from "../src/utils/db.js";


function buildDB() {
  createInitialQueens(queenData);
  createTestPlayers(players, "week2");
}

function createInitialQueens(queenData) {
  const queenIDs = Object.keys(queenData);
  queenIDs.map((queenID) => {
    const { name, active } = queenData[queenID]
    return set(ref(db, 'queens/' + queenID), {
      name,
      active,
    })
  }
  )
}

function createTestPlayers(players) {
  players.forEach(playerData => {
    createNewPlayer(playerData)
  })
}

buildDB();
