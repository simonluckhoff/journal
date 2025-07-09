import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddEntry = () => {
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

        const res = await fetch('/api/entry', {
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
            const slug = date_today.trim().toLowerCase();
            navigate(`/Entry/${slug}`);
        }, 1000); 
    }

    return (
        <div className="main">
            <h1>Enter a new entry</h1>
            <form onSubmit={handleSubmit}>
                <label>date_today</label>
                <input type="text" value={date_today}
                    onChange={(e) => setDateToday(e.target.value)} />
            </form>
        </div>
    )
}

export default NewEntry;