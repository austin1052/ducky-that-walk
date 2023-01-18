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
    const week = getWeek(currentWeek)
    const updatedQueensList = updateWeeklyPoints(allQueens, week);
    setAllQueens(updatedQueensList)
  }


  let path = "../assets/rupaul.mp3"
  let audio = new Audio(path)

  const start = () => {
    audio.play()
  }

  return (
    <div className={headerStyles.container}>
      <h1>Adjust Points</h1>
      <div className={headerStyles.submit} onClick={start} role="button" aria-label="submit points">Submit Points</div>
    </div>
  )
}
