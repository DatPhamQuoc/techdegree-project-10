import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header.js';
import Courses  from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js'
import CreateCourse from './components/CreateCourse.js'
import UpdateCourse from './components/UpdateCourse.js'
import UserSignIn from './components/UserSignIn.js'
import UserSignUp from './components/UserSignUp.js'
import UserSignOut from './components/UserSignOut.js'
import PrivateRoute from './PrivateRoute.js'
import withContext from './Context.js'

const HeaderWithContext = withContext(Header);
const creatCourseWithContext = withContext(CreateCourse);
const coursesWithContext = withContext(Courses);
const courseWithContext = withContext(CourseDetail);
const updateCourseWithContext = withContext(UpdateCourse);
const userSignUpWithContext = withContext(UserSignUp);
const userSignInWithContext = withContext(UserSignIn);
const userSignOutWithContext = withContext(UserSignOut);

export default () => {
  return (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={coursesWithContext} />
          <PrivateRoute exact path="/courses/create" component={creatCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={updateCourseWithContext} />
          <Route exact path="/courses/:id" component={courseWithContext} />
          <Route path="/signin" component={userSignInWithContext} />
          <Route path="/signup" component={userSignUpWithContext} />
          <Route path="/signout" component={userSignOutWithContext} />
        </Switch>
      </div>
    </Router>
  );
}
