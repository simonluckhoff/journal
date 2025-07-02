import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/journal')
        .then(res => res.json())
        .then(data => setEntries(data));
    }, []);


    return (
        <div className="home-page">
            <div className='home-card'>
                <h1>Welcome to your journal</h1>
                <Link to="/new-entry">New journal entry</Link>
            </div>
            <div className="index-of-entries">
                <ul>
                    {entries.map((entry, index) => (
                        <Link key={index} to={'/entry/${link.slug}'}>{entry.date_today}</Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;