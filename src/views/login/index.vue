<template>
  <div class="login-container" :style="{ backgroundImage: `url(${notice})` }">
    <el-form
      class="login-form"
      :rules="loginRules"
      autoComplete="on"
      :model="loginForm"
      ref="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("login.title") }}</h3>
        <lang-select class="set-language"></lang-select>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="userphone">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="loginForm.userphone"
              name="userphone"
              placeholder="用户账号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              name="password"
              :type="passwordType"
              v-model="loginForm.password"
              autoComplete="on"
              placeholder="password"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon v-show="play" icon-class="eye" />
              <svg-icon v-show="!play" icon-class="eye-open" />
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="captcha">
            <el-row :gutter="18">
              <el-col :span="14">
                <el-input
                  v-model="loginForm.captcha"
                  placeholder="验证码"
                ></el-input>
              </el-col>
              <el-col :span="10" class="login-captcha">
                <img
                  style="width: 175px; height: 50px; display: block"
                  :src="captchaPath"
                  @click="getCaptcha()"
                  alt=""
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-checkbox style="color: #ffe607" v-model="checked"
        >记住密码</el-checkbox
      >
      <el-button
        type="button"
        style="
          width: 100%;
          margin-bottom: 30px;
          background-color: #ff9b28;
          border-color: #ff9b28;
        "
        :loading="loading"
        @click.native.prevent="handleLogin"
        >{{ $t("login.logIn") }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { isvalidUserphone } from "@/utils/validate";
import { getUUID } from "@/utils/index";
import LangSelect from "@/components/LangSelect";
import { loginByUserphone, logout, getUserInfo } from "@/api/login";

import { Message } from "element-ui";
// import Cascader from '@/components/Cascader'

export default {
  components: {
    LangSelect,
    //  , Cascader
  },
  name: "login",
  data() {
    const validUserphone = (rule, value, callback) => {
      if (value === "") {
        callback(this.$message.error("请输入手机号码"));
      } else if (!isvalidUserphone(value)) {
        callback(this.$message.error("请填写正确的手机号码"));
      } else {
        return callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length == 0) {
        callback(this.$message.error("密码不能为空"));
      } else if (value.length < 5) {
        callback(this.$message.error("密码不能小于5位"));
      } else {
        return callback();
      }
    };
    return {
      notice: require("@/assets/home/logobg.png"),
      loginForm: {
        // orgID: null,
        userphone: "13144805941",
        uuid: "",
        password: "",
        captcha: "",
      },
      loginRules: {
        userphone: [
          { required: true, trigger: "blur", validator: validUserphone },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },

      checked: false,
      play: true,
      passwordType: "password",
      loading: false,
      showDialog: false,
      captchaPath: "",
      //,
      //  orgUserTree: [],
      //users: []
    };
  },
  created() {},
  mounted() {
    this.getCaptcha();
    let that = this;
    //判断本地缓存是否有用户账号和密码
    let strPhone = localStorage.getItem("userphone");
    let strPass = localStorage.getItem("password");
    if (strPhone) {
      that.loginForm.userphone = strPhone;
      that.checked = true;
    }
    if (strPass) {
      that.loginForm.password = strPass;
      that.checked = true;
    }
  },
  methods: {
    // loadData() {
    //   this.loading = true
    //   this.$store.dispatch('GetOrgUserTree', 1).then((r) => {
    //     this.loading = false
    //     this.orgUserTree = r.data
    //   }).catch(() => {
    //     this.loading = false
    //   })
    // },
    // 获取验证码
    getCaptcha() {
      this.loginForm.uuid = getUUID();
      this.captchaPath =
        this.$api +
        "/account/accounting/user/captcha.jpg?uuid=" +
        this.loginForm.uuid;
      // this.$http.get('api/account/accounting/user/captcha.jpg?uuid='+this.loginForm.uuid,{
      //   }).then(function(res){
      //     console.log(res)

      //   })
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
        this.play = false;
      } else {
        this.passwordType = "password";
        this.play = true;
      }
    },
    /**
     * 登陆后台数据校验TODO
     */

    handleLogin() {
      console.log(this.checked, "checked");
      if (this.checked) {
        localStorage.setItem("userphone", this.loginForm.userphone);
        localStorage.setItem("password", this.loginForm.password);
      } else {
        localStorage.removeItem("userphone");
        localStorage.removeItem("password");
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.loginForm);
          this.$store
            .dispatch("loginByUserphone", this.loginForm)
            .then((response) => {
              // this.userToken = 'Bearer ' + res.data.data.body.token;
              // // 将用户token保存到vuex中
              // this.changeLogin({ Authorization: this.userToken });

              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
              this.$message.success({
                message: "登陆成功",
                center: true,
              });
            })
            .catch((error) => {
              console.log(error);
              this.$message.error({
                message: "登陆失败",
                center: true,
              });
            });
        } else {
          console.log("error submit!!");
          return;
        }
      });
    },
    handleChange(value) {
      // let users = value.toString()

      console.log(value);
    },
  },
  created() {
    // this.loadData()
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" >
$bg: #2d3a4b;
$light_gray: #fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #4d7bb8;
$dark_gray: #ffe607;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  // background-image: url(' ~@/assets/home/logobg.png');
  background-repeat: no-repeat;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;

    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
