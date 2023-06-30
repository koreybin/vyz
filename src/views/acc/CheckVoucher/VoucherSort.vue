<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>查凭证</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 16px"
          >整理凭证</el-breadcrumb-item
        >
      </el-breadcrumb>
      <br />
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <span :class="{ current: !isComplete }">1.快速预览</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>2.整理凭证</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span :class="{ current: isComplete }"> 3.完成 </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <br />
    <div class="tidy-filter" v-if="!isComplete">
      <el-row>
        <el-col :span="10">
          <div>
            整理范围
            <el-date-picker
              data-v-004
              v-model="vcnSortingVo.date"
              format="yyyy年M期"
              value-format="yyyy-MM"
              :clearable="false"
              type="month"
              placeholder="结束日期"
            >
            </el-date-picker></div
        ></el-col>
        <el-col :span="7"
          ><div>
            凭证字
            <el-select
              style="width: 80px"
              v-model="vcnSortingVo.proveId"
              placeholder="记"
            >
              <el-option
                v-for="item in wordList"
                :key="item.name"
                :label="item.prove"
                :value="item.id"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="7"
          ><div>
            起始凭证号
            <el-input
              type="number"
              style="width: 70px"
              min="1"
              v-model="vcnSortingVo.fromNum"
            ></el-input></div
        ></el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="20" style="line-height: 36px">
          <el-radio-group v-model="vcnSortingVo.sortingWay">
            <el-radio :label="1">按凭证号顺次前移补齐断号</el-radio>
            <el-radio :label="2">按凭证日期重新顺次编号</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="4"><el-button @click="onsubmit">确定</el-button></el-col>
      </el-row>
    </div>
    <br />
    <el-row v-if="listShow">
      <div class="tidy-filter" style="float: left">
        <el-table :data="list" class="t-scroll">
          <el-table-column label="原有凭证号" prop="oldNum"></el-table-column>
          <el-table-column label="补齐后凭证号" prop="newNum"></el-table-column>
        </el-table>
      </div>
      <div class="ui-btn">
        <el-button type="primary" @click="dialogVisible = true">
          开始整理
        </el-button>
      </div>
    </el-row>
    <el-row v-if="isComplete">
      <p>恭喜你，凭证整理完成!</p>
      <br />
      <p class="pointer" @click="back" style="color: #317da7">返回凭证列表</p>
    </el-row>
    <br />
    <el-dialog
      title="整理凭证"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <p class="tidy-confirm-tip">
        系统将自动对凭证号进行调整，已打印的凭证将需要重新打印！
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSort">确 定</el-button
        ><el-button @click="dialogVisible = false">暂不整理</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetList } from "@/api/acc/prov";
import { vcnSortingPreview, vcnSorting } from "@/api/acc/recordVoucher";
import { mixins } from "@/mixins/mixin";
export default {
  mixins: [mixins],
  data() {
    return {
      dialogVisible: false,
      wordList: [],
      vcnSortingVo: {
        date: "",
        fromNum: 1,
        proveId: "",
        sortingWay: 1,
      },
      list: [],
      listShow: false,
      isComplete: false,
    };
  },
  created() {
    GetList(1, 10).then((res) => {
      this.wordList = res.data.data.object;
      this.vcnSortingVo.date = this.period;
    });
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    onsubmit() {
      vcnSortingPreview(this.vcnSortingVo).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        if (res.data.data.length === 0 || res.data.data === null) {
          this.$alert("没有需要整理的凭证，点击确定返回凭证列表。", "警告", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$emit("backView", true);
          });
          return;
        }
        this.list = res.data.data;
        this.listShow = true;
      });
    },
    onSort() {
      vcnSorting(this.list).then((res) => {
        if (res.data.retCode !== 200) {
          this.$message.error(res.data.message);
        }
        this.dialogVisible = false;
        this.listShow = false;
        this.isComplete = true;
      });
    },
    back() {
      this.$emit("backView", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.tidy-filter {
  width: 600px;
  border: 1px solid #ccc;
  padding: 20px 20px 20px 30px;
  overflow: hidden;
  -webkit-box-shadow: 0 0 10px #ddd;
  box-shadow: 0 0 10px #ddd;
}
.ui-btn {
  float: left;
  margin-left: 20px;
}
.tidy-confirm-tip {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.current {
  color: #317da7;
  font-weight: bold;
}
/deep/.t-scroll .el-table__body-wrapper {
  height: 300px !important;
}
</style>