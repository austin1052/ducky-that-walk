import QueenScoreCard from './QueenScoreCard.js'
import styles from '../styles/QueenColumn.module.css'

export default function QueenColumn({ queens, setAllQueens }) {
  return (
    <div className={styles.container}>
      {
        queens && queens.map((queen) => {
          return (
            <QueenScoreCard queen={queen} key={queen.id} setAllQueens={setAllQueens} />
          )
        })
      }
    </div>
  )
}