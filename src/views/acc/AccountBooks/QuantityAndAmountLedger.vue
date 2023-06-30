<template>
  <div style="height: 100%">
    <div class="ui-header">
      <div :span="8">
        <label>
          数量金额总账
          <!-- <el-date-picker
            v-model="query.startDate"
            format="yyyy年第M期"
            value-format="yyyy-MM"
            type="month"
            placeholder="开始日期"
          >
          </el-date-picker
        > -->
        </label>
        <!-- <el-button @click="moreVisible = !moreVisible">
          更多条件<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button> -->
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
                        :key="item.period"
                        :label="item.cnPeriod"
                        :value="item.period"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2" style="text-align: center"> 至 </el-col>
                  <el-col :span="10">
                    <el-select v-model="query.endDate" size="mini">
                      <el-option
                        v-for="item in startEndList"
                        :key="item.period"
                        :label="item.cnPeriod"
                        :value="item.period"
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
              <el-form-item label="起始科目">
                <el-col :span="18">
                  <el-input
                    v-model="query.subjectStart"
                    autocomplete="off"
                    class="int"
                    size="mini"
                    @focus="searchStartBoxShow = true"
                    @blur="searchStartBoxShow = false"
                  >
                  </el-input>
                  <div class="ui-box" v-if="searchStartBoxShow">
                    <div v-if="!subjectStartList.length" class="b-item">
                      没有匹配的选项
                    </div>
                    <div
                      v-else
                      class="b-item"
                      v-for="item in subjectStartList"
                      :key="item.id"
                      @mousedown.prevent="searchSubjectSelect(item, 1)"
                    >
                      {{ item.otherSubjectName }}
                    </div>
                  </div>
                </el-col>

                <i class="el-icon-folder-add aa" @click="subjectSelect(0)"></i>
              </el-form-item>
              <el-form-item label="结束科目">
                <el-col :span="18">
                  <el-input
                    v-model="query.subjectEnd"
                    autocomplete="off"
                    class="int"
                    size="mini"
                    @focus="searchEndBoxShow = true"
                    @blur="searchEndBoxShow = false"
                  >
                  </el-input>
                  <div class="ui-box" v-if="searchEndBoxShow">
                    <div v-if="!subjectEndList.length" class="b-item">
                      没有匹配的选项
                    </div>
                    <div
                      v-else
                      class="b-item"
                      v-for="item in subjectEndList"
                      :key="item.id"
                      @mousedown.prevent="searchSubjectSelect(item, 2)"
                    >
                      {{ item.otherSubjectName }}
                    </div>
                  </div>
                </el-col>

                <i class="el-icon-folder-add aa" @click="subjectSelect(1)"></i>
              </el-form-item>
              <el-form-item label="科目级次">
                <el-col :span="10">
                  <el-input v-model="query.levelS" type="number" size="mini">
                  </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"> 至 </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="query.levelE"
                    type="number"
                    size="mini"
                  ></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="数量显示小数位数" label-width="130px">
                <el-col :span="8">
                  <el-input v-model="query.quantity" type="number" size="mini">
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="单价显示小数位数" label-width="130px">
                <el-col :span="8">
                  <el-input v-model="query.price" type="number" size="mini">
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.isAssist"
                  label="显示辅助核算"
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
                <el-checkbox
                  v-model="query.isz"
                  label="余额为0不显示"
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
      </div>
      <div class="h-center">
        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
          size="mini"
        ></el-button>
      </div>
      <div>
        <el-button size="mini"> 打印 </el-button>
        <el-button size="mini" @click="output">导出</el-button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="w-center">
        <div style="padding: 0 10px">
          <el-table :data="tableData" style="width: 100%" size="mini" border>
            <el-table-column label="科目编码" width="180">
              <template slot-scope="scope">
                <a
                  href="/#/AccountBooks/AccountBooks/DetailedLedgerOfQuantityAndAmount"
                  @click="getDetail(scope.row)"
                  >{{ scope.row.number }}</a
                >
              </template>
            </el-table-column>
            <el-table-column label="科目名称" width="180" prop="name">
            </el-table-column>
            <el-table-column prop="unit" label="单位"> </el-table-column>
            <el-table-column label="期初余额">
              <el-table-column label="方向" prop="deAm">
                <template slot-scope="scope">
                  <div v-if="scope.row.startBalanceDirection == 1">借</div>
                  <div v-if="scope.row.startBalanceDirection == 2">贷</div>
                  <div v-if="scope.row.startBalanceDirection == 3">平</div>
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="startQuantity">
              </el-table-column>
              <el-table-column label="单价" prop="startPrice">
              </el-table-column>
              <el-table-column label="金额" prop="startMoney">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="loan" label="本期借方">
              <el-table-column label="数量" prop="debitQuantity">
              </el-table-column>
              <el-table-column label="金额" prop="debitMoney">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="loan" label="本期贷方">
              <el-table-column label="数量" prop="loanQuantity">
              </el-table-column>
              <el-table-column label="金额" prop="loanMoney"> </el-table-column>
            </el-table-column>
            <el-table-column prop="loan" label="本年累计借方">
              <el-table-column label="数量" prop="totalDebitQuantity">
              </el-table-column>
              <el-table-column label="金额" prop="totalDebitMoney">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="loan" label="本年累计贷方">
              <el-table-column label="数量" prop="totalLoanQuantity">
              </el-table-column>
              <el-table-column label="金额" prop="totalLoanMoney">
              </el-table-column>
            </el-table-column>

            <el-table-column prop="balance" label="期末余额">
              <el-table-column label="方向">
                <template slot-scope="scope">
                  <div v-if="scope.row.endBalanceDirection == 1">借</div>
                  <div v-if="scope.row.endBalanceDirection == 2">贷</div>
                  <div v-if="scope.row.endBalanceDirection == 3">平</div>
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="endQuantity">
              </el-table-column>
              <el-table-column label="单价" prop="endPrice"> </el-table-column>
              <el-table-column label="金额" prop="endMoney"> </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div v-if="aa">
      <BillVoucherTemplatea
        @getData="fn2"
        :msgData="msg"
      ></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import { export_json_to_excel } from "@/vendor/Export2Excel";
