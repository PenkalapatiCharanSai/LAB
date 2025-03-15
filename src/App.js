import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Travel from "./components/Travel";
import TravelExperiences from "./components/TravelExperiences";


function App() {
  return (
    <Router>
      {/* <h2>Travel log</h2> */}
      <nav className="navbar">
        <Link to="/">Add Experience</Link>
        <Link to="/view">View Experiences</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Travel />} />
        <Route path="/view" element={<TravelExperiences />} />
      </Routes>
    </Router>
  );
}

export default App;
