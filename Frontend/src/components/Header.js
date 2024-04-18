// Setting up our imports.
import React from "react";
// We used to use the Link component to link to different routes but it has since been deprecated and been replaced with the NavLink component.
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../App.css";


// Will track when the user is logged in or not, and will reflect the appropriate actions for them. Also links to different routes.
const Header = ({ loggedIn, setLoggedIn }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <div className="App-header"> {/* Here I'm applying the 'App-header' class */}
            <h1>Ashery's Haberdashery</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/hats" className="App-link"> {/* Once more, I'm applying the 'App-link' class */}
                            Hats
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/coats" className="App-link"> 
                            Coats
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shirts" className="App-link"> 
                            Shirts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pants" className="App-link"> 
                            Pants
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/appointments" className="App-link"> 
                            Book Appointments
                        </NavLink>
                    </li>
                    {loggedIn ? (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    ) : null}
                </ul>
            </nav>
        </div>
    );
};

export default Header;