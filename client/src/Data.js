import config from './config.js'

export default class Data {


  /**
   * Getting data from back-end Rest API
   * @param {string} path                       routing path
   * @param {string} method                     method
   * @param {Object} [body=null]                object pass to req.body
   * @param {Boolean} [requiresAuth = false]    required Authentication ?
   * @param {Object} [credentials = null]       credentials for authentication
   * @return {Object}                           data from Rest API
  */
  api(path, method, body = null, requiresAuth = false, credentials=null) {
    const url =  config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }

    if(body !== null) {
      options.body = JSON.stringify(body)
    }

    if(requiresAuth){
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
      options.headers['Authorization'] = `Basic ${encodedCredentials}`
    }

    return fetch(url, options)
  }


  /**
   * Getting Courses data from back-end Rest API
   * @param {string} route              routing path
   * @param {string} method             method
   * @return {Promise}                  Courses data from Rest API
  */
  async getCourses(route, method) {
    const response = await this.api(route, method , null);
    if(response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }


  /**
   * Create new User and post to Rest API
   * @param {Object} user     User sign up Data
   * @return {Promise}        Empty array or array of errors
  */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user)
    if(response.status === 201) {
      return []
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors.map(error => error)
      })
    } else {
      throw new Error()
    }
  }

  /**
   * Getting User data from REST API
   * @param {String} emailAddress   User sign in emailAddress
   * @param {String} password       User sign in password
   * @return {Promise}              User data or null
  */
  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
    if(response.status === 200){
      return response.json()
    }else if(response.status === 401) {
      return response.json().then(data => {
        return null
      })
    } else {
      throw new Error();
    }
  }


  /**
   * Create mew Course to Rest API
   * @param {Object} courses        Course information
   * @param {String} emailAddress   emailAddress
   * @param {String} password       password
   * @return {Promise}              Empty array or errors
  */
  async createCourse (course, emailAddress, password){
    const response  = await this.api('/courses', 'POST', course, true, { emailAddress, password })
    if(response.status == 201){
      return []
    }else if (response.status === 400) {
      return response.json().then(data => {
         return data.errors.map(error => error)
    })
    } else {
      throw new Error();
    }
  }


  /**
   * Delte existing courses
   * @param {String} endpoint       course to delete
   * @param {String} emailAddress   emailAddress
   * @param {String} password       password
   * @return {Promise}
  */
  async deleteCourse(endpoint, emailAddress, password) {
    const response =await this.api(endpoint, 'DELETE', null, true, { emailAddress, password })
    if(response.status !== 204 && response.status !== 403){
      throw new Error();
    }
  }


  /**
   * Update existing courses
   * @param {String} endpoint       course to update
   * @param {Object} course         data to update
   * @param {String} emailAddress   emailAddress
   * @param {String} password       password
   * @return {Promise}              Empty array or errors
  */
  async updateCourse(endpoint, course, emailAddress, password ) {
    const response = await this.api(endpoint, 'PUT', course, true, { emailAddress, password })
    if(response.status == 204){
      return []
    }else if (response.status === 400) {
      return response.json().then(data => {
         return data.errors.map(error => error)
       })
    } else {
      throw new Error();
    }
  }
};
