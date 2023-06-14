<template>
  <div class="box">
    <div class="box-title">
      <span>{{ title }}</span>
      <span class="setting" @click="dialogVisible = true">
        <i class="el-icon-setting"></i>
      </span>
    </div>
    <div class="box-content">
      <div class="title">金额</div>
      <div class="money">{{ money }}</div>
      <div>
        <el-button size="mini" :disabled="isDisabled">生成凭证</el-button>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "money", "isDisabled"],
  data() {
    return {
      dialogVisible: false,
    };
  },
};
</script>

<style lang='scss' scoped>
.box {
  width: 268px;
  height: 196px;
  border: 1px solid #cfe6ef;
  border-radius: 8px;
  margin: 8px;
  float: left;
  box-sizing: border-box;
}
.box-title {
  border-radius: 8px 8px 0 0;
  text-align: center;
  display: block;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  position: relative;
  background-color: #0089bd;
  color: #ffffff;
  .setting {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;
    line-height: 32px;
  }
}
.box-content {
  position: relative;
  height: 162px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f4fcff 100%);
  text-align: center;
  .money {
    font-size: 24px;
    line-height: 30px;
    padding-bottom: 30px;
  }
  .title {
    padding-top: 30px;
    line-height: 30px;
  }
}
</style>