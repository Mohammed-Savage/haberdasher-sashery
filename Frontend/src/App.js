// Setting up our imports.
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// TO-DO: Create and import the Navbar component.
import Navbar from "./components/Navbar";
import axios from 'axios';
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from './components/Signup';
import PrivateRoute from "./components/PrivateRoute";
import Category from "./components/Category";
import Appointment from "./components/Appointment";

// Set up our App component.
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path='/login'>
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route path='/signup'>
            <Signup setLoggedIn={setLoggedIn} />
          </Route>
          {/* These are my test routes that need more work */}
          {/* <Route path="/" element={<Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/category" element={<Category loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/appointment" element={<Appointment loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} /> */}
          {/* PrivateRoute wraps the Route components from react-router-dom and adds some additional logic to prevent access to the route if the user is not logged in. */}
          <PrivateRoute path='/hats' component={() => <Category category='Hats' />} loggedIn={loggedIn} />
          <PrivateRoute path='/coats' component={() => <Category category='Coats' />} loggedIn={loggedIn} />
          <PrivateRoute path='/shirts' component={() => <Category category='Shirts' />} loggedIn={loggedIn} />
          <PrivateRoute path='/pants' component={() => <Category category='Pants' />} loggedIn={loggedIn} />
          <PrivateRoute path='/appointments' component={Appointment} loggedIn={loggedIn} />
          {/* These are the path routes without a Priavte Route */}
          {/* <Route path='/category'></Route> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
