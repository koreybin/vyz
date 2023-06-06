<template>
  <div>
    <div class="fix-wrap-small" @click="showFixWrap" v-show="!isMiddleShow">
      <div class="fix-item-small">
        <i class="el-icon-arrow-left"></i>
      </div>
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
        <a href="/#/operatingmanual/novice" target="_blank"
          >新手指引（一）基础设置功能使用介绍</a
        >
        <a href="/#/operatingmanual/novice" target="_blank"
          >新手指引（二）导入客户功能使用介绍</a
        >
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
  border: 1px solid #980000;
  box-shadow: 0px 0px 6px 0px rgba(155, 0, 0, 0.6);
  z-index: 999;
  border-radius: 6px 0 0 6px;
  background: #980000;
  cursor: pointer;
}
.fix-item-small {
  width: 12px;
  height: 31px;
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
  border: 1px solid #980000;
  box-shadow: 0px 0px 6px 0px rgba(200, 0, 0, 0.6);
  padding: 10px;
  background: #980000;
  box-sizing: border-box;
  border-radius: 100px;
  line-height: 16px;
}
.fix-item-border-bottom {
  border-bottom: 1px solid #980000;
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
  background: #980000;
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