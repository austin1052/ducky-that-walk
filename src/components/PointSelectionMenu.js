import { useState } from 'react';
import styles from '../styles/PointSelectionMenu.module.css'

export default function PointSelectionMenu({ pointSelectionData, setPointSelectionData }) {

  function closeMenu() {
    const data = { ...pointSelectionData, menuOpen: false }
    setPointSelectionData(data);
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 onClick={closeMenu}>close</h1>
        <h1>HELLO</h1>
      </div>
    </div>
  )
}