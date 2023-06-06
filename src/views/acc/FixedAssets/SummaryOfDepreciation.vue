<template>
  <div>
    <div class="ui-header">
      <div>
        <label>折旧汇总表 </label>
        <div class="ui-btn-menu">
          <span class="ui-btn pointer" @click="moreVisible = !moreVisible">
            <span class="selected-period">
              <strong>{{ startDisperiod }}</strong>
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
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
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
        <el-button v-print="'#printTest'" size="mini"> 打印 </el-button>

        <el-button size="mini">
          <download-excel :data="tableData" :field="json_fields">
            导出</download-excel
          >
        </el-button>
      </div>
    </div>

    <div style="margin: 0 10px" ref="print" id="printTest">
      <table class="table" border="1">
        <thead>
          <tr>
            <th width="12%" style="height: 30px">类别</th>
            <th width="6%">原值</th>
            <th width="6%" v-for="itemin in depreciation[0]" :key="itemin.id">
              {{ itemin.importPeriod.split("-")[0] }}年{{
                itemin.importPeriod.split("-")[1]
              }}月折旧
            </th>
            <th width="6%">期末累计折旧</th>
            <th width="12%">本年累计折旧</th>
            <th width="6%">减值准备</th>
            <th width="6%">期末净值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.rowIdL">
            <td>{{ item.assetType }}</td>
            <td>{{ item.originalValue }}</td>
            <td v-for="(item1, index) in item.periodOfM" :key="index">
              {{ item1 }}
            </td>
            <td>{{ item.endDepreciation }}</td>
            <td>{{ item.depreciationThisYear }}</td>
            <td>{{ item.provisionImpairment }}</td>
            <td>{{ item.endNetValue }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { depreciationSummary } from "@/api/acc/FixedAssets/Card";
export default {
  name: "SummaryOfDepreciation",
  data() {
    return {
      json_fields: {
        类别: "assetType",
        原值: "originalValue",
        期末累计折旧: "endDepreciation",
        本年累计折旧: "depreciationThisYear",
        减值准备: "provisionImpairment",
        期末净值: "endNetValue",
      },
      formulaData: [],
      dialogVisible: false,
      title: "",
      tableData: [],
      type: 1,
      updateData: {
        date: "",
        id: "",
        type: "",
      },
      query: {
        endDate: null,
        startDate: null,
      },
      moreVisible: false,
      depreciation: [],
    };
  },

  created() {
    this.query.startDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.getList();
  },
  computed: {
    periodList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
    startDisperiod() {
      return this.$store.state.children.childrenData.numberOfPeriods[0]
        .disPeriod;
    },
    startEndList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    },
    print() {
      this.$print(this.$refs.print);
    },
    getList() {
      depreciationSummary(this.query.endDate, this.query.startDate).then(
        (res) => {
          res.data.data.forEach((item) => {
            item.originalValue = item.originalValue
              ? this.$numeral(item.originalValue).format("0,0.00")
              : null;
            item.depreciationThisYear = item.depreciationThisYear
              ? this.$numeral(item.depreciationThisYear).format("0,0.00")
              : null;
            item.endDepreciation = item.endDepreciation
              ? this.$numeral(item.endDepreciation).format("0,0.00")
              : null;
            item.provisionImpairment = item.provisionImpairment
              ? this.$numeral(item.provisionImpairment).format("0,0.00")
              : null;
            item.endNetValue = item.endNetValue
              ? this.$numeral(item.endNetValue).format("0,0.00")
              : null;
          });
          this.tableData = res.data.data;
          this.depreciation = res.data.data.map((item) => item.depreciation);
        }
      );
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
    onSubmit() {
      this.moreVisible = false;
      this.getList();
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
</style>