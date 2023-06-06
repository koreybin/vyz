<template>
  <div class="errPage-container">
    <el-row class="title">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple-dark">
          <h1 class="">凭证汇总表功能介绍及如何使用</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="area" :span="12" :offset="4">
        <div class="grid-content bg-purple">
          <h2>凭证汇总表功能介绍及如何使用</h2>
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
            <p class="a3" v-else>
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
            "凭证汇总表也叫科目汇总表，凭证汇总表是定期对全部记账凭证进行汇总，按各个会计科目列示其借方发生额和贷方发生额的一种汇总凭证，凭证汇总表具有试算平衡的作用。",
        },
        {
          id: "second",
          tit: "二、如何使用",
          children: [
            {
              id: "s-first",
              tit: "（一）查询",
              children: [
                {
                  id: "s-f-first",
                  tit: "1.选择查询文件",
                  content:
                    "进入账套后 ，点击【账簿】→【凭证汇总表】进入【凭证汇总表】页面，默认显示当前账期的凭证汇总表数据，可筛选日期选择需要查看的开始和结束期间，再点击界面上方的【刷新】按钮，就可以筛选出该期间的凭证数据。",
                  imgList: [],
                  classList: "a4",
                },
                {
                  id: "s-f-second",
                  tit: "2．联查明细账",
                  content:
                    "进入账套后，点击【账簿】→【凭证汇总表】，进入凭证汇总表界面，可在界面上方选择筛选条件进行筛选后，找到需要查看明细账的科目，点击界面上显示的科目代码，即可跳转到该科目的明细账界面查看明细账数据。",
                  imgList: [],
                  classList: "a4",
                },
                {
                  id: "s-f-third",
                  tit: "3．重置查询条件",
                  content:
                    "进入账套后 ，点击【账簿】→【凭证汇总表】进入【凭证汇总表】页面，点击凭证汇总表旁的日期按钮，在筛选框中点开【更多条件】，点击【重置】按钮即可重新筛选条件。",
                  imgList: [],
                  classList: "a4",
                },
              ],
            },
            {
              id: "s-second",
              tit: "（二）打印",
              children: [
                {
                  id: "s-s-first",
                  tit: "1.A4纸张打印",
                  content:
                    "进入账套后，点击【账簿】进入【凭证汇总表】页面，可筛选日期选择需要查看的开始和结束期间，再点击界面上方的【刷新】按钮，就可以筛选出该期间的凭证汇总表数据。点击【打印】会弹出界面选择打印纸型【A4】及其他打印选择，选择完成后点击【打印】按钮，进入打印预览界面点击右上方的打印图标，再选择需要打印的纸张尺寸点击【打印】即可。",
                  classList: "a4",
                },
              ],
            },
            {
              id: "s-third",
              tit: "（三）导出",
              children: [
                {
                  id: "s-t-first",
                  tit: "1.导出表格格式",
                  content:
                    "进入账套后 ，点击【账簿】→【凭证汇总表】，进入凭证汇总表界面可选择筛选凭证日期，凭证字，设置凭证号和科目级次的条件，再点击界面上的【确定】按钮，筛选出需要的凭证汇总表数据，点击【导出】即可导出表格格式的文件。",
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
