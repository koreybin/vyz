<template>
  <div>
    <el-dialog title="添加合同" :visible.sync="visible">
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="客户名称" :label-width="formLabelWidth">
              <el-input
                class="int"
                v-model="form.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="合同编号" :label-width="formLabelWidth">
              <el-input
                class="int"
                type="text"
                v-model="form.serial"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="服务类型" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="代理记账" value="shanghai"></el-option>
                <el-option label="工商注册" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户名称" :label-width="formLabelWidth">
              <el-input
                class="int"
                v-model="form.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item  label="服务期限" :label-width="formLabelWidth">
              <el-input
                class="int"
                type="number"
                v-model="form.time"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="合同日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        name: "",
        region: "",
        serial: "",
        time:'',
      },
      value1: "",
      formLabelWidth: "120px",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods: {
    init() {
      this.visible = true;
    },
  },
};
</script>
<style scoped>
.int {
  width: 215px;
}
</style>