import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Form from './Form.js'

export default class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
    errors: []
  }

  render(){
    const {emailAddress, password, errors} =  this.state
    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText = 'Sign In'
              elements={() => (
                <React.Fragment>
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
                </React.Fragment>
              )}
            />
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    )
  }

  change = (e) => {
    const { name, value }= e.target
    this.setState({
      [name]: value
    })
  }

  submit = () => {
    const { context } = this.props
    const { from } = this.props.location.state || { from: { pathname:  this.props.history.goBack() } };
    const {emailAddress, password} = this.state
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if(user === null) {
          this.setState({errors: ['Sign-in was unsuccessful']})
        } else {
          this.props.history.push(from)
        }
      }).catch(err => {
          this.props.history.push('/error')
      })
  }

  cancel = () => {
    this.props.history.push('/')
  }
}
