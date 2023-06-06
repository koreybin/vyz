<template>
  <div>
    <div v-show="andList">
      <stockinone :msgData="msg" :big="oo" @getData="fn"></stockinone>
    </div>

    <div v-show="isList">
      <div class="header">
        <span>日期:</span>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="temp.startDate"
          type="date"
          placeholder="开始日期"
        >
        </el-date-picker>

        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="temp.endDate"
          type="date"
          placeholder="结束日期"
        >
        </el-date-picker>

        <span>单据类型:</span>
        <el-select
          class="opt"
          v-model="value"
          @change="leixing"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>来源:</span>
        <el-select
          class="opt"
          v-model="value2"
          @change="laiyuan"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="temp.condition"
          class="int"
          placeholder="单据编号/往来单位/摘要/凭证号"
        ></el-input>
        <el-button @click="search">搜索</el-button>
        <el-dropdown @command="handleCommand">
          <el-button type="primary">
            新增出库单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="产品库出库单"
              >产品库出库单</el-dropdown-item
            >
            <el-dropdown-item command="材料出库单">材料出库单</el-dropdown-item>
            <el-dropdown-item command="周转材料出库单">
              周转材料出库单</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div>
        <el-table
          :key="tableKey"
          :data="arrList"
          border
          height="1000"
          fit
          max-height="750"
          highlight-current-row
          class="tab"
        >
          <el-table-column align="center" label="单据日期">
            <template slot-scope="scope">
              <span>{{ scope.row.documentDate }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="单据编号">
            <template slot-scope="scope">
              <span>{{ scope.row.documentCode }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="单据类型">
            <template slot-scope="scope">
              <span>{{ scope.row.documentType }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="往来单位">
            <template slot-scope="scope">
              <span>{{ scope.row.contactsSupplier }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="摘要">
            <template slot-scope="scope">
              <span>{{ scope.row.summary }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="数量">
            <template slot-scope="scope">
              <span>{{ scope.row.totalQuantity }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="金额">
            <template slot-scope="scope">
              <span>{{ scope.row.totalAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="制单人">
            <template slot-scope="scope">
              <span>{{ scope.row.createBy }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="来源">
            <template slot-scope="scope">
              <span>{{ scope.row.source }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="凭证字号">
            <template slot-scope="scope">
              <span>{{ scope.row.voucherNo }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="发票号">
            <template slot-scope="scope">
              <span>{{ scope.row.invoiceNo }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { outList } from "@/api/acc/Repertory/StockIn";
import Stockinone from "./Stockinone.vue";
import { Message } from "element-ui";
import { getSettingState } from "@/api/acc/Repertory/InventorySettings";
export default {
  name: "StockOut",
  components: { Stockinone },
  data() {
    return {
      msg: "",
      int: [],
      list: "",
      isList: true,
      andList: false,
      oo: "",
      arr: [],
      time: "",
      dialogFormVisible: false,
      value: "",
      value2: "",
      options: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "材料入库单",
        },
        {
          value: 2,
          label: "产品入库单",
        },
        {
          value: 3,
          label: "周转材料入库单",
        },
      ],
      options2: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "手工新增",
        },
        {
          value: 2,
          label: "自动生成",
        },
        {
          value: 3,
          label: "导入",
        },
      ],
      arrList: [],
      tableKey: 1,
      temp: {
        condition: "",
        startDate: "", //开始时间
        endDate: "", //结束时间
        source: "", //来源
        type: "", //类型
      },
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
  methods: {
    // 组件传值
    fn(e) {
      this.andList = e;
      this.isList = true;
    },
    // jisuan(e) {
    //   console.log(e);
    //   this.shu.danjian =(this.shu.jine /e) ;
    // },
    // 数据类型
    leixing(e) {
      this.temp.type = e;
    },
    // 来源
    laiyuan(e) {
      this.temp.source = e;
    },
    handleCommand(command) {
      if (command == "产品库出库单") {
        this.msg = "产品库出库单";
      }
      if (command == "材料出库单") {
        this.msg = "材料出库单";
      }
      if (command == "周转材料出库单") {
        this.msg = "周转材料出库单";
      }
      this.isList = false;
      this.andList = true;
      this.oo = "";
    },
    // 下拉供应商
    selectClass(event) {
      console.log(event.target.value);
    },

    // 搜索
    search() {
      outList(
        this.temp.condition,
        this.temp.endDate,
        this.temp.source,
        this.temp.startDate,
        this.temp.type
      ).then((res) => {
        this.arrList = res.data.data;
      });
    },
  },
};
</script>

<style scoped>
.header {
  margin: 10px 10px;
}
.int {
  width: 230px;
}
.opt {
  width: 130px;
}

.tab {
  margin: 10px;
}
</style>