<template>
  <div class="app-container calendar-list-container">
    <el-row class="box" :span="20">
      <div class="filter-item-right">
        <div>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="time.startData"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>

          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="time.endData"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <el-button @click="timee">点击筛选</el-button>
          <!-- <el-input
            class="ipt"
            v-model="input"
            placeholder="请输入内容"
          ></el-input> -->
        </div>
        <div>
          <el-button type="primary" plain>打印</el-button>
          <el-button type="info" plain>导出</el-button>
        </div>
      </div>
    </el-row>

    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column align="center" :label="$t('oplogobj.beOperated')">
        <template slot-scope="scope">
          <span>{{ scope.row.beOperated }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('oplogobj.host')">
        <template slot-scope="scope">
          <span>{{ scope.row.host }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('oplogobj.logName')">
        <template slot-scope="scope">
          <span>{{ scope.row.logName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" :label="$t('oplogobj.params')">
        <template slot-scope="scope">
          <span>{{ scope.row.params }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" :label="$t('oplogobj.phone')">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" :label="$t('oplogobj.time')">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" :label="$t('oplogobj.userName')">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import waves from "@/components/waves"; // 水波纹指令
import { GetList } from "@/api/acc/operationlog";

export default {
  name: "provedata",
  directives: {
    waves,
  },
  data() {
    return {
      time: {
        startData: '',
        endData: '',
      },

      tableKey: 0,
      list: null,
      listLoading: true,
      multipleSelection: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,

      input: "",

      temp: {
        id: "",
        currencyCode: "",
        currencyName: "",
        exchangeRate: null,
        isStandardMoney: 0,
      },
      spans: {
        currencyCode: 8,
        currencyName: 8,
        exchangeRate: 8,
      },
      updown: { proveId: null, value: null },
    };
  },
      created() {
     let times = new Date();
      let year = times.getFullYear();
      let yue = times.getMonth() + 1;
      let day = times.getDate();
      let ayy =  times.getDate()+1;
      let newYue = yue < 10 ? "0" + yue : yue;
      let newDay = day < 10 ? "0" + day : day;
      let newAyy = day < 10 ? "0" + ayy :ayy;
      this.time.startData = `${year}-${newYue}-${newDay}`
      this.time.endData = `${year}-${newYue}-${newAyy}`
    this.getListdata();
  },  

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getListdata();
    },
    handleCurrentChange(val) {
            this.getListdata();
      this.listQuery.pageNum = val;

    },
    getListdata() {
      
     
      GetList(
        this.time.endData,
        this.listQuery.pageNum,
        this.listQuery.pageSize,
        this.time.startData,
        this.input
      ).then((response) => {
        this.list = response.data.data.object;
        this.total = response.data.data.totalCount;
        this.listLoading = false;
      });
       this.listLoading = true;
     
    },
    timee() {
      this.getListdata();
      console.log(this.time.startData); //开始时间
      console.log(this.time.endData); //结束时间
    },
  
  },

};
</script>
<style scoped>
.ipt {
  width: 300px;
}
.box {
  margin-bottom: 20px;
}

.filter-item-right {
  display: flex;
  justify-content: space-between;
}
</style>