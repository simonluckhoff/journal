import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeJournal from './pages/HomeJournal.jsx';
import NewEntry from './pages/NewEntry.jsx';
import CurrentEntry from './pages/CurrentEntry.jsx';
import EditEntry from './pages/EditEntry.jsx';
import './styles/App.scss';

function App() {
  return (
      <Router>
        <Routes>
          {/* this makes it default home page */}
          <Route path="/" element={<Navigate to="/HomeJournal" replace />} />
          <Route path="/HomeJournal" element={<HomeJournal/>} />
          <Route path="/new-entry" element={<NewEntry/>} />
          <Route path="/entry/:slug" element={<CurrentEntry/>} />
          <Route path="/edit-entry/:slug" element={<EditEntry/>} />
        </Routes>
      </Router>
  );
}

export default App;
