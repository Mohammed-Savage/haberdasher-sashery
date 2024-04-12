// Import required libraries and components.
import React from 'react';
import { Route, Redirect } from'react-router-dom';

// Create component to redirect users to loging page if they are not logged in.
const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (<Route {...rest} render={props => (loggedIn ? <Component {...props} /> : <Redirect to='login' />)} />);

export default PrivateRoute;