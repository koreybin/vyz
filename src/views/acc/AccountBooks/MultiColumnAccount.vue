<template>
  <div style="height: 100%">
    <div class="ui-header">
      <div>
        <label> 多栏账 </label>
        <div class="ui-btn-menu">
          <span class="ui-btn pointer" @click="moreVisible = !moreVisible">
            <span class="selected-period">
              <span class="selected-period">
                <strong>{{ disperiodTit }}</strong>
              </span>
            </span>
            <b></b>
          </span>
          <div v-if="moreVisible" class="moreBox">
            <el-form
              ref="form"
              :model="query"
              label-width="80px"
              label-position="right"
            >
              <el-form-item label="会计期间">
                <el-row>
                  <el-col :span="10">
                    <el-select v-model="query.startDate" size="mini">
                      <el-option
                        v-for="item in startEndList"
                        :key="item.disPeriod"
                        :label="item.disPeriod"
                        :value="item.yearPeriod"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2" style="text-align: center"> 至 </el-col>
                  <el-col :span="10">
                    <el-select v-model="query.endDate" size="mini">
                      <el-option
                        v-for="item in startEndList"
                        :key="item.disPeriod"
                        :label="item.disPeriod"
                        :value="item.yearPeriod"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      icon="el-icon-refresh-left"
                      circle
                      size="mini"
                      type="text"
                      @click="resetTime"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="会计科目">
                <el-col :span="18">
                  <el-input
                    v-model="otherSubjectName"
                    autocomplete="off"
                    class="int"
                    size="mini"
                  >
                  </el-input>
                </el-col>
                <i class="el-icon-folder-add aa" @click="subjectSelect(0)"></i>
              </el-form-item>
              <el-form-item>
                <el-radio-group v-model="query.show">
                  <el-radio :label="1">只显示下级科目</el-radio>
                  <el-radio :label="2">只显示最明细科目</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.isz"
                  label="显示明细栏余额"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.ist"
                  label="无发生额且余额为0不显示"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="cancelHandle">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
          size="mini"
        ></el-button>
      </div>
      <div class="h-center">
        <span class="voucherData" v-show="subjectName">{{ subjectName }}</span>
      </div>
      <div>
        <el-button size="mini">打印</el-button>
        <el-button size="mini">导出</el-button>
      </div>
    </div>
    <table class="table" border="1">
      <thead>
        <tr>
          <th width="6%">日期</th>
          <th width="6%">凭证字号</th>
          <th width="10%">摘要</th>
          <th width="6%">借方</th>
          <th width="6%">贷方</th>
          <th width="6%">方向</th>
          <th width="6%">余额</th>
          <th :width="widthSum">
            <table style="height: 50px">
              <tr style="border-bottom: 1px solid #d0d0d0">
                <td width="50%" v-if="direction === 1">借方</td>
                <td
                  width="50%"
                  v-if="loandirection === 2"
                  style="border-left: 1px solid #d0d0d0"
                >
                  贷方
                </td>
              </tr>
              <tr>
                <td v-if="direction === 1">
                  <table style="height: 100%" class="debtor-table">
                    <tr>
                      <td
                        :width="deWidth"
                        v-for="item in tableData[0].subDetail"
                        :key="item.name"
                        v-show="item.subBa === 1"
                      >
                        {{ item.name }}
                      </td>
                    </tr>
                  </table>
                </td>
                <td v-if="loandirection === 2">
                  <table style="height: 100%" class="debtor-table">
                    <tr>
                      <td
                        :width="loWidth"
                        v-for="item in tableData[0].subDetail"
                        :key="item.name"
                        v-show="item.subBa === 2"
                      >
                        {{ item.name }}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td width="6%">{{ item.date }}</td>
          <td width="6%">
            <a
              href="/#/CheckVoucher/CheckVoucher/Voucher"
              @click="getVoucher(item)"
              >{{ item.voucherNo }}</a
            >
          </td>
          <td width="10%">{{ item.remark }}</td>
          <td width="6%">{{ item.debit }}</td>
          <td width="6%">{{ item.loan }}</td>
          <td width="6%">
            <div v-if="item.balanceDirection === 1">借</div>
            <div v-if="item.balanceDirection === 2">贷</div>
            <div v-if="item.balanceDirection === 3">平</div>
          </td>
          <td width="6%">{{ item.balance }}</td>
          <td :width="widthSum">
            <table>
              <tr>
                <td width="50%" v-if="direction === 1">
                  <table class="debtor-table">
                    <tr>
                      <td
                        :width="deWidth"
                        v-for="item1 in item.subDetail"
                        :key="item1.name"
                        v-show="item1.subBa === 1"
                      >
                        <span>{{ item1.money }}</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="50%" v-if="loandirection === 2">
                  <table class="debtor-table">
                    <tr>
                      <td
                        :width="loWidth"
                        v-for="item1 in item.subDetail"
                        :key="item1.name"
                        v-show="item1.subBa === 2"
                      >
                        <span>{{ item1.money }}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="aa">
      <BillVoucherTemplatea
        @getData="fn2"
        :msgData="msg"
        :nDetail="nDetail"
      ></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import { getVoucher } from "@/api/acc/recordVoucher";
