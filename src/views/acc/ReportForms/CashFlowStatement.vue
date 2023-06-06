<template>
  <div>
    <div class="ui-header">
      <div>
        <label
          >利润表
          <el-select
            v-model="type"
            style="width: 80px"
            @change="updateList"
            size="mini"
          >
            <el-option :value="1" label="月报"></el-option>
            <el-option :value="2" label="季报"></el-option>
          </el-select>
          <el-select v-model="date" size="mini">
            <el-option
              v-for="item in periodList"
              :key="item.disPeriod"
              :label="item.disPeriod"
              :value="item.yearPeriod"
            ></el-option>
          </el-select>
        </label>
      </div>
      <div class="h-center">
        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
          size="mini"
        ></el-button>
      </div>
      <div>
        <el-button size="mini">税局格式导出</el-button>
        <el-button size="mini"> 调整 </el-button>
        <el-button size="mini"> 打印 </el-button>
        <el-dropdown>
          <el-button size="mini"
            >导出<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="EXCEL格式">EXCEL格式</el-dropdown-item>
            <el-dropdown-item command="TXT格式">TXT格式</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini"> 批量导出 </el-button>
      </div>
    </div>

    <div style="margin: 0 10px">
      <table class="table" border="1">
        <thead>
          <tr>
            <th width="12%" style="height: 30px">项目</th>
            <th width="3%">行次</th>
            <th width="6%" v-if="type === 1">本月数</th>
            <th width="6%" v-else>本期数</th>
            <th width="6%">本年数</th>
            <th width="12%" style="height: 30px">项目</th>
            <th width="3%">行次</th>
            <th width="6%" v-if="type === 1">本月数</th>
            <th width="6%" v-else>本期数</th>
            <th width="6%">本年数</th>
          </tr>
        </thead>
        <tbody v-loading="loading">
          <tr v-for="item in tableData" :key="item.rowIdL">
            <td style="text-align: left">
              {{ item.itemL }}
            </td>
            <td>{{ item.lineL }}</td>
            <td v-if="type === 1">{{ item.periodL }}</td>
            <td v-else>{{ item.quarterL }}</td>
            <td>{{ item.yearL }}</td>
            <td style="text-align: left">
              {{ item.itemR }}
            </td>
            <td>{{ item.lineR }}</td>
            <td v-if="type === 1">{{ item.periodR }}</td>
            <td v-else>{{ item.quarterR }}</td>
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
      :rule="ruleList"
      :parent="self"
    ></EditFormula>
  </div>
</template>

<script>
import { mixins } from "@/mixins/mixin";
import { list } from "@/api/acc/cashFlowStatement";
import { getProfitFormula } from "@/api/acc/profit";
import EditFormula from "./components/Editformula";
export default {
  name: "ProfitStatement",
  components: {
    EditFormula,
  },
  mixins: [mixins],
  data() {
    return {
      self: "ProfitStatement",
      formulaData: [],
      dialogVisible: false,
      title: "",
      date: "",
      tableData: [],
      type: 1,
      updateData: {
        date: "",
        id: "",
        type: "",
      },
      ruleList: [
        { value: 1, label: "实际损益额" },
        { value: 2, label: "借方发生额" },
        { value: 3, label: "贷方发生额" },
      ],
      loading: false,
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
    // test(item) {
    //   console.log(item);
    // },
    getList() {
      this.loading = true;
      list(this.date, this.type).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        res.data.data.forEach((item) => {
          item.periodL = item.periodL
            ? this.$numeral(item.periodL).format("0,0.00")
            : null;
          item.yearL = item.yearL
            ? this.$numeral(item.yearL).format("0,0.00")
            : null;
          item.periodR = item.periodR
            ? this.$numeral(item.periodR).format("0,0.00")
            : null;
          item.yearR = item.yearR
            ? this.$numeral(item.yearR).format("0,0.00")
            : null;
        });
        this.tableData = res.data.data;
        this.loading = false;
      });
    },
    closeDialog(flag) {
      this.dialogVisible = flag;
    },
    updateList() {
      this.getList();
    },
    showDetail() {},
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
}
.debtor-table td {
  border-right: 1px solid #bab9b9;
  &:last-of-type {
    border-right: none;
  }
}
</style>