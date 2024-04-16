// Setting up our imports.
import React from "react";
// We use the Link to link to different routes.
import { Link } from "react-router-dom";

// Will track when the user is logged in or not, and will reflect the appropriate actions for them. Also links to different routes.
const Header = ({ loggedIn, setLoggendIn }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggendIn(false);
    };

    return (
        <div>
            <h1>Ashery's Haberdashery</h1>
            <nav>
                <ul>
                    <li><Link to='/hats'>Hats</Link></li>
                    <li><Link to='/coats'>Coats</Link></li>
                    <li><Link to='/shirts'>Shirts</Link></li>
                    <li><Link to='/pants'>Pants</Link></li>
                    <li><Link to='/appointments'>Book Appointments</Link></li>
                    {loggedIn ? <li><button onClick={handleLogout}>Logout</button></li> : null}
                </ul>
            </nav>
        </div>
    );
};

export default Header;