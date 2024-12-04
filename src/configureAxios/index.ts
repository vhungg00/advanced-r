import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios'

/**
 * Custom Config Axios
 * Custom BaseURL
 * Custom interceptors request
 * */
export function configureAxios() {
  if (import.meta.env.VITE_APP_API_URL) {
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
  }
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      const internalConfig = config as InternalAxiosRequestConfig
      // Do something before request is sent
      internalConfig.headers = internalConfig?.headers ?? {}
      // Example Get token from store and add to header for each request
      // let authToken = useAuthStore.getState().token
      // if (authToken) {
      //   config.headers['Authorization'] = `Bearer ${authToken}`
      // }
      return internalConfig
    },
    function (error: AxiosError) {
      // Do something with request error
      return Promise.reject(error)
    },
  )
}
