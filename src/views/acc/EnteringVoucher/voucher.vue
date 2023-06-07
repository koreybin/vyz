
<template>
  <div class="charge-container" id="chargeContainer">
    <div v-show="saveVisible">
      <el-button type="primary" @click="preservation(2)">保存并新增</el-button>
      <el-dropdown @command="tempCommand">
        <el-button>
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="保存为凭证模板">
            保存为凭证模板
          </el-dropdown-item>
          <el-dropdown-item command="从模板生成凭证">
            从模板生成凭证
          </el-dropdown-item>
          <el-dropdown-item command="选项">选项</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-button @click="test">测试</el-button> -->
    </div>
    <div v-show="saveVisible1">
      <el-button @click="preservation(2)" type="primary">新增</el-button>
      <el-button @click="preservation(1)">保存</el-button>
      <el-button>打印</el-button>
      <el-button>审核</el-button>
      <el-button>复制</el-button>
      <el-button>删除</el-button>
      <el-dropdown>
        <el-button>
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="保存为凭证模板">
            保存为凭证模板
          </el-dropdown-item>
          <el-dropdown-item command="红字冲销">红字冲销</el-dropdown-item>
          <el-dropdown-item command="选项">选项</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="charge">
      <!--<h1 class="charge-title">记账凭证</h1>-->
      <div class="charge-header">
        <div>
          凭证字
          <el-select
            style="width: 80px"
            v-model="voucher.prove"
            @change="wordChange"
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
            @change="changeImportPeriod"
          ></el-date-picker>
        </div>

        <div style="font-size: 24px">记账凭证</div>
        <div>
          {{ voucher.importPeriod }}
        </div>
        <div style="float: right; position: relative">
          附单据
          <el-input
            type="number"
            style="width: 80px"
            min="0"
            v-model="voucher.bill"
          ></el-input>
          张
          <i class="el-icon-info"></i>
          <div class="tip-box">
            <table class="tip-box-table" border="1">
              <tr style="background-color: #f5f4f4">
                <td>操作</td>
                <td>快捷键</td>
              </tr>
              <tr>
                <td>自动平衡</td>
                <td>=</td>
              </tr>
              <tr>
                <td>复制第一行摘要</td>
                <td>//</td>
              </tr>
              <tr>
                <td>复制上一行摘要</td>
                <td>..</td>
              </tr>
              <tr>
                <td>金额自动切换借贷方</td>
                <td>空格键</td>
              </tr>
              <tr>
                <td>光标跳转到下一个输入框</td>
                <td>enter</td>
              </tr>
            </table>
          </div>
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
            <div @click="addList" class="charge-table-icon">
              <i
                class="el-icon-circle-plus-outline"
                style="color: orangered"
              ></i>
            </div>
            <div @click="removeList(index)" class="charge-table-icon">
              <i class="el-icon-remove-outline" style="color: #4a90e2"></i>
            </div>
          </td>
          <!-- 操作 -->
          <!-- 摘要 -->
          <td>
            <div
              @click="showInput(index, 'main')"
              v-if="!item.isShowMainInput"
              class="main-subject"
              style="padding: 0 10px"
            >
              <!--{{item.main}}-->
              <p>{{ item.content }}</p>
            </div>
            <div class="main-subject" v-if="item.isShowMainInput">
              <!--<input type="text" v-model="item.main" @blur="hideInput(index,'main')" v-focus @keyup="keyupEvents(index,$event,1)">-->
              <input
                v-model="item.content"
                @blur="hideInput(index, 'main')"
                @keyup="keyupEvents(index, $event, 1)"
                :id="'main' + index"
                v-focus
                @input="inputMain(index)"
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
              @click="showInput(index, 'subject')"
              v-if="!item.isShowSubjectInput"
              class="main-subject"
              :style="{
                padding: item.subjectLen > 24 ? '0 10px' : '9px 10px',
                height: item.subjectLen > 45 ? '70px' : '60px',
                height: item.subjectLen > 65 ? '80px' : '60px',
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
                  v-if="isQuantity && item.subjectName"
                >
                  余额:{{ item.subject.balance ? item.subject.balance : 0 }}
                </span>
                <span
                  style="font-size: 12px"
                  v-if="isQuantity && item.subjectName"
                >
                  数量:{{ item.subject.quantity ? item.subject.quantity : 0 }}
                </span>
                <span
                  style="font-size: 12px"
                  v-if="isQuantity && item.subjectName"
                >
                  平均单价:{{ item.subject.price ? item.subject.price : 0 }}
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
                @keyup.up="navigateOptions(index, 'prev')"
                @keyup.down="navigateOptions(index, 'next')"
                @keyup.enter="navigateOptions(index, 'enter')"
              />
            </div>
            <i
              v-if="item.isShowSubjectInput"
              class="el-icon-more special-elements"
              @click="selectionList(index, 'subject')"
            ></i>
            <div class="auxiliaryBox" v-if="item.isAuxiliary">
              <el-row
                v-for="(item11, index11) in item.AuxiliaryList"
                :key="item11.type"
                style="padding: 10px"
              >
                <el-col :span="6" style="line-height: 35px; text-align: left"
                  >{{ item11.data }}：</el-col
                >
                <el-col :span="16">
                  <el-select
                    autofocus
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
                  </el-select>
                </el-col>
              </el-row>

              <el-button
                @click="AuxiliaryBtn(index)"
                :disabled="item.auxiliaryDisable"
                >确定</el-button
              >
            </div>
            <div ref="uiBox" class="ui-box" v-show="item.searchSubjectBoxShow">
              <div ref="boxIn">
                <div v-if="!searchList.length" class="b-item">
                  没有匹配的选项
                </div>
                <div
                  ref="bItem"
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
            <el-row v-show="item.isQuantity && item.subjectName">
              <el-col :span="8">
                <span> 数量： </span>
              </el-col>
              <el-col :span="12">
                <input
                  ref="quantity"
                  class="miniInput"
                  v-focus
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
            <el-row v-show="item.isQuantity && item.subjectName">
              <el-col :span="8">
                <span> 单价： </span>
              </el-col>
              <el-col :span="15">
                <input
                  ref="unitPrice"
                  class="miniInput"
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
                      @click="showInput(index, 'debtor')"
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
                      @click="showInput(index, 'lender')"
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
                    <tr :class="debtorTotal * 1 < 0 ? 'tr-negative' : ''">
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
                    <tr :class="lenderTotal * 1 < 0 ? 'tr-negative' : ''">
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
      <div style="height: 50px; line-height: 50px">
        制单人：{{ $store.getters.name }}
      </div>
    </div>
    <el-row>
      <el-col :span="11" :offset="4"
        ><span>
          注：请勿手工录入结转损益凭证
          ，否则将影响利润表取数。请通过结账-结转损益-自动生成结转损益凭证</span
        ></el-col
      >
      <!-- <el-col :span="5"
        ><div style="text-align: right" v-show="saveVisible">
          <el-button @click="preservation(1)">暂存</el-button>
          <el-button type="primary" @click="preservation(2)"
            >保存并新增</el-button
          >
        </div>
        <div style="text-align: right" v-show="saveVisible1">
          <el-button @click="preservation()">打印</el-button>
          <el-button type="primary" @click="preservation(1)">保存</el-button>
        </div></el-col
      > -->
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
      <CreateVoucherTemplate @getTemp="getTemp"></CreateVoucherTemplate>
    </div>
    <div v-if="dd">
      <insertVoucherTemplate
        @insertTemp="insertTemp"
        :tempList="tempList"
      ></insertVoucherTemplate>
    </div>
    <!-- <el-button @click="test([12, 5, 4, 2, 9, 9, 9], 3)">测试</el-button> -->
  </div>
