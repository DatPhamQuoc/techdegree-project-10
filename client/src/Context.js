import React , {Component} from 'react';
import Data from './Data.js';
import Cookies from 'js-cookie';
const Context = React.createContext();


/**
 * Make a Provider class
 * @type {Object}
 */
export class Provider extends Component {

  state = {
    authenticated: Cookies.getJSON('authenticated') || null,
    emailAddress: Cookies.getJSON('emailAddress') || null,
    password: Cookies.getJSON('password') || null,
    courseDetail: null
  }

  constructor() {
    super();
    this.data = new Data();
  }

  render () {
    const { authenticated,  emailAddress, password } = this.state
    const value = {
      authenticated,
      emailAddress,
      password,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      }
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  /**
   * Sign In and set cookies
   * @param {String} emailAddress   emailAddress
   * @param {String} password       password
   * @return {Promise}              user data
  */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password)
    if(user !== null){
      this.setState({
        authenticated: user,
        emailAddress,
        password
      })
      Cookies.set('authenticated', JSON.stringify(user), { expires: 1 })
      Cookies.set('emailAddress', JSON.stringify(emailAddress), { expires: 1 })
      Cookies.set('password', JSON.stringify(password), { expires: 1 });
    }
    return user;
  }


  /**
   * Sign Out
   * Remove all the existing cookies and change authenticated state to null
  */
  signOut = () => {
    this.setState({authenticated: null})
    Cookies.remove('authenticated')
    Cookies.remove('emailAddress')
    Cookies.remove('password')
  }

}

export const Consumer = Context.Consumer;

/**
* HOC for consumer components
* @param {[type]} Component   Component that consumes state values
* @return {[type]}            Component with props & context value
*/
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    )
  }
}
