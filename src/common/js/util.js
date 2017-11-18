export function urlParse () {
    // 从URL问号 (?) 开始的 URL（查询部分
    let url = window.location.search
    let obj = {}
    let reg = /[?&][^?&]+=[^?&]+/g
    let arr = url.match(reg)
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=')
            // decodeURIComponent() 对编码后的 URI 进行解码
            let key = decodeURIComponent(tempArr[0])
            let value = decodeURIComponent(tempArr[1])
            obj[key] = value
        })
    }
    return obj
}
