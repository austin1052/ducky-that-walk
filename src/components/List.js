import React from 'react';
import styles from '../styles/List.module.css';

const List = ({ player, idx }) => {

  const { name, houseName, totalPoints } = player[1];
  return (
    <div className={styles.listItem}>
      <div className={styles.number}>{idx}</div>
      <div className={styles.nameContainer}>
        <div className={styles.name}>{name}</div>
        <div className={styles.houseContainer}>
          {/* <div className={styles.label}>haus of</div> */}
          <div className={styles.houseName}>{houseName}</div>
        </div>
      </div>
      <div className={styles.points}>{totalPoints}</div>
    </div>
  );
};

export default List;