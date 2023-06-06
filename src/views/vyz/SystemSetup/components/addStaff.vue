<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="50%"
      @close="handleClose"
    >
      <el-form ref="dataForm" :rules="rules" :model="form" height="550px">
        <el-row>
          <el-col :span="20">
            <div
              class="form"
              @scroll.passive="scrollDiv($event)"
              ref="allScroll"
            >
              <div class="con1" id="con1">
                <el-row>
                  <el-col :span="3" style="font-weight: 700">基本信息</el-col>
                  <el-col :span="21"> </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">姓名</el-col>
                  <el-col :span="9">
                    <el-form-item prop="userName">
                      <el-input
                        v-model="form.userName"
                        class="classinputx"
                        placeholder="姓名"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">登录账号(手机号)</el-col>
                  <el-col :span="9">
                    <el-form-item prop="phone">
                      <el-input
                        v-model="form.phone"
                        class="classinputx"
                        placeholder="登录账号"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">性别</el-col>
                  <el-col :span="9"
                    ><el-radio-group v-model="form.gender" class="classmarg">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="3">出生日期</el-col>
                  <el-col :span="9"
                    ><el-date-picker
                      class="classmarg"
                      type="date"
                      placeholder="选择日期"
                      disabled
                    >
                    </el-date-picker
                  ></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">Email</el-col>
                  <el-col :span="9">
                    <el-input
                      class="classinputx"
                      disabled
                      placeholder="email"
                    />
                  </el-col>
                  <el-col :span="3">联系电话</el-col>
                  <el-col :span="9"
                    ><el-input
                      v-text="form.phone"
                      class="classinputx"
                      placeholder="联系电话"
                      disabled
                    ></el-input
                  ></el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">QQ</el-col>
                  <el-col :span="9">
                    <el-input
                      v-model="form.qq"
                      class="classinputx"
                      placeholder="QQ"
                      disabled
                    />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">联系地址</el-col>
                  <el-col :span="21">
                    <el-input
                      v-model="form.address"
                      class="classinputx"
                      placeholder="联系地址"
                      disabled
                    />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">部门</el-col>
                  <el-col :span="9">
                    <el-select
                      v-model="form.organization"
                      prop="organizationId"
                      class="classmarg"
                      @change="changeSelect($event)"
                    >
                      <el-option
                        v-for="item in departList"
                        :key="item.id"
                        :label="item.label"
                        :value="`${item.id},${item.label}`"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-checkbox-group disabled>
                      <el-checkbox :label="1" disabled>管理员</el-checkbox>
                      <el-checkbox :label="2" disabled>部门经理</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
              </div>

              <div class="con2" id="con2">
                <el-row>
                  <el-col :span="3" style="font-weight: 700">岗位信息</el-col>
                  <el-col :span="21"> </el-col>
                </el-row>
                <el-row v-for="item in postList.children" :key="item.id">
                  <el-col :span="3">{{ item.postName }}</el-col>
                  <el-col :span="21" v-if="item.postName">
                    <el-checkbox-group v-model="form.postId">
                      <el-checkbox
                        v-for="cItem in item.children"
                        :key="cItem.id"
                        :label="cItem.id"
                        >{{ cItem.postName }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </el-col>
                  <el-col :span="21" v-else :offset="3">
                    <el-checkbox-group v-model="form.postId">
                      <el-checkbox
                        v-for="cItem in item.children"
                        :key="cItem.id"
                        :label="cItem.id"
                        >{{ cItem.postName }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>

          <el-col :span="4">
            <div style="height: 120px" class="step">
              <el-steps direction="vertical" :active="activ">
                <el-step title="基本信息" @click.native="miaodin(1)"></el-step>
                <el-step title="岗位信息" @click.native="miaodin(2)"></el-step>
              </el-steps>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t("table.cancel") }}</el-button>
        <!-- <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
          >{{ $t("table.confirm") }}
        </el-button>
        <el-button v-else type="primary" @click="updateData">{{
          $t("table.confirm")
        }}</el-button> -->
        <el-button type="primary" @click="createData">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addEmpUser, updateUser } from "@/api/user";
export default {
  props: ["title", "addVisable", "postList", "departList", "formData"],
  watch: {
    $route(to, from) {
      this.$refs.allScroll.scrollTop = 0;
    },
  },
  data() {
    return {
      moreVisable: true,
      dialogStatus: null,
      dialogFormVisible: false,
      optionsskfs: null,
      valueskfs: null,
      activ: 1,
      rules: {
        userName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "登录账号不能为空", trigger: "blur" },
          { required: true, message: "长度必须11位", len: 11 },
        ],
        organizationId: [
          { required: true, message: "部门不能为空", trigger: "blur" },
        ],
      },
      form: {
        userName: "",
        phone: "",
        gender: "",
        organizationId: "",
        organization: "",
        postId: [],
        id: "",
      },
    };
  },
  watch: {
    addVisable(curVal, oldVal) {
      this.dialogFormVisible = curVal;
    },
    formData(curVal) {
      this.form = curVal;
      this.form.postId &&
        (this.form.postId = this.form.postId
          .split(",")
          .map((item) => Number(item)));
      console.log();
    },
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit("toggleViable", false);
    },
    handleChange(value) {},
    createData() {
      const form = {
        userName: this.form.userName,
        phone: this.form.phone,
        gender: this.form.gender,
        organizationId: this.form.organizationId,
        postId: this.form.postId.join(","),
        id: this.form.id,
      };
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.title === "新增职员") {
            addEmpUser(form).then((res) => {
              if (res.data.retCode == 200) {
                this.$emit("updateList");
                this.$emit("toggleViable", false, true);
                this.form.postId = [];
                this.$notify({
                  title: "成功",
                  message: "创建成功",
                  type: "success",
                  duration: 2000,
                });
                this.$refs.dataForm.resetFields();
              } else {
                this.$notify({
                  title: "失败",
                  message: res.data.message,
                  type: "error",
                  duration: 2000,
                });
              }
            });
          } else {
            updateUser(form).then((res) => {
              if (res.data.retCode == 200) {
                this.$emit("updateList");
                this.$emit("toggleViable", false, true);
                this.form.postId = [];
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                  duration: 2000,
                });
              } else {
                this.$notify({
                  title: "失败",
                  message: res.data.message,
                  type: "error",
                  duration: 2000,
                });
              }
            });
          }
        }
      });
    },
    miaodin(index) {
      this.activ = index;
      document.querySelector("#con" + index).scrollIntoView({
        behavior: "auto", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: "start", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        inline: "start", // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
    },
    scrollDiv(e) {
      if (e.target.scrollTop < 200) {
        this.activ = 1;
      }
      if (e.target.scrollTop > 226) {
        this.activ = 2;
      }
    },
    changeSelect(e) {
      let [id, val] = e.split(",");
      this.form.organizationId = id;
      this.form.organization = val;
    },
  },
};
</script>

<style lang='scss' scoped>
.form {
  height: 400px;
  overflow-y: scroll;
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
.cur {
  color: #3f87ca;
  cursor: pointer;
}
.el-col-3 {
  text-align: center;
}
.con1,
.con2 {
  background: #f8f8f8;
  padding: 5px;
}
</style>