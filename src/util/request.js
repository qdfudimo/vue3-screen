import axios from 'axios';
// console.log(
//   import.meta.env, 1111);
const service = axios.create({
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '/api' : '/serve',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})



// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // let each request carry token
    // ['X-Access-Toke'] is a custom headers key
    // please modify it according to the actual situation

    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */


  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service