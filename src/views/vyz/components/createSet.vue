<template>
  <div>
    <el-dialog
      title="新建账套"
      :visible.sync="createVisable"
      width="30%"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="创建账套" name="first">
          <p class="text-center">创建账套，开始您的在线会计之旅吧！</p>
          <el-form :model="form" label-width="80px">
            <el-row>
              <el-col :span="18">
                <el-form-item label="公司名称">
                  <el-input v-model="form.company" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="本位币">
                  <el-input v-model="form.currency" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="启用期间">
                  <el-col :span="5">
                    <el-input v-model="year"></el-input>
                  </el-col>
                  <el-col :span="1">
                    <span> 年 </span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="qi" type="number"></el-input>
                  </el-col>
                  <el-col :span="1">
                    <span> 期 </span>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-alert
                title="启用期间一经选定创建后不可修改"
                type="warning"
                :closable="false"
                show-icon
              >
              </el-alert>
            </el-row>

            <el-row>
              <el-col :span="18">
                <el-form-item label="会计制度">
                  <el-select v-model="form.system" placeholder="请选择">
                    <el-option
                      v-for="item in systemOptions"
                      :key="item.id"
                      :label="item.dataValue"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="纳税性质">
                  <el-select v-model="form.taxNature" placeholder="请选择">
                    <el-option
                      v-for="item in taxNatureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="导入第三方" name="second">导入第三方</el-tab-pane>
        <el-tab-pane label="复制账套" name="third">复制账套</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click.prevent="createSet">确 定</el-button>
      </span>
      <div class="progress" v-if="loading">
        <div style="width: 70%" class="tra">
          <div style="color: #fff; font-size: 16px; text-align: center">
            请稍等...创建中...
          </div>
          <el-progress
            :percentage="percentage"
            :show-text="false"
          ></el-progress>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { CheckintoChildSystem } from "@/api/acc/clientinfo";
import { getSystemList, createACSet } from "@/api/serverm";
export default {
  data() {
    return {
      percentage: 0,
      systemOptions: [],
      taxNatureOptions: [
        { value: 1, label: "一般纳税人" },
        { value: 2, label: "小规模纳税人" },
      ],
      year: "",
      qi: "",
      dialogVisible: true,
      activeName: "first",
      form: {
        clientId: "",
        company: "",
        currency: "RMB",
        startDate: "",
        system: "",
        taxNature: "",
      },
      loading: false,
    };
  },
  props: ["createVisable", "customer"],
  watch: {
    customer(curVal) {
      this.form.company = curVal.clientName;
      this.form.clientId = curVal.id;
    },
  },

  created() {
    getSystemList().then((res) => (this.systemOptions = res.data.data));
  },
  methods: {
    handleClose() {
      this.$emit("toggleCreateViable", false);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    createSet() {
      this.loading = true;
      this.increase();
      let mm = this.qi >= 10 ? this.qi : "0" + this.qi;
      let date = this.year + "-" + mm;
      this.form.startDate = date;
      setTimeout(async () => {
        const { data: res } = await createACSet(this.form);
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 42000);
    },
    increase() {
      clearInterval(timer);
      const timer = setInterval(() => {
        this.percentage += 2.5;
        if (this.percentage > 100) {
          this.percentage = 100;
          clearInterval(timer);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
}
/deep/ .el-progress-bar__inner {
  transform: all 1s;
}
</style>