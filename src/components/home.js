import React from 'react';

//React Router
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

//For React DOM render
import Bloom from './bloom';

/*
<Route path="/signin" component={Signin} />
<Route path="/signout" component={Signout} />
<Route path="/signup" component={Signup} />
*/



export default function Home(){
    return(
        <Router>
        <div>
        <h1 className="black"> Hello landing page </h1>
        <h1><Link exact to="/bloom">Enter Bloom</Link>  </h1>
        </div>
        </Router>

    )

}
