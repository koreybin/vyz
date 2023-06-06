<template>
  <div>
    <el-dialog
      :title="`编辑公式-${title}`"
      :visible.sync="isDialogVisible"
      width="38%"
      @close="handleClose"
    >
      <div class="formula-top">
        <span class="item">
          <label>科目：</label>
          <span>
            <el-input
              ref="subject"
              style="width: 180px"
              v-model="subjectName"
              @input="searchBoxShow = true"
              @blur="searchBlur"
              @focus="focusSelectAll($event)"
            ></el-input>
            <div class="ui-box" v-if="searchBoxShow" style="width: 180px">
              <div v-if="!searchList.length" class="b-item">没有匹配的选项</div>
              <div
                v-else
                class="b-item"
                v-for="item in searchList"
                :key="item.id"
                @mousedown.prevent="searchSelect(item)"
              >
                {{ item.otherSubjectName }}
              </div>
            </div>
            <!-- <i class="el-icon-folder-add aa" @click="selectionList"></i> -->
          </span>
        </span>
        <span class="item">
          <label>运算符号：</label>
          <span>
            <el-select style="width: 80px" v-model="calculatingSigns">
              <el-option :value="1" label="+"></el-option>
              <el-option :value="2" label="-"></el-option>
            </el-select>
          </span>
        </span>
        <span class="item">
          <label>取数规则：</label>
          <span>
            <el-select style="width: 120px" v-model="numberRules">
              <el-option
                v-for="item in ruleList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </span>
        </span>
        <span>
          <el-button @click="addFormula">添加</el-button>
        </span>
      </div>
      <el-row>
        <el-col>
          <el-table
            ref="table"
            size="mini"
            :data="tempData"
            style="width: 100%"
            show-summary
            border
            :key="tableKey"
            :summary-method="getSummaries"
          >
            <el-table-column prop="subject" label="科目" width="200">
            </el-table-column>
            <el-table-column label="运算符号" width="70">
              <template slot-scope="scope">
                <p v-if="scope.row.calculatingSigns === 1">+</p>
                <p v-else>-</p>
              </template>
            </el-table-column>
            <el-table-column label="取数规则">
              <template slot-scope="scope">
                <div v-if="parent === 'BalanceSheet'">
                  <p v-if="scope.row.numberRules === 1">余额</p>
                  <p v-else-if="scope.row.numberRules === 2">借方余额</p>
                  <p v-else-if="scope.row.numberRules === 3">贷方余额</p>
                  <p v-else-if="scope.row.numberRules === 4">科目借方余额</p>
                  <p v-else>科目贷方余额</p>
                </div>
                <div v-else-if="parent === 'ProfitStatement'">
                  <p v-if="scope.row.numberRules === 1">实际损益额</p>
                  <p v-else-if="scope.row.numberRules === 2">借方发生额</p>
                  <p v-else>贷方发生额</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="left">
              <template slot-scope="scope">
                <p v-if="parent === 'BalanceSheet'">
                  {{ scope.row.endPeriod }}
                </p>
                <p v-else-if="parent === 'ProfitStatement'">
                  {{ scope.row.yearNum }}
                </p>
              </template>
            </el-table-column>
            <el-table-column :label="right">
              <template slot-scope="scope">
                <p v-if="parent === 'BalanceSheet'">
                  {{ scope.row.beginningYear }}
                </p>
                <p v-else-if="parent === 'ProfitStatement'">
                  {{ scope.row.periodNum }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <div class="charge-table-icon">
                  <i
                    class="el-icon-close"
                    style="color: #4a90e2"
                    @click="delMain(scope.row.id)"
                  ></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div></div>
    </el-dialog>
    <!-- <div v-if="aa">
      <BillVoucherTemplatea :msgData="msg" @getData="fn"></BillVoucherTemplatea>
    </div> -->
  </div>
</template>

<script>
import {
  insertFormula,
  delFormulaSubject,
  getFormula,
} from "@/api/acc/balancesheet";
import {
  insertProfitFormula,
  delProfitFormulaSubject,
  getProfitFormula,
} from "@/api/acc/profit";
import { GetAllList } from "@/api/acc/BillVoucherTemplate";
export default {
  props: [
    "dialogVisible",
    "title",
    "formulaData",
    "updateData",
    "rule",
    "parent",
  ],
  data() {
    return {
      isDialogVisible: false,
      subjectName: "",
      subjectId: "",
      calculatingSigns: 1,
      numberRules: 1,
      bsId: "",
      profitId: "",
      flag: 1,
      tempData: [],
      main: "",
      data: "",
      mainId: "",
      ruleList: [],
      aa: false,
      parentUpdateData: null,
      searchBoxShow: false,
      subjectAllList: [],
      tableKey: "",
      left: "",
      right: "",
      type: "",
    };
  },
  watch: {
    formulaData: {
      handler(val) {
        console.log(val);
        if (this.parent === "BalanceSheet") {
          this.tempData = val;
        } else if (this.parent === "ProfitStatement") {
          this.profitId = val.length && val[0].profitId;
          this.tempData = val;
        }
      },
    },
    updateData(val) {
      this.parentUpdateData = val;
      this.bsId = val.id;
      this.type = val.type;
      this.subjectName = "";
    },
    dialogVisible(val) {
      this.isDialogVisible = val;
    },
    parent: {
      handler(val) {
        if (val === "BalanceSheet") {
          this.left = "期末数";
          this.right = "年初数";
        } else if (val === "ProfitStatement") {
          this.left = "本年累计金额";
          this.right = "本月金额";
        }
      },
      immediate: true,
    },
    rule: {
      handler(val) {
        this.ruleList = val;
      },
      immediate: true,
    },
  },
  computed: {
    searchList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(this.subjectName)
      );
    },
  },
  created() {
    GetAllList().then((res) => {
      this.tableKey = Math.random();
      this.subjectAllList = res.data.data;
    });
  },
  methods: {
    handleClose() {
      this.$emit("closeDialog", false);
    },
    async delMain(id) {
      if (this.parent === "BalanceSheet") {
        const res = await delFormulaSubject(id);
        if (res.data.retCode !== 200)
          return this.$message.error(res.data.message);
        this.$message.success("删除成功");
        this.updateList();
      } else if (this.parent === "ProfitStatement") {
        const res = await delProfitFormulaSubject(id);
        if (res.data.retCode !== 200)
          return this.$message.error(res.data.message);
        this.$message.success("删除成功");
        this.updateList();
      }
    },
    async addFormula() {
      if (this.parent === "BalanceSheet") {
        const { data: res } = await insertFormula(
          this.bsId,
          this.calculatingSigns,
          this.numberRules,
          this.subjectId,
          this.type
        );
        if (res.retCode !== 200) return this.$message.error(res.data.message);
        this.$message.success("添加成功");
        this.updateList();
        this.subjectName = "";
      } else if (this.parent === "ProfitStatement") {
        const { data: res } = await insertProfitFormula(
          this.calculatingSigns,
          this.numberRules,
          this.profitId,
          this.subjectId
        );
        if (res.retCode !== 200) return this.$message.error(res.data.message);
        this.$message.success("添加成功");
        this.updateList();
        this.subjectName = "";
      }
    },
    async updateList() {
      if (this.parent === "BalanceSheet") {
        let { date, id, type } = this.parentUpdateData;
        const { data: res } = await getFormula(date, id, type);
        res.data.forEach((item) => {
          item.endPeriod = this.$numeral(item.endPeriod).format("0,0.00");
          item.beginningYear = this.$numeral(item.beginningYear).format(
            "0,0.00"
          );
        });
        this.tempData = res.data;
      } else if (this.parent === "ProfitStatement") {
        let { date, id, type } = this.parentUpdateData;
        const { data: res } = await getProfitFormula(date, id, type);
        res.data.forEach((item) => {
          item.periodNum = this.$numeral(item.periodNum).format("0,0.00");
          item.yearNum = this.$numeral(item.yearNum).format("0,0.00");
        });
        this.tempData = res.data;
      }
    },
    searchBlur() {
      if (
        this.subjectAllList.some(
          (item) => item.otherSubjectName == this.subjectName
        )
      )
        return;
      this.subjectName = "";
      this.searchBoxShow = false;
    },
    searchSelect(item) {
      this.subjectName = item.otherSubjectName;
      this.searchBoxShow = false;
      this.subjectId = item.id;
      this.$nextTick(() => {
        this.$refs["subject"].$el.children[0].select();
      });
    },
    focusSelectAll(e) {
      e.target.select();
    },
    getSummaries({ columns, data }) {
      const values = data.map((item) => {
        return {
          beginningYear: this.$numeral(item.beginningYear).value(),
          endPeriod: this.$numeral(item.endPeriod).value(),
          calculatingSigns: item.calculatingSigns,
        };
      });
      let lastBegin = values.reduce((prev, curr) => {
        const value = Number(curr.beginningYear);
        if (curr.calculatingSigns === 2 && !isNaN(value)) {
          return prev - curr.beginningYear;
        } else if (curr.calculatingSigns === 1 && !isNaN(value)) {
          return prev + curr.beginningYear;
        } else {
          return prev;
        }
      }, 0);
      let lastEnd = values.reduce((prev, curr) => {
        const value = Number(curr.endPeriod);
        if (curr.calculatingSigns === 2 && !isNaN(value)) {
          return prev - curr.endPeriod;
        } else if (curr.calculatingSigns === 1 && !isNaN(value)) {
          return prev + curr.endPeriod;
        } else {
          return prev;
        }
      }, 0);

      let lastData = ["合计", null, null, lastEnd, lastBegin, null];
      lastData[3] = this.$numeral(lastData[3]).format("0,0.00");
      lastData[4] = this.$numeral(lastData[4]).format("0,0.00");
      return lastData;
    },
    // fn(e, a, b) {
    //   this.aa = e;
    //   if (a == undefined) return;

    // },
    // selectionList() {
    //   this.aa = true;
    // },
  },
};
</script>

<style>
.charge-table-icon {
  display: inline-block;
  cursor: pointer;
  padding: 0 10px;
}
.b-item:hover {
  background-color: #ddd;
}
</style>