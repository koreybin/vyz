<template>
  <div>
    <el-row class="summary-header">
      <el-col :span="12">
        <span class="demonstration">日期:</span>
        <el-date-picker
          v-model="temp.startDate"
          type="date"
          format="yyyy-MM"
          value-format="yyyy-MM"
          placeholder="开始日期"
        >
        </el-date-picker>
        -
        <el-date-picker
          v-model="temp.endDate"
          type="date"
          format="yyyy-MM"
          value-format="yyyy-MM"
          placeholder="结束日期"
        >
        </el-date-picker>
        <span class="demonstration">存货:</span>
        <el-select
          v-model="value"
          :clearable="true"
          placeholder="存货编码/名称/规格型号"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-checkbox-group v-model="checkList" class="inlineBlock">
          <el-checkbox label="1" value="按月汇总">按月汇总</el-checkbox>
          <el-checkbox label="2" value="显示全部">显示全部</el-checkbox>
          <el-checkbox label="3" value="显示金额">显示金额</el-checkbox>
        </el-checkbox-group>
        <el-button
          class="el-icon-refresh-right"
          @click="updateTable"
        ></el-button>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="primary">打印</el-button>
        <download-excel
          style="display: inline"
          :data="tableData"
          :fields="json_fields"
          v-if="checkList.length === 0"
          :name="'存货汇总表' + '_' + new Date().getTime()"
        >
          <el-button>导出</el-button>
        </download-excel>
        <download-excel
          style="display: inline"
          :data="tableData"
          :fields="json_fields_2"
          v-if="checkList.length !== 0"
          :name="'存货汇总表' + '_' + new Date().getTime()"
        >
          <el-button>导出</el-button>
        </download-excel>
      </el-col>
    </el-row>
    <el-table :data="tableData" :border="true" :key="Math.random()">
      <el-table-column
        label="期间"
        prop="importPeriod"
        v-if="monthSummary"
        v-loading="loading"
        align="center"
      >
      </el-table-column>
      <el-table-column label="存货编码" prop="inventoryCode" align="center">
      </el-table-column>
      <el-table-column label="存货名称" prop="inventoryName" align="center">
      </el-table-column>
      <el-table-column label="规格型号" prop="specification" align="center">
      </el-table-column>
      <el-table-column label="单位" prop="unit" align="center">
      </el-table-column>
      <el-table-column label="期初结存" prop="initialQuantity" align="center">
        <template v-if="moneySummary">
          <el-table-column
            label="数量"
            prop="initialQuantity"
          ></el-table-column>
          <el-table-column label="金额" prop="initialAmount"></el-table-column>
        </template>
      </el-table-column>
      <el-table-column label="入库数量" prop="enterQuantity" align="center">
        <template v-if="moneySummary">
          <el-table-column label="数量" prop="enterQuantity"></el-table-column>
          <el-table-column label="金额" prop="enterAmount"></el-table-column>
        </template>
      </el-table-column>
      <el-table-column label="出库数量" prop="outQuantity" align="center">
        <template v-if="moneySummary">
          <el-table-column label="数量" prop="outQuantity"></el-table-column>
          <el-table-column label="金额" prop="outAmount"></el-table-column>
        </template>
      </el-table-column>
      <el-table-column label="结存数量" prop="quantity" align="center">
        <template v-if="moneySummary">
          <el-table-column label="数量" prop="quantity"></el-table-column>
          <el-table-column label="金额" prop="amount"></el-table-column>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="
              scope.row.inventoryName !== '小计' &&
              scope.row.inventoryName !== '总计'
            "
            size="mini"
            @click="detail(scope.row.id)"
            >明细</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSummaryList } from "@/api/acc/Repertory/StockIn";
import { GetList } from "@/api/acc/Repertory/StockControl";
import { getSettingState } from "@/api/acc/Repertory/InventorySettings";
import { Message } from "element-ui";
export default {
  name: "InventorySummary",
  data() {
    return {
      json_fields: {
        存货编码: "inventoryCode",
        存货名称: "inventoryName",
        规格型号: "specification",
        单位: "unit",
        期初结存: "initialQuantity",
        入库数量: "enterQuantity",
        出库数量: "outQuantity",
        结存数量: "quantity",
      },
      json_fields_2: {
        期间: "importPeriod",
        存货编码: "inventoryCode",
        存货名称: "inventoryName",
        规格型号: "specification",
        单位: "unit",
        期初结存金额: "initialAmount",
        期初结存数量: "initialQuantity",
        入库金额: "enterAmount",
        入库数量: "enterQuantity",
        出库金额: "outAmount",
        出库数量: "outQuantity",
        结存金额: "amount",
        结存数量: "quantity",
      },
      temp: {
        startDate: "2022-01",
        endDate: "2022-07",
      },
      options: [],
      value: "",
      checkList: [],
      monthSummary: false,
      moneySummary: false,
      serial: "",
      labelData: [
        { label: "存货编码", prop: "id" },
        { label: "存货名称", prop: "inventoryName" },
        { label: "规格型号", prop: "specification" },
        { label: "单位", prop: "unit" },
        { label: "期初结存", prop: "initialQuantity" },
        { label: "入库数量", prop: "enterQuantity" },
        { label: "出库数量", prop: "outQuantity" },
        { label: "结存数量", prop: "quantity" },
      ],
      tableData: [],
      loading: true,
    };
  },
  beforeRouteEnter(to, from, next) {
    getSettingState().then((response) => {
      if (response.data.retCode === 500) {
        return Message.warning(response.data.message);
      }
      if (response.data.message === "未进入子系统") {
        this.$router.push("/");
        return;
      }
      next();
    });
  },
  created() {
    GetList(this.serial, 1, 999).then((res) => {
      res.data.data.object.forEach((item) => {
        this.options.push({
          value: item.id,
          label: `${item.inventoryCode}/${item.inventoryName}/${item.specification}`,
        });
      });
    });
    getSummaryList(
      this.temp.endDate,
      this.value,
      this.monthSummary,
      this.temp.startDate
    ).then((res) => (this.tableData = res.data.data));
  },
  methods: {
    updateTable() {
      this.loading = true;
      this.monthSummary = false;
      this.moneySummary = false;
      if (
        this.checkList.indexOf("3") !== -1 &&
        this.checkList.indexOf("1") !== -1
      ) {
        this.monthSummary = true;
        this.moneySummary = true;
        getSummaryList(
          this.temp.endDate,
          this.value,
          this.monthSummary,
          this.temp.startDate
        ).then((res) => {
          this.tableData = res.data.data;
          this.loading = false;
        });
      }

      // 只选中金额
      if (
        this.checkList.indexOf("3") !== -1 &&
        this.checkList.indexOf("1") === -1
      ) {
        this.moneySummary = true;

        getSummaryList(
          this.temp.endDate,
          this.value,
          this.monthSummary,
          this.temp.startDate
        ).then((res) => {
          this.tableData = res.data.data;
          this.loading = false;
        });
      }
      // 只选中按月
      if (
        this.checkList.indexOf("3") === -1 &&
        this.checkList.indexOf("1") !== -1
      ) {
        this.monthSummary = true;
        getSummaryList(
          this.temp.endDate,
          this.value,
          this.monthSummary,
          this.temp.startDate
        ).then((res) => {
          this.tableData = res.data.data;
          this.loading = false;
        });
      }
      // 都不选中
      if (
        this.checkList.indexOf("3") === -1 &&
        this.checkList.indexOf("1") === -1
      ) {
        getSummaryList(
          this.temp.endDate,
          this.value,
          this.monthSummary,
          this.temp.startDate
        ).then((res) => {
          this.tableData = res.data.data;
          this.loading = false;
        });
      }
    },
    detail(id) {
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("startDate", this.temp.startDate);
      sessionStorage.setItem("endDate", this.temp.endDate);
      this.$router.push("/Repertory/Repertory/InventoryReceiptAndDispatchList");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>