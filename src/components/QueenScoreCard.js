import Image from './Image.js';
import styles from '../styles/QueenScoreCard.module.css';
import PointBar from './PointBar.js';

export default function QueenScoreCard({ queen, setAllQueens }) {

  const { name, menuOpen, points } = queen

  // if (queen.id === "marciax3") {
  //   queen.points = 5
  // }

  function toggleMenu() {
    if (!queen.menuOpen) {
      queen.menuOpen = true
    }
    setAllQueens(queens => [...queens])
  }

  return (
    <>
      <div className={menuOpen ? `${styles.scoreCardContainer} ${styles.menuOpen}` : `${styles.scoreCardContainer}`}>
        <div className={styles.infoContainer} onClick={toggleMenu}>
          <div className={styles.imageContainer}>
            {
              queen.selected.eliminated &&
              <div className={styles.cross}></div>
            }
            <Image queen={queen} />
          </div>
          <div className={styles.queenName}>{name}</div>
        </div>
        {
          points > 0 &&
          <div className={styles.pointsContainer}>
            <div className={styles.points}>+{points}</div>
          </div>
        }
        <PointBar menuOpen={menuOpen} setAllQueens={setAllQueens} queen={queen} />
      </div>
    </>
  );
};