import { notifyError } from '@/assets/utils/fundebug.js'
import { isString } from '@/assets/utils/types.js'

// 原文转 base64
export const encode = str => {
    if (!isString(str)) str += ''
    return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_')
}

// base64 转原文
export const decode = str => {
    let res = ''
    try {
        res = decodeURIComponent(escape(atob(str.replace(/-/g, '+').replace(/_/g, '/'))))
    } catch (err) {
        notifyError(err, {
            name: '主动捕获错误',
            path: 'web/src/assets/utils/code.js - decode()',
            params: str
        })
    }
    return res
}

// 获取 token 的信息
export const getTokenInfo = (token, all) => {
    if (token && isString(token)) {
        const matchList = token.match(/([^.]+)\.([^.]+)\.([^.]+)/) || ['', '', '', '']
        const [, left, center, right] = matchList
        const header = JSON.parse(decode(left) || '{}')
        const payload = JSON.parse(decode(center) || '{}')
        return !all ? payload : { header, payload, secret: right }
    } else {
        return {}
    }
}
