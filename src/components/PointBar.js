import { useState } from 'react'
import { isAlreadySelected } from '../utils/index.js'
import styles from '../styles/PointBar.module.css'
import { buttonColors, pointValues, initialButtonStyles, initialCategories } from '../utils/data.js'

export default function PointBar({ queen, setAllQueens, menuOpen }) {
  const [buttonStyles, setButtonStyles] = useState({
    initialButtonStyles
  })

  const { winner, mini, top, bottom, low, eliminated } = queen.selected

  let containerStyle = menuOpen ? `${styles.container} ${styles.visible}` : `${styles.container}`

  let winnerStyle = !winner && isAlreadySelected(queen, "winner") ?
    `${styles.span3} ${styles.winner} ${styles.disabled}` :
    `${styles.span3} ${styles.winner}`

  let miniStyle = !mini && isAlreadySelected(queen, "mini") ?
    `${styles.span3} ${styles.mini} ${styles.disabled}` :
    `${styles.span3} ${styles.mini}`

  let topStyle = !top && isAlreadySelected(queen, "top") ?
    `${styles.span3} ${styles.top} ${styles.disabled}` :
    `${styles.span3} ${styles.top}`

  let bottomStyle = !bottom && isAlreadySelected(queen, "bottom") ?
    `${styles.span3} ${styles.bottom} ${styles.disabled}` :
    `${styles.span3} ${styles.bottom}`

  let lowStyle = !low && isAlreadySelected(queen, "low") ?
    `${styles.span3} ${styles.low} ${styles.disabled}` :
    `${styles.span3} ${styles.low}`

  let eliminatedStyle = !eliminated && isAlreadySelected(queen, "eliminated") ?
    `${styles.span3} ${styles.eliminated} ${styles.disabled}` :
    `${styles.span3} ${styles.eliminated}`


  function closeMenu() {
    const updatedQueen = { ...queen, menuOpen: false, points: 0, selected: initialCategories }
    setAllQueens((allQueens) => {
      return allQueens.map(q => {
        if (q.id !== queen.id) return q;
        return updatedQueen
      })
    })
    setButtonStyles({
      initialButtonStyles
    })
  }

  // when a button is selected update queen.points with value in toggleButton
  // if X is clicked, clear points
  // if check is clicked, keep points
  // all queens points will be submitted to firebase when Submit button is clicked

  // may not need this....
  function submitPoints() {
    const updatedQueen = { ...queen, menuOpen: false }
    setAllQueens((allQueens) => {
      return allQueens.map(q => {
        if (q.id !== queen.id) return q;
        return updatedQueen
      })
    })
  }

  function updateQueen(category, selected, points) {
    const updatedSelectionValue = { ...queen.selected, [category]: selected }
    const updatedQueen = { ...queen, selected: updatedSelectionValue, points }
    return updatedQueen
  }

  function toggleButton(category) {
    let alreadySelected = isAlreadySelected(queen, category);
    let points, updatedQueen, buttonStyle;
    if (!queen.selected[category] && !alreadySelected) {
      points = queen.points + pointValues[category]
      updatedQueen = updateQueen(category, true, points)
      buttonStyle = buttonColors[category]
    } else if (queen.selected[category]) {
      points = queen.points - pointValues[category]
      updatedQueen = updateQueen(category, false, points)
      buttonStyle = buttonColors.grey
    } else if (alreadySelected) {
      return
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
      <div className={topStyle} style={buttonStyles.top} onClick={() => toggleButton("top")}>
        Top
      </div>
      <div className={winnerStyle} style={buttonStyles.winner} onClick={() => toggleButton("winner")}>
        Winner
      </div>
      <div className={lowStyle} style={buttonStyles.low} onClick={() => toggleButton("low")}>
        Low
      </div>
      <div className={miniStyle} style={buttonStyles.mini} onClick={() => toggleButton("mini")}>
        Mini
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