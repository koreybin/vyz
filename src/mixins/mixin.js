import { getPeriod, getData } from "@/api/acc/Repertory/InventorySettings"
import { autoGetDate } from "@/utils/autoGetDate"
import { MessageBox, Message } from 'element-ui'
export const mixins = {

    components: {},
    data() {
        return {
            numberOfPeriods: '',
            nOfPeriods: '',
            period: '',
            customData: '',
            miXinAccSys: '',
            startMonth: '',
            endMonth: '',
            dateRange: [],
            isFirst: true
        }
    },
    created() {
        this.getPeriod()
        this.getData()
    },
    mounted() {
    },
    methods: {
        async getPeriod() {
            const { data: res } = await getPeriod()
            // if (res.retCode === 4001) {
            //     MessageBox.alert(res.message, '会话过期', {
            //         confirmButtonText: '确认'
            //     }).then(() => {
            //         this.$router.push("/dashboard")
            //         location.reload(true)
            //     })
            // }
            const data = autoGetDate(res.data)
            this.startMonth = data[0]
            this.endMonth = data[1]
            this.dateRange = data
            this.period = res.data
            let year = res.data.substr(0, 4)
            let mouth = res.data.substr(5, 2).replace(/^[0]/g, "")
            this.numberOfPeriods = `${year}年第${mouth}期`
            this.nOfPeriods = `${year}年${mouth}期`
            this.isFirst = mouth == 1
        },
        async getData() {
            const { data: res } = await getData()
            this.customData = res.data
            this.miXinAccSys = res.data.systemId
        }
    }
}