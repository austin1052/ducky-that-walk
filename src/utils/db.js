import { db } from '../config/index.js';
// import { db } from '../config/local.js';
import { onValue, set, get, ref, child, getDatabase, update, increment } from 'firebase/database'
import { initialCategories } from "./data.js"

export function createNewPlayer(playerData) {
  const { username, name, houseName, queens } = playerData;
  if (username.length > 0 && houseName.length > 0 && name.length > 0) {
    const playerRef = ref(db, "players/" + username);
    set(playerRef, {
      name,
      houseName
    })

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

      console.log("user created successfully")
    })
  } else {
    console.log("please fill out all fields")
  }
}

export function updateWeeklyPoints(allQueens, week) {
  const updatedQueensList = []
  // console.log(allQueens);
  console.log(week);
  if (week !== undefined) {
    allQueens.forEach((queen) => {
      const { id, points } = queen
      update(ref(db, 'queenPoints/' + id), {
        [week]: increment(points)
      })
      if (queen.selected && queen.selected.eliminated) {
        update(ref(db, 'queens/' + id), {
          active: false
        })
      }
      updatedQueensList.push({ ...queen, points: 0, selected: initialCategories, menuOpen: false })
    })
  }
  return updatedQueensList
}

export function updateTotalPoints(queen) {

  const { id, points } = queen;
  update(ref(db, 'queens/' + id), {
    totalPoints: increment(points)
  })
}

async function getStansList(queenID) {
  const dbRef = ref(getDatabase())
  return get(child(dbRef, `queenStans/${queenID}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      return data
    }
  })
}

export async function getQueensList(playerID) {
  const dbRef = ref(getDatabase())
  return get(child(dbRef, `playerQueens/${playerID}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      return data
    }
  })
}

export async function updatePlayerPoints(queenID, queenPoints) {
  const stansList = await getStansList(queenID)
  if (stansList !== undefined) {
    const players = Object.keys(stansList);
    players.forEach(async (player) => {
      const multiplier = stansList[player]
      const adjustedPoints = queenPoints * multiplier
      update(ref(db, 'players/' + player), {
        totalPoints: increment(adjustedPoints)
      })
    })
  }
}

export async function getQueenWeeklyPoints() {
  const queensRef = ref(db, "queenPoints/")
  return onValue(queensRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      return data
    }
  })
}

