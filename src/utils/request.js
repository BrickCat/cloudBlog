import axios from 'axios'
import { Message} from 'iview'
import { router } from '@/router';
import { getToken } from '@/utils/auth'
import store from '../store'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    console.log(getToken())
    if (store.getters.token) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 1) {
      message(res.msg)
      return Promise.reject(res)
    }
    return response
  },
  error => {
    const res = error.response
    console.log(res.status)
    if (res.status === 478 || res.status === 403) {
      message(res.status + '： ' + res.data.msg)
    } else if (res.status === 400) {
      message(res.status + '： ' + res.data.error_description)
    } else if (res.status === 202 ) { //三方未绑定
      router.push({path: '/'})
    } else if (res.status === 503 ) {//服务异常
      message(res.status + '： ' + res.data)
    }else if(res.status === 404){
        message('此路径不存在~')
    }else if(res.status === 401){
        router.push({
            name:'login'
        })
    } else {
      message(res.status + '： ' + res.data.message)
    }
    return Promise.reject(error)
  }
)


export function message(text) {
  Message.error({
      content: text,
      duration: 5
  })
}


export default service
