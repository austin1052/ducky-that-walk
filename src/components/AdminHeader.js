import { useState, useEffect } from 'react'
import { getWeek, getDate } from '../utils/admin.js'
import { updateWeeklyPoints } from '../utils/db.js'
import headerStyles from "../styles/Admin/Header.module.css"

export default function AdminHeader({ allQueens, setAllQueens }) {
  const [currentWeek, setCurrentWeek] = useState()

  useEffect(() => {
    const date = getDate();
    setCurrentWeek(date)
  }, [])

  function submitPoints() {
    getWeek(currentWeek)
    const updatedQueensList = updateWeeklyPoints(allQueens, "week3")
    setAllQueens(updatedQueensList)
  }

  return (
    <div className={headerStyles.container}>
      {/* <h1>Adjust Points</h1> */}
      <div className={headerStyles.submit} onClick={submitPoints} role="button" aria-label="submit points">Submit Points</div>
    </div>
  )
}
