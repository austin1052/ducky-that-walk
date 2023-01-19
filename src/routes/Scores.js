import { useState, useEffect, useContext } from 'react';
import Card from "../components/Scores/Card.js"
import List from "../components/Scores/List.js"
import { db } from '../config/index.js';
import { ref, onValue } from "firebase/database";
import styles from '../styles/Scores/Scores.module.css'
import { mergeSort } from "../utils/index.js";
import { MobileContext } from "../context/MobileContext.js"

export default function Scores() {
  const [topThreePlayers, setTopThreePlayers] = useState([]);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const isMobile = useContext(MobileContext);

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
    <div className="page-container">
      <div className={styles.container}>
        {
          topThreePlayers &&
          <div className={styles.topThreeContainer}>
            {
              topThreePlayers.map((player, idx) => {
                return (
                  <Card player={player} key={player[0]} idx={idx} />
                )
              })
            }
          </div>
        }
        <div className={styles.listContainer}>
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
    </div>
  );
};