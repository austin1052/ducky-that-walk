
import styles from "../../styles/Form/Dropdown.module.css"

export default function WeeklistItem({ week, selectedWeek, setSelectedWeek }) {
  const itemStyle = selectedWeek === week[1] ? `${styles.listItem} ${styles.checked}` : `${styles.listItem}`

  function toggleChecked() {
    console.log('click');
    if (selectedWeek === week[1]) {
      setSelectedWeek('')
    } else {
      setSelectedWeek(week[1])
    }
  }

  return (
    <li className={itemStyle} onClick={toggleChecked} aria-label={week[0]}>
      <span className={styles.checkbox}></span>
      <span className={styles.itemText}>{week[0]}</span>
    </li >
  )
}