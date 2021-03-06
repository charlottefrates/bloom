import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {browserHistory } from 'react-router';

import $ from 'jquery';
import '../styles/landing.css';
import '../styles/nav.css';

import {
    logoutUser
} from '../actions/authentication_actions';

class Home extends React.Component {


    componentDidMount() {
      $('.brand').hover(function() {
        $('.brandLogo').toggleClass('hide fadeInLeft')
      });

      $('.handle').on('click', function() {
        $('nav ul').toggleClass('showing');
      });

      $('.brand, .logo').on('click',function(event){
                               event.preventDefault();

                               var page = $("html, body");

                               page.on(function(){page.stop();});

                               page.animate({ scrollTop: $(".about-page").offset().top -65}, 900, function(){
                                  page.off();
                              });

                               return false;

      })

    }

    onLogout = () =>{
          this.props.dispatch(logoutUser());
     };



    renderLinks() {
      if (this.props.authenticated) {
        // show a link to sign out
        return [
          <div>
            <li className="brand">
            BLOOM
            </li>

            <li onClick={() =>browserHistory.push('/bloom')} className="signup li" >
              Welcome back {localStorage.getItem('userId').replace(/\"/g, " ")}!
            </li>
          </div>
        ]
      }
      else {
        // show a link to sign in or sign up
        return [
          <div>

          <li className="brand">
          BLOOM
          </li>

            <li onClick = {()=> browserHistory.push('/signup')} className="signin li" >
              Sign-Up
            </li>


            <li  onClick = {()=> browserHistory.push('/signin')} className="signup li" >
              Sign-In
            </li>
            </div>

        ]
      };
    }

    rendersignUp() {
      if (this.props.authenticated) {
        // show a link to sign out
        return [
          <div>

          </div>
        ]
      }
      else {
        // show a link to sign in or sign up
        return [
             <div id="sign-up">
                  <div className="rowwer">
                       <div className="col-12-landing">
                            <h2 className="sign-up-title black">Start Tracking Your Watering Zones now</h2>
                            <div className="sign-up-box">
                         <button className="sign-up-button2" onClick={()=> browserHistory.push('/signup')} >Sign Up</button>
                            </div>
                       </div>
                  </div>
             </div>

        ]
      };
    }


    render() {
        return (
            <Router>
            <div className="overflow">
            <nav className="navigation-bar is-visible" data-nav-status="toggle">
                <ul className="ul">
                  {this.renderLinks()}
                </ul>
                <div className="handle">
                  Bloom
                </div>
            </nav>


            <div className="cd-fixed-bg cd-bg-1">
        	    <div className="landingpage-container">
        	        <div className="landingpage-details-container">
                       <img className="logo" role="presentation" src="logo.jpg" />
        	        </div>
        	   	</div>
        	</div>

            <div className="cd-fixed-bg cd-bg-2">

        		<div className="about-page">

        			<div className="about-card-landings-container-1">

        					<div className="about-card-landing">
        							<h3>Add Customized Watering Zones</h3>
        							<hr className="short-line cards-line" />
        							<p> Bloom lets you organize every zone in your yard by assigning it a unique name of your choice.</p>
        					</div>
        					<div className="about-card-landing">
        							<h3>Check Current Weather</h3>
        							<hr className="short-line cards-line" />
        							<p>Bloom provides current weather forecasts to help in generating an optimized watering plan for your yard.</p>
        					</div>

        			</div>

        			<div className="about-card-landings-container-2">
        					<div className="about-card-landing">
        						<h3>Project Your Water Usage</h3>
        						<hr className="short-line cards-line" />
        						<p> Project the right watering schedule for your lawn, so you can put an end to over watering.</p>
        					</div>
        					<div className="about-card-landing">
        						<h3>Save Projections</h3>
        						<hr className="short-line cards-line" />
        						<p>Maintain a list of historical projections to get a better understanding of your water use through time.</p>
        					</div>
        			</div>

        		</div>
        	</div>
                <div className="cd-fixed-bg cd-bg-1">
        				{this.rendersignUp()}
        		</div>
            </div>

            </Router>
        );
    }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated
  };
}

export default connect(mapStateToProps)(Home);
