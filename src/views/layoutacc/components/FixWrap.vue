<template>
  <div>
    <div class="fix-wrap-small" @click="showFixWrap" v-show="!isMiddleShow">
      <div class="fix-item-small"></div>
    </div>
    <div class="fix-wrap" v-show="isMiddleShow">
      <div class="fix-item fix-item-border-bottom" @click="showCard">
        产品手册
      </div>
      <div class="fix-item fix-item-border-top" @click="showFixWrap">
        <div><i class="el-icon-arrow-right"></i></div>
        <div>收起</div>
      </div>
    </div>
    <div class="help-card" v-show="isCardShow">
      <div class="wu-a">
        <div>帮助</div>
        <div class="wu-aa" @click="showCard">X</div>
      </div>
      <div class="box-top">
        <i class="el-icon-chat-line-round"></i> <span>常见问题</span>
      </div>
      <div class="footer-top">
        <a
          :href="item.route"
          v-for="item in operatingList"
          :key="item.route"
          target="_blank"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMiddleShow: false,
      isCardShow: false,
      operatingList: [
        { route: "/#/operatingmanual/enter", name: "录凭证功能使用介绍" },
        {
          route: "/#/operatingmanual/setting",
          name: "在线会计基础设置功能介绍",
        },
        {
          route: "/#/operatingmanual/summary",
          name: "凭证汇总表功能介绍及如何使用",
        },
        {
          route: "/#/operatingmanual/subjectbalance",
          name: "科目余额表功能介绍及如何使用",
        },
        {
          route: "/#/operatingmanual/detailamount",
          name: "数量金额明细账功能介绍及如何使用",
        },
      ],
    };
  },
  methods: {
    showFixWrap() {
      this.isMiddleShow = !this.isMiddleShow;
    },
    showCard() {
      this.isCardShow = !this.isCardShow;
    },
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        console.log(val);
        if (val.path !== oldVal.path) {
          this.isCardShow = false;
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>

<style lang='scss' scoped>
.fix-wrap-small {
  position: absolute;
  right: 0;
  bottom: 120px;
  width: 18px;
  height: 64px;
  color: #ffffff;
  text-align: center;
  border: 1px solid #00a3f9;
  box-shadow: 0px 0px 6px 0px rgba(0, 167, 255, 0.6);
  z-index: 999;
  border-radius: 6px 0 0 6px;
  background: #1fadf6;
  cursor: pointer;
}
.fix-item-small {
  width: 12px;
  height: 31px;
  background: url(../../../assets/images/fix-item-small.png) center no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fix-wrap {
  position: absolute;
  right: 10px;
  top: 720px;
  font-size: 12px;
  bottom: 102px;
  width: 48px;
  color: #ffffff;
  text-align: center;
  z-index: 999;
  height: 114px;
  border: 1px solid #00a3f9;
  box-shadow: 0px 0px 6px 0px rgba(0, 167, 255, 0.6);
  padding: 10px;
  background: #1fadf6;
  box-sizing: border-box;
  border-radius: 100px;
  line-height: 16px;
}
.fix-item-border-bottom {
  border-bottom: 1px solid #0095e4;
}
.fix-item-border-top {
  border-top: 1px solid #21d3f6;
}
.fix-item {
  cursor: pointer;
  padding: 6px 0;
}
.help-card {
  width: 350px;
  height: 480px;
  position: absolute;
  border: 1px solid #ccc;
  right: 10px;
  bottom: 42px;
  z-index: 1000;
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
.box-top {
  padding: 10px 0 10px 10px;
  border-bottom: 1px #ccc solid;
  color: rgba(0, 0, 0, 0.719);
}
.footer-top {
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 10px;
}
.footer-top a {
  margin-top: 15px;
  color: rgba(0, 0, 0, 0.719);
}

.footer-top a:hover {
  color: #409eff;
}
</style>