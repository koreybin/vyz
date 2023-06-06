
function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}
export default function isEqual(obj1, obj2) {

    //2.以obj1为基准，和obj2依次递归比较
    for (let key in obj1) {
        if (obj1[key] != obj2[key]) return false
    }
    //3.全相等
    return true
}