// The first thing we need to do is import our modules.
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Let's create our Login component.
const Login = ({ setLoggedIn }) => {
    // First we're using the useState hook to create our state variables for our email and password.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // We're also creating state variables for our error message and loading state.
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // Finally we're using useHistory hook to create and access the history instance. 
    // TO-DO: Change useHistory to useNavigate.
    const history = useHistory();

    // Let's write a function to handle our login process.
    const handleLogin = async () => {
        // If you'll note on line 13 we set the Loading state to false. Here we're setting it to true, which will indicate that the login process is currently in progress.
        setLoading(true);
        // This is just a very boilerplate try/catch statement that will handle errors during the login process.
        try {
            // We're now going to use the axios module we imported in order to send a POST request to our backend: /api/login. We're going to include the email and password in the body of the request as data.
            const response = await axios.post('/api/login', { email, password });
            // Provided the login information was accurate and the login was successful, our server should respond with a token. We'll store the token in our browsers local storage and set the loggedIn state to true.
            localStorage.setItem('token', response.data.token);
            // Here we'll call the setLoggedIn function from our parent component and we'll pass in true as an argument. This will update the parent component's state variable to true and will indicate the user is meow logged in. If there are any errors at this portion cosult with Sakib.
            setLoggedIn(true); 
            // The aforementioned line is how we update our parent component state to indicate the user is meow logged in.
            // We can't just leave our user hanging after successfully logging in. As such, we're going to call a function to forward the user to our home page.
            history.push('/');
        } catch (error) {
            // Should there be any errors during our login process we'll call the following function to update the error state variable with a custom message.
            setError('Invalid email or password');
            // A very wise Software Engineer once instructed me to consolelog regularly. Because we're good students we're going to log the error to the console as we've been instructed to do so.
            console.error('Login error:', error);
        }
        // Since we've finnaly finished logging in, we're going to set our Loading state variable to false. This marks the end of a successful login request.
        setLoading(false);
    };

    // Now that we've constructed the login functionality we'll go ahead and render our function to the end user screen.
    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;

// Editors Note: If I'm experiencing issues, I might need to: note that the setLoggedIn function is passed as a prop to the Login component. This function should update a state variable in the parent component that tracks whether the user is logged in or not. 