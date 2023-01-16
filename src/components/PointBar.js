import { useState } from 'react'
import { isAlreadySelected } from '../utils/index.js'
import styles from '../styles/PointBar.module.css'
import { buttonColors } from '../utils/data.js'

export default function PointBar({ queen, setAllQueens, menuOpen }) {
  const [buttonStyles, setButtonStyles] = useState({
    winner: buttonColors.grey,
    mini: buttonColors.grey,
    top: buttonColors.grey,
    bottom: buttonColors.grey,
    eliminated: buttonColors.grey
  })

  const { winner, mini, top, bottom, eliminated } = queen.selected

  let containerStyle = `${styles.container}`
  if (menuOpen) {
    containerStyle = `${styles.container} ${styles.visible}`
  }

  let winnerStyle = !winner && isAlreadySelected(queen, "winner") ? `${styles.span3} ${styles.winner} ${styles.disabled}` : `${styles.span3} ${styles.winner}`

  let miniStyle = !mini && isAlreadySelected(queen, "mini") ? `${styles.span3} ${styles.mini} ${styles.disabled}` : `${styles.span3} ${styles.mini}`

  let topStyle = !top && isAlreadySelected(queen, "top") ? `${styles.span3} ${styles.top} ${styles.disabled}` : `${styles.span3} ${styles.top}`

  let bottomStyle = !bottom && isAlreadySelected(queen, "bottom") ? `${styles.span3} ${styles.bottom} ${styles.disabled}` : `${styles.span3} ${styles.bottom}`

  let eliminatedStyle = !eliminated && isAlreadySelected(queen, "eliminated") ? `${styles.spanAll} ${styles.eliminated} ${styles.disabled}` : `${styles.spanAll} ${styles.eliminated}`

  function closeMenu() {
    queen.menuOpen = false
    setAllQueens(queens => [...queens])
  }

  function submitPoints() { }

  function updateQueen(category, value) {
    const updatedSelectionValue = { ...queen.selected, [category]: value }
    const updatedQueen = { ...queen, selected: updatedSelectionValue }
    return updatedQueen;
  }

  function toggleButton(category) {
    let alreadySelected = isAlreadySelected(queen, category);
    let updatedQueen, buttonStyle;
    if (!queen.selected[category] && !alreadySelected) {
      updatedQueen = updateQueen(category, true)
      buttonStyle = buttonColors[category]
    } else {
      updatedQueen = updateQueen(category, false)
      buttonStyle = buttonColors.grey
    }
    setButtonStyles({
      ...buttonStyles,
      [category]: buttonStyle
    })
    setAllQueens((allQueens) => {
      return allQueens.map((q) => {
        if (q.id !== queen.id) return q
        return updatedQueen;
      })
    })
  }

  return (
    <div className={containerStyle}>
      <div className={winnerStyle} style={buttonStyles.winner} onClick={() => toggleButton("winner")}>
        Winner
      </div>
      <div className={miniStyle} style={buttonStyles.mini} onClick={() => toggleButton("mini")}>
        Mini
      </div>
      <div className={topStyle} style={buttonStyles.top} onClick={() => toggleButton("top")}>
        Top
      </div>
      <div className={bottomStyle} style={buttonStyles.bottom} onClick={() => toggleButton("bottom")}>
        Bottom
      </div>
      <div className={eliminatedStyle} style={buttonStyles.eliminated} onClick={() => toggleButton("eliminated")}>
        Eliminated
      </div>
      <div className={`${styles.submitButton} ${styles.button} `} onClick={submitPoints} role="button" aria-label="confirm adjust points">
        <div></div>
      </div>
      <div className={`${styles.cancelButton} ${styles.button} `} onClick={closeMenu} role="button" aria-label="cancel adjust points">
        <div></div>
      </div>
    </div >
  )
}