import { multiColumnLedger } from "@/api/acc/book";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "MultiColumnAccount",
  data() {
    return {
      nDetail: true, //false表示只能选择父科目
      radio: "",
      tableData: [],
      direction: "",
      loandirection: "",
      moreVisible: false,
      msg: "",
      aa: false,
      loading: true,
      assistId: 0,
      selected: "",
      subjectId: "",
      subjectName: "",
      otherSubjectName: "",
      query: {
        endDate: "",
        startDate: "",
        subjectId: null,
        show: 1,
      },
      data11: [],
      voucherData: [],
    };
  },
  computed: {
    widthSum() {
      return this.tableData.length !== 0
        ? this.tableData[0].subDetail.length * 6 + "%"
        : "5%";
    },
    deWidth() {
      if (this.tableData.length !== 0) {
        const arr = this.tableData[0].subDetail.filter(
          (item) => item.subBa === 1
        );
        return 100 / arr.length + "%";
      }
      return;
    },
    loWidth() {
      if (this.tableData.length !== 0) {
        const arr = this.tableData[0].subDetail.filter(
          (item) => item.subBa === 2
        );
        return 100 / arr.length + "%";
      }
      return;
    },
    disperiodTit() {
      if (this.query.startDate === this.query.endDate)
        return `${this.query.startDate.split("-")[0]}年第${this.query.startDate
          .split("-")[1]
          .replace(/^0/g, "")}期`;
      if (this.query.startDate !== this.query.endDate) {
        return `${this.query.startDate.split("-")[0]}年第${this.query.startDate
          .split("-")[1]
          .replace(/^0/g, "")}期 至 ${
          this.query.endDate.split("-")[0]
        }年第${this.query.endDate.split("-")[1].replace(/^0/g, "")}期`;
      }
    },
    startEndList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
  },
  created() {
    this.query.startDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.getList();
  },
  deactivated() {
    this.$bus.$off("MultiColumnVoucher");
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    },
    getList() {
      multiColumnLedger(this.query).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        if (res.data.retCode === 500)
          return this.$message.warning(res.data.message);
        res.data.data.forEach((item) => {
          if (item.subDetail.some((item1) => item1.subBa === 1)) {
            this.direction = 1;
          } else {
            this.direction = 2;
          }
          if (item.subDetail.some((item1) => item1.subBa === 2)) {
            this.loandirection = 2;
          } else {
            this.loandirection = 1;
          }
          item.balance = item.balance
            ? this.$numeral(item.balance).format("0,0.00")
            : null;
          item.debit = item.debit
            ? this.$numeral(item.debit).format("0,0.00")
            : null;
          item.loan = item.loan
            ? this.$numeral(item.loan).format("0,0.00")
            : null;
          item.subDetail.forEach((item1) => {
            item1.money = item1.money
              ? this.$numeral(item1.money).format("0,0.00")
              : null;
          });
        });
        this.tableData = res.data.data;
      });
    },
    updateList() {
      this.getList();
    },
    async getVoucher(row) {
      const { data: res } = await getVoucher(row.id);
      // this.$store.dispatch("sendVoucher", res.data);
      res.data.content.forEach((item, index) => {
        item.isQuantity = false;
        item.auxiliaryDisable = true;
        item.AuxiliaryList = [];
        item.auxiliaryDisable = true;
        item.isAuxiliary = false;
        item.isShowMainInput = false;
        item.isShowSubjectInput = false;
        item.isShowDebtorInput = false;
        item.isShowLenderInput = false;
        item.searchSubjectBoxShow = false;
      });
      this.voucherData = res.data;
      this.sendData();
    },
    sendData() {
      this.$bus.$emit("MultiColumnVoucher", this.voucherData);
    },

    subjectSelect(type) {
      this.aa = true;
      if (type === 0) {
        this.msg = 0;
      }
      if (type === 1) {
        this.msg = 1;
      }
    },
    fn2(bool, data, c) {
      this.aa = bool;
      if (!c) {
        this.otherSubjectName = data.otherSubjectName;
        this.query.subjectId = data.id;
      } else {
        this.otherSubjectName = data.otherSubjectName;
        this.query.subjectId = data.id;
      }
    },
    onSubmit() {
      this.subjectName = this.otherSubjectName;
      this.getList();
      this.moreVisible = false;
    },
    cancelHandle() {
      this.query = {
        endDate: this.query.endDate,
        isAssist: null,
        levelE: null,
        levelS: null,
        startDate: this.query.startDate,
        subjectEnd: null,
        subjectStart: null,
        summary: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.el-date-editor.el-input[data-v-004],
.el-date-editor.el-input__inner[data-v-004] {
  width: 120px;
}
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  padding: 0;
  margin: 0;
  font-size: 12px;
  border-color: #d0d0d0;
}
table thead {
  background: url(../../../assets/images/ui-th.png) repeat-x #eee;
}
table td,
table th {
  text-align: center;
  table-layout: fixed;
  padding: 0px;
  position: relative;
}
.table tbody {
  height: calc(100% - 70px);
  overflow: auto;
}
.table tbody > tr:hover {
  background-color: #faffd1;
}
.table tbody tr,
.table tbody td {
  height: 40px;
}
.debtor-table td {
  border-right: 1px solid #bab9b9;
  &:last-of-type {
    border-right: none;
  }
}
</style>