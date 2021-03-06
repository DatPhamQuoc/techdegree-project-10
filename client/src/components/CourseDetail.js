import React, {Component} from 'react'
import {Link} from 'react-router-dom'
const ReactMarkdown = require('react-markdown')

export default class CourseDetail extends Component {

  state = {
    course: ''
  };

  componentDidMount() {
    this.getCourse();
  };

  // Fetch courses data from REST API
  getCourse = () => {
    this.props.context.data.getCourses(`/courses/${this.props.match.params.id}`, 'GET')
    .then(responseData => {
      if(responseData !== null) {
        this.setState({course: responseData})
      } else {
        this.props.history.push('/notfound')
      }
    }).catch(err => {
        this.props.history.push('/error')
    })
  }

  // Delete existing course
  deleteCourse = () => {
    const {emailAddress, password } = this.props.context
    this.props.context.data.deleteCourse(`/courses/${this.props.match.params.id}`, emailAddress, password )
    .then(()=>{this.props.history.push('/')})
  }

  render() {
    let content;
    let courseMaterials;
    let courseDescription;
    const {authenticated} = this.props.context;
    const  {course}  = this.state;

    if (!this.state.course.User){
      content = <p>Loading...</p>
    } else {
      courseDescription = course.description
      courseMaterials = course.materialsNeeded

      content =
        <div>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">

                    {
                      authenticated && authenticated.id == course.userId ?
                        <React.Fragment>
                          <span>
                            <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                            <Link onClick={this.deleteCourse} to='#' className="button">Delete Course</Link>
                          </span>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        </React.Fragment>
                    }
                      <Link className="button button-secondary" to="/">Return to List</Link>
                  </div>
                </div>
              </div>
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                    <p>By {course.User.firstName} {course.User.lastName}</p>
                  </div>
                  <div className="course--description">
                    <ReactMarkdown source={courseDescription} />
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{course.estimatedTime}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
                           <ReactMarkdown source={courseMaterials} />
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
        </div>
    }

    return(
      <div>
        {content}
      </div>
    )
  }
}
