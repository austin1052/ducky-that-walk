import { useState, useEffect } from 'react';
import Card from "../components/Card.js"
import List from "../components/List.js"
import { db } from '../config/index.js';
import { ref, onValue } from "firebase/database";
import cardStyles from '../styles/Card.module.css'
import listStyles from '../styles/List.module.css'
import { mergeSort } from "../utils/index.js";

const Scores = () => {

  useEffect(() => {
    const playersRef = ref(db, "testPlayers/");
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      const array = Object.entries(data)
      const sortedData = mergeSort(array);
      if (snapshot.exists()) {
        setTopThreePlayers(sortedData.slice(0, 3))
        setOtherPlayers(sortedData.slice(3))
      }
    });
  }, [])

  const [topThreePlayers, setTopThreePlayers] = useState([]);
  const [otherPlayers, setOtherPlayers] = useState([]);
  return (

    <div className={cardStyles.scoreContainer}>
      <div className={cardStyles.topThreeContainer}>
        {
          topThreePlayers &&
          topThreePlayers.map((player, idx) => {
            return (
              <Card player={player} key={player.name} idx={idx} />
            )
          })
        }
      </div>
      <div className={listStyles.listContainer}>
        {
          otherPlayers &&
          otherPlayers.map((player, idx) => {
            idx = idx + 4
            return (
              <List player={player} key={player.name} idx={idx} />
            )
          })
        }
      </div>
    </div>
  );
};

export default Scores;