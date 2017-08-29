import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../actions/authentication_actions';




export default class Login extends Component {

  render() {

    return (
      <div>
      <div>
        <div id="sign-up2">
          <div className="rowwer2">
            <div className="col-12-landing-2">
              <h2 className="sign-up-title">Log In</h2>
              <div className="sign-up-box-2">
                <form className="register" action="/users" method="post" autocomplete="off">
                              <fieldset name="register-info">
                                  <input type="text" className="placeholder" name="username" id="username" placeholder="Username" required=""/>
                                  <input type="password" className="placeholder" name="password" id="password" placeholder="Password" required=""/>
                              </fieldset>
                  <button type="submit" className="sign-up-button" onClick={() =>this.props.history.push('/bloom')}>Sign In</button>
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
