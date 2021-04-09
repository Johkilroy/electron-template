import axios from 'axios'
import $store from '@/store'
import { Message } from 'element-ui'
import { showLoading, hideLoading } from '@/assets/utils/loading.js'
import { loginout, unbind } from '@u/util'
import { isObject } from '@u/types'

const isDev = process.env.NODE_ENV === 'development'

// 创建 axios 实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_API,
    headers: { 'content-type': 'application/json; charset=utf-8' },
    loading: true, // 如果接口不需要 loading 可设置 false，例如 axios.get('/', { params, loading: false })
    authorize: true // 如果不需要授权，传绑定班级id
})

// 请求拦截器
instance.interceptors.request.use(config => {
    if (config.loading) showLoading()
    if (config.authorize) {
        config.headers.Authorization = `Bearer ${$store.state.token}`
    } else {
        config.headers.backboardtoken = $store.state.bindInfo ? $store.state.bindInfo.band_id : ''
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
    if (res.config.loading) hideLoading()
    const data = res.data
    if (!isObject(data)) {
        return Promise.resolve(data)
    } else if (data.Status) {
        return Promise.resolve(data.Data)
    } else {
        Message.error(data.ResponseError.LongMessage)
        return Promise.reject(data)
    }
}, err => {
    const { response } = err
    if (response && response.config.loading) hideLoading()
    // 如果 err.response 存在是接口返回的错误，否则是断网
    if (response) {
        if (response.status === 402 && !isDev) return unbind()
        if (response.status === 401 && !isDev) return loginout()
    } else {
        Message.error(response ? response.status + '' : '网络错误')
    }
    return Promise.reject(err)
})

export default instance
