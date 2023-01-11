import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from '../styles/CreatePlayer.module.css';

const QueenCard = (props) => {

  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    background: isOver ? 'var(--mid)' : undefined,
  };

  return (
    <div className={styles.queenCard} ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default QueenCard;