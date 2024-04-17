// Import required libraries and components.
import React from 'react';
// import { Route, Redirect } from'react-router-dom'; Deprecated replaced with Navigate.
import { Route, Navigate } from'react-router-dom';

// Create component to redirect users to log-in page if they are not logged in.
const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (<Route {...rest} render={props => (loggedIn ? <Component {...props} /> : <Navigate to='login' />)} />);

export default PrivateRoute;