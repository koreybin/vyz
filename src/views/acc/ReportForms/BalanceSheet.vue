<template>
  <div>
    <div class="ui-header">
      <div>
        <label>资产负债表 </label>
        <el-select v-model="date" size="mini" @change="dateChange">
          <el-option
            v-for="item in periodList"
            :key="item.disPeriod"
            :label="item.disPeriod"
            :value="item.yearPeriod"
          ></el-option>
        </el-select>
      </div>
      <div class="h-center">
        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
          size="mini"
        ></el-button>
      </div>
      <div>
        <el-button size="mini"> 复制 </el-button>
        <el-button v-print="'#printTest'" size="mini"> 打印 </el-button>
        <!-- <el-button @click="print" v-print="'#printTest'"> 打印 </el-button> -->
        <el-dropdown @command="changeType">
          <el-button size="mini"
            >报表重分类<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="不重分类">不重分类</el-dropdown-item>
            <el-dropdown-item command="全部重分类">全部重分类</el-dropdown-item>
            <el-dropdown-item command="部分重分类">部分重分类</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="output">
          <el-button size="mini"
            >导出<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="税局格式导出"
              >税局格式导出</el-dropdown-item
            >
            <el-dropdown-item command="EXCEL格式">EXCEL格式</el-dropdown-item>
            <el-dropdown-item command="TXT格式">TXT格式</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini"> 批量导出 </el-button>
      </div>
    </div>

    <div style="margin: 0 10px" ref="print" id="printTest">
      <table class="table" border="1">
        <thead>
          <tr>
            <th width="12%" style="height: 30px">资产</th>
            <th width="6%">行次</th>
            <th width="6%">期末数</th>
            <th width="6%">年初数</th>
            <th width="12%">负债和所有者（或股东）权益</th>
            <th width="6%">行次</th>
            <th width="6%">期末数</th>
            <th width="6%">年初数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.rowIdL">
            <td
              v-if="item.isInputL"
              @click="editMula(item, 'left')"
              :class="{ pointer: item.isInputL }"
              style="text-align: left"
            >
              <a>{{ item.titleL }}</a>
            </td>
            <td v-else style="text-align: left">
              <p>{{ item.titleL }}</p>
            </td>
            <td>{{ item.lineL }}</td>
            <td>{{ item.endL }}</td>
            <td>{{ item.yearL }}</td>
            <td
              v-if="item.isInputR"
              @click="editMula(item, 'right')"
              :class="{ pointer: item.isInputR }"
              style="text-align: left"
            >
              <a>{{ item.titleR }}</a>
            </td>
            <td v-else style="text-align: left">
              <p>{{ item.titleR }}</p>
            </td>
            <td>{{ item.lineR }}</td>
            <td>{{ item.endR }}</td>
            <td>{{ item.yearR }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <EditFormula
      :title="title"
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
      :formulaData="formulaData"
      :updateData="updateData"
      :parent="self"
      :rule="ruleList"
    ></EditFormula>
  </div>
</template>

<script>
import { mixins } from "@/mixins/mixin";
import { list, getFormula } from "@/api/acc/balancesheet";
import EditFormula from "./components/Editformula";
import { export_json_to_excel } from "@/vendor/Export2Excel";
export default {
  name: "BalanceSheet",
  components: {
    EditFormula,
  },
  mixins: [mixins],
  data() {
    return {
      self: "BalanceSheet",
      formulaData: [],
      dialogVisible: false,
      title: "",
      tableData: [],
      type: 1,
      date: "",
      updateData: {
        date: "",
        id: "",
        type: "",
      },
      ruleList: [
        { value: 1, label: "余额" },
        { value: 2, label: "借方余额" },
        { value: 3, label: "贷方余额" },
        { value: 4, label: "科目借方余额" },
        { value: 5, label: "科目贷方余额" },
      ],
    };
  },
  created() {
    this.date =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.getList();
  },
  computed: {
    periodList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
  },
  methods: {
    print() {
      this.$print(this.$refs.print);
    },
    getList() {
      list(this.date, this.type).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        res.data.data.forEach((item) => {
          item.endL = item.endL
            ? this.$numeral(item.endL).format("0,0.00")
            : null;
          item.endR = item.endR
            ? this.$numeral(item.endR).format("0,0.00")
            : null;
          item.yearL = item.yearL
            ? this.$numeral(item.yearL).format("0,0.00")
            : null;
          item.yearR = item.yearR
            ? this.$numeral(item.yearR).format("0,0.00")
            : null;
        });
        this.tableData = res.data.data;
      });
    },

    editMula(item, direction) {
      if (direction === "left") {
        this.updateData = { date: this.date, id: item.rowIdL, type: this.type };
        getFormula(this.date, item.rowIdL, this.type).then((res) => {
          if (res.data.retCode !== 200)
            return this.$message.error(this.data.message);
          this.title = item.titleL;
          this.dialogVisible = true;
          res.data.data.forEach((item) => {
            item.endPeriod = this.$numeral(item.endPeriod).format("0,0.00");
            item.beginningYear = this.$numeral(item.beginningYear).format(
              "0,0.00"
            );
          });
          this.formulaData = res.data.data;
        });
      }
      if (direction === "right") {
        this.updateData = { date: this.date, id: item.rowIdR, type: this.type };
        getFormula(this.date, item.rowIdR, this.type).then((res) => {
          if (res.data.retCode !== 200)
            return this.$message.error(this.data.message);
          this.title = item.titleR;
          this.dialogVisible = true;
          res.data.data.forEach((item) => {
            item.endPeriod = this.$numeral(item.endPeriod).format("0,0.00");
            item.beginningYear = this.$numeral(item.beginningYear).format(
              "0,0.00"
            );
          });
          this.formulaData = res.data.data;
        });
      }
    },
    closeDialog(flag) {
      this.dialogVisible = flag;
    },
    updateList() {
      this.getList();
    },
    showDetail() {},
    changeType(command) {
      if (command === "不重分类") {
        this.type = 1;
        this.getList();
      }
      if (command === "全部重分类") {
        this.type = 2;
        this.getList();
      }
      if (command === "部分重分类") {
        this.type = 3;
        this.getList();
      }
    },
    dateChange(val) {
      this.date = val;
      this.getList();
    },
    output(command) {
      if (command === "EXCEL格式") {
        const multiHeader = [["资产负债表", "", "", "", "", "", "", ""]];
        const multiHeader2 = [
          [
            `${this.$store.getters.childrenData.clientName}`,
            "",
            "",
            `${this.date}`,
            "",
            "单位:元",
            "",
            "",
          ],
        ];
        const tHeader = [
          "资产",
          "行次",
          "期末数",
          "年初数",
          "负债和所有者（或股东）权益",
          "行次",
          "期末数",
          "年初数",
        ]; //二级表头
        const filterVal = [
          "titleL",
          "lineL",
          "endL",
          "yearL",
          "titleR",
          "lineR",
          "endR",
          "yearR",
        ]; //表头所对应后台返回的字段
        const data = this.formatJson(filterVal, this.tableData);
        const merges = ["A1:H1", "A2:C2", "D2:E2", "F2:H2"];
        export_json_to_excel({
          multiHeader, // 这里是第一行的表头
          multiHeader2, // 这里是第二行的表头
          header: tHeader, // 这里是第三行的表头
          data, //数据
          merges, //合并行
          filename: "资产负债表" + "_" + this.date,
        });
      }
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

<style lang='scss' scoped>
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  padding: 0;
  margin: 0;
  font-size: 12px;
  border-color: #d0d0d0;
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
.table tbody tr,
.table tbody td {
  height: 35px;
  padding: 0 10px;
}
.table tbody > tr:hover {
  background-color: #faffd1;
  a {
    text-decoration: underline;
  }
}
.debtor-table td {
  border-right: 1px solid #bab9b9;
  &:last-of-type {
    border-right: none;
  }
}
</style>