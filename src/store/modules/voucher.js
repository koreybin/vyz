export default {
    state: {
        voucher: {
            id: "",
            proveNo: "",
            proveId: "",
            chapter: "",
            attachedDocument: "",
            importPeriod: "",
            prove: "",
            content: []
        }



    },
    actions: {
        sendVoucher({ commit }, data) {
            commit('SEND_VOUCHER', data)
        },
        getVoucher({ commit }, data) {

        },
    },
    mutations: {
        SEND_VOUCHER(state, data) {
            state.voucher = data
        },
        GET_VOUCHER(state, data) {

        }
    },
}