
<template>
  <div
    class="charge-container"
    id="chargeContainer"
    v-loading="loading"
    element-loading-text="给我一点时间"
  >
    <div style="margin-bottom: 10px">
      <el-button
        type="primary"
        @click="
          $router.push('/EnteringVoucher/EnteringVoucher/EnteringVoucher')
        "
        >新增</el-button
      >
      <el-button @click="preservation(1)">保存</el-button>
      <el-button @click="print">打印</el-button>
      <el-button @click="preservation(3)" v-if="!disabled">审核</el-button>
      <el-button @click="preservation(4)" v-else>反审核</el-button>
      <el-button>复制</el-button>
      <el-button @click="deleteHandle(voucher.word)" v-if="!disabled"
        >删除</el-button
      >
      <el-dropdown @command="tempCommand">
        <el-button>
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="保存为凭证模板"
            >保存为凭证模板</el-dropdown-item
          >
          <el-dropdown-item command="红字冲销">红字冲销</el-dropdown-item>
          <el-dropdown-item command="选项">选项</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="toggleView">返回</el-button>
    </div>
    <div class="charge">
      <!--<h1 class="charge-title">记账凭证</h1>-->
      <div class="charge-header">
        <div>
          凭证字
          <el-select
            style="width: 80px"
            v-model="voucher.prove"
            @change="voucherChange($event)"
            :disabled="disabled"
          >
            <el-option
              v-for="item in wordList"
              :key="item.name"
              :label="item.prove"
              :value="`${item.id},${item.prove}`"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input
            type="number"
            style="width: 80px"
            min="1"
            v-model="voucher.no"
            :disabled="disabled"
          ></el-input
          >号
        </div>

        <div>
          日期
          <el-date-picker
            type="date"
            style="width: 145px"
            v-model="voucher.date"
            value-format="yyyy-MM-dd"
            :disabled="disabled"
            @change="changeImportPeriod"
          ></el-date-picker>
        </div>

        <div style="font-size: 24px">记账凭证</div>
        <div>
          {{ voucher.importPeriod }}
        </div>
        <div class="hide" v-show="disabled">
          <img src="@/assets/images/audit.png" alt="" />
        </div>
        <div style="float: right; position: relative">
          附单据
          <el-input
            type="number"
            style="width: 80px"
            min="0"
            v-model="voucher.bill"
            :disabled="disabled"
          ></el-input>
          张
        </div>
      </div>
      <table class="charge-table" border="1" style="margin-left: -30px">
        <tr>
          <td width="3%"></td>
          <td :width="isQuantity ? '13%' : '22%'">摘要</td>
          <td :width="isQuantity ? '27%' : '29%'">会计科目</td>
          <td width="10%" v-if="isQuantity">数量</td>
          <td width="45%">
            <table style="height: 50px">
              <tr style="border-bottom: 1px solid #bab9b9">
                <td width="50%" style="border-right: 1px solid #bab9b9">
                  借方金额
                </td>
                <td width="50%">贷方金额</td>
              </tr>
              <tr>
                <td style="border-right: 1px solid #bab9b9">
                  <table class="debtor-lender-table" style="height: 100%">
                    <tr>
                      <td>亿</td>
                      <td>千</td>
                      <td>百</td>
                      <td>十</td>
                      <td>万</td>
                      <td>千</td>
                      <td>百</td>
                      <td>十</td>
                      <td>元</td>
                      <td>角</td>
                      <td>分</td>
                    </tr>
                  </table>
                </td>
                <td>
                  <table class="debtor-lender-table" style="height: 100%">
                    <tr>
                      <td>亿</td>
                      <td>千</td>
                      <td>百</td>
                      <td>十</td>
                      <td>万</td>
                      <td>千</td>
                      <td>百</td>
                      <td>十</td>
                      <td>元</td>
                      <td>角</td>
                      <td>分</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <!-- 操作 -->
          <td>
            <div @click="addList" class="charge-table-icon" v-if="!disabled">
              <i
                class="el-icon-circle-plus-outline"
                style="color: orangered"
              ></i>
            </div>
            <div
              @click="removeList(index)"
              class="charge-table-icon"
              v-if="!disabled"
            >
              <i class="el-icon-remove-outline" style="color: #4a90e2"></i>
            </div>
          </td>
          <!-- 操作 -->
          <!-- 摘要 -->
          <td>
            <div
              @click="showInput(index, 'main', disabled)"
              v-if="!item.isShowMainInput"
              class="main-subject test"
              style="padding: 9px 10px"
            >
              <p class="main-subject2">
                {{ item.content }}
              </p>
            </div>
            <div class="main-subject test1" v-if="item.isShowMainInput">
              <!--<input type="text" v-model="item.main" @blur="hideInput(index,'main')" v-focus @keyup="keyupEvents(index,$event,1)">-->
              <input
                v-model="item.content"
                @blur="hideInput(index, 'main')"
                @keyup="keyupEvents(index, $event, 1)"
                :id="'main' + index"
                v-focus
                oninput="value=value.replace(/\n/,'')"
              />
            </div>
            <i
              v-if="item.isShowMainInput"
              class="el-icon-more special-elements"
              @click="selectionList(index, 'main')"
            ></i>
          </td>
          <!-- 摘要 -->
          <!-- 会计科目 -->
          <td>
            <div
              @click="showInput(index, 'subject', disabled)"
              v-if="!item.isShowSubjectInput"
              class="main-subject"
              :style="{
                padding: item.nameLen > 28 ? '0 10px' : '9px 10px',
                height: item.nameLen > 45 ? '70px' : '60px',
              }"
            >
              <p class="main-subject2">
                {{
                  item.otherSubjectName
                    ? item.otherSubjectName
                    : item.subjectName
                }}
              </p>
              <p class="main-subject2">
                <span
                  style="font-size: 12px"
                  v-if="item.isQuantity && item.subjectName"
                >
                  余额：{{ item.balance ? item.balance : 0 }}
                </span>
                <span
                  style="font-size: 12px"
                  v-if="item.isQuantity && item.subjectName"
                >
                  数量：{{ item.quantity ? item.quantity : 0 }}
                </span>
                <span
                  style="font-size: 12px"
                  v-if="item.isQuantity && item.subjectName"
                >
                  平均单价：{{ item.price ? item.price : 0 }}
                </span>
              </p>
            </div>
            <div class="main-subject" v-if="item.isShowSubjectInput">
              <!--<input type="text" v-model="item.subject" @blur="hideInput(index,'subject')" v-focus @keyup="keyupEvents(index,$event,2)">-->
              <input
                v-focus
                v-model="item.subjectName"
                @blur="hideInput(index, 'subject')"
                @focus="focusSubject(index, $event)"
                @input="inputSubject(index, $event)"
                @keyup="keyupEvents(index, $event, 2)"
                oninput="value=value.replace(/\n/,'')"
                @keydown.up="navigateOptions(index, 'prev')"
                @keydown.down="navigateOptions(index, 'next')"
                @keyup.enter="navigateOptions(index, 'enter')"
              />
            </div>

            <i
              v-if="item.isShowSubjectInput"
              class="el-icon-more special-elements"
              @click="selectionList(index, 'subject')"
            ></i>

            <div class="auxiliaryBox" v-if="item.isAuxiliary">
              <el-row>
                <el-col
                  v-for="(item11, index11) in item.AuxiliaryList"
                  :key="item11.type"
                  style="padding: 10px"
                  ><label>
                    {{ item11.data }}
                    <el-select
                      v-model="item11.value"
                      placeholder="请选择"
                      @focus="auxiliaryFocus(index, index11, item11.type)"
                      @change="auxiliaryChange($event, index, index11)"
                    >
                      <el-option
                        ref="auxiliarySelect"
                        v-for="item in AuxiliaryOption"
                        :key="item.id"
                        :label="item.value"
                        :value="`${item.id},${item.value}`"
                      >
                      </el-option>
                    </el-select> </label
                ></el-col>
              </el-row>

              <el-button
                @click="AuxiliaryBtn(index)"
                :disabled="item.auxiliaryDisable"
                >确定</el-button
              >
            </div>
            <div
              class="ui-box"
              v-show="item.searchSubjectBoxShow"
              :id="'ui-box' + index"
            >
              <div>
                <div v-show="!searchList.length" class="b-item">
                  没有匹配的选项
                </div>
                <div
                  ref="list"
                  v-show="searchList.length"
                  class="b-item"
                  v-for="(item, index) in searchList"
                  :key="item.id"
                  @mouseenter="currentIndex(index)"
                  @mouseleave="currentIndexLeave(index)"
                  @mousedown.prevent="searchSelect(item, index)"
                >
                  {{ item.otherSubjectName }}
                </div>
              </div>
            </div>
          </td>
          <!-- 会计科目 -->
          <!-- 数量 -->
          <td
            v-if="isQuantity"
            :class="item.isQuantity ? 'td-auxiliary-dis' : ''"
          >
            <el-row v-if="item.isQuantity && item.subjectName">
              <el-col :span="8">
                <span> 数量： </span>
              </el-col>
              <el-col :span="12">
                <input
                  class="miniInput"
                  :id="'quantity' + index"
                  :disabled="disabled"
                  v-model="item.subjectImportAmount"
                  @keyup.enter="toUnitPrice(index)"
                  @input="amountInputKeyup(index)"
                />
              </el-col>
              <el-col :span="4">
                <span>
                  {{ item.unit }}
                </span>
              </el-col>
            </el-row>
            <el-row v-if="item.isQuantity && item.subjectName">
              <el-col :span="8">
                <span> 单价： </span>
              </el-col>
              <el-col :span="15">
                <input
                  class="miniInput"
                  :id="'unitPrice' + index"
                  :disabled="disabled"
                  v-model="item.unitPrice"
                  @input="priceInputKeyup(index)"
                  @keyup.enter="toDebtor(index)"
                />
              </el-col>
            </el-row>
          </td>
          <!-- 数量 -->
          <!-- 借方金额 -->
          <td>
            <table>
              <tr>
                <td width="50%" style="border-right: 1px solid #bab9b9">
                  <table class="debtor-tbale debtor-lender-table">
                    <tr
                      @click="showInput(index, 'debtor', disabled)"
                      v-if="!item.isShowDebtorInput"
                      :class="item.debtor * 1 < 0 ? 'tr-negative' : ''"
                    >
                      <td
                        v-for="(debtor, index) in item.debtorList"
                        :key="index"
                      >
                        {{ debtor }}
                      </td>
                    </tr>

                    <tr v-if="item.isShowDebtorInput">
                      <input
                        type="text"
                        @blur="hideInput(index, 'debtor')"
                        @keyup="debtorInputKeyUp(index, $event)"
                        v-model="item.debtor"
                        maxlength="12"
                        v-focus
                        oninput="value=value.replace(/^(-)?(\d+)\.(\d\d).*$/,'$1$2.$3')"
                      />
                    </tr>
                  </table>
                </td>
                <!-- 借方金额 -->
                <!-- 贷方金额 -->
                <td width="50%">
                  <table class="lender-tbale debtor-lender-table">
                    <tr
                      v-if="!item.isShowLenderInput"
                      @click="showInput(index, 'lender', disabled)"
                      :class="item.lender * 1 < 0 ? 'tr-negative' : ''"
                    >
                      <td
                        v-for="(lender, index) in item.lenderList"
                        :key="index"
                      >
                        {{ lender }}
                      </td>
                    </tr>

                    <tr v-if="item.isShowLenderInput">
                      <input
                        type="text"
                        @blur="hideInput(index, 'lender')"
                        @keyup="lenderInputKeyUp(index, $event, 4)"
                        v-model="item.lender"
                        maxlength="12"
                        v-focus
                        oninput="value=value.replace(/^(-)?(\d+)\.(\d\d).*$/,'$1$2.$3')"
                      />
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
          <!-- 贷方金额 -->
        </tr>
        <tr>
          <td></td>
          <td
            :colspan="isQuantity ? 3 : 2"
            style="text-align: left; padding-left: 10px"
          >
            合计：{{ num }}
          </td>
          <td>
            <table>
              <tr>
                <td width="50%" style="border-right: 1px solid #bab9b9">
                  <table class="debtor-tbale debtor-lender-table">
                    <tr>
                      <td
                        v-for="(debtor, index) in debtorTotalList"
                        :key="index"
                      >
                        {{ debtor }}
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="50%">
                  <table class="lender-tbale debtor-lender-table">
                    <tr>
                      <td
                        v-for="(lender, index) in lenderTotalList"
                        :key="index"
                      >
                        {{ lender }}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <el-row style="height: 50px; line-height: 50px">
        <el-col :span="4"> 制单人：{{ createUser }} </el-col>
        <el-col :span="6" :offset="8" style="color: #666">
          录入时间：{{ createDate }}
        </el-col>
        <el-col :span="6" style="color: #666">
          最后修改时间：{{ updateDate }}
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="10" :offset="4">
        <span>
          注：请勿手工录入结转损益凭证
          ，否则将影响利润表取数。请通过结账-结转损益-自动生成结转损益凭证
        </span>
      </el-col>
      <!-- <el-button @click="test11">测试</el-button> -->
    </el-row>
    <div v-if="aa">
      <BillVoucherTemplatea
        :msgData="msg"
        @getData="fn"
        :sDetail="sDetail"
      ></BillVoucherTemplatea>
    </div>
    <div v-if="bb">
      <MainVoucherTemplatea @getMain="getMain"></MainVoucherTemplatea>
    </div>
    <div v-if="cc">
      <insertVoucherTemplate
        @insertTemp="insertTemp"
        :tempList="tempList"
      ></insertVoucherTemplate>
    </div>
    <el-dialog title="打印详情" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="主管">
          <el-input v-model="printDetail.manager"></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="printDetail.examine"></el-input>
        </el-form-item>
        <el-form-item label="出纳">
          <el-input v-model="printDetail.cashier"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="printSend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
