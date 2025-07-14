import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CurrentEntry() {
    const { slug } = useParams();
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/entries');
                const data = await response.json();
                const found = data.find(e => e.slug === slug);
                setEntry(found);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, [slug]);

    if (!entry) {
        return (
            <div className="journal-home-page">
                <div className="journal-error-card">
                    <h1>entry not found.</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="journal-wrapper">
            <div className="journal-display-card">
                <div className="journal-edit-link">
                    <Link to="/new-entry"><p>Edit</p></Link>
                    <h1>{entry.date_today}</h1>
                </div>
                <div className="journal-info-card">
                    <h3>{entry.title}</h3>
                    <p>{entry.user_entry}</p>
                </div>
            </div>
        </div>
    );

}

export default CurrentEntry;