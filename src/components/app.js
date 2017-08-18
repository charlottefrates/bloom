import React from 'react';

//React Router
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';
import {browserHistory} from 'react-router';


import Home from './home';
import Bloom from './bloom';


export default function App() {

    return (
        <Router history={browserHistory}>
        <div>
        <Route exact path="/" component={Home} />

        <Route exact path="/bloom" component={Bloom} />

        </div>
        </Router>
    );


}
