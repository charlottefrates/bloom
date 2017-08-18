import React from 'react';

//React Router
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

//For React DOM render
import Bloom from './bloom';

export default class Home extends React.Component {

    render() {
        return (
            <Router>
            <div>
            <h1 className="black">Hello landing page</h1>
            <button className="tempMargin" onClick={() =>this.props.history.push('/bloom')}> Enter Bloom  </button>
            </div>
            </Router>
        );
    }
}
