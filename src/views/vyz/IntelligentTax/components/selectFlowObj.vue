<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
        size="mini"
        class="tree"
        @row-dblclick="rowHandle"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          align="center"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { modifyMasterTableItem } from "@/api/acc/BillVoucherTemplate";
import { poise } from "@/api/acc/accountcashflowitem";
export default {
  props: [
    "title",
    "selectDialogVisible",
    "selectData",
    "updateData",
    "systemType",
  ],
  watch: {
    selectDialogVisible(val) {
      this.dialogVisible = val;
    },
    selectData(val) {
      this.tableData = val;
    },
    updateData(val) {
      this.modifyData = val;
    },
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      modifyData: null,
      columns: [
        { label: "项目", prop: "itemValue", width: 380 },
        { label: "行次", prop: "line", width: 80 },
        { label: "流向", prop: "isImport", width: 80 },
      ],
    };
  },

  methods: {
    handleClose() {
      this.$emit("selectDialogShow", false);
    },
    rowHandle(row) {
      if (this.modifyData.type === 0) {
        this.modifyData.cashInflow = row.id;
      }
      if (this.modifyData.type === 1) {
        this.modifyData.cashOutflow = row.id;
      }
      if (this.modifyData.type === 2) {
        this.modifyData.lender = row.id;
      }
      if (this.modifyData.type === 3) {
        this.modifyData.debit = row.id;
      }
      if (this.systemTypes == "outSystem") {
        modifyMasterTableItem(this.modifyData).then((res) => {
          if (res.data.retCode === 500)
            return this.$message.error(res.data.message);
          this.$message.success("修改成功");
          this.$emit("selectDialogShow", false, true);
        });
      } else {
        poise(this.modifyData).then((res) => {
          if (res.data.retCode === 500)
            return this.$message.error(res.data.message);
          this.$message.success("修改成功");
          this.$emit("selectDialogShow", false, true);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tree {
  overflow-y: auto;
  /deep/ .el-table__body-wrapper {
    height: 440px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }
    &::-webkit-scrollbar-track {
      border-radius: 0.625rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 0.625rem;
      background-color: #f5f5f5;
    }
  }
}
</style>