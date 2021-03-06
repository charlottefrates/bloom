import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication_actions';
import {browserHistory } from 'react-router';

import '../styles/landing.css';
import '../styles/nav.css';


class Login extends Component {

 componentDidMount () {
   window.scrollTo(0, 0)
   }

  handleUserFormSubmit(event) {
  event.preventDefault();
  this.props.dispatch(loginUser({
      username: this.username.value,
      password: this.password.value,
    }));

  }


  render() {

    return (
      <div>
      <div>
        <div>
        <nav className="navigation-bar-login is-visible" data-nav-status="toggle">

        <ul className="ul-login">
        <li className="brand-login" onClick={() =>window.location.href = '/'}>
        BLOOM
        </li>
        </ul>
        <div className="handle" onClick={() =>window.location.href = '/'}>
          Bloom
        </div>

        </nav>

      </div>
        <div id="sign-up2">
          <div className="rowwer2">
            <div className="col-12-landing-2">
              <h2 className="sign-up-title">Log In</h2>
              <div className="sign-up-box-2">
                <form className="register" onSubmit={(event) => this.handleUserFormSubmit(event)}>
                              <fieldset name="register-info">
                                  <input ref={element => {this.username = element; return this.username; }} type="text" className="placeholder" name="username" id="username" placeholder="Username" required=""/>
                                  <input ref={element => {this.password = element; return this.password; }} type="password" className="placeholder" name="password" id="password" placeholder="Password" required=""/>
                              </fieldset>
                  <button type="submit" className="sign-up-button">Sign In</button>
                  <br/>
                  <br/>
                  <br/>
                  <p className="noAccount2"> For demo account use:
                    <br/>
                    username = demo
                    <br/>
                    password = demo
                  </p>
                  <p onClick={() =>window.location.href = '/signup'} className="noAccount" > Wan't a personal account? Click here.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    );
  }
}

const mapStateToProps = (state, props) => ({
     authenticated: state.authenticated,
     error: state.error
});



export default connect(mapStateToProps)(Login);
