import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from '../config/index.js';
import styles from '../styles/CreatePlayer.module.css';
import { createNewPlayer } from '../utils/db.js';
import QueenSelection from '../components/QueenSelection.js'
import { options } from '../utils/data.js'

const CreatePlayer = () => {
  const [queensList, setQueensList] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [houseName, setHouseName] = useState("");
  const [userFormActive, setUserFormActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState({ player: false, slayer: false, winner: false })

  useEffect(() => {
    const queensRef = ref(db, "queens/");
    onValue(queensRef, (snapshot) => {
      if (snapshot.exists()) {
        const queenData = [];
        const names = [];
        const data = snapshot.val();
        const queenIDs = Object.keys(data);
        queenIDs.forEach((id) => {
          queenData.push({
            selected: {
              winner: false,
              slayer: false,
              player: false
            },
            name: data[id].name,
            id
          });
          names.push(data[id].name);
        })
        setQueensList(queenData);
      }
    });
  }, [])

  function setPlayerQueens() {
    const playerQueens = [];
    queensList.forEach(queen => {
      Object.keys(options).forEach(option => {
        const category = options[option].category
        if (queen.selected[category]) {
          playerQueens.push([queen.id, options[option].multiplier])
        }
      })
    })
    return playerQueens;
  }

  function resetForm() {
    setUsername("");
    setName("");
    setHouseName("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const queens = setPlayerQueens();
    const playerData = {
      username, name, houseName, queens
    }
    console.log({ playerData });
    createNewPlayer(playerData);
    resetForm();
  }

  function usernameChangeHandler(event) {
    event.preventDefault();
    setUsername(event.target.value);
  };

  function nameChangeHandler(event) {
    event.preventDefault();
    setName(event.target.value);
  };

  function houseNameChangeHandler(event) {
    event.preventDefault();
    setHouseName(event.target.value);
  };

  let userFormCSS, queenFormCSS;
  function setFormPosition() {
    if (userFormActive) {
      userFormCSS = `${styles.inputContainer}`;
      queenFormCSS = `${styles.inputContainer} ${styles.hiddenRight}`
    }
    if (!userFormActive) {
      userFormCSS = `${styles.inputContainer} ${styles.hiddenLeft}`;
      queenFormCSS = `${styles.inputContainer}`
    }
  }

  function toggleForm(event) {
    event.preventDefault();
    setUserFormActive(!userFormActive)
  }

  setFormPosition();

  return (
    <>
      <div className={styles.container} >
        <form className={styles.form}>
          <div className={userFormCSS}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={usernameChangeHandler} />
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" value={name} onChange={nameChangeHandler} />
            <label htmlFor="house-name">House Name</label>
            <input type="text" id="house-name" name="house-name" value={houseName} onChange={houseNameChangeHandler} />
            <div className={styles.buttons}>
              <button className={styles.submitButton} onClick={toggleForm}>Choose Team</button>
            </div>
          </div>
          <div className={queenFormCSS}>
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.playerOptions} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.slayerOptions} />
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.winnerOptions} />
            <div className={styles.buttons}>
              <div className={styles.backButton} onClick={toggleForm}></div>
              <button className={styles.submitButton} onClick={handleSubmit}>Create Team</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePlayer;
