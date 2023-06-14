    <template>
  <div>
    工资
    <div class="s-wrap">
      <div class="s-title">
        <span class="title">期末结转</span>
        <strong>2022年第2期</strong>
        <span>共录入凭证0张</span>
        <span class="rl">
          <el-button>一键生成</el-button>
          <el-button>测算金额</el-button>
          <el-button>结转到下期</el-button>
          <el-button>反结账</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

    <script>
export default {
  name: "Salary",
};
</script>

    <style lang='scss' scoped>
.s-wrap {
  margin-bottom: 20px;
  padding: 0;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.11);
  font-size: 14px;
  zoom: 1;
  .s-title {
    border-bottom: 1px solid #f1f1f1;
    overflow: hidden;
    width: 100%;
    height: 60px;
    .title {
      color: #002c3d;
      font-size: 26px;
      margin-left: 16px;
      height: 60px;
      line-height: 60px;
    }
    .rl {
      padding: 16px 16px 0 0;
    }
  }
}
</style>