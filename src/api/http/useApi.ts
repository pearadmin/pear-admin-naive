import api from './FetchRequest'
export async function useApi(requestConfig) {
  // const response = await api.get('/user/getCapture', { initialValue: { a: 2, b: 3 } })
  // console.log('fetch result => ', response)
  const response = await api.request('/user/getCapture', {
    initialValue: { a: 333, b: 'adaf' },
    method: 'post'
  })
  console.log(response)
}
