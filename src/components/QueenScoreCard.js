import Image from './Image.js';
import styles from '../styles/QueenScoreCard.module.css';
import PointBar from './PointBar.js';

export default function QueenScoreCard({ queen, setAllQueens }) {

  const { name, menuOpen } = queen[1]

  function toggleMenu() {

    if (!queen[1].menuOpen) {
      queen[1].menuOpen = true
    }
    setAllQueens(queens => [...queens])
  }

  return (
    <>
      <div className={menuOpen ? `${styles.scoreCardContainer} ${styles.menuOpen}` : `${styles.scoreCardContainer}`}>
        <div className={styles.infoContainer} onClick={toggleMenu}>
          <div className={styles.imageContainer}>
            <Image queen={queen} />
          </div>
          <div className={styles.queenName}>{name}</div>
        </div>
        <PointBar menuOpen={menuOpen} setAllQueens={setAllQueens} queen={queen} />
      </div>
    </>
  );
};