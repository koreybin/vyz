import request from '@/utils/request'
export function list(date, type) {
    return request({
        url: '/client/profit/list?date=' + date + '&type=' + type,
        method: 'post',
    })
}
export function getProfitFormula(date, id, type) {
    return request({
        url: '/client/profit/getFormula?date=' + date + '&id=' + id + '&type=' + type,
        method: 'post',
    })
}
export function insertProfitFormula(calculatingSigns, numberRules, proId, subjectId) {
    return request({
        url: '/client/profit/insertFormula?calculatingSigns=' + calculatingSigns + '&numberRules=' + numberRules + '&proId=' + proId + '&subjectId=' + subjectId,
        method: 'post',
    })
}
export function delProfitFormulaSubject(id) {
    return request({
        url: '/client/profit/delFormulaSubject?id=' + id,
        method: 'delete',
    })
}
