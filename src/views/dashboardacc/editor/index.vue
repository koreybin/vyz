<template>
  <div class="all-body">
    <!-- <div
      id="box"
      v-show="bb"
      @click="aa"
      :style="{ backgroundImage: `url(${notice})` }"
    ></div> -->
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple diwu">上午好</div>
      </el-col>
      <el-col :span="4">
        <div class="diwu">
          <el-button class="btn" type="primary">数据测算</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple diyi">
          <div class="property">
            <div>111</div>
            <div>资产负债表</div>
          </div>
          <div class="property-a">
            <div>111</div>
            <div>资产总计</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple diyi">
          <div class="property">
            <div>111</div>
            <div>利润表</div>
          </div>
          <div class="property-a">
            <div>111</div>
            <div>净利润</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple diyi">
          <div class="property">
            <div>111</div>
            <div>现金流量表</div>
          </div>
          <div class="property-a">
            <div>111</div>
            <div>期末现金余额</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple diyi">
          <div class="property">
            <div>111</div>
            <div>纳税一览表</div>
          </div>
          <div class="property-a">
            <div>111</div>
            <div>纳税额</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="disan">
          <div class="time">
            <span class="spana">最近凭证</span>
            <span>3-1-2</span>
            <span>21-2-3</span>
          </div>
          <div class="time item">
            <span class="time-b">记16</span>
            <span class="time-b">记14</span>
          </div>
          <div class="time item">
            <span>销售</span>
            <span>aabb</span>
          </div>
          <div class="time item">
            <span>123213</span>
            <span>123213</span>
          </div>
          <div class="item-a">
            <el-button class="btn" type="primary">录凭证</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="dier">
          <div class="dier-a">
            <div class="dier-aa">年收入测算</div>
            <span> <i class="el-icon-s-tools"></i></span>
          </div>
          <div class="date">
            <div class="date-a">日期</div>
          </div>
          <div class="footer">
            <div class="footer-a">
              <div class="footer-aa"></div>
              <div>连续12个月收入</div>
            </div>
            <div>1</div>
          </div>
          <div class="footer">
            <div class="footer-a">
              <div class="footer-aa"></div>
              <div>还可新增</div>
            </div>
            <div class="footer-a">1</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple dier">
          <div class="dier-a">
            <div class="dier-aa">月收入测算</div>
          </div>
          <div class="date">
            <div class="date-a">日期</div>
          </div>
          <div class="footer">
            <div class="footer-a">
              <div class="footer-aa"></div>
              <div>连续12个月收入</div>
            </div>
            <div>1</div>
          </div>
          <div class="footer">
            <div class="footer-a">
              <div class="footer-aa"></div>
              <div>还可新增</div>
            </div>
            <div class="footer-a">1</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple dier">
          <div class="dier-a">
            <div class="dier-aa">所得税测算</div>
          </div>
          <div class="date">
            <div class="date-a">日期</div>
          </div>
          <div class="footer">
            <div class="footer-a">
              <div class="footer-aa"></div>
              <div>连续12个月收入</div>
            </div>
            <div>1</div>
          </div>
          <div class="footer">
            <div class="footer-a">
              <div class="footer-aa"></div>
              <div>还可新增</div>
            </div>
            <div class="footer-a">1</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple dier">
          <div class="dier-a">
            <div class="dier-aa">本期财务指标</div>
            <span> <i class="el-icon-refresh-left"></i></span>
            <span> <i class="el-icon-s-tools"></i></span>
          </div>
          <div class="box">
            <div>现金</div>
            <div>124321</div>
          </div>
          <div class="box">
            <div>银行存款</div>
            <div>124321</div>
          </div>
          <div class="box">
            <div>存货</div>
            <div>124321</div>
          </div>
          <div class="box">
            <div>应收账款</div>
            <div>124321</div>
          </div>
          <div class="box">
            <div>应付账款</div>
            <div>124321</div>
          </div>
          <div class="box">
            <div>主营业务收入</div>
            <div>124321</div>
          </div>
          <div class="box">
            <div>销售费用</div>
            <div>124321</div>
          </div>
          <div class="box">
            <div>管理费用</div>
            <div>124321</div>
          </div>

          <!-- <div class="oo" @click="go" v-show="goo">《</div>
          <div class="oo" @click="come" v-show="com">》</div> -->
        </div>
        <div v-show="prepare" class="wu">
          <div class="wu-a">
            <div>帮助</div>
            <div class="wu-aa" @click="to">X</div>
          </div>
          <div class="box-top">
            <i class="el-icon-chat-line-round"></i> <span>常见问题</span>
          </div>
          <div class="footer-top">
            <a href="">123</a>
            <a href="">213</a>
            <a href="">213</a>
            <a href="">213</a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
