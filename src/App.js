import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ref, onValue } from "firebase/database";
import { db } from './config/index.js';
import AdminDashboard from './routes/AdminDashboard.js';
import Scores from "./routes/Scores.js"
import './styles/globals.css';
import CreatePlayer from './routes/CreatePlayer.js';
import { MobileContextProvider } from './context/MobileContext.js';


function App() {
  const [allQueensData, setAllQueensData] = useState([])

  useEffect(() => {
    const queensRef = ref(db, "queens/");
    onValue(queensRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAllQueensData(data);
      }
    });
  }, [])

  return (
    <MobileContextProvider>
      <div className="App">
        <Routes>
          <Route path="/hello" element={<h1>Hello</h1>} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/create-player" element={<CreatePlayer allQueensData={allQueensData} />} />
          <Route path="/admin/scores" element={<AdminDashboard allQueensData={allQueensData} />} />
        </Routes>
      </div>
    </MobileContextProvider>
  );
}

export default App;