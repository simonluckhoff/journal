import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          {/* im naming the path here haha /home */}
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/new-entry" element={<NewEntry/>}></Route>
          <Route path="/journal-entries" element={<JournalEntries/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
