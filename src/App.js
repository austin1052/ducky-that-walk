import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ref, onValue } from "firebase/database"
import { db } from './config/index.js'
// import { db } from './config/local.js'
import UpdateScores from './routes/Admin/UpdateScores.js'
import Scores from "./routes/Scores.js"
import LoadingScreen from './components/LoadingScreen.js'
import CreatePlayer from './routes/CreatePlayer.js'
import { MobileContextProvider } from './context/MobileContext.js'
import './styles/globals.css'
import LogIn from './routes/LogIn.js'

function App() {
  const [allQueensData, setAllQueensData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const queensRef = ref(db, "queens/")
    onValue(queensRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setAllQueensData(data)
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    })
  }, [])

  return (
    <MobileContextProvider>
      <div className="App">
        {
          isLoading ?
            <LoadingScreen /> :
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/scores" element={<Scores allQueensData={allQueensData} />} />
              <Route path="/create-player" element={<CreatePlayer allQueensData={allQueensData} />} />
              <Route path="/admin/scores" element={<UpdateScores allQueensData={allQueensData} />} />
            </Routes>
        }
      </div>
    </MobileContextProvider>
  )
}

export default App