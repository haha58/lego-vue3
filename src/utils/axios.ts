import store, { ICustomAxiosConfig } from '@/store'
import axios from 'axios'

let baseBackendURL = ''

// export interface CustomWindow extends Window {
//   __bl: { api: (url: string, success: boolean, time: number, code?: number, msg?: string) => null };
// }

if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_IS_STAGING) {
  // 这里是本地的请求 URL
  // staging 也就是测试环境 URL
  baseBackendURL = 'http://localhost:3000'
  // baseH5URL = 'http://182.92.168.192:8082'
  // baseStaticURL = 'http://182.92.168.192:8080'
} else {
  // 生产环境 URL
  baseBackendURL = 'https://api.imooc-lego.com'
  // baseH5URL = 'https://h5.imooc-lego.com'
  // baseStaticURL = 'https://statistic-res.imooc-lego.com'
}

const instance = axios.create({
  baseURL: '/api'
})
let timeGap = 0
let currentURL = ''
instance.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOjAsImlzRnJvemVuIjpmYWxzZSwiaWQiOjcwLCJ1c2VybmFtZSI6IjE1NTAwMDA2Nzg2IiwicGhvbmVOdW1iZXIiOiIxNTUwMDAwNjc4NiIsIm5pY2tOYW1lIjoi6buY6K6k55So5oi3MTkwNyIsImxhdGVzdExvZ2luQXQiOiIyMDI0LTAzLTEwVDA5OjEyOjQ5Ljk2OVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAzLTEwVDA5OjEyOjQ5Ljk3MFoiLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTEwVDA5OjEyOjQ5Ljk3MFoiLCJpYXQiOjE3MTAwNjE5NzAsImV4cCI6MTcxMDE0ODM3MH0.a4fMwoIV-Bl-8vClwdDjApZmw-FiG0HHqgMgQlfMlcE`
instance.interceptors.request.use(config => {
  const newConfig = config as ICustomAxiosConfig
  store.commit('setLoading', { status: true, opName: newConfig.mutationName })
  store.commit('setError', { status: false, message: '' })
  timeGap = Date.now()
  const { baseURL, url } = config
  currentURL = `${baseURL?.slice(0, -1)}${url}` as string
  return config
})

instance.interceptors.response.use(
  resp => {
    store.commit('setLoading', { status: false })
    const respData = resp.data
    if (respData.errno !== 0) {
      store.commit('setError', { status: true, message: respData.message })
      return Promise.reject(respData)
    }
    timeGap = Date.now() - timeGap
    // window.__bl && window.__bl.api(currentURL, true, timeGap, 0, respData.message)
    return respData
  },
  e => {
    const error = e.response ? e.response.data : e.message
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', { status: false })
    timeGap = Date.now() - timeGap
    // window.__bl && window.__bl.api(currentURL, false, timeGap, -1, error)
    return Promise.reject(error)
  }
)
export default instance
