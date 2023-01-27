import { useState } from 'react'
import { weekValues } from '../../utils/data.js';
import styles from '../../styles/CreatePlayer.module.css';
import dropdownStyles from '../../styles/Form/Dropdown.module.css'
import WeeklistItem from '../../components/Admin/WeekListItem.js';

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('')

  function toggleSelectMenu() {
    setMenuOpen(!menuOpen)
  }

  function handleSubmit() {

  }

  const label = "select week"

  return (
    <div className="page-container">
      <div className={styles.container} >
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="Select players"></label>
            <div className={dropdownStyles.selectButton} onClick={toggleSelectMenu} aria-label={label}>
              <div aria-label={label} className={dropdownStyles.buttonText}>{label}</div>
              <span className={menuOpen ? `${dropdownStyles.selectArrow} ${dropdownStyles.open}` : `${dropdownStyles.selectArrow}`}></span>
            </div>
            <div className={dropdownStyles.listContainer}>
              <ul className={menuOpen ? `${dropdownStyles.listItems} ${dropdownStyles.menuOpen}` : `${dropdownStyles.listItems}`} aria-label="list of queens">
                {
                  weekValues.map((week) => {
                    return (
                      <WeeklistItem week={week} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
                    )
                  })
                }
              </ul>
            </div>
            <div className={styles.buttons}>
              <div className={styles.submitButton} onClick={handleSubmit} role="button" aria-label="create team">Adjust Points</div>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

// className={dropdownStyles.selectButton}
// aria-selected={queen.selected[category]}
// role="option"