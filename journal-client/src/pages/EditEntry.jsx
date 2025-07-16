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
        navigate('/');
    }

  return (
    <div className="edit-entry">
        <h1>Edit Entry</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Date:
                <input name="date_entry" value={entry.date_entry} onChange={handleChange} />
            </label>
            <label>
                Title:
                <input name="title" value={entry.title} onChange={handleChange} />
            </label>
            <label>
                Entry:
                <input name="user_entry" value={entry.user_entry} onChange={handleChange} />
            </label>
            <button type="submit">Save</button>
        </form>
        <Link to="/"><p>Return Home</p></Link>
    </div>
  )
}

export default EditEntry;
