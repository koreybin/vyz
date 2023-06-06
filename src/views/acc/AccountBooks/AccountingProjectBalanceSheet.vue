<template>
  <div style="height: 100%">
    <div class="ui-header">
      <div>
        <label> 核算项目余额表 </label>
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
              <el-form-item label="辅助项目">
                <el-col :span="18">
                  <el-input
                    v-model="query.assist"
                    autocomplete="off"
                    class="int"
                    size="mini"
                  >
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="科目">
                <el-col :span="18">
                  <el-input
                    v-model="query.subject"
                    autocomplete="off"
                    class="int"
                    size="mini"
                    @focus="searchBoxShow = true"
                    @blur="searchBoxShow = false"
                  >
                  </el-input>
                  <div class="ui-box" v-if="searchBoxShow">
                    <div v-if="!subjectList.length" class="b-item">
                      没有匹配的选项
                    </div>
                    <div
                      v-else
                      class="b-item"
                      v-for="item in subjectList"
                      :key="item.id"
                      @mousedown.prevent="searchSubjectSelect(item)"
                    >
                      {{ item.otherSubjectName }}
                    </div>
                  </div>
                </el-col>

                <i class="el-icon-folder-add aa" @click="subjectSelect(1)"></i>
              </el-form-item>
              <el-form-item label="科目级次" prop="money">
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
              <el-form-item>
                <el-checkbox
                  v-model="query.show"
                  label="显示科目"
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
                <el-checkbox
                  v-model="query.ist"
                  label="本期无发生额且余额为0不显示"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="cancelHandle">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="h-center">
        <div>
          <label>
            辅助类别：
            <el-select v-model="assistId" style="width: 120px" size="mini">
              <el-option
                v-for="item in list"
                :key="item.id"
                :value="item.id"
                :label="item.dataValue"
              >
              </el-option>
            </el-select>
          </label>
          <el-button @click="onSubmit" size="mini">查询</el-button>
        </div>
      </div>
      <div>
        <el-button size="mini">打印</el-button>
        <el-button size="mini" @click="output">导出</el-button>
      </div>
    </div>

    <el-table :data="tableData" size="mini" border class="t-scroll">
      <el-table-column label="科目编码" width="180" align="center">
        <template slot-scope="scope">
          <a>{{ scope.row.number }}</a>
          <!-- <a @click="getDetail(scope.row)">{{ scope.row.number }}</a> -->
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="180" prop="name" align="center">
      </el-table-column>
      <el-table-column label="期初余额" align="center">
        <el-table-column
          label="借方"
          width="100"
          align="center"
          prop="beginDebit"
        >
        </el-table-column>
        <el-table-column
          label="贷方"
          width="100"
          align="center"
          prop="beginLoan"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="本期发生额" align="center">
        <el-table-column label="借方" width="100" align="center" prop="debit">
        </el-table-column>
        <el-table-column label="贷方" width="100" align="center" prop="loan">
        </el-table-column>
      </el-table-column>
      <el-table-column label="本年累计发生额" align="center">
        <el-table-column
          label="借方"
          width="100"
          align="center"
          prop="ytdDebit"
        >
        </el-table-column>
        <el-table-column label="贷方" width="100" align="center" prop="ytdLoan">
        </el-table-column>
      </el-table-column>
      <el-table-column label="期末余额" align="center">
        <el-table-column
          label="借方"
          width="100"
          align="center"
          prop="endDebit"
        >
        </el-table-column>
        <el-table-column label="贷方" width="100" align="center" prop="endLoan">
        </el-table-column>
      </el-table-column>
    </el-table>

    <div v-if="aa">
      <BillVoucherTemplatea
        @getData="fn2"
        :msgData="msg"
      ></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import { getPeriod } from "@/api/acc/Repertory/InventorySettings";
