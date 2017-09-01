import React from 'react';
import { connect } from 'react-redux';

//React Router
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';
import {browserHistory} from 'react-router';

import RequireAuth from './require_auth'

import store from '../store';
import Home from './home';
import Bloom from './bloom';
import Register from '../containers/register'
import Login from '../containers/login'


//styling
import '../styles/app.css';

const user = JSON.parse(localStorage.getItem('user'));

// If we have a token, consider the user to be signed in
if (user) {
  console.log('token present', localStorage);
  // we need to update application state
  store.dispatch({ type: 'AUTH_USER', user });

}


export default function App() {

    return (
        <Router history={browserHistory}>
        <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/bloom" component={RequireAuth(Bloom)} />
        <Route exact path="/signin" component={Login}/>
        <Route exact path="/signup" component={Register}/>

        </div>
        </Router>
    );


}
