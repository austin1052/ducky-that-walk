import { useState, useEffect } from 'react';
import ListItem from "./ListItem.js";
import { countSelected } from '../utils/index.js';
import styles from '../styles/CreatePlayer.module.css';

const QueenSelection = ({ queensList, setQueensList, options }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  const { category, label, max } = options;

  function toggleSelectMenu() {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    setCheckCount(countSelected(queensList, category));
  }, [queensList, category])


  return (
    <>
      <label htmlFor="Select players">{label}</label>
      <div className={styles.selectButton} onClick={toggleSelectMenu} aria-label={label}>
        <div aria-label="select one winner" className={styles.buttonText}>None Selected</div>
        <span className={menuOpen ? `${styles.selectArrow} ${styles.open}` : `${styles.selectArrow}`}></span>
      </div>
      <div className={styles.listContainer}>
        <ul className={menuOpen ? `${styles.listItems} ${styles.menuOpen}` : `${styles.listItems}`} aria-label="list of queens">
          {
            queensList.map((queen) => {
              return <ListItem queen={queen} key={queen.id} setQueensList={setQueensList} checkCount={checkCount} max={max} category={category} />
            })
          }
        </ul>
      </div>
    </>

  );
};

export default QueenSelection;