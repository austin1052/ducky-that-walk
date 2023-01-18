import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ref, onValue } from "firebase/database"
import { db } from './config/index.js'
import AdminDashboard from './routes/AdminDashboard.js'
import Scores from "./routes/Scores.js"
import LoadingScreen from './components/LoadingScreen.js'
import CreatePlayer from './routes/CreatePlayer.js'
import { MobileContextProvider } from './context/MobileContext.js'
import './styles/globals.css'


function App() {
  const [allQueensData, setAllQueensData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const queensRef = ref(db, "queens/")
    onValue(queensRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setAllQueensData(data)
        setIsLoading(false)
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
              <Route path="/scores" element={<Scores />} />
              <Route path="/create-player" element={<CreatePlayer allQueensData={allQueensData} />} />
              <Route path="/admin/scores" element={<AdminDashboard allQueensData={allQueensData} />} />
            </Routes>
        }
      </div>
    </MobileContextProvider>
  )
}

export default App