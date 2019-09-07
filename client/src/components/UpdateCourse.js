import React, {Component} from 'react'
import Form from './Form.js'
export default class UpdateCourse extends Component {

  state = {
    userId: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

  componentDidMount(){
    this.getCourse()
  }

  getCourse = () => {
    this.props.context.data.getCourses(`/courses/${this.props.match.params.id}`, 'GET')
    .then(responseData => {
      if(this.props.context.authenticated.id === responseData.userId){
        if(responseData !== null) {
          const {
            userId,
            title,
            description,
            estimatedTime,
            materialsNeeded,
          } = responseData;

          this.setState({
            userId,
            title,
            description,
            estimatedTime,
            materialsNeeded
          })
        } else {
          this.props.history.push('/notfound')
        }
      } else {
        this.props.history.push('/forbidden')
      }
    })
    .catch(err => {
        this.props.history.push('/error')
    })
  }

  render(){
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
            <Form
              cancel={this.cancel}
              submit={this.submit}
              submitButtonText = 'Update Course'
              errors={errors}
              elements={() => (
                <React.Fragment>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input id="title"
                                    name="title"
                                    type="text"
                                    className="input-title course--title--input"
                                    placeholder="Course title..."
                                    value={title}
                                    onChange={this.change}/>
                      </div>
                      <p>By {this.props.context.authenticated.firstName} {this.props.context.authenticated.lastName}</p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea id="description"
                                       name="description"
                                       className=""
                                       placeholder="Course description..."
                                       onChange={this.change}
                                       value={description} />
                      </div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div>
                            <input id="estimatedTime"
                                   name="estimatedTime"
                                   type="text"
                                   className="course--time--input"
                                   placeholder="Hours"
                                   value={estimatedTime}
                                   onChange={this.change}/>
                          </div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea id="materialsNeeded"
                                      name="materialsNeeded"
                                      className=""
                                      placeholder="List materials..."
                                      onChange={this.change}
                                      value ={materialsNeeded} />
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


  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value
    })
  }

  cancel = () => {
    this.props.history.push('/')
  }

  submit = () => {
    const { context }= this.props;

    const {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    const {emailAddress, password} = this.props.context

    context.data.updateCourse( `/courses/${this.props.match.params.id}` ,course, emailAddress, password)
    .then( errors => {
      if(errors.length) {
        this.setState({errors})
      } else {
        this.props.history.push('/')
      }
    })
  }
}
