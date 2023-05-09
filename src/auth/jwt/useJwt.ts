import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'


export type userData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  groups: {name: string}[];
  ability: {action: string, subject: string}[];
  avatar?: string;
}

export type JwtToken = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  user_data: userData;
}

export default function useJwt() {
  // ** jwtConfig <= Will be used by this service
  const jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  let isAlreadyFetchingAccessToken: boolean = false

  // ** For Refreshing Token
  let subscribers: any[] = []

  // ** Axios instance to transfer credentials for project API
  const projectInstance = axios.create()

  const projectLoginInstance = axios.create()

  const onAccessTokenFetched = (accessToken: string) => {
    subscribers = subscribers.filter(callback => callback(accessToken))
  }

  const addSubscriber = (callback: any) => {
    subscribers.push(callback)
  }

  const getToken = (): string | null => {
    return localStorage.getItem(jwtConfig.storageTokenKeyName)
  }

  const getRefreshToken = (): string | null => {
    return localStorage.getItem(jwtConfig.storageRefreshTokenKeyName)
  }

  const setToken = (value: string) => {
    localStorage.setItem(jwtConfig.storageTokenKeyName, value)
  }

  const setRefreshToken = (value: string) => {
    localStorage.setItem(jwtConfig.storageRefreshTokenKeyName, value)
  }

  const removeToken = () => {
    localStorage.removeItem(jwtConfig.storageTokenKeyName)
  }

  const removeRefreshToken = () => {
    localStorage.removeItem(jwtConfig.storageRefreshTokenKeyName)
  }

  const handleLogout = () => {
    removeToken()
    removeRefreshToken()
  }

  const login = (...args: any[]) => {
    return projectLoginInstance.post(jwtConfig.loginEndpoint, ...args)
  }

  const register = (...args: any[]) => {
    return projectInstance.post(jwtConfig.registerEndpoint, ...args)
  }

  const refreshToken = () => {
    return projectInstance.post(jwtConfig.refreshEndpoint, {
      refresh: getRefreshToken()
    })
  }

  // ** Main login
  projectInstance.defaults.baseURL = jwtConfig.baseURL
  projectLoginInstance.defaults.baseURL = jwtConfig.baseURL

  // ** Request Interceptor
  projectInstance.interceptors.request.use(
    config => {
      // ** Get token from localStorage
      const accessToken = getToken()

      // ** If token is present add it to request's Authorization Header
      if (accessToken) {
        // ** eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
      }
      return config
    },
    error => Promise.reject(error)
  )

  // ** Add request/response interceptor
  projectInstance.interceptors.response.use(
    response => response,
    error => {
      const { config, response } = error
      const originalRequest = config

      if (response?.status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          refreshToken().then(r => {
            isAlreadyFetchingAccessToken = false

            // ** Update accessToken and refreshToken in localStorage
            setToken(r.data.access)
            setRefreshToken(r.data.refresh)

            onAccessTokenFetched(r.data.access)
          }).catch(error => Promise.reject(error))
        }
        const retryOriginalRequest = new Promise(resolve => {
          addSubscriber((accessToken: any) => {
            originalRequest.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
            resolve(projectInstance(originalRequest))
          })
        })
        return retryOriginalRequest
      }
      return Promise.reject(error)
    }
  )
  
  return {
    login,
    getToken,
    getRefreshToken,
    jwtConfig,
    setToken,
    setRefreshToken,
    handleLogout,
    projectInstance
  }
}
