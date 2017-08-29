import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {Router,NavLink} from 'react-router-dom';
import { registerUser } from '../actions/authentication_actions';
import * as actions from '../actions/authentication_actions';

 class Register extends Component {
  constructor(props) {
   super(props)
   this.state = {
     firstName: 'first name',
     lastName: 'last name',
     username: 'username',
     password: ''
  }
 }

 firstName_change(event) {
   this.setState({ firstName: event.target.value });
 }

 lastName_change(event) {
   this.setState({ lastName: event.target.value });
 }

 username_change(event) {
   this.setState({ username: event.target.value });
 }

 password_change(event) {
   this.setState({ password: event.target.value });
 }

  handleUserFormSubmit(event) {
  event.preventDefault();
  console.log(JSON.stringify(this.state));
  this.props.dispatch(registerUser(JSON.stringify(this.state)));
  }


  render(props) {

    return (
      <div>
      <div>
        <div id="sign-up2">
          <div className="rowwer2">
            <div className="col-12-landing-2">
              <h2 className="sign-up-title">Sign-Up</h2>
              <div className="sign-up-box-2">
                <form  className="register" onSubmit={(event) => this.handleUserFormSubmit(event)}>
                              <fieldset name="register-info">
                                <input onChange={ (event)=> this.firstName_change(event)} type="text" className="placeholder" name="firstName" id="firstName"  placeholder="first name" required=""/>
                                <input onChange={ (event)=> this.lastName_change(event)} type="text" className="placeholder" name="lastName" id="lastName"  placeholder="last name" required=""/>
                                <input onChange={ (event)=> this.username_change(event)} type="text" className="placeholder" name="username" id="username"  placeholder="username" required=""/>
                                <input onChange={ (event)=> this.password_change(event)} type="password" className="placeholder" name="password" id="password" placeholder="password" required=""/>
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

const mapStateToProps = (state, props) => ({
    error: state.error,
     authenticated: state.authenticated
});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(Register);
