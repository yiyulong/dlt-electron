import { Toast } from 'vant'
import axios from 'axios'
import qs from 'querystring'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  // 允许在向服务器发送前，修改请求数据，只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法。后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    return qs.stringify(data)
  }]
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 1004 账号或密码错误
  // 1005 没有相应的权限
  // 1006 请输入
  // 1001 用户不存在
  // 1002 用户没有登录，请重新登录
  // 1011 用户不可用
  // 对响应数据做点什么
  const { code, ...res } = response.data
  if (code !== 0 && code !== 666) {
    const message = res.message || '请求失败'
    Toast({
      message,
      icon: 'warn-o'
    })
    return Promise.reject(new Error(message))
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  Toast({
    message: error.message || '请求错误',
    icon: 'cross'
  })
  return Promise.reject(error)
})

export default instance
