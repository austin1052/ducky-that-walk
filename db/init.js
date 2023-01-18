// need to comment out styles import and pointButtonStyles in data.js for this to run 

import { ref, set } from "firebase/database"
import { db } from "../src/config/local.js"
import { queenData, players } from "../src/utils/data.js";


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


function createTestPlayers(players, currentWeek) {
  const week = currentWeek;
  players.forEach(playerData => {
    const { username, name, houseName, queens } = playerData;
    const playerRef = ref(db, "testPlayers/" + username);
    set(playerRef, {
      name,
      houseName,
      totalPoints: 0
    })
      .then(() => {
        console.log(`${name} added succesfully`);
      })
      .catch((error) => {
        console.log(`Error adding ${name}`);
        console.error(error);
      });
    if (week !== undefined) {
      queens.forEach((queen) => {
        const queenRef = ref(db, "testPlayers/" + username + "/queens/" + queen[0]);
        set(queenRef, {
          multiplier: queen[1],
          [week]: 10
        })
      })
    }
  })
}

buildDB();
