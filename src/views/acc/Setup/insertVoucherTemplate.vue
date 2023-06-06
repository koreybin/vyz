<template>
  <div>
    <el-dialog
      title="新增模板"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="模板类别：">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in tempData"
              :key="item.id"
              :label="item.voucherType"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称：">
          <el-input v-model="form.name" :rows="10"></el-input>
        </el-form-item>
        <el-form-item label="保存金额：">
          <el-checkbox v-model="form.money"></el-checkbox>
        </el-form-item>
        <el-form-item label="保存核算项目：">
          <el-checkbox v-model="form.project"></el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { GetList, deletecvouchetemp } from "@/api/acc/vouchertemp";
import { GetTempList, addTemplate } from "@/api/acc/vouchertemp";
export default {
  props: ["tempList"],
  watch: {
    tempList(val) {
      console.log(val);
    },
  },
  data() {
    return {
      dialogVisible: true,
      form: {
        type: "",
        name: "",
        money: "",
        project: "",
      },
      tempData: "",
    };
  },
  created() {
    this.GetTempList();
  },
  methods: {
    GetTempList() {
      let obj = {};
      GetTempList().then((res) => {
        let arr = res.data.data.reduce((cur, next) => {
          obj[next.typeId] ? "" : (obj[next.typeId] = true && cur.push(next));
          return cur;
        }, []);
        this.tempData = arr;
      });
    },
    onSubmit() {
      this.form.money = this.form.money ? 1 : 0;
      this.form.project = this.form.project ? 1 : 0;
      this.tempList.proveId = null;
      this.tempList.id = null;
      this.tempList.proveNo = null;
      let { name, money, project, type } = this.form;
      addTemplate(name, money, project, type, this.tempList).then((res) => {
        if (res.data.retCode === 500) return this.$message.error("数据有误");
        return this.$message.success("新增成功");
      });

      this.$emit("insertTemp", false);
    },
    handleClose() {
      this.$emit("insertTemp", false);
      this.dialogVisible = false;
    },
    cancel() {
      this.$emit("insertTemp", false);
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
</style>