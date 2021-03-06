import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authentication_actions';
import {browserHistory } from 'react-router';

 class Register extends React.Component {

   componentDidMount () {
     window.scrollTo(0, 0)
   }

  handleUserFormSubmit(event) {
  event.preventDefault();

  this.props.dispatch(registerUser({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      password: this.password.value,
    }));

  }


  render(props) {

    return (
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
      <div>
        <div id="sign-up2">
          <div className="rowwer2">
            <div className="col-12-landing-2">
              <h2 className="sign-up-title">Sign-Up</h2>
              <div className="sign-up-box-2">
                <form  className="register" onSubmit={(event) => this.handleUserFormSubmit(event)}>
                              <fieldset name="register-info">
                                <input  ref={element => {this.firstName = element; return this.firstName; }} type="text" className="placeholder" name="firstName" id="firstName"  placeholder="first name" required=""/>
                                <input  ref={element => {this.lastName = element; return this.lastName; }} type="text" className="placeholder" name="lastName" id="lastName"  placeholder="last name" required=""/>
                                {/*<input  ref={element => {this.lastName = element; return this.email; }} type="text" className="placeholder" name="email" id="email"  placeholder="email" required=""/>*/}
                                <input  ref={element => {this.username = element; return this.username; }} type="text" className="placeholder" name="username" id="username"  placeholder="username" required=""/>
                                <input  ref={element => {this.password = element; return this.password; }} type="password" className="placeholder" name="password" id="password" placeholder="password" required=""/>
                              </fieldset>
                  <button type="submit" className="sign-up-button">Sign In</button>
                  <p onClick={() =>window.location.href = '/signin'} className="noAccount" > Already have an account? Click here. </p>
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
     authenticated: state.authenticated
});



//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(Register);
