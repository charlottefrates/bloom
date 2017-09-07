import React from 'react';

//React Router
import {BrowserRouter as Router} from 'react-router-dom';

import '../styles/landing.css';


export default class Home extends React.Component {


    render() {
        return (
            <Router>
            <div>

            <div className="cd-fixed-bg cd-bg-1">
            <nav className="navigation-bar is-visible" data-nav-status="toggle">
                    <ul>
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
        			<video id="blooming" src="http://localhost:3000/blooming.mp4" autoPlay loop></video>

        		   	<div className="about-header-container">
        					<h2>How It Works</h2>
        			</div>

        			<div className="about-card-landings-container-1">

        					<div className="about-card-landing">
        							<img className="about-icon-landing" role="presentation" src="assets/images/review.png" />
        							<h3>Add Customized Watering Zones</h3>
        							<hr className="short-line cards-line" />
        							<p> Bloom lets you organize every zone in your yard by assigning it a unique name of your choice.</p>
        					</div>
        					<div className="about-card-landing">
        							<img className="about-icon-landing" role="presentation" src="assets/images/filter.png" />
        							<h3>Check Current Weather</h3>
        							<hr className="short-line cards-line" />
        							<p>Bloom provides current weather forecasts from a highly trusted weather service to help in generating an optimized watering plan for your yard.</p>
        					</div>

        			</div>

        			<div className="about-card-landings-container-2">
        					<div className="about-card-landing">
        						<img className="about-icon-landing" role="presentation" src="assets/images/local.png" />
        						<h3>Project Your Water Usage</h3>
        						<hr className="short-line cards-line" />
        						<p> Project the right watering schedule for your lawn, so you can put an end to over watering.</p>
        					</div>
        					<div className="about-card-landing">
        						<img className="about-icon-landing" role="presentation" src="assets/images/local.png" />
        						<h3>Save Projections</h3>
        						<hr className="short-line cards-line" />
        						<p>Compare and contrast historical projections to get a better understanding of your water use through time.</p>
        					</div>
        			</div>

        		</div>
        	</div>
                <div className="cd-fixed-bg cd-bg-1">
        			<div id="sign-up">
        				<div className="rowwer">
        					<div className="col-12-landing">
        						<h2 className="sign-up-title">Start Tracking Your Watering Zones now</h2>
        						<div className="sign-up-box">
                                <button className="sign-up-button" onClick={() =>this.props.history.push('/signup')} >Sign Up</button>
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
