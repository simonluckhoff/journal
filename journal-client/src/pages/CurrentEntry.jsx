import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function CurrentEntry() {
    const { slug } = useParams();
    const [entry, setEntry] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return;

        try {
            const response = await fetch('http://localhost:5000/api/entries', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug }),
            });

            if (response.ok) {
                navigate('/');
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
                    <h1>{entry.date_today}</h1>
                </div>
                <div className="journal-info-card">
                    <h3>{entry.title}</h3>
                    <p className='entry-paragraph'>{entry.user_entry}</p>
                </div>
                <div className="return-home">
                    <Link to="/"><p>Return Home</p></Link>
                    <div className="second">
                    <Link to={`/edit-entry/${entry.slug}`}><p>Edit</p></Link><br />
                    <button className='submitting' onClick={handleDelete}><img className="img-tag" src="/trash.svg" alt="delete" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentEntry;