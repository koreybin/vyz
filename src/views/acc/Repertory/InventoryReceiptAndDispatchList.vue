<template>
  <div>
    <el-row class="summary-header">
      <el-col :span="12">
        <span class="demonstration">日期:</span>
        <el-date-picker
          v-model="temp.startDate"
          type="date"
          placeholder="开始日期"
        >
        </el-date-picker>
        -
        <el-date-picker
          v-model="temp.endDate"
          type="date"
          placeholder="结束日期"
        >
        </el-date-picker>
        <span class="demonstration">存货:</span>
        <el-select
          v-model="value"
          placeholder="存货编码/名称/规格型号"
          :clearable="true"
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
      <el-col :span="6">
        <el-checkbox-group v-model="checkList" class="inlineBlock">
          <el-checkbox label="1" value="显示单价、金额"
            >显示单价、金额</el-checkbox
          >
        </el-checkbox-group>
        <el-button
          class="el-icon-refresh-right"
          @click="updateTable"
        ></el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-button type="primary">打印</el-button>
        <el-button>连续打印</el-button>
        <el-button>导出</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :border="true"
      align="center"
      :key="Math.random()"
    >
      <el-table-column
        :prop="item.prop"
        v-for="item in labelData"
        :key="item.prop"
        :label="item.label"
        align="center"
      >
        <template v-if="item.hasOwnProperty('children')">
          <el-table-column
            v-for="item1 in item.children"
            :key="item1.prop"
            :prop="item1.prop"
            :label="item1.label"
          >
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="stockIn(scope.row)"
            v-if="scope.row.documentCode !== null"
            >单据</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSumDetail } from "@/api/acc/Repertory/StockIn";
import { GetList } from "@/api/acc/Repertory/StockControl";
import { getSettingState } from "@/api/acc/Repertory/InventorySettings";
import { Message } from "element-ui";
export default {
  name: "InventoryReceiptAndDispatchList",
  data() {
    return {
      temp: {
        startDate: "",
        endDate: "",
      },
      options: [],
      value: "",
      checkList: [],
      labelData: [
        { label: "单据日期", prop: "documentDate" },
        { label: "单据类型", prop: "documentType" },
        { label: "单据编号", prop: "documentCode" },
        { label: "凭证字号", prop: "voucherNo" },
        { label: "往来单位", prop: "contactsSupplier" },
        { label: "摘要", prop: "summer" },
        { label: "入库数量", prop: "eqty" },
        { label: "出库数量", prop: "oqty" },
        { label: "结存数量", prop: "iqty" },
      ],
      tableData: [],
      serial: "",
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
    this.getDetail();
    getSumDetail(this.temp.endDate, this.value, this.temp.startDate).then(
      (res) => (this.tableData = res.data.data)
    );
  },
  methods: {
    getDetail() {
      this.temp.startDate = sessionStorage.getItem("startDate")
        ? sessionStorage.getItem("startDate")
        : "";
      this.temp.endDate = sessionStorage.getItem("endDate")
        ? sessionStorage.getItem("endDate")
        : "";
      this.value = sessionStorage.getItem("id")
        ? sessionStorage.getItem("id")
        : "";
    },
    updateTable() {
      if (!this.value) {
        this.$message.error("请先选择存货！");
        return;
      }

      getSumDetail(this.temp.endDate, this.value, this.temp.startDate).then(
        (res) => (this.tableData = res.data.data)
      );
      if (this.checkList.length !== 0) {
        console.log("1");
        this.labelData[6].children = [
          { label: "数量", prop: "eqty" },
          { label: "单价", prop: "eprice" },
          { label: "金额", prop: "eamount" },
        ];
        this.labelData[7].children = [
          { label: "数量", prop: "oqty" },
          { label: "单价", prop: "oprice" },
          { label: "金额", prop: "oamount" },
        ];
        this.labelData[8].children = [
          { label: "数量", prop: "iqty" },
          { label: "单价", prop: "iprice" },
          { label: "金额", prop: "iamount" },
        ];
      } else {
        let len = this.labelData.length;
        for (let i = 6; i < len; i++) {
          delete this.labelData[i].children;
        }
      }
    },
    stockIn(code) {
      console.log(code);
      sessionStorage.setItem("oo", code.id);
      sessionStorage.setItem("documentType", code.documentType);
      this.$router.push("/Repertory/Repertory/StockIn");
    },
  },
};
</script>

<style scoped>
</style>