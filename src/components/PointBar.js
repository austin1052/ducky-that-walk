import { useState } from 'react'
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
  let containerStyle = `${styles.container}`
  if (menuOpen) {
    containerStyle = `${styles.container} ${styles.visible}`
  }

  function closeMenu() {
    queen[1].menuOpen = false
    setAllQueens(queens => [...queens])
  }

  function submitPoints() { }

  function winnerClick() {
    if (buttonStyles.winner === buttonColors.winner) {
      setButtonStyles({
        ...buttonStyles,
        winner: buttonColors.grey
      })
    }
    if (buttonStyles.winner === buttonColors.grey) {
      setButtonStyles({
        ...buttonStyles,
        winner: buttonColors.winner
      })
    }
  }

  function miniClick() {
    if (buttonStyles.mini === buttonColors.mini) {
      setButtonStyles({
        ...buttonStyles,
        mini: buttonColors.grey
      })
    }
    if (buttonStyles.mini === buttonColors.grey) {
      setButtonStyles({
        ...buttonStyles,
        mini: buttonColors.mini
      })
    }
  }

  function topClick() {
    console.log("click");
    if (buttonStyles.top === buttonColors.top) {
      setButtonStyles({
        ...buttonStyles,
        top: buttonColors.grey
      })
    }
    if (buttonStyles.top === buttonColors.grey) {
      setButtonStyles({
        ...buttonStyles,
        top: buttonColors.top
      })
    }
  }

  function bottomClick() {
    if (buttonStyles.bottom === buttonColors.bottom) {
      setButtonStyles({
        ...buttonStyles,
        bottom: buttonColors.grey
      })
    }
    if (buttonStyles.bottom === buttonColors.grey) {
      setButtonStyles({
        ...buttonStyles,
        bottom: buttonColors.bottom
      })
    }
  }

  function eleminatedClick() {
    if (buttonStyles.eliminated === buttonColors.eliminated) {
      setButtonStyles({
        ...buttonStyles,
        eliminated: buttonColors.grey
      })
    }
    if (buttonStyles.eliminated === buttonColors.grey) {
      setButtonStyles({
        ...buttonStyles,
        eliminated: buttonColors.eliminated
      })
    }
  }

  return (
    <div className={containerStyle}>
      <div className={`${styles.span3} ${styles.winner}`} style={buttonStyles.winner} onClick={winnerClick}>
        Winner
      </div>
      <div className={`${styles.span3} ${styles.mini} `} style={buttonStyles.mini} onClick={miniClick}>
        Mini
      </div>
      <div className={`${styles.span3} ${styles.top} `} style={buttonStyles.top} onClick={topClick}>
        Top
      </div>
      <div className={`${styles.span3} ${styles.bottom} `} style={buttonStyles.bottom} onClick={bottomClick}>
        Bottom
      </div>
      <div className={`${styles.spanAll} ${styles.eliminated} `} style={buttonStyles.eliminated} onClick={eleminatedClick}>
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