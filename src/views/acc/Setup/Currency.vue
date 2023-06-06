<template>
  <div class="app-container calendar-list-container">
    <el-row :span="20">
      <div class="filter-item-right">
        <el-button
          style="margin-bottom: 10px"
          size="mini"
          @click="handleCreate"
          type="primary"
          icon="el-icon-edit"
        >
          {{ $t("table.add") }}
        </el-button>
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

      <el-table-column
        align="center"
        :label="$t('setcurrencyobj.currencyCode')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.currencyCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('setcurrencyobj.currencyName')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.currencyName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('setcurrencyobj.exchangeRate')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.exchangeRate }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="180px"
        :label="$t('setcurrencyobj.isStandardMoney')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isStandardMoney == "1" ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleUpdate(scope.row)">{{
            $t("ProveDataVoobj.updatecz")
          }}</el-button>
          <el-button size="mini" @click="handleDelete(scope.row)"
            >{{ $t("ProveDataVoobj.deletecz") }}
          </el-button>
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

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="币别">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-width="110px"
          >
            <el-row>
              <el-col :span="spans.currencyCode">
                <el-form-item
                  :label="$t('setcurrencyobj.currencyCode')"
                  prop="currencyCode"
                >
                  <el-input
                    @blur="bjudgeNum($event.target.value)"
                    v-model="temp.currencyCode"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.currencyName">
                <el-form-item
                  :label="$t('setcurrencyobj.currencyName')"
                  prop="currencyName"
                >
                  <el-input v-model="temp.currencyName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.exchangeRate">
                <el-form-item
                  :label="$t('setcurrencyobj.exchangeRate')"
                  prop="exchangeRate"
                >
                  <el-input
                    @blur="judgeNum($event.target.value)"
                    v-model="temp.exchangeRate"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{
          $t("table.cancel")
        }}</el-button>
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
          >{{ $t("table.confirm") }}
        </el-button>
        <el-button v-else type="primary" @click="updateData">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import waves from "@/components/waves"; // 水波纹指令
import {
  GetList,
  addcurrency,
  updateCurrency,
  deletecurrency,
} from "@/api/acc/currency";

export default {
  name: "provedata",
  directives: {
    waves,
  },
  data() {
    return {
      valid: {
        isnumber: false,
        isstring: false,
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

      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogFormVisible: false,
      dialogStatus: "",

      rules: {
        currencyCode: [
          { required: true, message: "编码不能为空", trigger: "blur" },
        ],
        currencyName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
        ],
        exchangeRate: [
          { required: true, message: "汇率不能为空", trigger: "blur" },
        ],
      },
      temp: {
        id: "",
        currencyCode: "",
        currencyName: "",
        exchangeRate: null,
        isStandardMoney: 0,
      },
      spans: {
        currencyCode: 16,
        currencyName: 16,
        exchangeRate: 16,
      },
      updown: { proveId: null, value: null },
    };
  },
  created() {
    this.getListdata();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
    },
    getListdata() {
      this.listLoading = true;
      GetList(this.listQuery.pageNum, this.listQuery.pageSize).then(
        (response) => {
          this.list = response.data.data.object;
          this.total = response.data.data.totalCount;
          this.listLoading = false;
        }
      );
    },
    // 正则表达式
    judgeNum(val) {
      let flag = new RegExp("^[0-9]+.?[0-9]+$").test(val);
      console.log(flag, val);
      if (!flag) {
        this.$message({
          type: "warning",
          message: "格式错误,正确格式为数字,不包含空格等",
          duration: 5000,
        });
      }
      {
        this.valid.isnumber = true;
      }
    },
    bjudgeNum(val) {
      let flag = new RegExp("^[A-Z]+$").test(val);
      if (!flag) {
        this.$message({
          type: "warning",
          message: "格式错误,只能是大写英文",
          duration: 5000,
        });
      } else {
        this.valid.isstring = true;
      }
    },
    resetTemp() {
      (this.temp.currencyCode = ""),
        (this.temp.currencyName = ""),
        (this.temp.exchangeRate = null),
        (this.temp.isStandardMoney = 0);
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          addcurrency(this.temp).then(() => {
            this.getListdata();
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj

      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.bjudgeNum(this.temp.currencyCode);
      this.judgeNum(this.temp.exchangeRate);
      this.$refs["dataForm"].validate((valid) => {
        if (valid && this.valid.isnumber && this.valid.isstring) {
          const tempData = Object.assign({}, this.temp);
          updateCurrency(tempData).then(() => {
            this.getListdata();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
          });
        } else {
          this.$message({
            type: "warning",
            message: "输入的格式错误,",
            duration: 5000,
          });
        }
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deletecurrency(row.id).then((ress) => {
          if (ress.data.message == "成功") {
            this.getListdata();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
          } else {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "success",
              duration: 2000,
            });
          }
        });
      });
    },
  },
};
</script>
<style scoped>
</style>