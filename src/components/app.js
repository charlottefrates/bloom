import React from 'react';

//React Router
import { Router,Route,browserHistory } from 'react-router';

import RequireAuth from './require_auth'

import store from '../store';
import Home from './home';
import Bloom from './bloom';
import Register from '../containers/register';
import Login from '../containers/login';
import Instructions from '../containers/instructions';


//styling
import '../styles/app.css';

const user = JSON.parse(localStorage.getItem('accessToken'));

// If we have a token, consider the user to be signed in
if (user) {
  console.log('token present', localStorage);
  console.log(user.token);
  // we need to update application state
  store.dispatch({ type: 'AUTH_USER', user });

}


export default function App() {

    return (
        <Router history={browserHistory}>
        <div className="root">
        <Route  path="/" component={Home} />
        <Route  path="/bloom" component={RequireAuth(Bloom)} />
        <Route  path="/signin" component={Login}/>
        <Route  path="/signup" component={Register}/>
        <Route  path="/instructions" component={Instructions}/>
        </div>
        </Router>
    );


}
