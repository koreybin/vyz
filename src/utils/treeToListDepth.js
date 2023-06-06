// 树状数据转为扁平数据(含父级)
export const treeToList = function (tree) {
    let result = []

    tree.forEach((item) => {
        result.push(item) // 将该节点压进去

        // 若该节点有子节点，则优先执行子节点
        if (Array.isArray(item.children) && item.children.length) {
            result = result.concat(treeToList(item.children))
        }
        if (Array.isArray(item.sub) && item.sub.length) {
            result = result.concat(treeToList(item.sub))
        }
        if (Array.isArray(item.abs) && item.abs.length) {
            result = result.concat(treeToList(item.abs))
        }
    })
    return result
}
// 树状数据转为扁平数据(不含父级)
export const childrenTreeToList = function (tree) {
    let result = []

    tree.forEach((item) => {
        if (Array.isArray(item.children) && !item.children.length)
            result.push(item) // 没有子节点 push进去

        // 若该节点有子节点，则优先执行子节点
        if (Array.isArray(item.children) && item.children.length) {
            result = result.concat(childrenTreeToList(item.children))
        }
        if (Array.isArray(item.sub) && item.sub.length) {
            result = result.concat(childrenTreeToList(item.sub))
        }
    })
    return result
}
// 树状数据转为扁平数据(部门扁平，人员子级)
export const staffTreeToList = function (tree) {
    let result = []
    tree.forEach((item) => {
        result.push(item) // 将该节点压进去
        // 若该节点有子节点和子节点第一个没有userid，则优先执行子节点
        if (item.abs[0].abs.length && Array.isArray(item.abs) && item.abs.length) {
            result = result.concat(treeToList(item.abs))
        }
    })
    return result
}