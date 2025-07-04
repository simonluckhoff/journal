import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeJournal from './pages/HomeJournal.jsx';
import NewEntry from './pages/NewEntry.jsx';
import './styles/App.scss';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeJournal/>} />
          <Route path="/new-entry" element={<NewEntry/>} />
        </Routes>
      </Router>
  );
}

export default App;
