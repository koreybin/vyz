<template>
  <div class="dashboard-editor-container">
    <el-main class="main">
      <div class="clearfix">
        <el-header height="85px" class="headr-user">
          <div class="info-container">
            <span class="display_name"
              >欢迎使用微易账
              <span
                style="color: rgb(153, 6, 6); font-size: 17px; font-weight: 700"
                >{{ name }}</span
              >
            </span>
            <span style="margin-left: 10px; color: #333">您的职位:</span>
            <span class="pan-info-roles" :key="item" v-for="item in roles"
              >{{ item }};</span
            >
            <!-- <span style="font-size:20px;padding-top:20px;display:inline-block;">editor : dashboard</span> -->
          </div>
        </el-header>
      </div>
      <!-- <div>
      <img class="emptyGif" :src="emptyGif">
    </div> -->
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="mid grid-content data-statistics">
            <span class="statistics-title">记账数据统计</span>
            <div class="mid-statistics-box box1">
              <span class="statistics-span box1-title">本月新增记账服务</span>
              <div class="fuwu">
                <span>0</span>
                <span>个</span>
              </div>
            </div>
            <div class="mid-statistics-box box2">
              <span class="statistics-span box2-title">本月新增工商服务</span>
              <div class="fuwu">
                <span>0</span>
                <span>个</span>
              </div>
            </div>
            <div class="mid-statistics-box box3">
              <span class="statistics-span box3-title">本月新增客户</span>
              <div class="fuwu">
                <span>0</span>
                <span>个</span>
              </div>
            </div>
            <div class="mid-statistics-box box4">
              <span class="statistics-span box4-title">本月新增收款</span>
              <div class="fuwu">
                <span>0</span>
                <span>元</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div
            :style="{ backgroundImage: `url(${notice})` }"
            class="notice mid grid-content"
          >
            <!-- 直播提示 -->
            <ul class="notice-ul">
              <li
                class="notice-ul-li"
                v-for="item in val"
                :key="item.id"
                @click="tiao(item)"
              >
                <i data-v-63e35feb="" class="afficheTag"></i>
                <a>{{ item.noticeTitle }}</a>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="mid-two grid-content bg-purple-dark">
            <div class="Generation">代账服务</div>
            <div class="chakan">查看</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mid-two grid-content bg-purple-dark">
            <div class="Generation">工商服务</div>
            <div class="chakan">查看</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="mid-two grid-content bg-purple-dark">
            <div class="Generation">代账服务</div>
            <div class="chakan">查看</div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="mid-three grid-content bg-purple-dark">
            <div class="yujing">温馨提示</div>
            <div class="yujing-a">
              <div class="yujing-b qian">欠费提示</div>
              <div class="yujing-b">
                <div class="shu">0</div>
                <div class="shou">代账</div>
              </div>
              <div class="yujing-b">
                <div class="shu">1</div>
                <div class="shou">工商</div>
              </div>
            </div>
            <div class="yujing-a dai">
              <div class="yujing-b qian">代账收款</div>
              <div class="yujing-b">
                <div class="shu">0</div>
                <div class="shou">代账</div>
              </div>
              <div class="yujing-b">
                <div class="shu">1</div>
                <div class="shou">工商</div>
              </div>
            </div>
            <div class="yujing ge">合同预警</div>
            <div class="yujing-a">
              <div class="yujing-b">
                <div class="shu">0</div>
                <div class="shou">本月到期</div>
              </div>
              <div class="yujing-b">
                <div class="shu">1</div>
                <div class="shou">下月到期</div>
              </div>
            </div>
            <div class="yujing ge">工商年报预警</div>
            <div class="yujing-a">
              <div class="yujing-b">
                <div class="shu">0</div>
                <div class="shou">本月到期</div>
              </div>
              <div class="yujing-b">
                <div class="shu">1</div>
                <div class="shou">下月到期</div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 扇形统计图 -->
        <div class="yuan">
          <div id="cartogram"></div>
          <div id="wu"></div>
          <div id="xian"></div>
        </div>
      </el-row>
    </el-main>
    <div class="foot"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
