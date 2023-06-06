import { getPeriod, getData } from "@/api/acc/Repertory/InventorySettings"
import { GetAllList } from "@/api/acc/BillVoucherTemplate"
// import autoGetDate from "@/utils/autoGetDate"
const children = {
    state: {
        childrenData: null,
        numberOfPeriods: [],
        nOfPeriods: [],
        allSubjectList: []
    },
    mutations: {
        SET_DATA: (state, data) => {
            state.childrenData = data
        },
        SET_NUMBEROFPERIODS: (state, period) => { //yyyy年第m期
            state.numberOfPeriods = period
        },
        SET_NOFPERIODS: (state, period) => {  //yyyy年m期
            state.nOfPeriods = period
        },
        SET_SUBJECTLIST: (state, data) => {
            state.allSubjectList = data
        }

    },
    actions: {
        async intoChildren({ commit, dispatch }) {
            const { data } = await getData()
            if (data.data) {
                let year = data.data.setNowPeriod.substr(0, 4)
                let mouth = data.data.setNowPeriod.substr(5, 2).replace(/^[0]/g, "")
                data.data.numberOfPeriods = [{ disPeriod: `${year}年第${mouth}期`, yearPeriod: data.data.setNowPeriod }]
                data.data.nOfPeriods = [{ disPeriod: `${year}年${mouth}期`, yearPeriod: data.data.setNowPeriod }, { disPeriod: `2023年3期`, yearPeriod: '2023-03' }, { disPeriod: `2023年4期`, yearPeriod: '2023-04' }, { disPeriod: `2022年3期`, yearPeriod: '2022-03' }, { disPeriod: `2022年4期`, yearPeriod: '2022-04' }, { disPeriod: `2022年5期`, yearPeriod: '2022-05' }, { disPeriod: `2022年6期`, yearPeriod: '2022-06' }, { disPeriod: `2022年7期`, yearPeriod: '2022-07' }, { disPeriod: `2022年8期`, yearPeriod: '2022-08' }, { disPeriod: `2022年9期`, yearPeriod: '2022-09' }]
                commit('SET_DATA', data.data)
            }
            dispatch('getAllList')
        },
        async getAllList({ commit }) {
            const { data: res } = await GetAllList()
            commit('SET_SUBJECTLIST', res.data)
        }
    }

}
export default children