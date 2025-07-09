import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HomeJournal() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/entries');

                // json is being parsed here
                const data = await response.json();

                // setEntries triggers re-render
                setEntries(data);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, []);

  return (
      <div className="home-journal">
        <div className="header">
            <div className="title">
                <h1>Your journal entries</h1>
            </div>
            <div className="new-entry">
                <Link to="/new-entry"><p>New entry</p></Link>
            </div>
        </div>
        <div className="entry_body">
            <div className="entry">
                {entries.length === 0 ? (
                    <p>No entries found.</p>
                ) : (
                    <ul>
                        {entries.map((entry, index) => (
                            <li key={index}>
                                <Link to={`/entry/${entry.slug}`}>{entry.date_today}<p>{entry.title}</p></Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    </div>
  );
}

export default HomeJournal;