import { accountingItemBalance } from "@/api/acc/book";
import { GetListType } from "@/api/acc/assist";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "AccountingProjectBalanceSheet",
  data() {
    return {
      tableData: [],
      moreVisible: false,
      subjectCodeList: [],
      msg: "",
      subjectName: "",
      aa: false,
      assistId: 7,
      query: {
        assist: null,
        endDate: null,
        ist: null,
        isz: null,
        levelE: null,
        levelS: null,
        show: null,
        startDate: null,
        subject: "",
      },
      data11: [],
      list: [],
      subjectAllList: [],
      searchBoxShow: false,
    };
  },
  created() {
    this.subjectAllList = this.$store.getters.allSubjectList;
    this.query.startDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.getList();
    GetListType().then((res) => (this.list = res.data.data));
  },
  deactivated() {
    this.$bus.$off("balanceToDetail");
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
    subjectList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(this.query.subject)
      );
    },
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    },
    async getList() {
      accountingItemBalance(this.query, this.assistId).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        res.data.data &&
          res.data.data.forEach((item) => {
            item.beginDebit = item.beginDebit
              ? this.$numeral(item.beginDebit).format("0,0.00")
              : null;
            item.beginLoan = item.beginLoan
              ? this.$numeral(item.beginLoan).format("0,0.00")
              : null;
            item.debit = item.debit
              ? this.$numeral(item.debit).format("0,0.00")
              : null;
            item.endDebit = item.endDebit
              ? this.$numeral(item.endDebit).format("0,0.00")
              : null;
            item.endLoan = item.endLoan
              ? this.$numeral(item.endLoan).format("0,0.00")
              : null;
            item.loan = item.loan
              ? this.$numeral(item.loan).format("0,0.00")
              : null;
            item.ytdDebit = item.ytdDebit
              ? this.$numeral(item.ytdDebit).format("0,0.00")
              : null;
            item.ytdLoan = item.ytdLoan
              ? this.$numeral(item.ytdLoan).format("0,0.00")
              : null;
          });
        this.tableData = res.data.data;
      });
    },
    async getDetail(row) {
      // this.$router.push("/AccountBooks/AccountBooks/DetailAccount");
      // this.$bus.$emit("balanceToDetail", row, this.query);
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
      let str = "";
      if (data) {
        this.subjectCodeList.push(data.subjectCode);
        str = this.subjectCodeList.join(",");
        this.query.subject = str;
      }
    },
    onSubmit() {
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
        subjectEnd: "",
        subjectStart: "",
        summary: null,
      };
    },
    searchSubjectSelect(item) {
      this.query.subject = item.otherSubjectName.split(" ")[0];
      this.searchBoxShow = false;
    },
    output() {
      import("@/vendor/Export2Excel").then((excel) => {
        const multiHeader = [
          [
            `公司名称:${this.$store.getters.childrenData.clientName}`,
            "",
            "",
            "",
            `时间`,
            "",
            "",
            "",
            `单位`,
            "",
            "",
          ],
        ];
        const multiHeader2 = [
          [
            "科目编码",
            "科目名称",
            "期初余额",
            "",
            "本期发生额",
            "",
            "本年累计发生额",
            "",
            "期末余额",
            "",
          ],
        ];
        const tHeader = [
          "",
          "",
          "借方",
          "贷方",
          "借方",
          "贷方",
          "借方",
          "贷方",
          "借方",
          "贷方",
        ];
        const filterVal = [
          "number",
          "name",
          "beginDebit",
          "beginLoan",
          "debit",
          "loan",
          "ytdDebit",
          "ytdLoan",
          "endDebit",
          "endLoan",
        ]; // 表头所对应的字段，这里未填写，请自行填写对应的字段，按实际需求请自行处理该步

        let data = this.tableData.map((v) => filterVal.map((j) => v[j])); //rjdata为请求的数据，此处理是为了对应字段，如不需要此处理，直接为data赋值即可
        // 进行所有表头的单元格合并
        let merges = [
          "A1:D1",
          "E1:H1", //合并行
          "I1:J1",
          "A2:A3",
          "B2:B3",
          "C2:D2",
          "E2:F2",
          "G2:H2",
          "I2:J2",
        ]; //如果是A1到I1合并就写A1:I1
        excel.export_json_to_excel({
          multiHeader, // 这里是第一行的表头
          multiHeader2, // 这里是第二行的表头
          header: tHeader, // 这里是第三行的表头
          data,
          filename: "核算项目余额表" + this.disperiodTit,
          merges,
        });
      });
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