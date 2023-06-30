import request from '@/utils/request'
// 资产负债列表
export function list(date, type) {
    return request({
        url: '/client/balance-sheet/list?date=' + date + '&type=' + type,
        method: 'post',
    })
}
// 获取指定资产负债
export function getFormula(date, id, type) {
    return request({
        url: '/client/balance-sheet/getFormula?date=' + date + '&id=' + id + '&type=' + type,
        method: 'post',
    })
}
// 公式添加科目
export function insertFormula(bsId, calculatingSigns, numberRules, subjectId, type) {
    return request({
        url: '/client/balance-sheet/insertFormula?bsId=' + bsId + '&calculatingSigns=' + calculatingSigns + '&numberRules=' + numberRules + '&subjectId=' + subjectId + '&type=' + type,
        method: 'post',
    })
}
// 删除公式
export function delFormulaSubject(id) {
    return request({
        url: '/client/balance-sheet/delFormulaSubject?id=' + id,
        method: 'delete',
    })
}
