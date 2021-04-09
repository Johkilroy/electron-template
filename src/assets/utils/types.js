/**
 *  @title: 数据类型判断
 *  @date: 2019/11/25
 *  @author:zhaobingfeng
 */

export function isString (obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
}

export function isDate (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]'
}

export function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isNumber (obj) {
    return Object.prototype.toString.call(obj) === '[object Number]'
}

export function isHtmlElement (node) {
    return node && node.nodeType === Node.ELEMENT_NODE
}

export const isFunction = (functionToCheck) => {
    var getType = {}
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export const isUndefined = (val) => {
    return val === undefined
}

export const isDefined = (val) => {
    return val !== undefined && val !== null
}
