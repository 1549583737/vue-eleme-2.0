export function formatDate (date, str) {
    if (/(y+)/.test(str)) {
        str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let key in o) {
        if (new RegExp(`(${key})`).test(str)) {
            let fmt = o[key] + ''
            str = str.replace(RegExp.$1, (RegExp.$1.length === 1) ? fmt : padLeftZero(fmt))
        }
    }
    return str
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}