// Importing Modules:
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Creating functional component, "Signup":
const Signup = ({ setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // TO-D: Update useHistory to useNavigate.
    const history = useHistory();

    // Creating asynchronous function that handles sign up request when called.
    const handleSignUp = async () => {
        setLoading(true);
        try {
            await axios.post('/api/signup', { email, password });
            setLoggedIn(true); // Update parent component state to indicate user is logged in.
            history.push('/');
        }   catch (error) {
            setError('Error signing up. Please try again.');
            console.error('Signup error:', error);
        }
        setLoading(false);
    };

    // Component render method:
    return (
        <div>
            <h2>Signup</h2>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <imput type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSignUp} disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

// Exporting Signup component so it can be imported and used by other files. 
export default Signup;