import { Sinatv } from "@/api/CCTV.js";
export default {
  name: "dashboard-editor",
  components: { PanThumb },

  data() {
    return {
      row:4,
      val: "",
      notice: require("@/assets/img/notice2.png"),
      emptyGif:
        "https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3",
    };
  },
  computed: {
    ...mapGetters(["name", "roles", "phone"]),
  },
  methods: {
    // 跳转
    tiao(item) {
      this.$router.push({ name: "zhibo", params: { text: item } });
     
    
    },
    // 圆形统计图
    circle() {
      var myChart = echarts.init(document.getElementById("cartogram")),
        option = {
          series: [
            {
              type: "pie",
              data: [
                {
                  value: 335,
                  name: "第一",
                },
                {
                  value: 234,
                  name: "第二",
                },
                {
                  value: 148,
                  name: "第三",
                },
                {
                  value: 168,
                  name: "第四",
                },
              ],
            },
          ],
        };
      myChart.setOption(option);
    },
    circlea() {
      var myWu = echarts.init(document.getElementById("wu")),
        option = {
          series: [
            {
              type: "pie",
              data: [
                {
                  value: 345,
                  name: "粉身碎骨浑不怕",
                },
                {
                  value: 234,
                  name: "要留清白在人间",
                },
                {
                  value: 148,
                  name: "第三",
                },
                {
                  value: 138,
                  name: "第四",
                },
              ],
            },
          ],
        };

      myWu.setOption(option);
    },
    circleaa() {
      var myXian = echarts.init(document.getElementById("xian")),
        option = {
          series: [
            {
              type: "pie",
              data: [
                {
                  value: 213,
                  name: "粉身碎骨浑不怕",
                },
                {
                  value: 324,
                  name: "要留清白在人间",
                },
                {
                  value: 348,
                  name: "第三",
                },
                {
                  value: 323,
                  name: "第四",
                },
              ],
            },
          ],
        };

      myXian.setOption(option);
    },
    live() {
      //  this.$store.dispatch('loginByUserphone', this.loginForm).then(response => {
    Sinatv(this.row).then((response) => {
        
        const data1 = response.data.data;
        this.val = data1;
        // console.log('直播信息',data1);
      });
    },
  },
  mounted() {
    this.circlea();
    this.circle();
    this.circleaa();
  },
  created() {
    this.live();
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.statistics-span {
  font-size: 14px;
  display: inline-block;
  padding: 0 9px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: hsla(0, 0%, 100%, 0.1);
}
// .box1-title {
// }
// .box2-title {
// }
// .box3-title {
// }
// .box4-title {
// }
.box4 {
  background-color: #f3d841f1;
}
.box3 {
  background-color: #a2e439e3;
}
.box2 {
  background-color: #45a7e9c9;
}
.box1 {
  background-color: #f570d4d0;
}
.mid-statistics-box {
  color: #fff;
  height: 160px;
  width: 285px;
  display: inline-block;
  position: relative;
  left: 14px;
  bottom: 10px;
  margin-right: 15px;
}
.statistics-title {
  position: relative;
  height: 42px;
  line-height: 28px;
  padding: 0 10px;
  border-bottom: 1px solid #f6f6f6;
  color: #333;
  border-radius: 2px 2px 0 0;
  font-size: 14px;
  display: block;
}
.data-statistics {
  background-size: 100%;
  background-color: #fffffb;
}
.afficheTag {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #ff6c55;
  border-radius: 8px;
  margin-right: 8px;
}
.notice-ul-li {
  font-size: 14px;
  margin-top: 10px;
}
.notice-ul-li a {
  font-size: 14px;
  margin-top: 10px;
}
.notice-ul-li a:hover {
  color: rgb(83, 128, 187);
  text-decoration: underline;
}
.notice-ul {
  list-style: none;
  position: relative;
  top: 45px;
  left: 20px;
  width: 325px;
}
.mid {
  margin-top: 20px;
  height: 200px;
  box-shadow: 0px 1px 2px #d3d1d1;
}
.notice {
  background-size: 100%;
  background-color: #fffffb;
}
.mid-three {
  margin-top: 20px;
  height: 600px;
}
.mid-two {
  margin-top: 15px;
  height: 90px;
  box-shadow: 0px 1px 2px #d3d1d1;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
// .bg-purple-dark {
//   background-color: #d3dce6;
// }
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.aside {
  width: 300px;
  height: 300px;
  background-color: rgb(0, 255, 157);
}

.foot {
  background-color: rgb(250, 239, 239);
}
.clearfix {
  box-shadow: 0px 1px 2px #d3d1d1;
}
.emptyGif {
  display: block;
  width: 20%;
  margin: 0 auto;
}
.headr-user {
  background-color: rgb(250, 239, 239);
}
.dashboard-editor-container {
  background-color: #f7f7f3;
  min-height: 100vh;
  margin-top: -60px;
  padding: 70px 20px 0px;
  .pan-info-roles {
    font-size: 14px;
    font-weight: 700;
    line-height: 10px;
    color: #333;
  }
  .info-container {
    border-left: 5px solid #009688;
    background-color: #fffffb;
    position: relative;
    height: 60px;
    line-height: 90px;
    bottom: -10px;
    .display_name {
      line-height: 30px;
      position: absolute;
      font-size: 16px;
      line-height: 30px;
      color: #333;
      margin-left: 10px;
    }
  }
}
.mid {
  cursor: pointer;
}
.mid-two {
  background: #fffffb;
}
.mid-two .chakan {
  margin-top: 17px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: rgb(109, 106, 106);
}
.mid-two .chakan:hover {
  color: #333;
}

.Generation {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgb(218, 216, 216);
  line-height: 40px;
  text-align: center;
}

.yujing {
  background: #ff6c55;
  width: 100%;
  height: 40px;
  color: #fff;
  line-height: 40px;
  text-indent: 10px;
}
.yujing-a {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  line-height: 50px;
  text-align: center;
  background: #fffffb;
  border-radius: 10px;
}
.shou {
  cursor: pointer;
  color: rgb(109, 106, 106);
}
.shou:hover {
  color: #333;
}

#cartogram {
  width: 350px;
  height: 300px;
  margin-top: 200px;
}
#wu {
  position: absolute;
  width: 350px;
  height: 300px;
  margin-left: 410px;
  top: 200px;
}
#xian {
  position: absolute;
  width: 350px;
  height: 300px;
  margin-left: 820px;
  top: 200px;
}
.qian {
  margin-top: 25px;
}
.dai {
  margin-top: 10px;
}
.ge {
  margin-top: 25px;
}
.shu {
  font-size: 35px;
  color: #333;
}

.fuwu {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.fuwu span:first-child {
  font-size: 50px;
}
.fuwu span:last-child {
  margin-top: 25px;
  margin-left: 10px;
}
</style>
