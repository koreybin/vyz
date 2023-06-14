<template>
  <div style="padding: 10px">
    <div class="s-wrap">
      <div class="s-title">
        <span class="title">期末结转</span>
        <strong>2022年第2期</strong>
        <span>共录入凭证0张</span>
        <span class="rl">
          <!-- <el-button>一键生成</el-button> -->
          <el-button>测算金额</el-button>
          <el-button>结转到下期</el-button>
          <el-button>反结账</el-button>
        </span>
      </div>
      <div>
        <account-box
          v-for="item in list"
          :key="item.id"
          :title="item.title"
          :money="item.money"
          :isDisabled="item.isDisabled"
        ></account-box>
        <div class="box" @click="dialogVisible = true">
          <div class="jia">
            <i class="el-icon-plus"></i>
            <div>新增期末结转</div>
          </div>
        </div>
      </div>
      <el-dialog
        title="增加期末结转"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <label>名称：</label>
        <el-input v-model="name"></el-input>
        <el-table>
          <el-table-column property="date" label="操作"></el-table-column>
          <el-table-column property="name" label="摘要"></el-table-column>
          <el-table-column property="address" label="借贷"></el-table-column>
          <el-table-column property="address" label="科目"></el-table-column>
          <el-table-column
            property="address"
            label="取数规则"
          ></el-table-column>
          <el-table-column
            property="address"
            label="金额比例%"
          ></el-table-column>
          <el-table-column property="address" label="金额"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AccountBox from "./components/AccountBox.vue";
export default {
  name: "SettleAccounts",
  components: {
    AccountBox,
  },
  data() {
    return {
      list: [
        { id: 1, title: "生产领料", money: 0, isDisabled: false },
        { id: 2, title: "结转制造费用", money: 0, isDisabled: true },
        { id: 3, title: "结转生产成本", money: 0, isDisabled: false },
        { id: 4, title: "结转销售成本", money: 0, isDisabled: false },
        { id: 5, title: "计提工资", money: 0, isDisabled: false },
        { id: 6, title: "摊销待摊费用", money: 0, isDisabled: false },
        { id: 7, title: "结转未交增值税", money: 0, isDisabled: false },
      ],
      dialogVisible: false,
      name: "",
    };
  },
  methods: {
    handleClose() {},
  },
};
</script>

<style lang='scss' scoped>
.el-input {
  width: 200px;
}
.box {
  width: 268px;
  height: 196px;
  border: 1px dashed #cfe6ef;
  border-radius: 8px;
  margin: 8px;
  float: left;
  box-sizing: border-box;
}
.s-wrap {
  width: calc(100% - 300px);
  margin-bottom: 20px;
  padding: 0;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.11);
  font-size: 14px;
  zoom: 1;
  overflow: hidden;
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
      float: right;
      padding: 16px 16px 0 0;
    }
  }
}
.jia {
  i {
    font-size: 50px;
    color: #d6d6d6;
    margin-bottom: 10px;
  }
  margin-top: 60px;
  text-align: center;
}
</style>