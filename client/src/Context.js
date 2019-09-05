import React , {Component} from 'react';
import Data from './Data.js';
const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticated: null,
    emailAddress: null,
    password: null,
    course: null
  }

  constructor() {
    super();
    this.data = new Data();
  }

  render () {
    const { authenticated, course, emailAddress, password } = this.state
    const value = {
      authenticated,
      emailAddress,
      password,
      course,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        getCourse: this.getCourse
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
    }
    return user;
  }

  signOut = () => {
    this.setState({authenticated: null})
  }

  getCourse = async (route, method) => {
    const course = await this.data.getCourses(route, method);
    if(course !== null){
      this.setState({course})
    }
    return course;
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
