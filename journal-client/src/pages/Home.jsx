import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='main'>
            <h1>Welcome to your journal</h1>
            <Link to="/new-entry">New journal entry</Link>
        </div>
    );
}

export default Home;