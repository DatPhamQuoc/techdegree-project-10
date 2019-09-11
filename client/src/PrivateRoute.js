import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { Consumer } from './Context.js'

/**
 HOC that return protected route with required authentication
*/
export default ({component: Component, ...rest}) =>{
  return(
    <Consumer>
      {context => (
          <Route {...rest} render = {props => context.authenticated ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )}
        />
      )}
    </Consumer>
  )
}
