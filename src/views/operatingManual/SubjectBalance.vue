<template>
  <div class="errPage-container">
    <el-row class="title">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple-dark">
          <h1>科目余额表功能介绍及如何使用</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="area" :span="12" :offset="4">
        <div class="grid-content bg-purple">
          <h2>科目余额表功能介绍及如何使用</h2>
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
            "科目余额表是反映各个科目的余额,包括期初余额(也就是上期余额)科目余额表是反映各个科目的余额，包括期初余额（也就是上期余额）、本期发生额、本年累计发生额、期末余额。录入凭证保存后即可看到科目余额表数据。",
        },
        {
          id: "second",
          tit: "二、如何使用",
          children: [
            {
              id: "s-first",
              tit: "（一）查看科目余额表",
              children: null,
              content:
                "进账簿后，点击【账簿】→【科目余额表】，进入科目余额表界面，界面上默认显示的是本期一级科目的具体数据，包括期初余额、本期发生额、本年累计发生额和期末余额。",
            },
            {
              id: "s-second",
              tit: "（二）查询科目余额表",
              children: null,
              content:
                "点击【账簿】→【科目余额表】，进入科目余额表界面，将鼠标移动到左上角显示期间的位置，点击选择需要查询的条件，包含会计期间、开始科目、结束科目、科目级次、选择是否显示辅助核算（科目开启了辅助核算时才会显示这个选项）、选择是否只显示明细科目、选择是否余额为0不显示、选择是否本期无发生额且余额为0不显示、选择是否本年累计无发生额且余额为0不显示，选择好筛选条件后点击【确定】即可查看到需要的数据。",
            },
            {
              id: "s-second",
              tit: "（三）打印科目余额表",
              children: null,
              content:
                "点击【账簿】→【科目余额表】，进入科目余额表界面，点击右上角的【打印】按钮进行打印，在弹出的打印预览界面，鼠标移到右上方点击打印机的图标按钮，在打印机设置弹窗中调整打印纸张尺寸后，点击【打印】按钮即可打印。",
            },
            {
              id: "s-third",
              tit: "（四）导出科目余额表",
              children: [
                {
                  id: "s-t-first",
                  tit: "1.导出表格格式的科目余额表",
                  content:
                    "进入账套后 点击【账簿】→【科目余额表】，进入科目余额表界面，点击右上角的【导出】按钮进行导出，如需导出不同期间的或者某一些科目的科目余额表，需先选择筛选条件后再操作导出，导出的形式是excel表格形式的文件。",
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
