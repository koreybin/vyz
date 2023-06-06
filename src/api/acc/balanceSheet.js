import request from '@/utils/request'
export function list(date, type) {
    return request({
        url: '/client/balance-sheet/list?date=' + date + '&type=' + type,
        method: 'post',
    })
}
export function getFormula(date, id, type) {
    return request({
        url: '/client/balance-sheet/getFormula?date=' + date + '&id=' + id + '&type=' + type,
        method: 'post',
    })
}
export function insertFormula(bsId, calculatingSigns, numberRules, subjectId, type) {
    return request({
        url: '/client/balance-sheet/insertFormula?bsId=' + bsId + '&calculatingSigns=' + calculatingSigns + '&numberRules=' + numberRules + '&subjectId=' + subjectId + '&type=' + type,
        method: 'post',
    })
}
export function delFormulaSubject(id) {
    return request({
        url: '/client/balance-sheet/delFormulaSubject?id=' + id,
        method: 'delete',
    })
}
