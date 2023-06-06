<template>
  <div>
    <el-dialog
      title="复制凭证"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      <div>请确认复制凭证对应的入账会计期间</div>
      <br />
      <label
        >复制凭证至：
        <el-date-picker
          v-model="date"
          type="month"
          placeholder="选择月"
          value-format="yyyy-MM"
        >
        </el-date-picker>
      </label>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { bulkCopy } from "@/api/acc/recordVoucher";
export default {
  props: ["proves"],
  data() {
    return {
      dialogVisible: true,
      date: "",
    };
  },
  methods: {
    handleClose() {
      console.log(this.date, this.proves);
      this.$emit("copyClick", false, []);
    },
    cancel() {
      this.$emit("copyClick", false, []);
    },
    submit() {
      bulkCopy(this.date, this.proves).then((res) => {
        if (res.data.retCode === 500)
          return this.$message.error(res.data.message);
        this.$message.success("复制成功");
        this.$emit("copySuccess", false, true);
      });
    },
  },
};
</script>

<style>
</style>