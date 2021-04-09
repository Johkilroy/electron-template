/**
 *  @title: 日期类
 *  @date: 2020/03/18
 *  @author:zhaobingfeng
 */

import { isDate, isNumber, isString } from './types'
import { pad } from './util'

const dateReg = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g
const dayNames = ['日', '一', '二', '三', '四', '五', '六']

const formatFlags = {
    D: function D (dateObj) {
        return dateObj.getDay()
    },
    DD: function DD (dateObj) {
        return pad(dateObj.getDay())
    },
    d: function d (dateObj) {
        return dateObj.getDate()
    },
    dd: function dd (dateObj) {
        return pad(dateObj.getDate())
    },
    M: function M (dateObj) {
        return dateObj.getMonth() + 1
    },
    MM: function MM (dateObj) {
        return pad(dateObj.getMonth() + 1)
    },
    yy: function yy (dateObj) {
        return pad(String(dateObj.getFullYear()), 4).substr(2)
    },
    yyyy: function yyyy (dateObj) {
        return pad(dateObj.getFullYear(), 4)
    },
    // 12小时制
    h: function h (dateObj) {
        return dateObj.getHours() % 12 || 12
    },
    hh: function hh (dateObj) {
        return pad(dateObj.getHours() % 12 || 12)
    },
    // 24小时制
    H: function H (dateObj) {
        return dateObj.getHours()
    },
    HH: function HH (dateObj) {
        return pad(dateObj.getHours())
    },
    m: function m (dateObj) {
        return dateObj.getMinutes()
    },
    mm: function mm (dateObj) {
        return pad(dateObj.getMinutes())
    },
    s: function s (dateObj) {
        return dateObj.getSeconds()
    },
    ss: function ss (dateObj) {
        return pad(dateObj.getSeconds())
    }
}

/**
 * 根据日期获取星期, 默认当天
 * @param {Date|Number|String} date
 */
export const getWeekName = ({ date, prefix = '星期' } = {}) => {
    date = date || new Date()
    if (isNumber(date) || isString(date)) {
        date = new Date(date)
    }
    if (!isDate(date) || isNaN(date.getTime())) {
        throw new Error('Invalid Date')
    }
    return `${prefix}${dayNames[date.getDay()]}`
}

/**
 * 获取日期,默认当天
 * @param {Date|Number|String} date
 * @param {*} format = 'yyyy-MM-dd'
 * @param {Number} day  当前日期相差天数，-1 -前一天， 1 -后一天， 不传默认当天
 */
export const getDate = ({ date, format = 'yyyy-MM-dd', day = 0 } = {}) => {
    date = date || new Date()
    if (isNumber(date) || isString(date)) {
        date = new Date(date)
    }
    if (!isDate(date) || isNaN(date.getTime())) {
        throw new Error('Invalid Date')
    }
    date.setDate(date.getDate() + day)
    return format.replace(dateReg, function ($0) {
        if (formatFlags[$0](date)) return formatFlags[$0](date)
    })
}

/**
 * 获取两个日期相差天数
 * @param {*} d1
 * @param {*} d2
 */
export const getDaysBetween = (d1, d2) => {
    return Math.ceil(Math.abs((new Date(d2).getTime() - new Date(d1).getTime()) / (24 * 60 * 60 * 1000)))
}
