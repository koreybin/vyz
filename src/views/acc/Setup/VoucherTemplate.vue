<template>
  <div class="app-container calendar-list-container">
    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column align="center" :label="$t('vouchertempobj.id')">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('vouchertempobj.voucherType')">
        <template slot-scope="scope">
          <span>{{ scope.row.voucherType }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('vouchertempobj.voucherName')">
        <template slot-scope="scope">
          <span>{{ scope.row.voucherName }}</span>
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

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="凭证模板">
          <el-form ref="dataForm" :rules="rules" :model="temp">
            <el-row>
              <el-col :span="spans.voucherType">
                <el-form-item
                  :span="spans.voucherType"
                  :label="$t('vouchertempobj.voucherType')"
                  prop="voucherType"
                >
                  <votetype
                    :typename="typename"
                    v-on:childvalue="childvalue"
                  ></votetype>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.voucherName">
                <el-form-item
                  :label="$t('vouchertempobj.voucherName')"
                  prop="voucherName"
                >
                  <el-input v-model="temp.voucherName"></el-input>
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
  GetTempList,
  updatevouchertemp,
  deletecvouchetemp,
} from "@/api/acc/vouchertemp";
import votetype from "./VoucherTemplateType.vue";
export default {
  components: { votetype },
  name: "vouchertmplate",
  directives: {
    waves,
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      multipleSelection: [],
      typename: "",

      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogFormVisible: false,
      dialogStatus: "",

      rules: {
        voucherName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
        ],
      },
      temp: {
        id: 0,
        typeId: 0,
        voucherName: "",
        voucherType: null,
      },

      spans: {
        voucherType: 24,
        voucherName: 24,
      },
      updown: { proveId: null, value: null },
    };
  },
  created() {
    this.getListdata();
  },
  methods: {
    getListdata() {
      this.listLoading = true;
      GetTempList().then((response) => {
        this.list = response.data.data;

        this.listLoading = false;
      });
    },
    resetTemp() {
      (this.temp.id = 0),
        (this.temp.typeId = 0),
        (this.temp.voucherName = ""),
        (this.temp.voucherType = "");
    },

    handleUpdate(row) {
      this.typename = row.voucherType;
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
          updatevouchertemp(tempData).then(() => {
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
      this.$confirm("删除的模板将不能恢复，请确认是否删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deletecvouchetemp(row.id).then((ress) => {
          if (ress.data.message == "成功") {
            this.getListdata();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
          }
        });
      });
    },

    childvalue(mas) {
      this.temp.typeId = mas.value;
      this.temp.voucherType = mas.label;
    },
  },
};
</script>
<style>
</style>