import { db } from '../config/index.js';
import { set, get, ref, child, getDatabase, update } from 'firebase/database'
import { initialCategories } from "./data.js"

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

export function updatePoints(allQueens, week) {
  const updatedQueensList = []
  if (week !== undefined) {
    allQueens.forEach((queen) => {
      const { id, points } = queen
      if (points > 0) {
        let currentPoints = 0;
        const dbRef = ref(getDatabase())
        get(child(dbRef, `queenPoints/${id}/${week}`)).then((snapshot) => {
          if (snapshot.exists()) {
            currentPoints = snapshot.val()
          } else {
            console.log("No previous points")
          }
          const totalPoints = currentPoints + points
          update(ref(db, 'queenPoints/' + id), {
            [week]: totalPoints
          })
        }).catch((error) => {
          console.error(error)
        })
      }
      if (queen.selected.eliminated) {
        update(ref(db, 'queens/' + id), {
          active: false
        })
      }
      updatedQueensList.push({ ...queen, points: 0, selected: initialCategories, menuOpen: false })
    })
  } else {
    alert("You can only update points when the episode is airing")
  }
  return updatedQueensList;
}

// addPlayer(players);

