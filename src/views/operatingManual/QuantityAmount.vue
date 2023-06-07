<template>
  <div class="errPage-container">
    <el-row class="title">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple-dark">
          <h1>数量金额总账功能介绍及如何使用</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="area" :span="12" :offset="4">
        <div class="grid-content bg-purple">
          <h2>数量金额总账功能介绍及如何使用</h2>
          <div v-for="item in data" :key="item.id">
            <h2 :id="item.id">{{ item.tit }}</h2>

            <template v-if="item.children">
              <div v-for="item1 in item.children" :key="item1.id">
                <h2 :id="item1.id">{{ item1.tit }}</h2>
                <template v-if="item1.children">
                  <div v-for="item2 in item1.children" :key="item2.id">
                    <h2 :id="item2.id">{{ item2.tit }}</h2>
                    <p class="a3">{{ item2.content }}</p>
                  </div>
                </template>
                <p class="a3" v-else>
                  {{ item1.content }}
                </p>
              </div>
            </template>
            <p class="a3" v-else-if="item.content">
              {{ item.content }}
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="area fixed">
        <div class="mao-list">
          <div
            v-for="item in mao"
            :key="item.id"
            class="item"
            :class="item.classList"
            @click="maodian(item.id)"
          >
            {{ item.tit }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { treeToList } from "@/utils/treeToListDepth";
export default {
  data() {
    return {
      mao: [],
      data: [
        {
          id: "first",
          tit: "一、介绍",
          children: null,
          content:
            "数量金额总账用于查询设置为数量金额核算科目的科目名称、编码、期初结存、本期收入、本期发出、本年累计收入、本年累计发出以及期末结存的数量及金额数据。",
        },
        {
          id: "second",
          tit: "二、如何使用",
          children: [
            {
              id: "s-first",
              tit: "（一）筛选数量金额总账",
              children: null,
              content:
                "进账簿后，点击【账簿】→【数量金额总账】，进入数量金额总账界面，默认是显示本期数量金额总账的数据。将鼠标移动到界面上的期间上，即可显示更多的筛选条件，可以根据需求选择以下条件，包含会计期间的开始和结束时间、筛选开始科目和结束科目、选择显示的科目级次、选择数量和单价需要显示的小数点位数、如有辅助核算可勾选显示辅助核算（账套科目无辅助核算则无该选择）、可选择余额为0不显示、可选择无发生额且余额为0不显示。设置好需要的筛选条件后，点击【确定】按钮，界面上的数据则会按设置的筛选条件进行显示。注：数量和单价默认是显示2位小数点，设置筛选了其他点数后再次进入账套会默认按之前筛选的小数点数来显示。",
            },
            {
              id: "s-second",
              tit: "（二）导出数量金额总账",
              children: null,
              content:
                "进账簿后，点击【账簿】→【数量金额总账】，进入数量金额总账界面，点击右上方的【导出】按钮，即可导出界面上显示的所有数据。",
            },
            {
              id: "s-second",
              tit: "（三）打印数量金额总账",
              children: null,
              content:
                "进账簿后，点击【账簿】→【数量金额总账】，进入数量金额总账界面，点击右上方的【PDF打印】，进入打印预览界面，鼠标移到右上角点击打印机的图标即可弹出打印选项，设置好打印纸张后点击【打印】按钮即可。",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.mao = treeToList(this.data);
  },
  methods: {
    maodian(type) {
      document.querySelector(`#${type}`).scrollIntoView({
        behavior: "auto", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: "start", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        inline: "start", // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.fixed {
  position: fixed;
  right: 280px;
}
.errPage-container {
  background-color: #f8f8f8;
}
h1 {
  display: inline-block;
  vertical-align: middle;
  line-height: 70px;
  cursor: pointer;
  font-size: 20px;
  width: 890px;
  overflow: hidden;
}
h2 {
  margin-top: 24px;
  font-size: 22px;
  color: #303030;
  line-height: 34px;
}
h3 {
  font-size: 18px;
  line-height: 42px;
  margin: 0;
}
.title {
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 #ced7de;
  z-index: 999;
}
.area {
  padding: 20px;
  margin-top: 80px;
  margin-right: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(32, 26, 26, 0.1);
}
.a3 {
  text-align: justify;
  margin: 5px 0;
  font-size: 15px;
}
img {
  width: 100%;
}
.mao-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & .item {
    margin: 5px 0;
    cursor: pointer;
  }
  & .a4 {
    margin-left: 20px;
  }
}
</style>
