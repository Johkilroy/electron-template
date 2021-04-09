/**
 *  @title: 工具类
 *  @date: 2019/11/25
 *  @author:zhaobingfeng
 */

import Vue from 'vue'
import { isObject } from '@/assets/utils/types.js'
import { getLoginUrl } from '@u/host'

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}

/**
 * 小于几位数补0, 默认小于2位数
 * @param {Number|String} val
 * @param {Number} len = 2
 */
export const pad = (val, len = 2) => {
    val = String(val)
    while (val.length < len) {
        val = '0' + val
    }
    return val
}

export function extend (to, _from) {
    for (const key in _from) {
        to[key] = _from[key]
    }
    return to
}

export const isEmpty = function (val) {
    // null or undefined
    if (val == null) return true

    if (typeof val === 'boolean') return false

    if (typeof val === 'number') return !val

    if (val instanceof Error) return val.message === ''

    switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
        return !val.length

        // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
        return !val.size
    }
    // Plain Object
    case '[object Object]': {
        return !Object.keys(val).length
    }
    }

    return false
}

export const isIE = function () {
    return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode))
}

export const isEdge = function () {
    return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1
}

export const isFirefox = function () {
    return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i)
}

// 首字母大写 以小写 + '-' 分割  例: kebalCase -> kebal-case
export const kebabCase = function (str) {
    const hyphenateRE = /([^-])([A-Z])/g
    return str
        .replace(hyphenateRE, '$1-$2')
        .replace(hyphenateRE, '$1-$2')
        .toLowerCase()
}

// JS两个数组比较，删除重复值
export const removeRepeatArr = function (arr1, arr2) {
    const temp = [] // 临时数组1
    const temparray = []// 临时数组2

    for (let i1 = 0; i1 < arr2.length; i1++) {
        temp[arr2[i1]] = true// 巧妙地方：把数组B的值当成临时数组1的键并赋值为真
    };

    for (let i = 0; i < arr1.length; i++) {
        if (!temp[arr1[i]]) {
            temparray.push(arr1[i])// 巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组
        } ;
    };
    return temparray
}

// 数组转化为Object
export function arrToObject (arr) {
    var res = {}
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i])
        }
    }
    return res
}

// Object 转化为数组
export function objToArray (obj) {
    if (Array.isArray(obj)) {
        return obj
    }
    return isEmpty(obj) ? [] : [obj]
}

// 获取数组的index，同es6的findIndex、find的一样
export const arrayFindIndex = function (arr, pred) {
    for (let i = 0; i !== arr.length; ++i) {
        if (pred(arr[i])) {
            return i
        }
    }
    return -1
}

export const looseEqual = function (a, b) {
    const isObjectA = isObject(a)
    const isObjectB = isObject(b)
    if (isObjectA && isObjectB) {
        return JSON.stringify(a) === JSON.stringify(b)
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
    } else {
        return false
    }
}

export const arrayEquals = function (arrayA, arrayB) {
    arrayA = arrayA || []
    arrayB = arrayB || []

    if (arrayA.length !== arrayB.length) {
        return false
    }

    for (let i = 0; i < arrayA.length; i++) {
        if (!looseEqual(arrayA[i], arrayB[i])) {
            return false
        }
    }

    return true
}

// 根据数组key值去重 console.log(removeRepeatByKey(arr, 'id'));
export function removeRepeatByKey (arr, name) {
    const hash = {}
    return arr.reduce(function (item, next) {
        // eslint-disable-next-line no-unused-expressions
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next)
        return item
    }, [])
}

// 根据数组中对象的某一个属性值进行排序 console.log(arr.sort(compare('age'))) type = true 升序
export function compare (property, type = true) {
    return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return type ? value1 - value2 : value2 - value1
    }
}

// 数组对象深拷贝
export function deepClone (obj, newObj = {}) {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            newObj[key] = (obj[key].constructor === Array) ? [] : {}
            deepClone(obj[key], newObj[key])
        } else {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

// 防抖
export const debounce = (fn, wait) => {
    let timeout = null
    return function () {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
    }
}

export const setCookie = (name, value, seconds) => {
    seconds = seconds || 0 // seconds有值就直接赋值，没有为0
    let expires = ''
    if (seconds !== 0) { // 设置cookie生存时间
        const date = new Date()
        date.setTime(date.getTime() + (seconds * 1000))
        expires = '; expires=' + date.toGMTString()
    }
    document.cookie = name + '=' + escape(value) + expires + '; path=/' // 转码并赋值
}

export const getCookie = (name) => {
    const nameEQ = name + '='
    const ca = document.cookie.split(';') // 把cookie分割成组
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i] // 取得字符串
        while (c.charAt(0) === ' ') { // 判断一下字符串有没有前导空格
            c = c.substring(1, c.length) // 有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) === 0) { // 如果含有我们要的name
            return unescape(c.substring(nameEQ.length, c.length)) // 解码并截取我们要值
        }
    }
    return false
}

export const loginout = () => {
    localStorage.removeItem('token')
    window.clearTimeout()
    window.clearInterval()
    window.location.href = getLoginUrl()
}
