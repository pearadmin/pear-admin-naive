import { extend } from 'umi-request'

const request = extend({
  prefix: import.meta.env.VITE_FETCH_PREFIX_URL as string,
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

request
  .post('/user/login', {
    data: {
      username: 'admin',
      password: 'admin'
    }
  })
  .then(function (response) {
    console.log('umi response => ', response)
  })
  .catch(function (error) {
    console.log(error)
  })
