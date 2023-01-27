// need to comment out styles import and pointButtonStyles in data.js for this to run 

import { ref, set, update } from "firebase/database"
import { forEach } from "underscore";
import { db } from "../src/config/local.js"
import { queenData, players, previousWeeksPoints } from "../src/utils/data.js";
import { createNewPlayer } from "../src/utils/db.js";
import { updateWeeklyPoints } from "../src/utils/db.js";


function buildDB() {
  createInitialQueens(queenData);
  createTestPlayers(players);
  addPreviousWeeksPoints(previousWeeksPoints)
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

function addPreviousWeeksPoints(previousWeeksPoints) {
  // loop through array of weeks and queen points 
  // [ ["027", [{id, points}, {id, points}, {id, points}] ] ]
  previousWeeksPoints.forEach(week => {
    const date = week[0]
    const queens = week[1]
    const updatedQueens = updateWeeklyPoints(queens, date)
    console.log(updatedQueens);
  })
}

buildDB();