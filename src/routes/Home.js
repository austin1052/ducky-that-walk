import { Link } from "react-router-dom"
import logo from "../assets/ducky-that-walk-logo.png"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="ducky that walk" />
      {/* <div className={styles.duck}>🦆</div> */}
      <Link to="/scores" className={styles.link}>View Scores</Link>
    </div>
  )
}