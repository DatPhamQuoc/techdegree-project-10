import config from './config.js'

export default class Data {
  api(path, method, body = null, requiresAuth = false, credentials) {
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

  async getCourses(route, method) {
    const response = await this.api(route, method , null);
    if(response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      return null
    }
  }

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

  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
    if(response.status === 200){
      return response.json()
    }else if(response.status === 401) {
      return response.json().then(data => {
        return null
      })
    }
  }

  async createCourse (course, emailAddress, password){
    const response  = await this.api('/courses', 'POST', course, true, { emailAddress, password })
    if(response.status == 201){
      return []
    }else if (response.status === 400) {
      return response.json().then(data => {
         return data.errors.map(error => error)
    })
    }
  }

  async deleteCourse(endpoint, emailAddress, password) {
    await this.api(endpoint, 'DELETE', null, true, { emailAddress, password })
  }


  async updateCourse(endpoint, course, emailAddress, password ) {
    const response = await this.api(endpoint, 'PUT', course, true, { emailAddress, password })
    if(response.status == 204){
      return []
    }else if (response.status === 400) {
      return response.json().then(data => {
         return data.errors.map(error => error)
    })
    }
  }
};
