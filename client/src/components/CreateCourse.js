import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form.js'


export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

  change = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  submit = () => {
    const {context} = this.props
    const {emailAddress, password} = context
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state

    const course = {
      userId: context.authenticated.id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    context.data.createCourse(course,emailAddress, password)
    .then(errors => {
      if(errors.length){
        this.setState({errors})
      } else {
        this.props.history.push('/')
      }
    })
  }

  cancel = () => {
    this.props.history.push('/')
  }

  render(){
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state

    return(
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText='Create Course'
            elements = {() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title"
                                name="title"
                                type="text"
                                className="input-title course--title--input"
                                placeholder="Course title..."
                                onChange={this.change}
                                value={title}/>
                    </div>
                    <p>By Joe Smith</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description"
                                   name="description"
                                   className=""
                                   placeholder="Course description..."
                                   onChange={this.change}
                                   value={description}/>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    className="course--time--input"
                                    placeholder="Hours"
                                    onChange={this.change}
                                    value={estimatedTime} />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded"
                                       name="materialsNeeded"
                                       className=""
                                       placeholder="List materials..."
                                       onChange={this.change}
                                       value={materialsNeeded}/>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    )
  }
}
