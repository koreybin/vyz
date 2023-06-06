<template>
  <div style="height: 100%">
    <el-row style="padding: 10px" v-if="toggle">
      <el-col :span="16">
        <label style="font-weight: 500">
          删除日期：
          <el-date-picker
            v-model="searchData.startDel"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            size="small"
          ></el-date-picker>
          至
          <el-date-picker
            v-model="searchData.endDel"
            type="date"
            placeholder="选择日期"
            size="small"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </label>

        <label style="font-weight: 500"
          >会计期间：<el-select v-model="searchData.startChapter">
            <el-option
              v-for="item in startEndList"
              :key="item.disPeriod"
              :label="item.disPeriod"
              :value="item.yearPeriod"
            ></el-option>
          </el-select>
          至
          <el-select v-model="searchData.endChapter">
            <el-option
              v-for="item in startEndList"
              :key="item.disPeriod"
              :label="item.disPeriod"
              :value="item.yearPeriod"
            ></el-option> </el-select
        ></label>
        <div class="ui-btn-menu">
          <el-button @click="moreVisible = !moreVisible">
            更多条件<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>

          <div v-if="moreVisible" class="moreBox">
            <el-form
              ref="form"
              :model="searchData"
              label-width="80px"
              label-position="right"
            >
              <el-form-item label="凭证字" prop="proveId">
                <el-select v-model="searchData.proveId" placeholder="不限">
                  <el-option
                    v-for="item in wordList"
                    :key="item.name"
                    :label="item.prove"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="凭证号" prop="proveNo">
                <el-input v-model="searchData.proveNo"></el-input>
                <span style="color: #999">例：1，3，5-7</span>
              </el-form-item>
              <el-form-item label="摘要" prop="summary">
                <el-input v-model="searchData.summary"></el-input>
              </el-form-item>
              <el-form-item label="科目" prop="subjectCode">
                <el-col :span="18">
                  <el-input
                    v-model="searchData.subjectCode"
                    autocomplete="off"
                    class="int"
                  >
                  </el-input>
                  <span style="color: #999">例：1001，1009，2121-2131</span>
                </el-col>

                <i class="el-icon-folder-add aa" @click="subjectSelect"></i>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="cancelHandle">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
        ></el-button>
      </el-col>
      <el-col :span="4" :offset="4">
        <el-button type="primary" @click="recycleReturn">批量恢复</el-button>
        <el-button type="primary" @click="recycleDel">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      class="dataTable"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'prove' }"
      border
      :sortable="true"
      align="center"
      stripe
      v-if="toggle"
      v-loading="loading"
    >
      <el-table-column type="selection" align="center"> </el-table-column>
      <el-table-column label="删除日期" align="center">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="记账日期">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="凭证字号"
        sortable
        prop="prove"
        :sort-method="sortProveNo"
      >
        <template slot-scope="scope">
          {{ scope.row.proveNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="摘要">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.amounts"
            :key="index"
            class="table-cell"
          >
            {{ item.summary }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="科目" width="450">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.amounts"
            :key="index"
            class="table-cell"
          >
            {{ item.subjectName }}
          </p>
        </template></el-table-column
      >
      <el-table-column align="center" label="借方金额">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.amounts"
            :key="index"
            class="table-cell"
          >
            {{ item.moneyOfDebit }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="贷方金额">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.amounts"
            :key="index"
            class="table-cell"
          >
            {{ item.moneyOfLender }}
          </p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="制单人" prop="createUser">
      </el-table-column>
      <el-table-column align="center" label="审核人" prop="reviewer">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div class="operatext" @click="returnHandle(scope.row)">恢复</div>
          <div class="operatext" @click="deleteHandle(scope.row)">删除</div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="aa">
      <BillVoucherTemplatea @getData="fn" :msgData="msg"></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import {
  recycleList,
  recycleDel,
  recycleReturn,
} from "@/api/acc/recordVoucher";
import { GetList } from "@/api/acc/prov";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
export default {
  components: {
    BillVoucherTemplatea,
  },
  data() {
    return {
      startDate: "2022年1期",
      endDate: "2022年2期",
      value1: "",
      wordList: "",
      aa: false,
      msg: "",
      value2: "",
      tableData: [],
      multipleSelection: [],
      voucherList: [],
      toggle: true,
      toggle1: false,
      loading: true,
      moreVisible: false,
      idList: [],
      subjectCodeList: [],
      searchData: {
        endChapter: null,
        proveId: null,
        proveNo: null,
        startChapter: null,
        subjectCode: null,
        summary: null,
        startDel: null,
        endDel: null,
      },
    };
  },
  created() {
    this.searchData.startChapter =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.searchData.endChapter =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.getRecycleList();
    GetList(1, 10).then((res) => (this.wordList = res.data.data.object));
  },
  computed: {
    startEndList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
  },
  methods: {
    getRecycleList() {
      recycleList(this.searchData).then((res) => {
        let list = res.data.data.map((item) => {
          item.updateTime = item.updateTime.substring(0, 10);
          return item;
        });
        this.tableData = list;
      });

      this.loading = false;
    },
    onSubmit() {
      recycleList(this.searchData).then((res) => {
        let list = res.data.data.map((item) => {
          item.updateTime = item.updateTime.substring(0, 10);
          return item;
        });
        this.tableData = list;
      });
      this.moreVisible = false;
    },
    cancelHandle() {
      this.searchData = {
        endChapter: null,
        proveId: null,
        proveNo: null,
        startChapter: null,
        subjectCode: null,
        summary: null,
        startDel: null,
        endDel: null,
      };
    },
    updateList() {
      this.getRecycleList();
    },
    changeHandle() {
      console.log(this.startDate);
      console.log(this.endDate);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.idList = [];
      let list = val.map((item) => item.id);
      this.idList = list;
    },
    recycleDel() {
      if (this.idList.length == 0)
        return this.$message.warning("请选择要删除的凭证");
      this.$confirm("是否删除选中的凭证？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await recycleDel(this.idList);
          if (res.data.retCode === 500)
            return this.$message.error(res.data.message);
          this.$message.success("删除成功");
          this.getRecycleList();
        })
        .catch(() => {});
    },
    recycleReturn() {
      if (this.idList.length == 0)
        return this.$message.warning("请选择要恢复的凭证");
      this.$confirm("是否恢复选中的凭证？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await recycleReturn(this.idList);
          if (res.data.retCode === 500)
            return this.$message.error(res.data.message);
          this.$message.success("恢复成功");
          this.getRecycleList();
        })
        .catch(() => {});
    },
    returnHandle(row) {
      let data = [];
      data.push(row.id);
      this.$confirm("是否恢复此的凭证？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await recycleReturn(data);
          if (res.data.retCode === 500)
            return this.$message.error(res.data.message);
          this.$message.success("恢复成功");
          this.getRecycleList();
        })
        .catch(() => {});
    },
    deleteHandle(row) {
      let data = [];
      data.push(row.id);
      this.$confirm("是否删除此的凭证？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await recycleDel(data);
          if (res.data.retCode === 500)
            return this.$message.error(res.data.message);
          this.$message.success("删除成功");
          this.getRecycleList();
        })
        .catch(() => {});
    },
    subjectSelect() {
      this.aa = true;
    },
    fn(bool, data, c) {
      this.aa = bool;
      this.msg = 0;
      let str = "";
      if (data) {
        this.subjectCodeList.push(data.subjectCode);
        str = this.subjectCodeList.join(",");
        this.searchData.subjectCode = str;
      }
    },
    sortProveNo(obj1, obj2) {
      let reg = /([^-]+)$/;
      let p1 = obj1.proveNo.match(reg)[1];
      let p2 = obj2.proveNo.match(reg)[1];
      return p1 - p2;
    },
  },
};
</script>

<style lang="scss" scoped>
.dataTable {
  width: 100%;
  height: calc(100% - 56px);
  overflow: auto;
}
.operatext {
  color: #999;
  cursor: pointer;
}
.table-cell {
  padding: 0 5px;
  margin: 0 -5px -1px;
  border-bottom: 1px solid #ddd;
  height: 34px;
  line-height: 34px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .el-table .cell,
.el-table th div {
  padding-left: 0;
  padding-right: 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .el-table td,
.el-table th {
  padding: 0;
}

/deep/ .el-table--medium th {
  padding: 0;
  font-size: 12px;
}
.moreBox {
  top: 36px;
}
/deep/ .el-date-editor.el-input {
  width: 160px;
}
</style>