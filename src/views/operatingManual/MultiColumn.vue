<template>
  <div class="errPage-container">
    <el-row class="title">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple-dark">
          <h1>多栏账功能介绍及如何使用</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="area" :span="12" :offset="4">
        <div class="grid-content bg-purple">
          <h2>多栏账功能介绍及如何使用</h2>
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
            "数量金额明细账是明细账簿的一种，其借方、贷方和余额都分别设有数量、单价和金额三个专栏，适用于既要进行金额核算又要进行数量核算的账户。只有科目开启了数量核算时，数量金额表上才会体现该科目。",
        },
        {
          id: "second",
          tit: "二、如何使用",
          content:
            "当账套里面的科目开启了数量核算时，打开数量金额表才可以看到具体的数据，数量金额明细账支持筛选、打印和导出。",
          children: [
            {
              id: "s-first",
              tit: "（一）查询多栏账",
              children: [],
              content:
                "进账套后，点击【账簿】→【多栏账】，进入【多栏账】界面，默认是空白的，需要点击倒三角，要选择好会计期间和会计科目等相关筛选条件后才能查询，下面就各个筛选条件分别说明。",
            },
            {
              id: "s-second",
              tit: "（二）打印",
              children: [
                {
                  id: "s-f-first",
                  tit: "1.筛选打印条件",
                  content:
                    "进入账套点击【账簿】→【数量金额明细账】，筛选需要打印的科目及条件，点击右上角【打印】实现数量金额明细账的打印。",
                  imgList: [],
                  classList: "a4",
                },
                {
                  id: "s-f-second",
                  tit: "2.打印设置",
                  content:
                    "筛选完打印条件点击【打印】，进入打印的弹窗界面，在此界面可以设置打印的纸张边距、字体大小、是否显示打印日期和页码。",
                  imgList: [],
                  classList: "a4",
                },
              ],
            },
            {
              id: "s-second",
              tit: "（三）连续打印",
              children: [
                {
                  id: "s-f-first",
                  tit: "1.筛选打印条件",
                  content:
                    "进入账套点击【账簿】→【数量金额明细账】，筛选需要打印的科目及条件，点击右上角【连续打印】实现筛选出的数量金额明细账的全部打印。",
                  imgList: [],
                  classList: "a4",
                },
                {
                  id: "s-f-second",
                  tit: "2.打印设置",
                  content:
                    "筛选完打印条件点击【打印】，进入打印的弹窗界面，在此界面可以设置打印的纸张边距、字体大小、是否显示打印日期和页码。",
                  imgList: [],
                  classList: "a4",
                },
              ],
            },
            {
              id: "s-third",
              tit: "（四）导出",
              children: [
                {
                  id: "s-t-first",
                  tit: "1.导出表格格式",
                  content: `进入账套点击【账簿】→【数量金额明细账】，筛选需要打印的科目及条件，点击右上角【导出】实现表格导出。
                    注：即使筛选条件时没有选择一级科目导出，也是会默认导出包含最上级科目。`,
                  classList: "a4",
                },
              ],
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
