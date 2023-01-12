import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ref, onValue } from "firebase/database";
import { db } from './config/index.js';
import AdminDashboard from './routes/AdminDashboard.js';
import Scores from "./routes/Scores.js"
import './styles/globals.css';
import CreatePlayer from './routes/CreatePlayer.js';


function App() {
  const [width, setWidth] = useState(undefined);
  const [isMobile, setIsMobile] = useState(true);
  const [allQueensData, setAllQueensData] = useState([])

  useEffect(() => {
    setWidth(window.innerWidth)
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    width > 768 ? setIsMobile(false) : setIsMobile(true);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

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
    <div className="App">
      <Routes>
        <Route path="/hello" element={<h1>Hello</h1>} />
        <Route path="/scores" element={<Scores isMobile={isMobile} />} />
        <Route path="/create-player" element={<CreatePlayer allQueensData={allQueensData} />} />
        <Route path="/admin/scores" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;