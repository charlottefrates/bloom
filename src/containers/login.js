import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication_actions';




class Login extends Component {
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

export default connect(null)(Login);
