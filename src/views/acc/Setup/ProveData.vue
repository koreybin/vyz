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
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        :label="$t('ProveDataVoobj.id')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sorted }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        :label="$t('ProveDataVoobj.isDefault')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isDefault == "1" ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="220px"
        align="center"
        :label="$t('ProveDataVoobj.prove')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.prove }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        :label="$t('ProveDataVoobj.proveTitle')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.proveTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="450px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleUpdate(scope.row)">{{
            $t("ProveDataVoobj.updatecz")
          }}</el-button>
          <el-button size="mini" @click="handleDelete(scope.row)"
            >{{ $t("ProveDataVoobj.deletecz") }}
          </el-button>
          <el-button size="mini" @click="handleUp(scope.row)"
            >{{ $t("ProveDataVoobj.upcz") }}
          </el-button>
          <el-button size="mini" @click="handleDown(scope.row)"
            >{{ $t("ProveDataVoobj.nextcz") }}
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
        <el-tab-pane label="凭证字">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-width="110px"
          >
            <el-row>
              <el-col :span="spans.prove">
                <el-form-item :label="$t('ProveDataVoobj.prove')" prop="prove">
                  <el-input v-model="temp.prove"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.proveTitle">
                <el-form-item
                  :label="$t('ProveDataVoobj.proveTitle')"
                  prop="proveTitle"
                >
                  <el-input v-model="temp.proveTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.isDefault">
                <el-form-item
                  :label="$t('ProveDataVoobj.isDefault')"
                  prop="isDefault"
                >
                  <el-radio v-model="temp.isDefault" label="1">是</el-radio>
                  <el-radio v-model="temp.isDefault" label="0">否</el-radio>
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
  addprove,
  updateDataprov,
  deleteprov,
  updownprov,
} from "@/api/acc/prov";

export default {
  name: "provedata",
  directives: {
    waves,
  },
  data() {
    return {
      tableKey: 0,
      list: null,
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
        prove: [{ required: true, message: "凭证字不能为空", trigger: "blur" }],
      },
      temp: {
        id: "",
        prove: "",
        proveTitle: "记账凭证",
        isDefault: 1,
      },
      spans: {
        prove: 16,
        proveTitle: 16,
        isDefault: 16,
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
      this.getListdata();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getListdata();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getListdata();
    },
    getListdata() {
      GetList(this.listQuery.pageNum, this.listQuery.pageSize).then(
        (response) => {
          this.list = response.data.data.object;
          this.total = response.data.data.totalCount;
        }
      );
    },
    resetTemp() {
      (this.temp.prove = ""),
        (this.temp.proveTitle = "记账凭证"),
        (this.temp.isDefault = "1");
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
          addprove(this.temp).then(() => {
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
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);

          updateDataprov(tempData).then(() => {
            this.getListdata();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
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
        deleteprov(row.id).then((ress) => {
          if (ress.data.message == "成功") {
            this.getListdata();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "warning",
              duration: 2000,
            });
          } else {
            this.$message.error("删除失败");
          }
        });
      });
    },
    handleUp(row) {
      updownprov(row.id, "up").then(() => {
        this.getListdata();
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    handleDown(row) {
      updownprov(row.id, "down").then(() => {
        this.getListdata();
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000,
        });
      });
    },
  },
};
</script>
<style>
</style>