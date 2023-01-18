import { useState, useEffect } from 'react'
import { getWeek, getDate } from '../utils/admin.js'
import { updatePoints } from '../utils/db.js'
import headerStyles from "../styles/Admin/Header.module.css"

export default function AdminHeader({ allQueens, setAllQueens }) {
  const [currentWeek, setCurrentWeek] = useState()

  useEffect(() => {
    const date = getDate();
    setCurrentWeek(date)
  }, [])

  function submitPoints() {
    const week = getWeek(currentWeek)
    const updatedQueensList = updatePoints(allQueens, week);
    setAllQueens(updatedQueensList)
  }

  return (
    <div className={headerStyles.container}>
      <div className={headerStyles.submit} onClick={submitPoints} role="button" aria-label="submit points">Submit Points</div>
    </div>
  )
}
