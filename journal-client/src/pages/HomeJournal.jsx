import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HomeJournal() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [entries, setEntries] = useState([]);

    const handleDelete = async (slug) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return;

        try {
            const response = await fetch('http://localhost:5000/api/entries', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug }),
            });

            if (response.ok) {
                // navigate('/');
                setEntries(entries.filter(entry => entry.slug !== slug));
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete entry');
            }
        } catch (err) {
            alert('Error deleting entry');
        }
    };

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
                            <Link key={index} to={`/entry/${entry.slug}`} className="li-link">
                            <li>
                                <div className="info-home">
                                <div className="info-card">
                                    <span>{entry.date_today}</span>
                                    <p>{entry.title}</p>
                                </div>
                                <div className="info-delete-update">
                                    <button
                                    className="delete-icon"
                                    onClick={(e) => {
                                        e.preventDefault(); // prevent Link navigation
                                        handleDelete(entry.slug);
                                    }}
                                    >
                                    <img className="img-tag" src="/trash.svg" alt="delete" />
                                    </button>
                                </div>
                                </div>
                            </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    </div>
  );
}

export default HomeJournal;