import { quantityAmountGeneral } from "@/api/acc/book";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "QuantityAndAmountLedger",
  data() {
    return {
      tableData: [],
      moreVisible: false,
      msg: "",
      subjectName: "",
      aa: false,
      loading: true,
      assistId: 0,
      selected: "",
      subjectId: "",
      query: {
        endDate: null,
        isAssist: null,
        ist: null,
        isz: null,
        levelS: null,
        levelE: null,
        startDate: null,
        subjectEnd: "",
        subjectStart: "",
        price: 2,
        quantity: 2,
      },
      data11: [],
      voucherData: [],
      subjectAllList: [],
      searchStartBoxShow: false,
      searchEndBoxShow: false,
    };
  },
  created() {
    this.subjectAllList = this.$store.getters.allSubjectList;
    this.query.startDate =
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    this.getList();
  },
  computed: {
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
    searchList() {
      return this.treeToList.filter((item) =>
        item.combination.includes(this.searchSubject)
      );
    },
    subjectStartList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(this.query.subjectStart)
      );
    },
    subjectEndList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(this.query.subjectEnd)
      );
    },
  },

  activated() {},
  deactivated() {
    this.$bus.$off("quantityGeneralToDetail");
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    },
    getList() {
      let p = this.query.price;
      let q = this.query.quantity;
      quantityAmountGeneral(this.query).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        res.data.data.forEach((item) => {
          item.debitMoney = item.debitMoney ? item.debitMoney.toFixed(p) : null;
          item.debitQuantity = item.debitQuantity
            ? item.debitQuantity.toFixed(q)
            : null;
          item.endMoney = item.endMoney ? item.endMoney.toFixed(p) : null;
          item.endPrice = item.endPrice ? item.endPrice.toFixed(p) : null;
          item.endQuantity = item.endQuantity
            ? item.endQuantity.toFixed(q)
            : null;
          item.loanMoney = item.loanMoney ? item.loanMoney.toFixed(p) : null;
          item.loanQuantity = item.loanQuantity
            ? item.loanQuantity.toFixed(q)
            : null;
          item.startMoney = item.startMoney ? item.startMoney.toFixed(p) : null;
          item.startPrice = item.startPrice ? item.startPrice.toFixed(p) : null;
          item.startQuantity = item.startQuantity
            ? item.startQuantity.toFixed(q)
            : null;
          item.totalDebitMoney = item.totalDebitMoney
            ? item.totalDebitMoney.toFixed(p)
            : null;
          item.totalDebitQuantity = item.totalDebitQuantity
            ? item.totalDebitQuantity.toFixed(q)
            : null;
          item.totalLoanMoney = item.totalLoanMoney
            ? item.totalLoanMoney.toFixed(p)
            : null;
          item.totalLoanQuantity = item.totalLoanQuantity
            ? item.totalLoanQuantity.toFixed(q)
            : null;
        });
        this.tableData = res.data.data;
      });
    },
    updateList() {
      this.getList();
    },
    handleNodeClick(data) {
      this.selected = data;
      this.subjectId = data.id;
      this.subjectName = data.combination;
      if (typeof data.assist == "string" && data.assist.indexOf(",")) {
        this.assistId = data.assist.split(",");
      } else this.assistId = data.assist == null ? 0 : data.assist;
      this.getList();
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
        this.query.subjectStart = data.otherSubjectName;
      } else {
        this.query.subjectEnd = data.otherSubjectName;
      }
    },
    onSubmit() {
      this.getList();
      this.moreVisible = false;
    },
    async getDetail(row) {
      setTimeout(() => {
        this.$bus.$emit("quantityGeneralToDetail", row, this.query);
      }, 500);
    },
    cancelHandle() {
      this.query = {
        endDate: this.query.endDate,
        isAssist: null,
        levelE: null,
        levelS: null,
        startDate: this.query.startDate,
        subjectEnd: "",
        subjectStart: "",
        summary: null,
      };
    },
    searchSubjectSelect(item, type) {
      if (type === 1) {
        this.query.subjectStart = item.otherSubjectName;
        this.searchStartBoxShow = false;
      }
      if (type === 2) {
        this.query.subjectEnd = item.otherSubjectName;
        this.searchEndBoxShow = false;
      }
    },
    output() {
      const multiHeader2 = [
        [
          "科目编码",
          "科目名称",
          "单位",
          "期初余额",
          "",
          "",
          "",
          "本期借方",
          "",
          "本期贷方",
          "",
          "本年累计借方",
          "",
          "本年累计贷方",
          "",
          "期末余额",
          "",
          "",
          "",
        ],
      ];
      const tHeader = [
        "",
        "",
        "",
        "方向",
        "数量",
        "单价",
        "金额",
        "数量",
        "金额",
        "数量",
        "金额",
        "数量",
        "金额",
        "数量",
        "金额",
        "方向",
        "数量",
        "单价",
        "金额",
      ]; //二级表头
      const filterVal = [
        "number",
        "name",
        "unit",
        "startBalanceDirection",
        "startQuantity",
        "startPrice",
        "startMoney",
        "debitQuantity",
        "debitMoney",
        "loanQuantity",
        "loanMoney",
        "totalDebitQuantity",
        "totalDebitMoney",
        "totalLoanQuantity",
        "totalLoanMoney",
        "endBalanceDirection",
        "endQuantity",
        "endPrice",
        "endMoney",
      ]; //表头所对应后台返回的字段
      const data = this.formatJson(filterVal, this.tableData);
      const merges = [
        "A1:A2",
        "B1:B2",
        "C1:C2",
        "D1:G1",
        "H1:I1",
        "J1:K1",
        "L1:M1",
        "N1:O1",
        "P1:S1",
      ];
      export_json_to_excel({
        multiHeader2, // 这里是第二行的表头
        header: tHeader, // 这里是第三行的表头
        data, //数据
        merges, //合并行
        filename: "数量金额总账" + "_" + this.disperiodTit,
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.b-item:hover {
  background-color: #ddd;
}
.el-date-editor.el-input[data-v-004],
.el-date-editor.el-input__inner[data-v-004] {
  width: 120px;
}
</style>