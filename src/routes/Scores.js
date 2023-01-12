import { useState, useEffect } from 'react';
import Card from "../components/Card.js"
import List from "../components/List.js"
import { db } from '../config/index.js';
import { ref, onValue } from "firebase/database";
import cardStyles from '../styles/ScoreCard.module.css'
import listStyles from '../styles/ScoreList.module.css'
import { mergeSort } from "../utils/index.js";

export default function Scores({ isMobile }) {
  const [topThreePlayers, setTopThreePlayers] = useState([]);
  const [otherPlayers, setOtherPlayers] = useState([]);

  useEffect(() => {
    const playersRef = ref(db, "testPlayers/");
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      const array = Object.entries(data)
      const sortedData = mergeSort(array);
      if (snapshot.exists()) {
        if (isMobile) {
          setOtherPlayers(sortedData)
          setTopThreePlayers()
        } else {
          setTopThreePlayers(sortedData.slice(0, 3))
          setOtherPlayers(sortedData.slice(3))
        }
      }
    });
  }, [isMobile])

  return (

    <div className={cardStyles.scoreContainer}>
      {
        topThreePlayers &&
        <div className={cardStyles.topThreeContainer}>
          {
            topThreePlayers.map((player, idx) => {
              return (
                <Card player={player} key={player[0]} idx={idx} />
              )
            })
          }
        </div>
      }
      <div className={listStyles.listContainer}>
        {
          otherPlayers &&
          otherPlayers.map((player, idx) => {
            idx = isMobile ? idx + 1 : idx + 4;
            return (
              <List player={player} key={player[0]} idx={idx} isMobile={isMobile} />
            )
          })
        }
      </div>
    </div>
  );
};