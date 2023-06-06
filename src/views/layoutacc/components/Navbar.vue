<template>
  <div class="wu">
    <div class="header">
      <div class="item">
        <div class="item-a">
          <span class="text">{{ clientName }}</span>
          <span class="main-hd">{{ numberOfPeriods }}</span>
          <span class="taxType">{{ taxNature }}</span>
        </div>
        <div class="item-b">
          <el-button size="mini" plain>咨询</el-button>
          <el-button @click="back" icon="el-icon-arrow-left" size="mini" plain
            >返回主系統</el-button
          >
          <el-button type="primary" size="mini" icon="el-icon-user-solid" plain
            >帮助</el-button
          >
          <el-button
            @click="quit"
            size="mini"
            icon="el-icon-switch-button"
            plain
            >退出</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    numberOfPeriods() {
      return this.$store.state.children.childrenData.numberOfPeriods[0]
        .disPeriod;
    },
    clientName() {
      return this.$store.state.children.childrenData.clientName;
    },
    taxNature() {
      return this.$store.state.children.childrenData.taxNature;
    },
  },
  created() {},
  methods: {
    quit() {
      window.close();
    },
    back() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.wu {
  width: 100%;
  height: 60px;
}
.header {
  width: 91%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  position: fixed;
  z-index: 999;
  background: #fff;
}

.item {
  display: flex;
  justify-content: space-between;
}

.item-a {
  margin: 10px;
}

.item-b {
  margin: 20px;
}

.text {
  margin-top: 5px;
  margin-right: 10px;
  font: bold 24px/1.5 "Microsoft Yahei";
  text-shadow: 0 0 1px rgb(0 0 0 / 20%);
  max-width: 460px;
  float: left;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.884);
}

.main-hd {
  color: rgba(0, 0, 0, 0.814);
  float: left;
  margin: 21px 0 0 0;
}

.taxType {
  color: #4591bb;
  display: inline-block;
  margin: 22px 0 0 10px;
  font-size: 14px;
  font-family: "Microsoft Yahei";
}
</style>