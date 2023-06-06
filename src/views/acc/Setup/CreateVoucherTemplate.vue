<template>
  <div>
    <el-dialog
      title="凭证模板库"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleClose"
    >
      <el-row>
        <el-col>
          <el-table
            :data="tempData"
            style="width: 100%; font-size: 14px"
            @row-dblclick="rowHandle"
            border
          >
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <div class="charge-table-icon">
                  <i
                    class="el-icon-close"
                    style="color: #4a90e2"
                    @click="delMain(scope.row.id)"
                  ></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="voucherType" label="类别"> </el-table-column>
            <el-table-column prop="voucherName" label="名称"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { GetTempList, deletecvouchetemp, getOne } from "@/api/acc/vouchertemp";
export default {
  data() {
    return {
      flag: 1,
      dialogVisible: true,
      tempData: [],
      main: "",
      data: "",
      mainId: "",
    };
  },
  created() {
    this.GetList();
  },
  methods: {
    GetList() {
      GetTempList().then((res) => {
        this.tempData = res.data.data;
      });
    },
    handleClose() {
      this.$emit("getTemp", false);
      this.dialogVisible = false;
    },
    async rowHandle(row, cloumn, event) {
      // const res = await getOne(row.id).then();
      const res = await getOne(row.id);
      console.log(res);
      this.data = res.data.data;
      this.$emit("getTemp", false, this.data);
    },
    async delMain(id) {
      const res = await deletecvouchetemp(id);
      if (res.data.retCode !== 200)
        return this.$message.error(res.data.message);
      this.$message.success("删除成功");
      this.GetList();
    },
  },
};
</script>

<style>
.charge-table-icon {
  display: inline-block;
  cursor: pointer;
  padding: 0 10px;
}
</style>