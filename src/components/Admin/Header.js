import { useState, useEffect } from 'react'
import { getWeek, getDate } from '../../utils/admin.js'
import { updateWeeklyPoints } from '../../utils/db.js'
import styles from "../../styles/Admin/Header.module.css"

export default function AdminHeader({ allQueens, setAllQueens, setConfirmScoresOpen }) {
  const [currentWeek, setCurrentWeek] = useState()

  useEffect(() => {
    const date = getDate();
    setCurrentWeek(date)
  }, [])

  function submitPoints() {
    getWeek(currentWeek)
    const updatedQueensList = updateWeeklyPoints(allQueens, "027")
    console.log({ updatedQueensList });
    setAllQueens(updatedQueensList)
    // setConfirmScoresOpen(true)
  }


  return (
    <div className={styles.container}>
      {/* <h1>Adjust Points</h1> */}
      <div className={styles.submit} onClick={submitPoints} role="button" aria-label="submit points">Submit Points</div>
    </div>
  )
}
