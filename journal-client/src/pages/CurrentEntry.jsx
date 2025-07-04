import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
            <div className="home-page">
                <div className="home-card"><h1>entry not found.</h1></div>
            </div>
        );
    }

    return (
        <div className="home-journal">
            <div className='home-card'>
                <h1>{entry.date_today}</h1>
                <h1>{entry.title}</h1>
                <h1>{entry.user_entry}</h1>
            </div>
        </div>
    );
}

export default CurrentEntry;