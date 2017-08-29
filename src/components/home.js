import React from 'react';

//React Router
import {BrowserRouter as Router, Route, Link,NavLink} from 'react-router-dom';

//html 5 video
//import { DefaultPlayer as Video } from 'react-html5video';

//For React DOM render
import Bloom from './bloom';



import '../styles/landing.css';


export default class Home extends React.Component {

    render() {
        return (
            <Router>
            <div>
            <div className="cd-fixed-bg cd-bg-1">
        		<nav className="navigation-bar is-visible" data-nav-status="toggle">
                    <ul>
            	       <li onClick={() =>this.props.history.push('/bloom')}>ENTER</li>
                       <li onClick={() =>this.props.history.push('/signin')}> Log In</li>
                       <li onClick={() =>this.props.history.push('/signup')}> Sign Up </li>
                       <li> About </li>

                    </ul>
                </nav>

        	     <div className="landingpage-container">
        	        <div className="landingpage-details-container">
        	             <h1 className="welcome-header">Bloom</h1>
        	             <h2>A Smart Water Tracker</h2>
        	        </div>
        	   	</div>
        	</div>

            <div className="cd-fixed-bg cd-bg-2">
        		<div className="about-page">
        			<video id="blooming"src="blooming.mp4" preload="yes" controlsList="nodownload" autoPlay></video>

        		   	<div className="about-header-container">
        					<h2>How It Works</h2>
        					<hr className="short-line" />
        			</div>

        			<div className="about-card-landings-container-1">

        					<div className="about-card-landing">
        							<img className="about-icon-landing" role="presentation" src="assets/images/review.png" />
        							<h3>Add Customized Watering Zones</h3>
        							<hr className="short-line cards-line" />
        							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum ipsa obcaecati repellat. Iure, delectus minima minus quod itaque omnis numquam illo, animi mollitia nulla corporis, voluptas rem ut? Quis, sit.</p>
        					</div>
        					<div className="about-card-landing">
        							<img className="about-icon-landing" role="presentation" src="assets/images/filter.png" />
        							<h3>Check Current Weather</h3>
        							<hr className="short-line cards-line" />
        							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, nulla eligendi minima, cupiditate dignissimos explicabo veritatis. Delectus enim dolorum, ab esse ea maxime consectetur, iusto nesciunt nobis, aliquam assumenda. Nihil.</p>
        					</div>

        			</div>

        			<div className="about-card-landings-container-2">
        					<div className="about-card-landing">
        						<img className="about-icon-landing" role="presentation" src="assets/images/local.png" />
        						<h3>Project Your Water Usage</h3>
        						<hr className="short-line cards-line" />
        						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quod, et suscipit aliquam explicabo perferendis fuga temporibus aut officia modi ullam ex corrupti minima, cupiditate animi necessitatibus accusamus assumenda vitae. </p>
        					</div>
        					<div className="about-card-landing">
        						<img className="about-icon-landing" role="presentation" src="assets/images/local.png" />
        						<h3>Save Projections</h3>
        						<hr className="short-line cards-line" />
        						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quod, et suscipit aliquam explicabo perferendis fuga temporibus aut officia modi ullam ex corrupti minima, cupiditate animi necessitatibus accusamus assumenda vitae. </p>
        					</div>
        			</div>

        		</div>
        	</div>
                <div className="cd-fixed-bg cd-bg-1">
        			<div id="sign-up">
        				<div className="rowwer">
        					<div className="col-12-landing">
        						<h2 className="sign-up-title">Start Tracking Your Water Zones now</h2>
        						<div className="sign-up-box">
                                <button type="submit" className="sign-up-button" onClick={() =>this.props.history.push('/signup')}>Register</button>
        						</div>
        					</div>
        				</div>
        			</div>
        		</div>
            </div>

            </Router>
        );
    }
}
