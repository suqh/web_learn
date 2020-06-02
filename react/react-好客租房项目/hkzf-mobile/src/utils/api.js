import axiox from 'axios'
import { BASE_URL } from './url'

import { getToken, removeToken } from './auth'

// 创建 axios 实例
const API = axiox.create({
  baseURL: BASE_URL
})

// 添加请求拦截器
API.interceptors.request.use(config => {
  const { url } = config
  if (url.startsWith('/user') && !url.startsWith('/user/login') && !url.startsWith('/user/registered')) {
    // 添加请求头
    config.headers.authorization = getToken()
  }
  return config
})

// 添加响应拦截器
API.interceptors.response.use(response => {
  const { status } = response.data
  if (status === 400) {
    // 此时，说明 token 失效，直接移除 token 即可
    removeToken()
  }
  return response
})

export { API} 