import { add } from "../scrice.js";

export default {
  name: "dashboard-editor",
  components: { PanThumb },
  data() {
    return {
      notice: require("@/assets/img/lala.jpeg"),
      goo: false,
      com: true,
      bb: true,
      prepare: false,
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {},
  methods: {
    aa() {
      this.prepare = true;
      add();
    },
    come() {
      this.com = false;
      this.goo = true;
      this.bb = false;
    },
    go() {
      this.goo = false;
      this.com = true;
      this.bb = true;
      add();
    },
    to() {
      this.prepare = false;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#box {
  width: 80px;
  height: 80px;
  background-size: 100%;
  border-radius: 80px;
  position: fixed;
  right: 0;
  bottom: 600px;
  cursor: pointer;
  z-index: 99999;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.diyi {
  height: 120px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 6px #ccc;
  cursor: pointer;
}

.dier {
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 480px;
  box-shadow: 0px 0px 6px #ccc;
}

.disan {
  background: #fff;
  color: rgb(155, 151, 151);
  height: 120px;
  box-shadow: 0px 0px 6px #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.btn {
  width: 130px;
  height: 40px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0px 5px 0px rgb(2, 148, 233);
  left: 0 !important;
}

.diwu > .btn {
  margin-left: 100px;
}

.all-body {
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background-color: #e1e8f779;
}

.property {
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  justify-content: center;
  background-color: #fdbaa7;
  text-align: center;

  color: #d46363;
}

.diyi .property:hover {
  background: #f1bbbbcb;
}

.property-a {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  background-color: #fff;
  justify-content: center;
  text-align: center;
  color: #969696;
  text-align: center;
}

.diyi .property-a:hover {
  background: #f8f8f8;
}

.time {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.time .spana {
  color: rgb(70, 68, 68);
  margin-bottom: 10px;
}

.time > span {
  margin-bottom: 5px;
}

.item {
  margin-top: 25px;
}

.item-a {
  line-height: 120px;
}

.time-b {
  cursor: pointer;
  color: #4d6dffef;
}

.time-b:hover {
  text-decoration: underline;
  color: #409eff;
}

.dier-a {
  width: 100%;
  height: 50px;
  border-bottom: 1px #ccc solid;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  padding: 0 20px;
}

.dier-a .dier-aa {
  font-size: 22px;
  color: rgb(119, 117, 117);
  text-shadow: 2px 2px 2px #ccc;
}

.dier-a span {
  cursor: pointer;
}

.date {
  width: 100%;
  height: 350px;
}

.date-a {
  width: 100%;
  height: 50px;
  border-bottom: 1px #ccc solid;
  text-align: center;
  line-height: 50px;
}

.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border-top: 1px solid #ccc;
}

.footer-a {
  display: flex;
  line-height: 40px;
}

.footer-aa {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #409eff;
  margin: 10px 20px;
}

.footer-a {
  line-height: 40px;
}

.box {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  line-height: 45px;
  padding: 0 10px;
  color: #969696;
}

.wu {
  width: 350px;
  height: 480px;
  position: absolute;
  border: 1px solid #ccc;
  top: 0;
  right: 0;
  background: #fff;
}

.wu-a {
  display: flex;
  justify-content: space-between;
  background: #409eff;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  padding: 0 20px;
  color: #fff;
}

.wu-a .wu-aa {
  cursor: pointer;
}

.oo {
  cursor: pointer;
  position: absolute;
  right: 0px;
  bottom: 20px;
}

.footer-top {
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 10px;
}

.box-top {
  padding: 10px 0 10px 10px;
  border-bottom: 1px #ccc solid;
  color: rgba(0, 0, 0, 0.719);
}

.footer-top a {
  margin-top: 15px;
  color: rgba(0, 0, 0, 0.719);
}

.footer-top a:hover {
  color: #409eff;
}
</style>
