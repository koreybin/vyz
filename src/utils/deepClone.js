export function deepCloneObj(obj) {
    if (typeof obj !== 'Object' || obj === null) {
        return obj
    }
    let params
    if (obj instanceof RegExp || obj instanceof Date) {
        params = obj
    }
    let instance = new obj.constructor(params)
    if (obj instanceof Map) {
        for (let [k, v] of obj) {
            console.log(k)
            instance.set(deepCloneObj(k), deepCloneObj(v))
        }
    } else if (obj instanceof Set) {
        for (let v of obj) {
            console.log(v)
            instance.set(deepCloneObj(v))
        }
    } else if (Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]') {
        for (let key in obj) {
            console.log(key)
            instance[key] = deepCloneObj(obj[key])
        }
    } else {
        throw new Error('类型不支持' + obj.constructor.name)
    }
    return instance
}
export function deepCloneArr(arr) {
    if (!Array.isArray(arr)) return []
    let res = []
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i])
    }
    return res
}