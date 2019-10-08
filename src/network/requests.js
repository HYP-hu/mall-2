import axios from 'axios'

const config = {
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5 * 1000, // 请求超时的时间设置
  crossDomain: true, //跨域
  validateStatus(status){
    return status >= 200 && status < 500
  }
}

// 创建请求实例
const instance = axios.create(config)
 // 发送真正的网络请求
instance.interceptors.request.use(config => {
  const reqConfig = { ...config }
  return reqConfig
}, error => {
  Promise.reject(error)
})

instance.interceptors.response.use(res => {
    return  res.data
}, error => {
  console.log(error)
    }
)

// 导出常用函数
/**
 * @param {String} url
 * @param {Object} data
 * @param {Object} params
 */
export function post(url, data = {}, params = {}){
  return instance({
    method: 'post',
    url,
    data,
    params,
  })
}

/**
 * @param {string} url
 * @param {object} params
 */

export function get(url, params={}) {
  return instance({
    method: 'get',
    url,
    params
  })
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url, data = {}, params = {}) {
  return instance({
    method: 'put',
    url,
    params,
    data,
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url, params = {}) {
  return instance({
    method: 'delete',
    url,
    params,
  })
}

export default instance
