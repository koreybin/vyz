<template>
  <el-dialog
    title="复制凭证"
    :visible.sync="dialogVisible"
    width="25%"
    :before-close="handleClose"
  >
    <p>复制[复制从期间]整月所有凭证至[复制至期间]，请确认对应会计期间</p>

    <br />
    <el-row>
      <el-col :span="18" :offset="4"
        ><div style="margin: 10px 0">
          复制从：
          <el-date-picker
            v-model="oldDate"
            type="month"
            style="width: 200px"
            placeholder="选择月"
            value-format="yyyy-MM"
          >
          </el-date-picker></div
      ></el-col>
      <el-col :span="18" :offset="4"
        ><div>
          复制至：
          <el-date-picker
            v-model="date"
            type="month"
            style="width: 200px"
            placeholder="选择月"
            value-format="yyyy-MM"
          >
          </el-date-picker></div
      ></el-col>
    </el-row>

    <br />
    <p>提示：期末调汇、计提折旧、结转损益凭证请通过结账自动生成！</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { fMonthReplication } from "@/api/acc/recordVoucher";
export default {
  data() {
    return {
      dialogVisible: true,
      date: "",
      oldDate: "",
    };
  },
  methods: {
    handleClose() {
      this.$emit("copyClick", false);
    },
    cancel() {
      this.$emit("copyClick", false);
    },
    submit() {
      fMonthReplication(this.date, this.oldDate).then((res) => {
        if (res.data.retCode === 500)
          return this.$message.error(res.data.message);
        this.$message.success("复制成功");
        this.$emit("copySuccess", false, true);
      });
    },
  },
};
</script>

<style lang='scss' scoped>
p {
  text-align: center;
}
</style>