</template>
 
<script>
import { addVoucher, nextVoucherNum } from "@/api/acc/recordVoucher";
import { GetList } from "@/api/acc/prov";
import BillVoucherTemplatea from "../Setup/BillVoucherTemplatea";
import MainVoucherTemplatea from "../Setup/MainVoucherTemplatea";
import CreateVoucherTemplate from "../Setup/CreateVoucherTemplate";
import insertVoucherTemplate from "../Setup/insertVoucherTemplate";
import { toChinesNum } from "@/utils/toggleNumber";
import { GetListPageByType } from "@/api/acc/assisttypelist";
import { collatingData } from "@/utils/collatingData";
import { autoGetDate } from "@/utils/autoGetDate";
import { mixins } from "@/mixins/mixin";

export default {
  components: {
    BillVoucherTemplatea,
    MainVoucherTemplatea,
    CreateVoucherTemplate,
    insertVoucherTemplate,
  },
  mixins: [mixins],
  data() {
    return {
      defaultId: "", //存放客户默认字id
      bItemIndex: 1, //科目列表的移入索引
      subjectAllList: [],
      sDetail: true, //不可选父级科目
      voucher: {
        prove: "",
        word: "",
        no: 1,
        date: "",
        bill: 0,
        importPeriod: "",
      },
      list: [
        {
          content: "",
          aid: null,
          isShowMainInput: true,
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
        },
        {
          content: "",
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
        },
        {
          content: "",
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
        },
        {
          content: "",
          aid: null,
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
        },
      ],
      AuxiliaryOption: [],
      msg: "",
      aa: false,
      bb: false,
      cc: false,
      dd: false,
      num: "",
      sum: "",
      debtorTotal: 0,
      debtorTotalList: ["", "", "", "", "", "", "", "", "", "", ""],
      lenderTotal: 0,
      lenderTotalList: ["", "", "", "", "", "", "", "", "", "", ""],
      wordList: [],
      mainList: [],
      subjectList: [],
      tempList: [],
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
      saveVisible1: false,
    };
  },
  created() {
    this.voucher.date = autoGetDate(
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod
    )[1];
    GetList(1, 10).then((res) => {
      if (res.data.retCode === 4001) {
        this.$alert(res.data.message, "会话过期", {
          confirmButtonText: "确认",
        }).then(() => {
          this.$router.push("/dashboard");
        });
      }
      this.wordList = res.data.data.object;
      this.voucher.importPeriod = this.numberOfPeriods;
      const defaultData =
        res.data.data.object &&
        res.data.data.object.filter((item) => item.isDefault);
      this.defaultId = defaultData[0] && defaultData[0].id;
      this.voucher.word = this.defaultId;
      this.voucher.prove = defaultData[0].prove;
      nextVoucherNum(this.period, this.defaultId).then((res) => {
        if (res.data.retCode === 200) this.voucher.no = res.data.data;
      });
    });
    this.subjectAllList = this.$store.getters.allSubjectList;
  },
  updated() {
    //给特定区域添加ID   绑定onmousedown 事件
    let chargeContainer = document.getElementById("chargeContainer");
    let outDiv = chargeContainer.getElementsByClassName("special-elements");
    for (let i = 0; i < outDiv.length; i++) {
      outDiv[i].onmousedown = function (e) {
        //现代浏览器阻止默认事件
        if (e && e.preventDefault) e.preventDefault();
        //IE阻止默认事件
        else window.event.returnValue = false;
        return false;
      };
    }
  },
  computed: {
    searchList() {
      return this.subjectAllList.filter((item) => {
        return item.otherSubjectName.includes(
          this.list[this.dialogSubjectIndex].subjectName || ""
        );
      });
    },
  },

  methods: {
    test(nums, k) {
      // console.log(this.list);
    },
    wordChange(val) {
      const [id, prove] = val.split(",");
      this.voucher.word = id;
      this.voucher.prove = prove;
      nextVoucherNum(this.period, id).then(
        (res) => (this.voucher.no = res.data.data)
      );
    },
    AuxiliaryBtn(index) {
      this.list[index].isAuxiliary = !this.list[index].isAuxiliary;
      let arr = this.list[index].AuxiliaryList.map((item) => item.value);
      // this.list[index].AuxiliaryList.forEach((item) => arr.push(item.value));
      this.list[index].otherSubjectName =
        this.list[index].otherSubjectName + "_" + arr.join("_");
      this.list[index].subjectLen = this.list[index].otherSubjectName
        ? this.list[index].otherSubjectName.length
        : 0;
      this.list[index].AuxiliaryList.forEach((item) => (item.value = ""));
      this.list[index].AuxiliaryList.forEach((item) => delete item.id);
    },
    auxiliaryFocus(index, index11, type) {
      GetListPageByType(type, 1, 10).then(
        (res) => (this.AuxiliaryOption = res.data.data.object)
      );
    },
    auxiliaryChange(val, index, index11) {
      let [id, value] = val.split(",");

      this.list[index].AuxiliaryList[index11].id = id;
      this.list[index].AuxiliaryList[index11].value = value;
      console.log(this.list[index].AuxiliaryList);
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
    judgeisQuantity() {
      let flag = this.list.some((item) => {
        return item.isOpenQuantity === 1;
      });
      this.list.forEach((item) => {
        if (item.isOpenQuantity === 1) {
          item.isQuantity = true;
        } else {
          item.isQuantity = false;
        }
      });
      this.isQuantity = flag;
    },
    openMainDialog() {
      this.dialogMainVisible = true;
    },
    closeMainDialog(main) {
      if (!main.isTrusted) {
        this.list[this.dialogMainIndex].content = main;
      }
      this.dialogMainVisible = false;
    },
    openSubjectDialog() {
      this.dialogSubjectVisible = true;
    },
    closeSubjectDialog(sub) {
      if (!sub.isTrusted) {
        this.list[this.dialogSubjectIndex].subject = sub;
      }
      this.dialogSubjectVisible = false;
      this.judgeisQuantity();
    },
    openAuxiliaryDialog() {
      this.dialogAuxiliaryVisible = true;
    },
    closeAuxiliaryDialog(aux) {
      if (!aux.isTrusted) {
        this.list[this.dialogAuxiliaryIndex].auxiliary = aux;
      }
      this.dialogAuxiliaryVisible = false;
    },
    clearAuxiliary(index, e) {
      this.list[index].auxiliary = "";
    },
    changeImportPeriod() {
      console.log(this.voucher.date);
      let year = this.voucher.date.substr(0, 4);
      let month = this.voucher.date.substr(5, 2).replace(/^[0]/, "");
      let zeromonth = this.voucher.date.substr(5, 2);
      const select = year + "-" + zeromonth;
      this.voucher.importPeriod = `${year}年第${month}期`;
      nextVoucherNum(select, this.defaultId).then(
        (res) => (this.voucher.no = res.data.data)
      );
    },
    showInput(index, type) {
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
          this.dialogSubjectIndex = index;
          this.list[index].isShowSubjectInput = true;
        }
      }
    },
    hideInput(index, type) {
      if (type == "debtor") {
        //判断是否有小数点
        let inx =
          typeof this.list[index].debtor === "string" &&
          this.list[index].debtor.indexOf(".");
        if (inx != -1 && this.list[index].debtor.length - 1 != inx) {
          this.list[index].debtor = (this.list[index].debtor * 1).toFixed(2);
        }
        this.list[index].isShowDebtorInput = false;
      } else if (type == "lender") {
        //判断是否有小数点
        let inx =
          typeof this.list[index].lender === "string" &&
          this.list[index].lender.indexOf(".");
        if (inx != -1 && this.list[index].lender.length - 1 != inx) {
          this.list[index].lender = (this.list[index].lender * 1).toFixed(2);
        }
        this.list[index].isShowLenderInput = false;
      } else if (type == "main") {
        this.list[index].isShowMainInput = false;
      } else if (type == "subject") {
        this.list[index].isShowSubjectInput = false;
        this.list[index].searchSubjectBoxShow = false;
        if (
          this.subjectAllList.some(
            (item) => item.subjectName == this.list[index].subjectName
          )
        )
          return;
        this.list[index].otherSubjectName = "";
        this.list[index].subjectName = "";
        this.list[index].isAuxiliary = false;
      }
    },
    voluationInput(index, type, val) {
      if (type == "main") {
        this.list[index].content = val;
        this.list[index].isShowMainInput = false;
      } else if (type == "subject") {
        this.list[index].subject.price = val.price;
        this.list[index].subject.quantity = val.quantity;
        this.list[index].subject.balance = val.balance;
        this.list[index].isShowSubjectInput = false;
      }
      this.judgeisQuantity();
    },
    toQuantity(index) {
      const quantity = this.$refs.quantity[index];
      quantity && quantity.focus();
    },
    toUnitPrice(index) {
      const unit = this.$refs.unitPrice[index];
      unit && unit.focus();
    },
    toDebtor(index) {
      this.showInput(index, "debtor");
    },
    currentIndex(index) {
      const item = this.$refs.boxIn[this.dialogSubjectIndex].children;
      for (let i = 0; i < item.length; i++) {
        item[i].className = "b-item";
      }
      item[index].className = "b-item on";
      this.bItemIndex = index;
    },
    currentIndexLeave(index) {
      const item = this.$refs.boxIn[this.dialogSubjectIndex].children;
      item[index].className = "b-item";
    },
    navigateOptions(index, type) {
      const item = this.$refs.boxIn[this.dialogSubjectIndex].children;
      if (type === "next") {
        item[this.bItemIndex].classList.remove("on");
        item[this.bItemIndex + 1].classList.add("on");
        this.bItemIndex++;
      }
      if (type === "prev" && this.bItemIndex !== 0) {
        item[this.bItemIndex].classList.remove("on");
        item[this.bItemIndex - 1].classList.add("on");
        this.bItemIndex--;
      }
      if (type === "enter") {
        this.searchList.length &&
          this.searchSelect(this.searchList[this.bItemIndex]);
      }
    },
    searchSelect(item) {
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
    fn(e, a, b) {
      this.aa = e;
      let index = this.dialogSubjectIndex;
      if (a == undefined) return;
      this.list[index].subjectName = a.subjectName;
      this.list[index].otherSubjectName = a.otherSubjectName;
      this.list[index].subjectLen = a.otherSubjectName
        ? a.otherSubjectName.length
        : 0;
      this.list[index].subjectId = a.id;
      this.list[index].isOpenQuantity = a.isOpenQuantity;
      this.list[index].unit = a.quantityUnit;
      this.judgeisQuantity();
      if (a.aid) {
        let len = a.aid.length;
        this.list[index].isAuxiliary = true;
        for (let i = 0; i < len; i++) {
          this.list[index].AuxiliaryList = a.aid;
        }
      } else {
        this.list[index].isAuxiliary = false;
        this.list[index].aid = [];
        this.list[index].AuxiliaryList = [];
      }
    },
    subjectSelect(index, e) {},
    getMain(bool, data) {
      this.bb = bool;
      if (data == undefined) return;
      this.list[this.dialogMainIndex].content = data.content;
      this.list[this.dialogMainIndex].contentId = data.id;
      this.list[this.dialogMainIndex].createTime = data.createTime;
    },
    getTemp(bool, data) {
      let list = [
        {
          content: "",
          aid: null,
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
        },
        {
          content: "",
          aid: null,
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
        },
        {
          content: "",
          aid: null,
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
        },
        {
          content: "",
          aid: null,
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
        },
      ];
      this.cc = bool;
      if (data) {
        let len = data.content.length;
        let dataList = data.content;

        for (let i = 0; i < len; i++) {
          list[i].subjectName = dataList[i].subjectName;
          list[i].content = dataList[i].content;
          list[i].subject.balance = dataList[i].balance;
          list[i].subject.price = dataList[i].price;
          list[i].subject.quantity = dataList[i].quantity;
          list[i].isOpenQuantity = dataList[i].isOpenQuantity;
          list[i].unit = dataList[i].unit;
          list[i].aid = dataList[i].aid;
          list[i].subjectId = dataList[i].subjectId;
          if (dataList[i].subjectImportMoney) {
            let lenderList = ["", "", "", "", "", "", "", "", "", "", ""];
            let debtorList = ["", "", "", "", "", "", "", "", "", "", ""];
            if (dataList[i].balanceDirection == 2) {
              list[i].balanceDirection = 2;
              const lender = dataList[i].subjectImportMoney.toString();
              list[i].lender = lender;
              list[i].lenderList = collatingData(lender, lenderList);
            }
            if (dataList[i].balanceDirection == 1) {
              list[i].balanceDirection = 1;
              const debtor = dataList[i].subjectImportMoney.toString();
              list[i].debtor = debtor;
              list[i].debtorList = collatingData(debtor, debtorList);
            }
          }
        }
      }
      this.list = list;
      this.judgeisQuantity();
      this.calcLenderTotal();
      this.calcDebtorTotal();
    },
    insertTemp(bool) {
      this.dd = bool;
    },
    tempCommand(command) {
      if (command === "从模板生成凭证") {
        this.cc = true;
      }
      if (command === "保存为凭证模板") {
        let reqObj = this.checkListData();
        console.log("reqObj", reqObj);
        if (reqObj) {
          this.dd = true;
          this.tempList = reqObj;
        }
      }
    },
    selectionList(index, type) {
      //console.log('弹出选择列表');
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
        this.openAuxiliaryDialog();
      }
    },

    keyupEvents(index, e, remaind) {
      if ((e.keyCode == 13 || e.keyCode == 9) && remaind === 2) {
        this.$nextTick(() => {
          if (!this.list[index].isQuantity) {
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
        if (main.indexOf("//") != -1) {
          this.list[index].content = this.list[0].content;
        }
        if (main.indexOf("..") != -1) {
          this.list[index].content = this.list[index - 1].content;
        }
      }
      //判断是否显示辅助核算
      this.judgeisQuantity();
    },
    focusSubject(index, e) {
      this.bItemIndex = 0;
      const len = e.target.value.length;
      this.list[index].searchSubjectBoxShow = true;

      this.dialogSubjectIndex = index;
      if (len) {
        e.target.setSelectionRange(0, len);
      }
      const item = this.$refs.boxIn[this.dialogSubjectIndex].children;
      item[this.bItemIndex] && (item[this.bItemIndex].className = "b-item on");
    },
    inputSubject(index, e) {
      this.bItemIndex = 0;
      const item = this.$refs.boxIn[this.dialogSubjectIndex].children;
      for (let i = 0; i < item.length; i++) {
        item[i].className = "b-item";
      }
      this.$nextTick(() => {
        const item = this.$refs.boxIn[this.dialogSubjectIndex].children;
        item[this.bItemIndex] &&
          (item[this.bItemIndex].className = "b-item on");
      });
    },
    inputMain(index, e) {},
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
    amountInputKeyup(index) {
      if (this.list[index].debtor) {
        let debtorNum = Number(this.list[index].debtor);
        this.list[index].unitPrice =
          debtorNum / this.list[index].subjectImportAmount;
        let debtor = debtorNum.toFixed(2) + "";
        let debtorList = ["", "", "", "", "", "", "", "", "", "", ""];
        this.list[index].debtorList = collatingData(debtor, debtorList);
      } else if (this.list[index].lender) {
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
      this.list[index].balanceDirection = 1;
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

    lenderInputKeyUp(index, e, remaind) {
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
      this.list[index].balanceDirection = 2;
      this.calcLenderTotal();
      this.calcDebtorTotal();
    },
    debtorInputKeyUp(index, e, remaind) {
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
      this.list[index].balanceDirection = 1;
      this.calcDebtorTotal();
      this.calcLenderTotal();
    },
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
        aid: null,
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
        let aid = [];
        this.list[a].AuxiliaryList.forEach((item) => {
          aid.push(item.id);
        });
        let obj = {
          content: this.list[a].content, //摘要内容
          balanceDirection: this.list[a].balanceDirection, //（借/贷）
          price: this.list[a].subject.price
            ? parseInt(this.list[a].subject.price)
            : 0,
          subjectName: this.list[a].subjectName, //科目总称
          quantity: this.list[a].subject.quantity
            ? this.list[a].subject.quantity
            : 0,
          balance: this.list[a].subject.balance,

          subjectImportAmount: parseInt(this.list[a].subjectImportAmount), //录入数量
          unitPrice: this.list[a].unitPrice,
          subjectImportMoney:
            this.list[a].balanceDirection === 1
              ? this.list[a].debtor
              : this.list[a].lender,
          subjectId: this.list[a].subjectId,
          contentId: this.list[a].contentId,
          unit: this.list[a].unit,
          contentId: this.list[a].contentId,
          createTime: this.list[a].createTime,
          unitPrice: this.list[a].unitPrice,
          aid: aid === [] ? null : aid,
        };
        list.push(obj);
      }
      let reqObj = {
        id: this.voucher.word,
        proveId: this.voucher.word,
        proveNo: this.voucher.no,
        chapter: this.voucher.date,
        // creditTotal: this.lenderTotal,
        // debitTotal: this.debtorTotal,
        sum: this.sum, //合计
        attachedDocument: this.voucher.bill,
        content: list,
      };

      return reqObj;
    },
    preservation(status) {
      if (status === 2) {
        let reqObj = this.checkListData();

        if (reqObj) {
          addVoucher(reqObj).then((res) => {
            if (res.data.retCode === 500) {
              return this.$message.error(res.data.message);
            }
            this.$message.success("添加成功");
            this.dialogSubjectIndex = 0;
            this.saveVisible = true;
            this.saveVisible1 = false;
            this.isQuantity = false;
            this.list = [
              {
                content: "",
                aid: null,
                isShowMainInput: true,
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
              },
              {
                content: "",
                aid: null,
                isShowMainInput: true,
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
              },
              {
                content: "",
                aid: null,
                isShowMainInput: true,
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
              },
              {
                content: "",
                aid: null,
                isShowMainInput: true,
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
              },
            ];
            this.num = "";
            this.lenderTotalList = ["", "", "", "", "", "", "", "", "", "", ""];
            this.debtorTotalList = ["", "", "", "", "", "", "", "", "", "", ""];
            let nextNo = "";
            nextVoucherNum(this.period, this.defaultId).then((res) => {
              this.voucher.no = res.data.data;
              nextNo = res.data.data;
            });
            this.voucher = {
              word: this.defaultId,
              no: nextNo,
              date: this.startMonth,
              bill: 0,
              importPeriod: this.numberOfPeriods,
              prove: "记",
            };
          });
        }
      }
      if (status === 1) {
        let reqObj = this.checkListData();

        console.log(reqObj);
        if (reqObj) {
          this.saveVisible = false;
          this.saveVisible1 = true;
          this.$message.success("暂存成功");
        }
      }
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
  border-bottom: 1px solid #cccc;
  border-radius: 0;
  padding: 0;
}
</style>