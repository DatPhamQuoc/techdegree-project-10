import React from 'react'
import {Link} from 'react-router-dom'

export default (props) => {
  const {authenticated} = props.context
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        {
          authenticated ?
          <React.Fragment>
            <nav>
              <span>Welcome {authenticated.firstName} {authenticated.lastName} !</span>
              <Link className="signout" to="/signout">Sign Out</Link>
            </nav>
          </React.Fragment>
          :
          <React.Fragment>
            <nav>
              <Link className="signin" to="/signin">Sign In</Link>
              <Link className="signout" to="/">Sign Out</Link>
            </nav>
          </React.Fragment>
        }
      </div>
    </div>
  )
}
