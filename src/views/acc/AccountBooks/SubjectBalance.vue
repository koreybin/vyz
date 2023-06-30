<template>
  <div style="height: 100%">
    <div class="ui-header" style="padding-bottom: 10px">
      <div>
        <label>
          科目余额表
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
                  v-model="query.isAssist"
                  label="显示辅助核算"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>
              <!-- <el-form-item>
              <el-checkbox
                v-model="query.isAssist"
                label="只显示最明细科目"
                :true-label="1"
                :false-label="0"
              ></el-checkbox>
            </el-form-item> -->
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
              <!-- <el-form-item>
              <el-checkbox
                v-model="query.isz"
                label="本年累计无发生额且余额为0不显示"
                :true-label="1"
                :false-label="0"
              ></el-checkbox>
            </el-form-item> -->

              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
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
        <el-button size="mini">打印</el-button>
        <el-button size="mini" @click="output">导出</el-button>
      </div>
    </div>

    <el-table :data="tableData" size="mini" border class="t-scroll">
      <el-table-column label="科目编码" width="180" align="center">
        <template slot-scope="scope">
          <a
            @click="getDetail(scope.row)"
            href="/#/AccountBooks/AccountBooks/DetailAccount"
            >{{ scope.row.number }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="科目名称" width="180" prop="name" align="center">
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
import { subjectBalance } from "@/api/acc/book";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "SubjectBalance",
  data() {
    return {
      tableData: [],
      moreVisible: false,
      msg: "",
      subjectName: "",
      aa: false,
      assistId: 0,
      query: {
        endDate: null,
        isAssist: null,
        ist: null,
        isz: null,
        levelE: 1,
        levelS: 1,
        startDate: null,
        subjectEnd: "",
        subjectStart: "",
      },
      data11: [],
      subjectAllList: [],
      searchStartBoxShow: false,
      searchEndBoxShow: false,
    };
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
  created() {
    this.subjectAllList = this.$store.getters.allSubjectList;
    this.query.startDate =
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    this.getList();
  },
  deactivated() {
    this.$bus.$off("balanceToDetail");
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    },
    async getList() {
      subjectBalance(this.query).then((res) => {
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
    updateList() {
      this.getList();
    },
    async getDetail(row) {
      setTimeout(() => {
        this.$bus.$emit("balanceToDetail", row, this.query);
      }, 500);
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
    cancelHandle() {
      this.query = {
        endDate: this.query.endDate,
        startDate: this.query.startDate,
        isAssist: null,
        ist: null,
        isz: null,
        levelE: 1,
        levelS: 1,
        subjectEnd: "",
        subjectStart: "",
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
          filename: "科目余额表" + this.disperiodTit,
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