import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  // entries starting as empty array.
  const [entries, setEntries] = useState([]);

  // useEffect(() => {
  //     fetch('http://localhost:5000/api/journal')
  //     .then(res => res.json())
  //     .then(data => setEntries(data))
  //     .catch(err => {
  //       console.error('Failed to fetch entries:', err);
  //       setEntries([]);
  //     });
  // }, []);


  const res = await fetch('/api/colour', {
    // or post for method
    method: 'GET',
    headers: { 'Content-Tpe': 'application/json' },
    body: JSON.stringify({
      'date_today': date_today,
      'user_entry': user_entry
    }),
  });

// need to import json into this file
  const journals_list = journal_entries.map(entry => ({
      date_today: entry.date_today,
      slug: entry.slug,
      user_entry: entry.user_entry
  }))


  return (
    <div className="home-page">
        <div className='home-card'>
            <h1>Welcome to your journal</h1>
            <Link to="/new-entry">New journal entry</Link>
        </div>
        <div className="index-of-entries">
          {/* rather use slug instead of index */}
          {entries.map((entry, index) => (
              <Link key={index} to={`/entry/${entry.slug}`}>{entry.date_today}</Link>
          ))}
        </div>
    </div>
  );
}
export default Home;
