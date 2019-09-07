import React , {Component} from 'react';
import Data from './Data.js';
import Cookies from 'js-cookie';
const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticated: Cookies.getJSON('authenticated') || null,
    emailAddress: null,
    password: null,
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

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password)
    if(user !== null){
      this.setState({
        authenticated: user,
        emailAddress,
        password
      })
      Cookies.set('authenticated', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState({authenticated: null})
    Cookies.remove('authenticated')
  }

}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    )
  }
}
