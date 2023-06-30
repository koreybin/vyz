<template>
  <div class="app-container calendar-list-container">
    <div class="header">
      <div>
        <el-radio-group
          v-model="tabPosition"
          v-for="item in tabs"
          :key="item.id"
          @change="getListType(item.id)"
          style="margin-bottom: 30px"
        >
          <el-radio-button :label="item.name"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-button type="primary" plain>复制至其他账套</el-button>
        <el-button type="primary" plain>同步最新模板</el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      size="mini"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="会计科目" align="center">
        <el-table-column
          width="170px"
          align="center"
          :label="$t('acccountcashflowitemobj.subjectCode')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.subjectCode }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          :label="$t('acccountcashflowitemobj.subjectName')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.subjectName }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          :label="$t('acccountcashflowitemobj.subjectType')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.subjectType }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="100px"
          align="center"
          :label="$t('acccountcashflowitemobj.balanceDirection')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.balanceDirection }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="现金流量主表项目" align="center">
        <el-table-column
          align="center"
          :label="$t('acccountcashflowitemobj.cashInflow')"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isCash == 1">
              <span>现金及现金等价物</span>
            </div>
            <div v-else>
              <span
                v-for="item in majorData"
                :key="item.id"
                v-show="scope.row.cashInflow === item.id"
                >{{ item.itemValue }}</span
              >
              <i class="el-icon-date pointer" @click="select(scope.row, 0)"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('acccountcashflowitemobj.cashOutflow')"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isCash == 1">
              <span> </span>
            </div>
            <div v-else>
              <span
                v-for="item in majorData"
                :key="item.id"
                v-show="scope.row.cashOutflow === item.id"
                >{{ item.itemValue }}</span
              >
              <i class="el-icon-date pointer" @click="select(scope.row, 1)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="现金流量附表项目" align="center">
        <el-table-column
          align="center"
          :label="$t('acccountcashflowitemobj.lender')"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isCash == 1">
              <span> </span>
            </div>
            <div v-else>
              <span
                v-for="item in minorData"
                :key="item.id"
                v-show="scope.row.lender === item.id"
                >{{ item.itemValue }}</span
              >
              <i class="el-icon-date pointer" @click="select(scope.row, 2)"></i>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          :label="$t('acccountcashflowitemobj.debit')"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isCash == 1">
              <span> </span>
            </div>
            <div v-else>
              <span
                v-for="item in minorData"
                :key="item.id"
                v-show="scope.row.debit === item.id"
                >{{ item.itemValue }}</span
              >
              <i class="el-icon-date pointer" @click="select(scope.row, 3)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <selectFlowObj
      :selectDialogVisible="selectDialogVisible"
      @selectDialogShow="selectDialogShow"
      :selectData="selectData"
      :updateData="updateData"
      :title="selectTitle"
      :systemType="systemType"
    ></selectFlowObj>
  </div>
</template>
<script>
import waves from "@/components/waves"; // 水波纹指令
import selectFlowObj from "@/views/vyz/IntelligentTax/components/selectFlowObj.vue";
import { GetList, poise, show } from "@/api/acc/accountcashflowitem";
import { mixins } from "@/mixins/mixin";

export default {
  components: {
    selectFlowObj,
  },
  name: "AccountCashFlowItem",
  directives: {
    waves,
  },
  mixins: [mixins],
  data() {
    return {
      systemType: "inSystem",
      dialogFormVisible: false,
      selectDialogVisible: false,
      selectData: "",
      updateData: "",
      selectTitle: "",
      accSys: "",
      majorData: [],
      minorData: [],
      tabs: [
        { id: 1, name: "资产" },
        { id: 2, name: "负债" },
        { id: 5, name: "共同" },
        { id: 3, name: "权益" },
        { id: 4, name: "成本" },
        { id: 5, name: "损益" },
      ],
      tabPosition: "资产",
      tableKey: 0,
      list: null,
      listAdd: null,
      listLoading: true,
      currtype: 1,
      temp: {
        id: "",
      },
    };
  },
  watch: {
    miXinAccSys: {
      handler(val) {
        this.accSys = val;
        console.log(val, "wat");
      },
      immediate: true,
    },
  },
  created() {
    this.getListdata();
    this.getFlowData();
  },
  methods: {
    getFlowData() {
      setTimeout(() => {
        show(this.accSys, 1).then((pos) => {
          this.selectData = pos.data.data;
          this.majorData = pos.data.data;
        });
        show(this.accSys, 0).then((pos) => {
          this.selectData = pos.data.data;
          this.minorData = pos.data.data;
        });
      }, 1000);
    },
    getListType(val) {
      this.currtype = val;
      this.getListdata();
    },
    getListdata() {
      this.listLoading = true;
      GetList(this.currtype).then((response) => {
        this.list = response.data.data;
        this.listLoading = false;
      });
    },

    // 对话框确认
    confirm() {
      if (null) {
        poise(itemId, status, value).then(() => {});
      }
      this.dialogFormVisible = false;
    },
    // 点击获取对话框内容
    select(row, type) {
      console.log(row);
      this.selectDialogVisible = true;
      if (type == 0 || type == 1) {
        this.selectData = this.majorData;
        this.selectTitle = "选择现金流量主表项目";
        this.updateData = row;
      }
      if (type == 2 || type == 3) {
        this.selectData = this.minorData;
        this.selectTitle = "选择附表现金流量项目";
        this.updateData = row;
      }
      this.updateData.type = type;
    },
    selectDialogShow(bool, update) {
      this.selectDialogVisible = bool;
      if (update) this.getListdata();
    },
  },
};
</script>
<style scoped>
.calendar-list-container .header {
  display: flex;
  justify-content: space-between;
}

i {
  cursor: pointer;
}

.doalog {
  margin: 0 auto;
}
</style>