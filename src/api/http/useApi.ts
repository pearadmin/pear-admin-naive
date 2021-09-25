import { useAxios } from '@vueuse/integrations/useAxios'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASIC_FETCH_URL,
})

axiosInstance.interceptors.request.use((requestConfig) => {
  console.log(requestConfig)
  return requestConfig
})

axiosInstance.interceptors.response.use((response) => {
  console.log(response)
  return response.data
})

export function useApi(url: string, config?: AxiosRequestConfig) {
  const instance = axiosInstance
  if (config) {
    return useAxios(url, config, instance)
  }
  return useAxios(url, instance)
}
