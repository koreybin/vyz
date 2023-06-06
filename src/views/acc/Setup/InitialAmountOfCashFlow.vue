<template>
  <div class="aaa">
    <div class="cephalic">
      <div class="cephalic-item">
        <div>现金流量初始金额</div>
        <div>平衡</div>
      </div>
      <div>
        <el-button type="primary">保存</el-button>
        <el-button type="primary" plain>自动取数</el-button>
        <el-button type="primary" plain>导入</el-button>
        <el-button type="primary" plain @click="balance">试算平衡</el-button>
        <el-button type="primary" plain>导出</el-button>
      </div>
    </div>

    <table class="tgb">
      <div class="header">
        <div>
          <tr class="tgb-a aa">
            <td class="xiang aa">项目</td>
            <td class="hang aa">行次</td>
            <td class="ben aa">本年累计</td>
          </tr>
          <tr
            v-for="item in list"
            :key="item.id"
            v-show="item.line <= 35"
            class="tgb-b"
          >
            <td>{{ item.itemValue }}</td>
            <td class="hang">{{ item.line }}</td>
            <td class="footer-a">
              <el-input
                class="inp"
                v-if="item.isImport == 1"
                v-model="item.money"
              ></el-input>
              <label
                style="font-weight: 500; color: #494b4e"
                v-show="item.isImport == 0"
                >{{ item.money }}</label
              >
            </td>
          </tr>
        </div>
        <div>
          <tr class="tgb-a">
            <td class="xiang aa">项目</td>
            <td class="hang aa">行次</td>
            <td class="ben aa">本年累计</td>
          </tr>
          <tr
            v-for="item in list"
            :key="item.id"
            v-show="item.line > 35"
            class="tgb-b"
          >
            <td>{{ item.itemValue }}</td>
            <td class="hang">{{ item.line }}</td>
            <td class="footer-a">
              <el-input
                class="inp"
                v-if="item.isImport == 1"
                v-model="item.money"
              ></el-input>
              <label
                style="font-weight: 500; color: #494b4e"
                v-show="item.isImport == 0"
                >{{ item.money }}</label
              >
            </td>
          </tr>
        </div>
      </div>
    </table>
  </div>
</template>

<script>
import { GetList, poise } from "@/api/acc/InitialAmountOfCashFlow";
import { Message } from "element-ui";
export default {
  data() {
    return {
      list: "",
    };
  },
  created() {
    this.getListdata();
  },
  beforeRouteEnter(to, from, next) {
    GetList().then((response) => {
      if (response.data.retCode === 301) {
        return Message.warning(response.data.message);
      }
      next();
    });
  },
  methods: {
    getListType() {
      this.getListdata();
    },
    getListdata() {
      this.listLoading = true;
      GetList().then((response) => {
        this.list = response.data.data;
      });
    },
    // 试算平衡
    balance() {
      poise().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cephalic {
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
}

.cephalic-item {
  display: flex;
  margin-top: 15px;
}

.cephalic-item :nth-last-child(2) {
  font-size: 20px;
  color: #555;
}

.cephalic-item :nth-last-child(1) {
  font-size: 14px;
  width: 40px;
  color: #fff;
  height: 20px;
  text-align: center;
  background: #dd3c20;
  margin-left: 5px;
  line-height: 20px;
}

.header {
  display: flex;
  margin-left: 20px;
}

.tgb {
  border-right: 1px #ccc solid;
}

.tgb-b td {
  height: 40px;
  border-bottom: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  line-height: 40px;
  color: #606266;
  font-size: 14px;
}

.tgb-b:hover {
  background: #ecf5ff;
}

.xiang {
  width: 500px;
}

.hang {
  width: 100px;
  text-align: center;
}

.ben {
  width: 240px;
}

.aa {
  text-align: center;
}

.footer-a:last-child {
  text-align: center;
}

.tgb-a {
  height: 40px;
  line-height: 40px;
  background: url(../../../assets/images/ui-th.png) repeat-x #eee;
  color: #000;
}
</style>>
</style>