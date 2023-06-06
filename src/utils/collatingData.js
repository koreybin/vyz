export function collatingData(debtor, debtorList) {
    if (typeof debtor === 'string')
        debtor = debtor.replace(/-/g, "")
    //判断是否有小数点
    if (debtor.indexOf(".") != -1) {
        debtor = (debtor * 1).toFixed(2)
        debtor = (debtor + "").replace(/\./g, "")
    } else {
        if (debtor.length !== 0) debtor = debtor + "00"
    }
    if (debtor.length <= 11) {
        let cha = debtorList.length - debtor.length
        for (let i = 0; i < debtor.length; i++) {
            debtorList[i + cha] = debtor.charAt(i)
        }
    } else {
        for (let i = 0; i < debtor.length; i++) {
            debtorList[i] = debtor.charAt(i)
        }
    }
    return debtorList
}
export function priceFormat(num) {
    if (typeof num == 'string') {
        return (num.indexOf('.') != -1) ? num : num + '.00'
    } else if (typeof num == 'number') {
        return ((num + '').indexOf('.') != -1) ? num : num.toFixed(2)
    } else {
        return ''
    }
}