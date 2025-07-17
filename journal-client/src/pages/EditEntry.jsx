import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditEntry() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState({ title: '', date_today: '', user_entry: '' });

    useEffect(() => {
        // fetching the entry by slug
        fetch('http://localhost:5000/api/entries')
            .then(res => res.json())
            .then(data => {
                console.log(data, slug); // debug line
                const found = data.find(e => e.slug === slug);
                if (found) setEntry(found);
            });
    }, [slug]);

    const handleChange = e => {
        setEntry({ ...entry, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/entries', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...entry, slug}),
        }); 
        navigate(`/entry/${slug}`);
    }

  return (
        <div className="form-container">
            <div className="form-card">
            <h1>Edit Entry</h1>
            <form onSubmit={handleSubmit}>
                <label>Date:</label>
                    <input name="date_today" value={entry.date_today} onChange={handleChange} />
                <label>Title:</label>
                    <input name="title" value={entry.title} onChange={handleChange} />
                <label>Entry:</label>
                        <textarea name="user_entry" value={entry.user_entry} onChange={handleChange} />
                <button type="submit">Save</button>
            </form>
            <div className="return-home">
                <Link to="/"><p>Return Home</p></Link>
            </div>
        </div>
    </div>
  )
}

export default EditEntry;
