<template>
  <div class="app-container" style="height: 100%">
    <div class="header" style="margin-bottom: 30px">
      <div>
        <el-radio-group
          v-model="tabPosition"
          v-for="item in tabs"
          :key="item.id"
          @change="getListType(item.id)"
        >
          <el-radio-button :label="item.name"></el-radio-button>
        </el-radio-group>
        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
        ></el-button>
        <el-checkbox v-model="toggleAmount">隐藏数量</el-checkbox>
      </div>
      <div>
        <el-row>
          <el-col :span="8">
            <!-- 保存 -->
            <el-button
              style="margin-left: 10px"
              size="mini"
              @click="handleCreate"
              type="primary"
              icon="el-icon-sold-out"
            >
              {{ $t("table.savebut") }}
            </el-button>
          </el-col>
          <el-col :span="8">
            <!-- 导出 -->
            <el-button
              style="margin-left: 10px"
              size="mini"
              @click="exportExcel"
              type="primary"
              icon="el-icon-download"
              >{{ $t("table.export") }}
            </el-button>
            <!-- </download-excel> -->
          </el-col>
          <el-col :span="8">
            <el-button
              style="margin-left: 10px"
              size="mini"
              @click="handleBalance"
              type="primary"
              icon="el-icon-download"
              >{{ $t("table.trialBalance") }}
            </el-button>
          </el-col>
          <div class="filter-item-right">
            <!-- 上传 -->
            <!-- <el-button
              style="margin-left: 10px"
              size="mini"
              @click="handleCreate"
              type="primary"
              icon="el-icon-upload2"
            >
              {{ $t("table.importbut") }}
            </el-button> -->
          </div>
        </el-row>
      </div>
    </div>
    <el-dialog
      title="试算平衡检查"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div v-if="isBalance" class="successB">
        恭喜您，您录入的初始余额平衡！
      </div>
      <div v-else class="errorB">
        您录入的初始余额不平衡，请仔细核对<a>「科目余额表」</a>与源数据是否一致！
      </div>

      <table class="balanceTable" style="margin-top: 10px">
        <thead>
          <tr>
            <th>项目</th>
            <th>借方金额</th>
            <th>贷方金额</th>
            <th>差额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px">期初余额（综合本位币）</td>
            <td v-for="(item, i) in beginData" :key="i">{{ item }}</td>
          </tr>
          <tr>
            <td style="padding: 10px">累计发生额（综合本位币）</td>
            <td v-for="(item, i) in totalData" :key="i">{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
    <el-table
      :data="list"
      size="mini"
      stripe
      fit
      class="t-scroll"
      v-loading="listLoading"
    >
      <el-table-column label="编码" width="120">
        <template slot-scope="scope">
          {{ scope.row.subjectCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="科目名称" width="250">
        <template slot-scope="scope">
          <div class="dis">
            <span>{{ scope.row.subjectName }}</span>
            <span
              @click="addition(scope.row)"
              class="jia"
              v-if="scope.row.isAddAssist == 1"
              >+</span
            >
            <span
              @click="leave(scope.row)"
              class="shan"
              v-if="scope.row.assistId != null && scope.row.assistId != ''"
              >×</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="方向" width="70">
        <template slot-scope="scope">
          {{ scope.row.balanceDirection == "1" ? "借" : "贷" }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="期初余额">
        <el-table-column
          label="数量"
          v-if="!toggleAmount"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.isQuantity == 1"
              v-model="scope.row.initialQuantity"
              @change="changeData(scope.row)"
              size="mini"
              style="text-align: right"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
            <p
              style="text-align: right; color: #494b4e"
              v-show="scope.row.isQuantity == 0"
            >
              {{ scope.row.initialQuantity }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="left" width="120">
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.isInput == 1"
              v-model="scope.row.initialBalance"
              @focus="toggleNumber($event, 'focus')"
              @blur="toggleNumber($event, 'blur')"
              @change="changeData(scope.row)"
              size="mini"
              oninput="value=value.replace(/^(-)?(\d+)\.(\d+).*$/,'$1$2.$3')"
            ></el-input>
            <p
              style="text-align: right; color: #494b4e"
              v-show="scope.row.isInput == 0"
            >
              {{ scope.row.initialBalance }}
            </p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="本年累计借方" v-if="!isFirst">
        <el-table-column
          label="数量"
          v-if="!toggleAmount"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.isQuantity == 1"
              v-model="scope.row.accumulatedDebitQuantity"
              @change="changeData(scope.row)"
              size="mini"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
            <p
              style="text-align: right; color: #494b4e"
              v-show="scope.row.isQuantity == 0"
            >
              {{ scope.row.accumulatedDebitQuantity }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center" width="120">
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.isInput == 1"
              v-model="scope.row.accumulatedDebitMoney"
              @focus="toggleNumber($event, 'focus')"
              @blur="toggleNumber($event, 'blur')"
              @change="changeData(scope.row)"
              size="mini"
              oninput="value=value.replace(/^(-)?(\d+)\.(\d+).*$/,'$1$2.$3')"
            ></el-input>
            <p
              style="text-align: right; color: #494b4e"
              v-show="scope.row.isInput == 0"
            >
              {{ scope.row.accumulatedDebitMoney }}
            </p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="本年累计贷方" v-if="!isFirst">
        <el-table-column
          label="数量"
          v-if="!toggleAmount"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.isQuantity == 1"
              v-model="scope.row.accumulatedLenderQuantity"
              @change="changeData(scope.row)"
              size="mini"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
            <p
              style="text-align: right; color: #494b4e"
              v-show="scope.row.isQuantity == 0"
            >
              {{ scope.row.accumulatedLenderQuantity }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center" width="120">
          <template slot-scope="scope">
            <el-input
              :precision="2"
              v-show="scope.row.isInput == 1"
              v-model="scope.row.accumulatedLenderMoney"
              @focus="toggleNumber($event, 'focus')"
              @blur="toggleNumber($event, 'blur')"
              @change="changeData(scope.row)"
              size="mini"
              oninput="value=value.replace(/^(-)?(\d+)\.(\d+).*$/,'$1$2.$3')"
            ></el-input>
            <p
              style="text-align: right; color: #494b4e"
              v-show="scope.row.isInput == 0"
            >
              {{ scope.row.accumulatedLenderMoney }}
            </p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="年初余额" v-if="!isFirst">
        <el-table-column
          label="数量"
          v-if="!toggleAmount"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <p style="text-align: right; color: #494b4e">
              {{ scope.row.beginningQuantity }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center" width="120">
          <template slot-scope="scope">
            <p style="text-align: right; color: #494b4e">
              {{ scope.row.beginningBalance }}
            </p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        label="实际损益发生额"
        v-if="currtype === 6"
        width="120"
      >
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.isInput == 1"
            @change="changeData(scope.row)"
            size="mini"
            oninput="value=value.replace(/^(-)?(\d+)\.(\d+).*$/,'$1$2.$3')"
            v-model="scope.row.actualProfitAndLoss"
          ></el-input>
          <label
            style="text-align: right; color: #494b4e"
            v-show="scope.row.isInput == 0"
            >{{ scope.row.actualProfitAndLoss }}</label
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加对话框 -->
    <el-dialog
      title="增加明细"
      :visible.sync="duihau"
      width="30%"
      @close="closeHandle"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="科目">
          <el-input v-model="form.listAdd" disabled></el-input>
        </el-form-item>
        <el-form-item label="辅助核算"> </el-form-item>
        <el-form-item
          :label="item.data"
          v-for="(item, index) in shu"
          :key="item.type"
        >
          <el-select
            placeholder="请选择"
            v-model="item.value"
            @change="auxiliaryChange($event, index)"
          >
            <el-option
              v-for="item1 in item.options"
              :key="item1.id"
              :label="`${item1.code} ${item1.value}`"
              :value="`${item1.id},${item1.value}`"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="determin('formAdd')"
            >确 定</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import waves from "@/components/waves"; // 水波纹指令
import { mixins } from "@/mixins/mixin";
import {
  GetList,
  accounting,
  token,
  produce,
  shan,
  trialBalance,
  save,
} from "@/api/acc/setintial";
import { export_json_to_excel } from "@/vendor/Export2Excel";
export default {
  name: "SetInitialAmount",
  directives: {
    waves,
  },
  mixins: [mixins],
  data() {
    return {
      // json_fields: [
      //   { label: "科目编码", value: "subjectCode" },
      //   { label: "科目名称", value: "subjectName" },
      //   {
      //     label: "方向",
      //     value: "balanceDirection",
      //     callback: (val) => {
      //       val = val === 1 ? "借" : "贷";
      //       return val;
      //     },
      //   },
      //   {
      //     label: "期初余额",
      //     subfields: [
      //       { label: "数量", value: "initialQuantity" },
      //       { label: "金额", value: "initialBalance" },
      //     ],
      //   },
      // ],
      toggleAmount: "",
      beginData: [],
      totalData: [],
      isBalance: "",
      dialogVisible: false,
      form: {
        listAdd: "",
        auxiliaryOption: "",
        arr: [],
      },
      initialId: "",
      saveData: [],
      code: "",
      obj: {},
      subjectId: "",
      wu: "",
      shu: [],
      star: "",
      formAdd: {
        id: [],
      },
      widthed: "120px",
      duihau: false,
      tabs: [
        { id: 1, name: "资产" },
        { id: 2, name: "负债" },
        { id: 5, name: "共同" },
        { id: 3, name: "权益" },
        { id: 4, name: "成本" },
        { id: 6, name: "损益" },
      ],

      tabPosition: "资产",
      tableKey: 0,
      list: null,
      listLoading: true,
      multipleSelection: [],

      currtype: 1,
      total: 0,

      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      seleted: "",
      rules: {
        prove: [{ required: true, message: "凭证字不能为空", trigger: "blur" }],
      },
      temp: {
        id: "",
      },

      spans: {
        subjectCode: 10,
        subjectName: 10,
        subjectType: 5,
        balanceDirection: 5,
        helpAccounting: 5,
        foreignCurrency: 5,
        isCashSubject: 5,
        quantityAccount: 5,
        status: 5,
      },
      updown: { proveId: null, value: null },

      options: [
        {
          value: "流动资产",
          label: "流动资产",
        },
        {
          value: "非流动资产",
          label: "非流动资产",
        },
      ],
      value: "流动资产",
    };
  },
  created() {
    this.getListdata();
    token().then((res) => {
      this.star = res.data.data;
    });
  },
  activated() {
    GetList(this.currtype).then((response) => {
      if (response.data.data.length != this.list.length) {
        alert("数据被刷新");
      }
      this.total = response.data.data.length;
      this.listLoading = false;
    });
  },
  methods: {
    changeData(row) {
      this.saveData.unshift(row);
    },
    toggleNumber(e, type) {
      if (type === "focus") {
        let number = this.$numeral(e.target.value);
        e.target.value = number.value();
      } else {
        e.target.value = this.$numeral(e.target.value).format("0,0.00");
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    getListType(val) {
      if (this.isFirst && val === 6) {
        return this.$message.warning("年初启用的账套，不需要录入损益！");
      }
      this.currtype = val;
      this.getListdata();
    },
    getListdata() {
      this.listLoading = true;
      GetList(this.currtype).then((response) => {
        response.data.data.forEach((item) => {
          item.accumulatedDebitMoney = item.accumulatedDebitMoney
            ? this.$numeral(item.accumulatedDebitMoney).format("0,0.00")
            : null;
          item.accumulatedDebitQuantity = item.accumulatedDebitQuantity
            ? item.accumulatedDebitQuantity
            : null;
          item.accumulatedLenderMoney = item.accumulatedLenderMoney
            ? this.$numeral(item.accumulatedLenderMoney).format("0,0.00")
            : null;
          item.accumulatedLenderQuantity = item.accumulatedLenderQuantity
            ? item.accumulatedLenderQuantity
            : null;
          item.beginningBalance = item.beginningBalance
            ? this.$numeral(item.beginningBalance).format("0,0.00")
            : null;
          item.beginningQuantity = item.beginningQuantity
            ? item.beginningQuantity
            : null;
          item.initialQuantity = item.initialQuantity
            ? item.initialQuantity
            : null;
          item.initialBalance = item.initialBalance
            ? this.$numeral(item.initialBalance).format("0,0.00")
            : null;
        });
        this.list = response.data.data;
        this.total = response.data.data.length;
        this.listLoading = false;
      });
    },
    closeHandle() {
      this.shu.forEach((item) => {
        item.value = "";
      });
    },
    // 加号按钮 点击显示对话弹窗
    addition(e) {
      this.formAdd.id = [];
      this.form.arr = [];
      this.wu = e.subjectCode;
      this.form.listAdd =
        e.subjectCode2 + "\xa0" + "\xa0" + "\xa0" + e.subjectName;
      this.code = e.subjectCode;
      this.subjectId = e.subjectId;
      this.duihau = true;
      for (let i = 0; i < this.shu.length; i++) {
        this.form.arr.push({ id: "", value: "" });
      }
      e.helpAccounting.forEach((item) => {
        accounting(item.type).then((res) => {
          item.options = res.data.data.object;
        });
      });
      setTimeout(() => {
        this.shu = e.helpAccounting;
      }, 500);
    },
    // 选择器change事件
    auxiliaryChange(data, index) {
      let [id, val] = data.split(",");
      this.shu[index].helpid = id;
      this.shu[index].helpvalue = val;
    },

    // 添加明细确定提交按钮
    determin() {
      let list = this.shu.map((item) => item.helpid);
      console.log(list);
      produce(this.subjectId, list).then((res) => {
        if (res.data.retCode === 500) return this.$message.error("添加失败");
        // console.log(res);
        this.$message.success("添加成功");
        this.getListdata();
        this.$refs.form.resetFields();
      });
      this.duihau = false;
    },
    //取消
    close() {
      this.duihau = false;
      this.shu.forEach((item) => {
        item.value = "";
      });
    },

    //删除
    leave(e) {
      this.initialId = e.id;
      shan(this.initialId).then((res) => {
        if (res.data.retCode !== 200)
          return this.$message.error(res.data.message);
        this.$message.success("删除成功");
        this.getListdata();
      });
    },

    resetTemp() {
      this.temp.prove = "";
      this.temp.proveTitle = "记账凭证";
      this.temp.isDefault = "1";
    },
    unique() {
      //根据id去重
      const res = new Map();
      return this.saveData.filter((item) => !res.has(item.id));
    },
    // 保存/上传
    handleCreate() {
      let finalArr = this.unique();
      this.listLoading = true;
      finalArr.forEach((item) => {
        if (!Array.isArray(item.assistId) && item.assistId !== null) {
          item.assistId = item.assistId.split(",");
        }
        item.amount = item.initialQuantity;
        item.borrow = item.balanceDirection;
        item.level = null;
        item.version = null;
        item.accumulatedDebitMoney = this.$numeral(
          item.accumulatedDebitMoney
        ).value();
        item.accumulatedLenderMoney = this.$numeral(
          item.accumulatedLenderMoney
        ).value();
        item.beginningBalance = this.$numeral(item.beginningBalance).value();
        item.initialBalance = this.$numeral(item.initialBalance).value();
      });
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      if (finalArr.length == 0) {
        this.listLoading = false;
        return this.$message.warning("请先修改金额");
      }
      if (this.currtype === 6) {
        let flag = false;
        finalArr.forEach((item) => {
          if (item.accumulatedDebitMoney === item.accumulatedLenderMoney) {
            item.actualProfitAndLoss = item.accumulatedDebitMoney;
            flag = true;
          } else {
            this.$message.warning(
              `损益类科目(${finalArr[0].subjectName})的期初余额应为零!`
            );
            this.saveData = [];
            return;
          }
        });
        if (flag) {
          save(finalArr).then((res) => {
            if (res.data.retCode !== 200) {
              this.saveData = [];
              return this.$message.error(res.data.message);
            }
            this.saveData = [];
            this.getListdata();
            return this.$message.success("保存成功");
          });
        }
        this.listLoading = false;
        return;
      }

      save(finalArr).then((res) => {
        if (res.data.retCode !== 200) {
          this.listLoading = false;
          this.saveData = [];
          return this.$message.error(res.data.message);
        }
        this.$message.success("保存成功");
        this.saveData = [];
        this.getListdata();
      });
      this.listLoading = false;
    },

    // createData() {
    //   this.$refs.dataForm.validate((valid) => {
    //     if (valid) {
    //       addprove(this.temp).then(() => {
    //         this.getListdata();
    //         // this.list.unshift(this.temp)
    //         this.dialogFormVisible = false;
    //         this.$notify({
    //           title: "成功",
    //           message: "创建成功",
    //           type: "success",
    //           duration: 2000,
    //         });
    //       });
    //     }
    //   });
    // },
    // 导出
    // handleDownload() {
    //   exportinitial().then((response) => {});
    // },
    handleBalance() {
      this.dialogVisible = true;
      trialBalance().then((res) => {
        let beginArr = res.data.data.begin.map(
          (item) => (item = this.$numeral(item).format("0,0.00"))
        );

        let totalArr =
          res.data.data.total &&
          res.data.data.total.map(
            (item) => (item = this.$numeral(item).format("0,0.00"))
          );

        console.log(res.data.data.begin);
        this.beginData = beginArr;
        this.totalData = totalArr || [0, 0, 0];
        this.isBalance = res.data.data.isBalance;
      });
    },
    changehesuan() {
      if (this.checkedhesuan) {
      } else {
      }
    },
    updateList() {
      this.getListdata();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
    exportExcel() {
      const multiHeader = [
        [
          "科目编码",
          "科目名称",
          "方向",
          "期初余额",
          "本年累计借方",
          "本年累计借方",
          "本年累计贷方",
          "本年累计贷方",
          "年初余额",
          "年初余额",
          "实际损益发生额",
          "实际损益发生额",
          "",
        ],
      ];
      const tHeader = [
        "",
        "",
        "",
        "数量",
        "金额",
        "数量",
        "金额",
        "数量",
        "金额",
        "数量",
        "金额",
        "金额",
      ]; //二级表头
      const filterVal = [
        "subjectCode",
        "subjectName",
        "balanceDirection",
        "initialQuantity",
        "initialBalance",
        "accumulatedDebitQuantity",
        "accumulatedDebitMoney",
        "accumulatedLenderQuantity",
        "accumulatedLenderMoney",
        "beginningQuantity",
        "beginningBalance",
        "actualProfitAndLoss",
      ]; //表头所对应后台返回的字段
      const data = this.formatJson(filterVal, this.list);
      const merges = [
        "A1:A2",
        "B1:B2",
        "C1:C2",
        "D1:E1",
        "F1:G1",
        "H1:I1",
        "J1:K1",
        "L1:L1",
      ];
      export_json_to_excel({
        multiHeader, //这里是第一行的表头
        header: tHeader, //这里应该是算第二行的表头
        data, //数据
        merges, //合并行
        filename: "财务初始余额表" + "_" + new Date().getTime(),
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-input--mini .el-input__inner {
  text-align: right;
  border: 1px solid #aaa;
  padding: 0 5px;
}
.header {
  /* position: fixed; */
  display: flex;
  justify-content: space-between;
}
/deep/ .cell {
  padding: 0;
}
/deep/ .el-table--mini td {
  padding: 0;
}

.dis {
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  span:nth-of-type(1) {
    text-align: left;
    flex: 1;
  }
}

.dis .jia {
  margin-right: 10px;
  font-size: 30px;
  cursor: pointer;
}

// .dis span:last-child:hover {
//   color: #bfcbd9;
// }

.dis .shan {
  font-size: 24px;
  cursor: pointer;
  margin-right: 12px;
}

.aa {
  background: url(../../../assets/images/ui-th.png) repeat-x #eee;
  color: #000;
}

input {
  width: 99%;
  height: 100%;
  text-align: right;
}

.footer {
  background: rgba(231, 231, 231, 0.295);
}

/* .look:hover {
  background: #ecf5ff;

} */
.balanceTable {
  width: 100%;
  border: 1px solid #999;
  border-collapse: collapse;
  thead {
    line-height: 40px;
  }
  tr,
  td,
  th {
    border: 1px solid #999;
  }
}
.successB {
  padding: 10px 30px;
  color: #689800;
  font-size: 14px;
  border: 1px solid #afd759;
  background-color: #faffef;
  box-shadow: 0 0 5px rgb(130, 190, 0 / 35%);
  border-radius: 2px;
}
.errorB {
  background-color: #fff5f5;
  color: #dd4e4e;
  box-shadow: 0 0 5px rgb(225, 86, 86 / 35%);
  border: 1px solid #afd759;
  border-color: #eba0a0;
  padding: 10px 30px;
  font-size: 14px;

  border-radius: 2px;
}
</style>
