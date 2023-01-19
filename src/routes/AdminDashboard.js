import { useEffect, useState, useContext } from 'react'
import AdminHeader from '../components/AdminHeader.js'
import QueenColumn from "../components/QueenColumn.js"
import { MobileContext } from "../context/MobileContext.js"
import { createColumnGroups } from '../utils/index.js'
import styles from "../styles/Admin/Dashboard.module.css"

export default function AdminDashboard({ allQueensData }) {
  const [allQueens, setAllQueens] = useState()
  const [columnGroups, setColumnGroups] = useState()
  const isMobile = useContext(MobileContext)

  useEffect(() => {
    const queenIDs = Object.keys(allQueensData)
    const queens = [];
    queenIDs.forEach((id) => {
      const { name, active } = allQueensData[id];
      if (active) {
        queens.push({
          id,
          name,
          points: 0,
          menuOpen: false,
          selected: {
            winner: false,
            mini: false,
            top: false,
            bottom: false,
            low: false,
            eliminated: false
          }
        })
      }
    })
    setAllQueens(queens)
  }, [allQueensData])

  useEffect(() => {
    const columns = createColumnGroups(allQueens, isMobile)
    setColumnGroups(columns);
  }, [allQueens, isMobile])

  return (
    // <div className={styles.appContainer}>
    <div className="page-container background-pink">
      <div className={styles.container}>
        <AdminHeader allQueens={allQueens} setAllQueens={setAllQueens} />
        <div className={styles.columnContainer}>
          {columnGroups &&
            Object.keys(columnGroups).map((group, i) => {
              return (
                <QueenColumn queens={columnGroups[group]} key={i} setAllQueens={setAllQueens} />
              )
            })}
        </div>
      </div>
    </div>

  )
}
