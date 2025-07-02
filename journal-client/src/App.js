import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import NewEntry from './pages/NewEntry.jsx';
import './styles/App.scss';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/new-entry" element={<NewEntry/>} />
        </Routes>
      </Router>
  );
}

export default App;
