// import { db } from '../config/index.js';
import { db } from '../config/local.js';
import { set, get, ref, child, getDatabase, update } from 'firebase/database'
import { initialCategories } from "./data.js"

export function createNewPlayer(playerData) {
  const { username, name, houseName, queens } = playerData;

  const playerRef = ref(db, "players/" + username);

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

  queens.forEach((queen) => {
    const [id, multiplier] = queen
    const queenRef = ref(db, "playerQueens/" + username);
    update(queenRef, {
      [id]: multiplier,
    })

    // add player to queens "stans" list
    update(ref(db, 'queenStans/' + id), {
      [username]: multiplier
    })
  })

}

export function updateWeeklyPoints(allQueens, week) {

  const updatedQueensList = []

  if (week !== undefined) {
    allQueens.forEach((queen) => {
      const { id, points } = queen
      if (points > 0) {
        updateTotalPoints(queen);
        let currentPoints = 0;
        const dbRef = ref(getDatabase())

        get(child(dbRef, `queenPoints/${id}/${week}`)).then((snapshot) => {
          if (snapshot.exists()) {
            currentPoints = snapshot.val()
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
    return allQueens;
  }

  return updatedQueensList;
}

export function updateTotalPoints(queen) {
  const { id, points } = queen;
  let currentPoints = 0;
  const dbRef = ref(getDatabase())
  get(child(dbRef, `queens/${id}/totalPoints`)).then((snapshot) => {
    if (snapshot.exists()) {
      currentPoints = snapshot.val()
    } else {
      console.log("No previous points")
    }
    const totalPoints = currentPoints + points
    update(ref(db, 'queens/' + id), {
      totalPoints
    })
  }).catch((error) => {
    console.error(error)
  })
}