// import {
//   addObj,
//   getObj,
//   putObj,
//   getWordList,
//   getMainList,
//   getSubjectList,
// } from "@/api";
import {
  auditVoucher,
  saveVoucher,
  delVoucher,
  antiAuditVoucher,
} from "@/api/acc/recordVoucher";
import { GetList } from "@/api/acc/prov";
import { GetAllList } from "@/api/acc/BillVoucherTemplate";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
import MainVoucherTemplatea from "@/views/acc/Setup/MainVoucherTemplatea";
import insertVoucherTemplate from "../Setup/insertVoucherTemplate";
import { toChinesNum } from "@/utils/toggleNumber";
import { GetListPageByType } from "@/api/acc/assisttypelist";
import { collatingData } from "@/utils/collatingData";

export default {
  name: "voucherForm",
  components: {
    BillVoucherTemplatea,
    MainVoucherTemplatea,
    insertVoucherTemplate,
  },
  props: ["voucherList"],
  data() {
    return {
      dialogVisible: false,
      bItemIndex: 1, //科目列表的移入索引
      subjectAllList: [],
      sDetail: true, //开启父级科目不可选
      loading: true,
      disabled: false,
      voucher: {
        word: "",
        no: "",
        proveId: "",
        date: "",
        bill: "",
        importPeriod: "",
        prove: "",
      },
      list: [],
      msg: "",
      createUser: "",
      aa: false,
      bb: false,
      cc: false,
      num: "",
      sum: "",
      createDate: "",
      updateDate: "",
      debtorTotal: 0,
      debtorTotalList: ["", "", "", "", "", "", "", "", "", "", ""],
      lenderTotal: 0,
      lenderTotalList: ["", "", "", "", "", "", "", "", "", "", ""],
      wordList: [],
      mainList: [],
      subjectList: [],
      dialogMainVisible: false,
      dialogSubjectVisible: false,
      dialogAuxiliaryVisible: false,
      dialogMainIndex: 0,
      dialogSubjectIndex: 0,
      dialogAuxiliaryIndex: 0,
      isOpenQuantity: 0,
      isQuantity: false,
      isAuxiliary: false,
      saveVisible: true,
      AuxiliaryOption: [],
      reviewer: "",
      printdata: [],
      printDetail: {
        manager: "",
        examine: "",
        cashier: "",
      },
    };
  },
  created() {
    GetList(1, 10).then((res) => (this.wordList = res.data.data.object));
    GetAllList().then((res) => {
      this.subjectAllList = res.data.data;
    });
  },
  watch: {
    deep: true,
    voucherList(curVal, oldVal) {
      this.reviewer = curVal.reviewer;
      this.createUser = curVal.creatBy;
      this.updateDate = curVal.updateDate;
      this.createDate = curVal.createDate;
      this.$nextTick(() => {
        this.voucher.word = curVal.id;
        this.voucher.prove = curVal.prove;
        this.voucher.no = curVal.proveNo;
        this.voucher.proveId = curVal.proveId;
        this.voucher.date = curVal.chapter;
        this.voucher.bill = curVal.attachedDocument;
        this.voucher.importPeriod = curVal.importPeriod;
        curVal.content.forEach((item, index) => {
          item.isQuantity = false;
          item.auxiliaryDisable = true;
          item.AuxiliaryList = [];
          item.auxiliaryDisable = true;
          item.isAuxiliary = false;
          item.isShowMainInput = false;
          item.isShowSubjectInput = false;
          item.isShowDebtorInput = false;
          item.isShowLenderInput = false;
          item.searchSubjectBoxShow = false;
          item.debtor =
            item.balanceDirection == 1 ? item.subjectImportMoney : "";
          item.lender =
            item.balanceDirection == 2 ? item.subjectImportMoney : "";
          item.debtorList = ["", "", "", "", "", "", "", "", "", "", ""];
          item.lenderList = ["", "", "", "", "", "", "", "", "", "", ""];
          if (item.debtor !== "") {
            let debtor = item.debtor + "";
            item.debtorList = collatingData(debtor, item.debtorList);
          }
          if (item.lender !== "") {
            let lender = item.lender + "";
            item.lenderList = collatingData(lender, item.lenderList);
          }
        });
        this.list = curVal.content;
        for (let i in curVal.content) {
          this.list[i].aid = curVal.content[i].aid;
          if (this.list[i].subjectName) {
            this.list[i].nameLen = this.list[i].subjectName.length;
          }
        }
        let st = this.list.length;
        for (st; st < 4; st++) {
          this.addList();
        }
        this.calcDebtorTotal();
        this.calcLenderTotal();
        this.judgeisQuantity();
      });
      this.loading = false;
      if (this.reviewer !== "未审核") {
        this.disabled = true;
      }
    },
  },
  computed: {
    searchList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(
          this.list[this.dialogSubjectIndex].subjectName,
          0
        )
      );
    },
  },
  mounted() {},
  updated() {
    //给特定区域添加ID   绑定onmousedown 事件
  },
  beforeDestroy() {},
  deactivated() {
    this.$bus.$off("sendPrintData");
  },
  methods: {
    insertTemp(bool) {
      this.cc = bool;
    },
    test11() {
      console.log(this.list);
    },
    toggleView() {
      this.$emit("toggleView", true);
    },
    AuxiliaryBtn(index) {
      this.list[index].isAuxiliary = !this.list[index].isAuxiliary;
      let arr = [];
      this.list[index].AuxiliaryList.forEach((item) => arr.push(item.value));
      this.list[index].subjectName =
        this.list[index].subjectName + "_" + arr.join("_");
      this.list[index].otherSubjectName =
        this.list[index].otherSubjectName + "_" + arr.join("_");
      this.list[index].subjectLen = this.list[index].otherSubjectName
        ? this.list[index].otherSubjectName.length
        : 0;
      this.list[index].aid = this.list[index].AuxiliaryList.map(
        (item) => item.id
      );
      this.list[index].AuxiliaryList.forEach((item) => (item.value = ""));
      this.list[index].AuxiliaryList.forEach((item) => delete item.id);
    },
    auxiliaryFocus(index, index11, type) {
      GetListPageByType(type, 1, 10).then(
        (res) => (this.AuxiliaryOption = res.data.data.object)
      );
    },
    auxiliaryChange(val, index, index11) {
      this.$forceUpdate();
      let [id, value] = val.split(",");
      this.list[index].AuxiliaryList[index11].id = id;
      this.list[index].AuxiliaryList[index11].value = value;
      if (
        this.list[index].AuxiliaryList.every((item) =>
          item.hasOwnProperty("id")
        )
      ) {
        this.list[index].auxiliaryDisable = false;
      } else {
        this.list[index].auxiliaryDisable = true;
      }
    },
    voucherChange(val) {
      let [id, prove] = val.split(",");
      this.voucher.prove = prove;
      this.voucher.proveId = id;
    },
    judgeisQuantity() {
      let flag = this.list.some((item) => {
        return item.isOpenQuantity === 1;
      });
      this.list.forEach((item) => {
        if (item.isOpenQuantity === 1) {
          item.isQuantity = true;
        }
      });
      this.isQuantity = flag;
    },
    openMainDialog() {
      this.dialogMainVisible = true;
    },

    openSubjectDialog() {
      this.dialogSubjectVisible = true;
    },
    tempCommand(command) {
      if (command === "保存为凭证模板") {
        this.cc = true;
        let reqObj = this.checkListData();
        if (reqObj) this.tempList = reqObj;
      }
    },
    changeImportPeriod() {
      let year = this.voucher.date.substr(0, 4);
      let mouth = this.voucher.date.substr(5, 2).replace(/^[0]/, "");
      this.voucher.importPeriod = `${year}年第${mouth}期`;
    },
    showInput(index, type, flag) {
      if (flag === true) return;
      for (let i in this.list) {
        this.list[i].isShowDebtorInput = false;
        this.list[i].isShowLenderInput = false;
        this.list[i].isShowMainInput = false;
        this.list[i].isShowSubjectInput = false;
        if (i == index && type == "debtor") {
          this.list[index].isShowDebtorInput = true;
        } else if (i == index && type == "lender") {
          this.list[index].isShowLenderInput = true;
        } else if (i == index && type == "main") {
          this.list[index].isShowMainInput = true;
        } else if (i == index && type == "subject") {
          this.list[index].isShowSubjectInput = true;
        }
      }
      this.$forceUpdate();
    },
    hideInput(index, type) {
      let debtor = this.list[index].debtor + "";
      if (type == "debtor") {
        this.list[index].isShowDebtorInput = false;
        //判断是否有小数点
        let inx = debtor.indexOf(".");
        if (inx != -1 && this.list[index].debtor.length - 1 != inx) {
          this.list[index].debtor = (this.list[index].debtor * 1).toFixed(2);
        }
      } else if (type == "lender") {
        let lender = this.list[index].lender + "";
        //判断是否有小数点
        console.log(typeof this.list[index].lender);
        this.list[index].isShowLenderInput = false;
        let inx = lender.indexOf(".");
        if (inx != -1 && this.list[index].lender.length - 1 != inx) {
          this.list[index].lender = (this.list[index].lender * 1).toFixed(2);
        }
      } else if (type == "main") {
        setTimeout(() => {
          this.list[index].isShowMainInput = false;
          this.$forceUpdate();
        }, 100);
      } else if (type == "subject") {
        setTimeout(() => {
          this.list[index].searchSubjectBoxShow = false;
          this.list[index].isShowSubjectInput = false;
        }, 100);
      }
      this.$forceUpdate();
    },
    deleteHandle(id) {
      this.$confirm("是否删除此的凭证？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delVoucher(id).then((res) => {
            if (res.data.retCode !== 200)
              return this.$message.error("删除失败");
            this.$emit("toggleView", true);
            return this.$message.success("删除成功");
          });
        })
        .catch(() => {});
    },
    fn(e, a, b) {
      this.aa = e;
      if (a == undefined) return;

      this.list[this.dialogSubjectIndex].subjectName = a.subjectName;
      this.list[this.dialogSubjectIndex].subjectId = a.id;
      this.list[this.dialogSubjectIndex].isOpenQuantity = a.isOpenQuantity;
      this.list[this.dialogSubjectIndex].unit = a.quantityUnit;
      this.judgeisQuantity();
      if (a.aid) {
        let len = a.aid.length;
        this.list[this.dialogSubjectIndex].isAuxiliary = true;
        for (let i = 0; i < len; i++) {
          this.list[this.dialogSubjectIndex].AuxiliaryList = a.aid;
        }
      } else {
        this.list[this.dialogSubjectIndex].isAuxiliary = false;
        this.list[this.dialogSubjectIndex].aid = [];
        this.list[this.dialogSubjectIndex].AuxiliaryList = [];
      }
    },
    getMain(bool, data) {
      this.bb = bool;
      if (data == undefined) return;
      this.list[this.dialogMainIndex].content = data.content;
      this.list[this.dialogMainIndex].contentId = data.id;
      this.list[this.dialogMainIndex].createTime = data.createTime;
    },
    selectionList(index, type) {
      if (type == "main") {
        this.bb = true;
        this.dialogMainIndex = index;
        this.openMainDialog();
      } else if (type == "subject") {
        this.aa = true;
        this.msg = true;
        this.dialogSubjectIndex = index;
        this.openSubjectDialog();
      } else if (type == "auxiliary") {
        this.dialogAuxiliaryIndex = index;
      }
    },
    keyboardEvents(type, number) {
      let total = this.list.length * 4;
      if (type == "enter") {
        number++;
      } else if (type == "up" && number - 4 > 0) {
        number = number - 4;
      } else if (type == "down" && number + 4 <= total) {
        number = number + 4;
      }
      if (type == "enter" && number > total) {
        this.addList();
      }
      let index = parseInt(number / 4);
      let remaind = number % 4;
      if (remaind == 1) {
        this.showInput(index, "main");
      } else if (remaind == 2) {
        this.showInput(index, "subject");
      } else if (remaind == 3) {
        this.showInput(index, "debtor");
      } else if (remaind == 0) {
        this.showInput(index - 1, "lender");
      }
    },
    keyupEvents(index, e, remaind) {
      if ((e.keyCode == 13 || e.keyCode == 9) && remaind === 2) {
        this.$nextTick(() => {
          if (!this.list[index].isOpenQuantity) {
            this.keyboardEvents("enter", index * 4 + remaind);
          } else {
            setTimeout(() => {
              this.toQuantity(index);
            }, 0);
          }
        });
      }
      if (e.keyCode == 8 && remaind === 2) {
        this.$nextTick(() => {
          this.list[index].isAuxiliary = false;
          this.$forceUpdate();
        });
      }
      if (e.keyCode == 38 && remaind !== 2) {
        //console.log('拦截到38');//上
        this.keyboardEvents("up", index * 4 + remaind);
        return;
      } else if (e.keyCode == 40 && remaind !== 2) {
        //console.log('拦截到40');//下
        this.keyboardEvents("down", index * 4 + remaind);
        return;
      } else if ((e.keyCode == 13 || e.keyCode == 9) && remaind !== 2) {
        //console.log('拦截到13');//enter键 tab
        this.keyboardEvents("enter", index * 4 + remaind);
        return;
      } else if (e.keyCode == 118) {
        //console.log('拦截到118');//F7
        if (remaind == 1) {
          this.selectionList(index, "main");
        } else if (remaind == 2) {
          this.selectionList(index, "subject");
        }
        return;
      }

      let main = this.list[index].content;
      let subject = this.list[index].subjectName;
      if (index - 1 >= 0) {
        if (main && main.indexOf("//") != -1) {
          this.list[index].content = this.list[0].content;
        }
        if (main && main.indexOf("..") != -1) {
          this.list[index].content = this.list[index - 1].content;
        }
      }
      //判断是否显示辅助核算
      this.judgeisQuantity();
    },
    lenderInputKeyUp(index, e, remaind) {
      this.list[index].balanceDirection = 2;
      //   this.list[index].lender=this.list[index].lender.replace(/\D/g,'');
      if (e.keyCode === 187) {
        this.calcDebtorTotal(index);
        this.calcLenderTotal(index);
        let cha = this.debtorTotal - this.lenderTotal;
        if (cha == 0) {
          cha = "";
        }
        this.list[index].lender = cha + "";
      } else if (e.keyCode === 32) {
        this.list[index].isShowDebtorInput = true;
        this.list[index].isShowLenderInput = false;
        this.list[index].balanceDirection = 1;
        this.list[index].debtor = this.list[index].lender.trim();
        this.list[index].lender = "";
        this.list[index].lenderList = [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ];
        let debtorList = ["", "", "", "", "", "", "", "", "", "", ""];
        this.list[index].debtorList = collatingData(
          this.list[index].debtor,
          debtorList
        );
        this.calcLenderTotal();
        this.calcDebtorTotal();
        return;
      } else if (e.keyCode == 13 || e.keyCode == 9) {
        if (e.target.value === "") return;
        else remaind = 4;
        this.keyupEvents(index, e, remaind);
        return;
      }
      this.list[index].debtor = "";
      this.list[index].debtorList = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ];
      let lender = this.list[index].lender;
      let lenderList = ["", "", "", "", "", "", "", "", "", "", ""];
      if (this.list[index].subjectImportAmount) {
        this.list[index].unitPrice =
          lender / this.list[index].subjectImportAmount;
      }
      this.list[index].lenderList = collatingData(lender, lenderList);
      this.calcLenderTotal();
      this.calcDebtorTotal();
    },
    debtorInputKeyUp(index, e, remaind) {
      this.list[index].balanceDirection = 1;
      if (e.keyCode === 187) {
        this.calcDebtorTotal(index);
        this.calcLenderTotal(index);
        let cha = this.lenderTotal - this.debtorTotal;
        if (cha == 0) {
          cha = "";
        }
        this.list[index].debtor = cha + "";
      } else if (e.keyCode === 32) {
        this.list[index].isShowLenderInput = true;
        this.list[index].isShowDebtorInput = false;
        this.list[index].balanceDirection = 2;
        this.list[index].lender = this.list[index].debtor.trim();
        this.list[index].debtor = "";
        this.list[index].debtorList = [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ];
        let lenderList = ["", "", "", "", "", "", "", "", "", "", ""];
        this.list[index].lenderList = collatingData(
          this.list[index].lender,
          lenderList
        );
        this.calcDebtorTotal();
        this.calcLenderTotal();
        return;
      } else if (e.keyCode == 13 || e.keyCode == 9) {
        if (e.target.value === "") remaind = 3;
        else remaind = 4;
        this.keyupEvents(index, e, remaind);
        return;
      }
      this.list[index].lender = "";
      this.list[index].lenderList = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ];
      let debtor = this.list[index].debtor;
      let debtorList = ["", "", "", "", "", "", "", "", "", "", ""];
      if (this.list[index].subjectImportAmount) {
        this.list[index].unitPrice =
          debtor / this.list[index].subjectImportAmount;
      }

      this.list[index].debtorList = collatingData(debtor, debtorList);
      this.calcDebtorTotal();
      this.calcLenderTotal();
    },
    amountInputKeyup(index) {
      this.list[index].balanceDirection = 1;
      if (this.list[index].debtor) {
        let debtorNum = Number(this.list[index].debtor);
        this.list[index].unitPrice =
          debtorNum / this.list[index].subjectImportAmount;
        let debtor = debtorNum.toFixed(2) + "";
        let debtorList = ["", "", "", "", "", "", "", "", "", "", ""];
        this.list[index].debtorList = collatingData(debtor, debtorList);
      } else if (this.list[index].lender) {
        this.list[index].balanceDirection = 2;
        let lenderNum = Number(this.list[index].lender);
        this.list[index].unitPrice =
          lenderNum / this.list[index].subjectImportAmount;
        let lender = lenderNum.toFixed(2) + "";
        let lenderList = ["", "", "", "", "", "", "", "", "", "", ""];
        this.list[index].lenderList = collatingData(lender, lenderList);
      } else {
        this.list[index].lender =
          this.list[index].subjectImportAmount * this.list[index].unitPrice;
      }

      this.calcDebtorTotal();
    },
    priceInputKeyup(index) {
      let lenderList = ["", "", "", "", "", "", "", "", "", "", ""];
      this.list[index].balanceDirection = 1;
      this.list[index].lender = "";
      this.list[index].lenderList = lenderList;
      this.list[index].debtor =
        this.list[index].subjectImportAmount * this.list[index].unitPrice;
      let debtor = this.list[index].debtor.toFixed(2) + "";
      let debtorList = ["", "", "", "", "", "", "", "", "", "", ""];
      this.list[index].debtorList = collatingData(debtor, debtorList);
      this.calcDebtorTotal();
    },
    // 借方合计
    calcDebtorTotal(index) {
      let debtorTotal = 0;
      for (let i in this.list) {
        if (
          this.list[i].debtor != null &&
          this.list[i].debtor != "" &&
          this.list[i].debtor !== 0
        ) {
          if (!(index && index == i)) {
            const d = isNaN(this.list[i].debtor) ? 0 : this.list[i].debtor;
            debtorTotal += d * 1;
          }
        }
      }
      this.debtorTotal = debtorTotal;
      debtorTotal = debtorTotal + "";
      let debtorTotalList = ["", "", "", "", "", "", "", "", "", "", ""];
      this.debtorTotalList = collatingData(debtorTotal, debtorTotalList);
      if (this.debtorTotal === this.lenderTotal) {
        this.num = toChinesNum(this.debtorTotal);
        this.sum = this.debtorTotal;
      } else {
        this.num = "";
      }
    },
    // 贷方合计
    calcLenderTotal(index) {
      let lenderTotal = 0;
      for (let i in this.list) {
        if (
          this.list[i].lender != null &&
          this.list[i].lender != "" &&
          this.list[i].lender !== 0
        ) {
          if (!(index && index == i)) {
            const l = isNaN(this.list[i].lender) ? 0 : this.list[i].lender;
            lenderTotal += l * 1;
          }
        }
      }
      this.lenderTotal = lenderTotal;
      lenderTotal = lenderTotal + "";
      let lenderTotalList = ["", "", "", "", "", "", "", "", "", "", ""];
      this.lenderTotalList = collatingData(lenderTotal, lenderTotalList);
      if (this.debtorTotal === this.lenderTotal) {
        this.num = toChinesNum(this.debtorTotal);
        this.sum = this.debtorTotal;
      } else {
        this.num = "";
      }
    },
    addList() {
      let obj = {
        content: "",
        aid: [],
        isShowMainInput: false,
        balanceDirection: "",
        subjectName: "",
        subject: {
          price: "",
          quantity: "",
          balance: "",
        },
        subjectId: "",
        contentId: "",
        subjectLen: 0,
        otherSubjectName: "",
        unit: "",
        subjectImportAmount: "",
        unitPrice: "",
        subjectImportMoney: "",
        isShowSubjectInput: false,
        debtor: "",
        debtorList: ["", "", "", "", "", "", "", "", "", "", ""],
        isShowDebtorInput: false,
        lender: "",
        lenderList: ["", "", "", "", "", "", "", "", "", "", ""],
        isShowLenderInput: false,
        isQuantity: false,
        isOpenQuantity: "",
        AuxiliaryList: [],
        isAuxiliary: false,
        auxiliaryDisable: true,
        searchSubjectBoxShow: false,
      };
      this.list.push(obj);
    },
    removeList(index) {
      if (this.list.length <= 2) {
        this.$message.error("至少保存两行");
        return;
      }
      this.list.splice(index, 1);
      this.calcDebtorTotal();
      this.calcLenderTotal();
      this.dialogSubjectIndex -= this.dialogSubjectIndex;
    },
    checkListData() {
      if (this.voucher.word === "") {
        this.$message.error("凭证字不能为空");
        return;
      }
      if (
        (this.debtorTotal != 0 || this.lenderTotal != 0) &&
        this.lenderTotal * 1 != this.debtorTotal * 1
      ) {
        this.$message.error("凭证借贷不平衡，请检查");
        return;
      }
      let mainFlag = true;
      for (let i in this.list) {
        if (i < 2) {
          if (this.list[i].content != null && this.list[i].content != "") {
            mainFlag = false;
          }
          if (
            this.list[i].subjectName == null ||
            this.list[i].subjectName == ""
          ) {
            this.$message.error(
              "第" + (i * 1 + 1) + "行中的会计科目为必填项，请填写了再提交"
            );
            return;
          }
          if (
            (this.list[i].debtor == null || this.list[i].debtor == "") &&
            (this.list[i].lender == null || this.list[i].lender == "")
          ) {
            this.$message.error(
              "第" +
                (i * 1 + 1) +
                "行中借方金额、贷方金额必须填一个，请填写了再提交"
            );
            return;
          }
        }
      }
      if (mainFlag) {
        this.$message.error("必须填写一个摘要，请填写了再提交");
        return;
      }

      let list = [];
      for (let a = 0; a < this.list.length; a++) {
        let obj = {
          content: this.list[a].content || null, //摘要内容
          balanceDirection: this.list[a].balanceDirection || null, //现金方向 （借/贷）
          price: this.list[a].price ? this.list[a].price : null, // 科目平均单价
          subjectName: this.list[a].subjectName || null, //科目总称
          quantity: this.list[a].quantity || null, //科目数量
          balance: this.list[a].balance || null, //科目余额
          id: this.list[a].id || null,
          subjectImportAmount: this.list[a].subjectImportAmount || null, //录入数量
          unitPrice: this.list[a].unitPrice || null, //录入单价
          subjectImportMoney:
            this.list[a].balanceDirection === 1
              ? this.list[a].debtor
              : this.list[a].lender, //录入金额
          subjectId: this.list[a].subjectId || null,
          contentId: this.list[a].contentId || null,
          unit: this.list[a].unit || null,
          contentId: this.list[a].contentId || null,
          createTime: this.list[a].createTime || null,
          unitPrice: this.list[a].unitPrice || null,
          aid: this.list[a].aid === [] ? [] : this.list[a].aid,
        };
        list.push(obj);
      }
      let reqObj = {
        id: this.voucher.word, //已改
        //importPeriod: this.voucher.importPeriod, //已改 后台自动生成期数
        proveId: this.voucher.proveId, //已改
        proveNo: this.voucher.no, //已改
        chapter: this.voucher.date, //已改
        // creditTotal: this.lenderTotal,
        // debitTotal: this.debtorTotal,
        sum: this.sum, //合计
        attachedDocument: this.voucher.bill, //已改
        content: list,
      };

      return reqObj;
    },
    preservation(status) {
      if (status === 1) {
        let reqObj = this.checkListData();
        if (reqObj) {
          saveVoucher(reqObj).then((res) => {
            if (res.data.retCode === 500) {
              return this.$message.error(res.data.message);
            }
            return this.$message.success("保存成功");
          });
        }
      }
      if (status === 3) {
        let reqObj = this.checkListData();
        if (reqObj) {
          this.disabled = true;
          auditVoucher(this.voucher.word).then((res) => {
            if (res.data.retCode === 500) {
              return this.$message.error(res.data.message);
            }
            return this.$message.success("审核成功");
          });
        }
      }
      if (status === 4) {
        let reqObj = this.checkListData();
        if (reqObj) {
          this.disabled = false;
          antiAuditVoucher(this.voucher.word).then((res) => {
            if (res.data.retCode === 500) {
              return this.$message.error(res.data.message);
            }
            return this.$message.success("反审核成功");
          });
        }
      }
    },
    print() {
      this.dialogVisible = true;
      this.printdata = {
        attachedDocument: this.voucher.bill,
        date: this.voucher.date,
        prove: this.voucher.prove + "-" + this.voucher.no,
        list: this.list.map((item) => {
          return {
            content: item.content,
            subject: item.subjectName,
            isQuantity: item.isQuantity,
            isOpenQuantity: item.isOpenQuantity,
            subjectImportAmount: item.subjectImportAmount,
            unit: item.unit,
            unitPrice: item.unitPrice,
            debtor: item.debtor,
            lender: item.lender,
          };
        }),
        num: this.num,
        sum: this.sum,
      };
    },
    printSend() {
      this.dialogVisible = false;
      this.$router.push("/Print/Print/Print");
      setTimeout(() => {
        this.$bus.$emit("sendPrintData", this.printdata, this.printDetail);
      }, 500);
    },
    toQuantity(index) {
      const quantity = document.getElementById(`quantity${index}`);
      quantity && quantity.focus();
    },
    toUnitPrice(index) {
      const unit = document.getElementById(`unitPrice${index}`);
      unit && unit.focus();
    },
    toDebtor(index) {
      this.showInput(index, "debtor");
    },
    currentIndex(index) {
      const uiBox = document.getElementById(`ui-box${this.dialogSubjectIndex}`);
      const item = uiBox.querySelectorAll(".b-item");
      for (let i = 0; i < item.length; i++) {
        item[i].className = "b-item";
      }
      item[index + 1].className = "b-item on";
      this.bItemIndex = index + 1;
    },
    currentIndexLeave(index) {
      const uiBox = document.getElementById(`ui-box${this.dialogSubjectIndex}`);
      const item = uiBox.querySelectorAll(".b-item");
      item[index + 1].className = "b-item";
    },
    navigateOptions(index, type) {
      const uiBox = document.getElementById(`ui-box${index}`);
      const item = uiBox.querySelectorAll(".b-item");
      if (type === "next") {
        item[this.bItemIndex].classList.remove("on");
        item[this.bItemIndex + 1].classList.add("on");
        this.bItemIndex++;
        console.log(this.bItemIndex);
      }
      if (type === "prev" && this.bItemIndex !== 1) {
        item[this.bItemIndex].classList.remove("on");
        item[this.bItemIndex - 1].classList.add("on");
        this.bItemIndex--;
        console.log(this.bItemIndex);
      }
      if (type === "enter") {
        console.log("tab");
        this.searchList.length &&
          this.searchSelect(this.searchList[this.bItemIndex]);
      }
    },
    searchSelect(item) {
      console.log(item);
      let index = this.dialogSubjectIndex;
      this.list[index].searchSubjectBoxShow = false;
      this.list[index].subjectName = item.subjectName;
      this.list[index].otherSubjectName = item.otherSubjectName;
      this.list[index].subjectLen = item.otherSubjectName
        ? item.otherSubjectName.length
        : 0;
      this.list[index].subjectId = item.id;
      this.list[index].isOpenQuantity = item.isOpenQuantity;
      this.list[index].unit = item.quantityUnit;
      this.judgeisQuantity();
      if (item.aid) {
        console.log(1);
        let len = item.aid.length;
        this.list[index].isAuxiliary = true;
        for (let i = 0; i < len; i++) {
          this.list[index].AuxiliaryList = item.aid;
        }
      } else {
        this.list[index].isAuxiliary = false;
        this.list[index].aid = [];
        this.list[index].AuxiliaryList = [];
      }
      if (!this.list[index].isQuantity) this.showInput(index, "debtor");
    },
    focusSubject(index, e) {
      this.bItemIndex = 1;
      const len = e.target.value.length;
      this.list[index].searchSubjectBoxShow = true;

      this.dialogSubjectIndex = index;
      if (len) {
        e.target.setSelectionRange(0, len);
      }
      const uiBox = document.getElementById(`ui-box${index}`);
      const item = uiBox.querySelectorAll(".b-item");
      item[this.bItemIndex] && (item[this.bItemIndex].className = "b-item on");
    },
    inputSubject(index, e) {
      this.bItemIndex = 1;
      const uiBox = document.getElementById(`ui-box${index}`);
      const item = uiBox.querySelectorAll(".b-item");
      for (let i = 0; i < item.length; i++) {
        item[i].className = "b-item";
      }
      this.$nextTick(() => {
        const uiBox = document.getElementById(`ui-box${index}`);
        const item = uiBox.querySelectorAll(".b-item");
        item[this.bItemIndex] &&
          (item[this.bItemIndex].className = "b-item on");
      });
    },
  },
};
</script>
 
<style lang="scss" scoped>
table {
  width: 100%;
  height: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  padding: 0;
  margin: 0;
}

table td {
  text-align: center;
  table-layout: fixed;
  padding: 0px;
  position: relative;
}
/deep/ .el-input--mini .el-input__inner {
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  padding: 0;
}
.hide {
  position: absolute;
  top: -20px;
  right: 170px;
}
</style>