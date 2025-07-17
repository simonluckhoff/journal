import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NewEntry = () => {
    const [date_today, setDateToday] = useState('');
    const [title, setTitle] = useState('');
    const [user_entry, setUserEntry] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>  {
        e.preventDefault();

        if (!date_today || !title || !user_entry) {
            setError('please fill in all fields');
            return
        }
        setError('');

        // res is short for response! 
        const res = await fetch('http://localhost:5000/api/entries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'date_today': date_today,
                'title': title,
                'user_entry': user_entry
            }),
        });

    // data will be object retunred by flask backend 
    const data = await res.json();
    // response state from backend. 
    setResponse(data.message)

        setTimeout(() => {
            const slug = title.trim().toLowerCase();
            navigate(`/Entry/${slug}`);
        }, 1000); 
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <h1>enter a new entry</h1>
                <form onSubmit={handleSubmit}>
                    <label>Date:</label>
                    <input type="text" value={date_today}
                        onChange={(e) => setDateToday(e.target.value)} />

                    <label>Title:</label>
                    <input type="text" value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                    <label>Entry:</label>
                    <textarea type="text" value={user_entry}
                        onChange={(e) => setUserEntry(e.target.value)}
                        rows={10}
                    />

                    <button className='submitting' type='submit'>Add</button>
                    {error && <p className="error-msg">{error}</p>}
                    <div className="return-home">
                        <Link to="/"><p>Return Home</p></Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default NewEntry;