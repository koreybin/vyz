<template>
  <div>
    <el-button @click="end">返回</el-button>
    <el-button @click="save">保存</el-button>

    <div class="box">
      <div class="heade">{{ msgData }}</div>

      <div class="header">
        <div class="header-a">
          <span>单据日期:</span>
          <el-date-picker
            class="time"
            value-format="yyyy-MM-dd"
            v-model="dataAdd.documentDate"
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
        </div>
        <div>
          <span>往来单位:</span>
          <input
            id="type"
            type="text"
            list="typelist1"
            @change="selectClas($event)"
            class="select2"
            v-model="dataAdd.contactsSupplier"
          />
          <datalist id="typelist1">
            <option v-for="(item, id) in arr" :key="id" :value="item.id">
              {{ item.value }}
            </option>
          </datalist>
          <!-- <select name="" id="" class="select">
            <option value="NONE"></option>
            <option v-for="(item, id) in arr" :key="id" :value="item.id">
              {{ item.value }}
            </option>
          </select> -->
        </div>
        <div>
          <span>单据编号:</span>
          <el-input class="intt" v-model="dataAdd.documentCode"></el-input>
        </div>
        <div>
          <span>凭证字号：</span>
          <el-input
            class="intt"
            v-model="dataAdd.voucherNo"
            disabled
          ></el-input>
        </div>
        <div class="header-b">
          <span>摘要:</span>
          <el-input class="int" v-model="dataAdd.summary"></el-input>
        </div>
      </div>
      <div class="footer">
        <div class="footer-a">
          <table class="tab">
            <tr class="one">
              <td class="pp"><button @click="add1">+</button></td>
              <td>存货编码</td>
              <td>存货名称</td>
              <td>规格型号</td>
              <td>单位</td>
              <td>数量</td>
              <td>单价</td>
              <td>金额</td>
              <td>备注</td>
            </tr>

            <tr v-for="(v, index) in temp" :key="v.index">
              <td class="pp"><button @click="del(index)">-</button></td>
              <td>
                <input
                  id="type"
                  type="text"
                  list="typelist"
                  @change="selectClass($event, index)"
                  class="select1"
                  v-model="temp[index].inventoryCode"
                />
                <datalist id="typelist">
                  <option v-for="(item, id) in list" :key="id" :value="item.id">
                    {{ item.inventoryName }}
                  </option>
                </datalist>
              </td>
              <td>{{ temp[index].inventoryName }}</td>
              <td>{{ temp[index].specification }}</td>
              <td>{{ temp[index].unit }}</td>
              <td>
                <el-input
                  @input="dian(index)"
                  v-model="temp[index].quantity"
                ></el-input>
              </td>
              <td class="univalence">{{ temp[index].price }}</td>
              <td>
                <el-input
                  @input="ji(index)"
                  v-model="temp[index].amount"
                ></el-input>
              </td>
              <td><el-input v-model="temp[index].remarks"></el-input></td>
            </tr>
          </table>
        </div>
        <div class="foot">
          <span>负责人:</span>
          <el-input v-model="dataAdd.personInCharge" class="intt"></el-input>
          <span>会计:</span>
          <el-input v-model="dataAdd.accounting" class="intt"></el-input>
          <span>仓管:</span>
          <el-input v-model="dataAdd.warehouseManagers" class="intt"></el-input>
          <span>经办人:</span>
          <el-input v-model="dataAdd.handledBy" class="intt"></el-input>
          <span>制单人:</span>
          <el-input class="intt"></el-input>
          <span>数量合计:</span>
          <div class="intt span">
            {{ dataAdd.totalQuantity }}
          </div>
          <span>金额合计:</span>
          <div class="intt span">
            {{ dataAdd.totalAmount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetListPageByType,
  GetList,
  GetListone,
  increased,
  delivery,
  checkList,
} from "@/api/acc/Repertory/StockIn";

export default {
  props: ["msgData", "big"],
  data() {
    return {
      id: 0,
      temp: [
        {
          name: "",
          inventoryId: "", //存货id
          inventoryCode: "", //存货编码
          remarks: "", //备注
          amount: "", //金额
          price: "", //单价
          quantity: "", //数量
          unit: "", //单位
          inventoryName: "", //名称
          specification: "", //规格
          id: 0,
        },
      ],
      arr: [],
      list: "",
      selectDetail: [],
      dataAdd: {
        accounting: null, //会计
        contactsSupplier: null, //往来单位(供应商)
        documentCode: null, //单据编号
        documentDate: null, //单据日期
        documentType: null, //单据类型(1:产品入库单,2:材料入库单,3:周转材料入库单)
        handledBy: null, //经办人
        id: null, //入库单表id
        inventoryEntryItemsVos: [
          {
            inventoryId: null, //存货id
            inventoryCode: null, //存货编码
            amount: null, //金额
            price: null, //单价
            quantity: null, //数量
            unit: null, //单位
            inventoryName: null, //名称
            specification: null, //规格
            id: null,
            remarks: null, //备注
          },
        ],
        personInCharge: null, //负责人
        summary: null, //摘要
        totalAmount: null, //金额合计
        totalQuantity: null, //数量合计
        voucherNo: null, //凭证字号(无法手写录入)
        warehouseManagers: null, //仓管
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
      },
    };
  },

  created() {
    this.get();
    //这个是数据多的
    GetListone("", this.listQuery.pageNum, this.listQuery.pageSize).then(
      (res) => {
        this.selectDetail = res.data.data.object;
      }
    );
    //数据少的
    GetList().then((res) => {
      this.list = res.data.data;
    });
    GetListPageByType().then((res) => {
      this.arr = res.data.data.object;
      // console.log(this.arr, "aa");
    });
  },
  methods: {
    get() {
      if (this.big != "") {
        checkList(this.big).then((res) => {
          // console.log("反显的数据", res.data.data);
          this.dataAdd = res.data.data;
          this.temp = res.data.data.inventoryEntryItemsQueryVo;
        });
      }
    },

    add1() {
      if (this.temp.length < 6) {
        this.temp.push({
          inventoryId: "", //存货id
          amount: "", //金额
          price: "", //单价
          quantity: "", //数量
          unit: "", //单位
          inventoryName: "", //名称
          specification: "", //规格
          remarks: "", //备注
        });
      }
      // if (this.temp.length == 2) {
      //   this.dataAdd.totalQuantity = this.temp[0].quantity;
      // } else {
      //   for (let i = 0; i <= this.temp.length; i++) {
      //     this.aa = this.temp[i].quantity +this.temp[i+1].quantity;
      //   }
      // }
    },
    del(id) {
      this.temp.splice(id, 1);
      let totalAmount = null;
      this.temp.map((item, index) => {
        totalAmount += parseInt(item.amount);
      });
      this.dataAdd.totalAmount = totalAmount;
      let totalQuantity = null;
      this.temp.map((item, index) => {
        totalQuantity += parseInt(item.quantity);
      });
      this.dataAdd.totalQuantity = totalQuantity;
    },

    end() {
      this.$emit("getData", false);
      sessionStorage.removeItem("oo");
      sessionStorage.removeItem("documentType");
    },

    // 下拉存货
    selectClas(event) {
      // console.log("下拉存货", event.target.value);
      this.dataAdd.contactsSupplier = event.target.value;
    },
    selectClass(event, index) {
      this.selectDetail.map((a) => {
        if (event.target.value == a.id) {
          // this.temp[index].id = a.id;
          this.temp[index].inventoryName = a.inventoryName;
          this.temp[index].specification = a.specification;
          this.temp[index].unit = a.unit;
          this.temp[index].inventoryCode = a.inventoryCode;
          this.temp[index].inventoryId = a.id;
        }
      });
      // console.log("选择完后temp", this.temp);
    },

    // 单价 = 金额/数量
    dian(index) {
      let totalQuantity = null;
      for (let i = 0; i < this.temp.length; i++) {
        totalQuantity += parseInt(this.temp[i].quantity);
      }
      this.dataAdd.totalQuantity = totalQuantity;
      // let totalQuantity = null;
      // this.temp.map((item, index) => {
      //   // console.log(item, "item");
      //   // item 就是你循环的东西
      //   totalQuantity += parseInt(item.quantity);
      // });

      this.temp[index].price =
        this.temp[index].amount / this.temp[index].quantity;
      this.temp[index].price = this.temp[index].price.toFixed(2);
      if (
        this.temp[index].quantity == "" ||
        this.temp[index].amount == "" ||
        this.temp[index].price == NaN
      ) {
        this.temp[index].price = "";
      }
    },
    ji(index) {
      let totalAmount = null;
      this.temp.map((item) => {
        // item 就是你循环的东西
        totalAmount += parseInt(item.amount);
      });
      this.dataAdd.totalAmount = totalAmount;

      this.temp[index].price =
        this.temp[index].amount / this.temp[index].quantity;
      this.temp[index].price = this.temp[index].price.toFixed(2);
      if (this.temp[index].amount == "" || this.temp[index].quantity == "") {
        this.temp[index].price = "";
      }
    },
    // 保存
    save() {
      if (this.big == "") {
        this.dataAdd.inventoryEntryItemsVos = this.temp;
        if (this.msgData == "产品库出库单" || this.msgData == "产品入库单") {
          this.dataAdd.documentType = 1;
        }
        if (this.msgData == "材料出库单" || this.msgData == "材料入库单") {
          this.dataAdd.documentType = 2;
        }
        if (
          this.msgData == "周转材料入库单" ||
          this.msgData == "周转材料出库单"
        ) {
          this.dataAdd.documentType = 3;
        }
        if (
          this.msgData == "产品入库单" ||
          this.msgData == "材料入库单" ||
          this.msgData == "周转材料入库单"
        ) {
          // console.log("保存数据", this.dataAdd);
          increased(this.dataAdd).then((res) => {
            // console.log("新增保存返回", res);
            if (res.data.retCode !== 200)
              return this.$message.error("新增失败");
            this.$message.success("新增成功");
          });
        } else {
          // 出库保存
          delivery(this.dataAdd).then((res) => {
            if (res.data.retCode !== 200)
              return this.$message.error("新增失败");
            this.$message.success("新增成功");
          });
        }
      } else {
        if (
          this.msgData == "产品入库单" ||
          this.msgData == "材料入库单" ||
          this.msgData == "周转材料入库单"
        ) {
          // 入库单查看修改
          this.dataAdd.id = this.big;
          increased(this.dataAdd).then((res) => {
            console.log(res);
          });
        } else {
          // 出库单查看修改
        }
      }
    },
  },
};
</script>
<style scoped>
.tab {
  margin-top: 10px;
  border-top: 1px #ccc solid;
  border-left: 1px #ccc solid;
  width: 90%;
  margin: 0 auto;
}

td {
  border-right: 1px #ccc solid;
  border-bottom: 1px #ccc solid;
  width: 200px;
  height: 30px;
  text-align: center;
  font-family: Microsoft YaHei, "微软雅黑", Lucida, Verdana, Hiragino Sans GB,
    STHeiti, WenQuanYi Micro Hei, SimSun, sans-serif;
  color: #555;
  font-size: 12px;
}
.select1 {
  width: 200px;
  height: 30px;
  border: 0;
  color: #555;
}
.int {
  width: 300px;
}
.intt {
  width: 100px;
}
.time {
  width: 140px;
}
.select {
  height: 30px;
  width: 100px;
  border: 1px #ccc solid;
  border-radius: 5px;
}
.footer {
  margin: 10px;
}
.footer-a {
  height: 420px;
}
.header {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: 40px;
  line-height: 30px;
}
.header-a {
  margin-left: 70px;
}
.header-b {
  margin-right: 80px;
}
.heade {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #555;
}
.box {
  width: 80%;
  margin: 0 auto;
  height: 600px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-top: 50px;
}
.one td {
  font-family: Microsoft YaHei, "微软雅黑", Lucida, Verdana, Hiragino Sans GB,
    STHeiti, WenQuanYi Micro Hei, SimSun, sans-serif;
  font-size: 12px;
  color: #555;
  font-weight: 800;
}
.univalence {
  font-size: 12px;
  color: #555;
}

.foot span {
  width: 70px;
  line-height: 40px;
  margin-left: 20px;
}
.pp {
  width: 70px;
}
span {
  font-family: Microsoft YaHei, "微软雅黑", Lucida, Verdana, Hiragino Sans GB,
    STHeiti, WenQuanYi Micro Hei, SimSun, sans-serif;
  color: #555;
  font-weight: 800;
  margin-left: 10px;
  font-size: 15px;
}
.span {
  border: 1px solid #ccc;
  height: 35px;
  line-height: 35px;
  font-family: Microsoft YaHei, "微软雅黑", Lucida, Verdana, Hiragino Sans GB,
    STHeiti, WenQuanYi Micro Hei, SimSun, sans-serif;
  color: #555;
  font-size: 15px;
  border-radius: 5px;
}
.foot {
  display: flex;
}
a {
  color: #00ccff !important;
}
.select2 {
  width: 150px;
  height: 35px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  color: #606266;
}
</style>