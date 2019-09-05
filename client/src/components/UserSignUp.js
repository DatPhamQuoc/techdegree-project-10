import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form.js'

export default class UserSignIn extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }

  render(){
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <div>
                    <input id="firstName"
                          name="firstName"
                          type="text"
                          className=""
                          placeholder="First Name"
                          value={firstName}
                          onChange={this.change}/>
                  </div>
                  <div>
                    <input id="lastName"
                          name="lastName"
                          type="text"
                          className=""
                          placeholder="Last Name"
                          value={lastName}
                          onChange={this.change}/>
                  </div>
                  <div>
                    <input id="emailAddress"
                          name="emailAddress"
                          type="text"
                          className=""
                          placeholder="Email Address"
                          value={emailAddress}
                          onChange={this.change}/>
                  </div>
                  <div>
                    <input id="password"
                          name="password"
                          type="password"
                          className=""
                          placeholder="Password"
                          value={password}
                          onChange={this.change}/>
                  </div>
                  <div>
                    <input id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          className=""
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={this.change}/>
                  </div>
                </React.Fragment>
              )}/>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="sign-in.html">Click here</Link> to sign in!</p>
        </div>
      </div>
    )
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value
    })
  }

  submit = () =>{
    const { context }= this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    context.data.createUser(user)
      .then( errors => {
        console.log(errors)
        if(errors.length) {
          this.setState({errors})
        } else {
          context.actions.signIn(emailAddress, password)
        }
      })
  }

  cancel = () => {
    this.props.history.push('/')
  }

}
