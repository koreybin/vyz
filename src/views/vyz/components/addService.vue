<template>
  <div>
    <el-dialog
      :title="textMap[type]"
      :visible.sync="dialogFormVisible"
      width="55%"
      @close="handleClose"
      :before-close="beforeHandle"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="客户信息">
          <el-form ref="dataForm" :rules="rules" :model="temp" height="550px">
            <el-row style="line-height: 30px; padding-top: 15px">
              <el-col :span="20">
                <el-col :span="3">客户名称</el-col>
                <el-col :span="9">
                  <el-form-item prop="clientName">
                    <el-input
                      v-model="temp.clientName"
                      class="classinputx"
                      @blur="autoNum"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="3">服务类型</el-col>
                <el-col :span="9">
                  <el-form-item prop="serviceType">
                    <el-select v-model="temp.serviceType" placeholder="请选择">
                      <el-option
                        v-for="item in optionsfwlx"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="4" v-show="moreVisable" class="cur">
                <span @click="detailShow">∨ 更多</span>
              </el-col>
              <el-col :span="4" v-show="!moreVisable" class="cur">
                <span @click="detailShow">∧ 收起</span>
              </el-col>
            </el-row>

            <el-row v-show="!moreVisable">
              <el-col :span="20">
                <div
                  class="form"
                  @scroll.passive="scrollDiv($event)"
                  ref="allScroll"
                >
                  <div class="con1" id="con1">
                    <el-row>
                      <el-col :span="3">客户编号</el-col>
                      <el-col :span="9">
                        <el-form-item prop="clientNo">
                          <el-input
                            v-model="temp.clientNo"
                            class="classinputx"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="3">成立日期</el-col>
                      <el-col :span="9">
                        <el-date-picker
                          class="classmarg"
                          v-model="temp.establishData"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">统一信用代码</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.onlyCreditCode"
                          class="classinputx"
                        ></el-input
                      ></el-col>
                      <el-col :span="3">所属行业</el-col>
                      <el-col :span="9">
                        <el-select
                          v-model="temp.industryId"
                          class="classmarg"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in optionssshy"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">法人代表</el-col>
                      <el-col :span="9"
                        ><el-input
                          v-model="temp.legalRepresentative"
                          class="classinputx"
                        ></el-input
                      ></el-col>
                      <el-col :span="3">法人身份证号</el-col>
                      <el-col :span="9"
                        ><el-input
                          v-model="temp.corporateIdCard"
                          class="classinputx"
                        ></el-input
                      ></el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">客户来源</el-col>
                      <el-col :span="9"
                        ><el-select
                          v-model="temp.customersSource"
                          class="classmarg"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in optionskhly"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option> </el-select
                      ></el-col>
                      <el-col :span="3">服务开始期</el-col>
                      <el-col :span="9">
                        <el-date-picker
                          class="classmarg"
                          v-model="temp.serviceStartData"
                          type="month"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">记账开始期</el-col>
                      <el-col :span="9"
                        ><el-date-picker
                          class="classmarg"
                          v-model="temp.accountStartData"
                          type="month"
                          placeholder="选择日期"
                        >
                        </el-date-picker
                      ></el-col>
                      <el-col :span="3">开始收款时间</el-col>
                      <el-col :span="9"
                        ><el-date-picker
                          class="classmarg"
                          v-model="temp.collectionDays"
                          type="month"
                          placeholder="选择日期"
                        >
                        </el-date-picker
                      ></el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">备注</el-col>
                      <el-col :span="21">
                        <el-input
                          class="classinputx"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="temp.remark"
                        >
                        </el-input>
                      </el-col>
                    </el-row>
                  </div>

                  <div class="con2" id="con2">
                    <el-row>
                      <el-col :span="3" style="font-weight: 700"
                        >联系方式</el-col
                      >
                      <el-col :span="21"> </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">联系人</el-col>
                      <el-col :span="21">
                        <el-col
                          :span="24"
                          v-for="(item, index) in temp.contacts"
                          :key="item.id"
                          style="margin: 2px"
                        >
                          <el-col :span="9"
                            ><el-input
                              v-model="item.contactsName"
                              class="classinputx"
                              placeholder="姓名"
                            ></el-input
                          ></el-col>
                          <el-col :span="7"
                            ><el-input
                              v-model="item.contactsPhone"
                              placeholder="手机"
                              class="classinputx"
                            ></el-input
                          ></el-col>
                          <el-col :span="6"
                            ><el-input
                              v-model="item.contactPosition"
                              placeholder="职位"
                              class="classinputx"
                            ></el-input
                          ></el-col>
                          <el-col :span="2">
                            <i
                              class="el-icon-circle-plus-outline"
                              v-if="index == 0"
                              @click="insertContact(index)"
                            ></i>
                            <i
                              class="el-icon-remove-outline"
                              v-else
                              @click="deleteContact(index)"
                            ></i>
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">办公电话</el-col>
                      <el-col :span="9"
                        ><el-input
                          v-model="temp.officePhone"
                          placeholder="办公电话"
                          class="classinputx"
                        ></el-input
                      ></el-col>
                      <el-col :span="6"
                        ><el-input
                          v-model="temp.email"
                          placeholder="邮箱"
                          class="classinputx"
                        ></el-input
                      ></el-col>
                      <el-col :span="6"
                        ><el-input
                          v-model="temp.qq"
                          placeholder="QQ"
                          class="classinputx"
                        ></el-input
                      ></el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">省市区</el-col>
                      <el-col :span="9">
                        <el-cascader
                          class="classmarg"
                          props.expandTrigger="hover"
                          :options="optionsshengshiqu"
                          v-model="temp.addressId"
                          @change="handleChange"
                        >
                        </el-cascader>
                      </el-col>
                      <el-col :span="3">详细地址</el-col>
                      <el-col :span="9"
                        ><el-input
                          v-model="temp.detailedAddress"
                          placeholder="详细地址"
                          class="classinputx"
                        ></el-input
                      ></el-col>
                    </el-row>
                  </div>

                  <div class="con3" id="con3">
                    <el-row>
                      <el-col :span="3" style="font-weight: 700"
                        >税务资料</el-col
                      >
                      <el-col :span="21"> </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">纳税性质</el-col>
                      <el-col :span="9">
                        <el-select
                          v-model="temp.taxNature"
                          class="classmarg"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in optionsnsxz"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3">纳税识别号</el-col>
                      <el-col :span="9"
                        ><el-input
                          v-model="temp.taxIdentificationCode"
                          class="classinputx"
                          placeholder="纳税识别号"
                        ></el-input
                      ></el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">纳税区域</el-col>
                      <el-col :span="9">
                        <el-cascader
                          class="classmarg"
                          props.expandTrigger="hover"
                          :options="optionsnsqu"
                          v-model="temp.taxAreaId"
                          @change="handleChange"
                        >
                        </el-cascader>
                      </el-col>
                      <el-col :span="3">所属税务局</el-col>
                      <el-col :span="9"
                        ><el-input
                          v-model="temp.inlandRevenue"
                          class="classinputx"
                          placeholder="所属税务局"
                        ></el-input
                      ></el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">实名(网报)账号</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.account"
                          class="classinputx"
                          placeholder="实名(网报)账号"
                        ></el-input>
                      </el-col>
                      <el-col :span="3">实名(网报)密码</el-col>
                      <el-col :span="9"
                        ><el-input
                          v-model="temp.password"
                          class="classinputx"
                          placeholder="实名(网报)密码"
                        ></el-input
                      ></el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">税号登录手机</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.taxPhone"
                          class="classinputx"
                          placeholder="税号登录手机"
                        ></el-input>
                      </el-col>
                      <el-col :span="3">税号登录密码</el-col>
                      <el-col :span="9"
                        ><el-input
                          v-model="temp.taxPassword"
                          class="classinputx"
                          placeholder="税号登录密码"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">个税申报密码</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.taxDeclarationPwd"
                          class="classinputx"
                          placeholder="个税申报密码"
                        ></el-input>
                      </el-col>
                      <el-col :span="3">是否有税控盘</el-col>
                      <el-col :span="9">
                        <el-select
                          v-model="temp.isTaxControlPlate"
                          class="classmarg"
                          placeholder="请选择"
                        >
                          <el-option label="有" :value="'1'"> </el-option>
                          <el-option label="无" :value="'0'"> </el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">个税实名账号</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.personalTaxAccount"
                          class="classinputx"
                          placeholder="个税实名账号"
                        ></el-input>
                      </el-col>
                      <el-col :span="3">个税实名密码</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.personalTaxPwd"
                          class="classinputx"
                          placeholder="个税实名密码"
                        ></el-input>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">社保账号</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.socialSecurityAccount"
                          class="classinputx"
                          placeholder="社保账号"
                        ></el-input>
                      </el-col>
                      <el-col :span="3">社保密码</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.socialSecurityPwd"
                          class="classinputx"
                          placeholder="社保密码"
                        ></el-input>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">公积金账号</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.accumulationFundAccount"
                          class="classinputx"
                          placeholder="公积金账号"
                        ></el-input>
                      </el-col>
                      <el-col :span="3">公积金密码</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.accumulationFundPwd"
                          class="classinputx"
                          placeholder="公积金密码"
                        ></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">备注</el-col>
                      <el-col :span="21">
                        <el-input
                          class="classinputx"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="temp.taxRemark"
                        >
                        </el-input>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">核定税种</el-col>
                      <el-col :span="21"> </el-col>
                    </el-row>
                  </div>

                  <div class="con4" id="con4">
                    <el-row>
                      <el-col :span="3" style="font-weight: 700"
                        >合同信息</el-col
                      >
                      <el-col :span="21"> </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">服务项目</el-col>
                      <el-col :span="9">
                        <el-select
                          v-model="temp.serviceItem"
                          class="classmarg"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in optionsfwxm"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3">合同编号</el-col>
                      <el-col :span="9">
                        <el-form-item prop="contractNo">
                          <el-input
                            v-model="temp.contractNo"
                            class="classinputx"
                            placeholder="合同编号"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">签约日期</el-col>
                      <el-col :span="9">
                        <el-date-picker
                          class="classmarg"
                          v-model="temp.signUpDate"
                          type="date"
                          placeholder="签约日期"
                        >
                        </el-date-picker>
                      </el-col>
                      <el-col :span="3">业务员</el-col>
                      <el-col :span="9"> </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">服务成本</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.costAccounting"
                          class="classinputx"
                          placeholder="服务成本"
                        ></el-input>
                      </el-col>
                      <el-col :span="3">其他成本</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.otherCost"
                          class="classinputx"
                          placeholder="其他成本"
                        ></el-input>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">收款方式</el-col>
                      <el-col :span="9">
                        <el-select
                          v-model="temp.receiveWay"
                          class="classmarg"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in optionsskfs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3">合同金额</el-col>
                      <el-col :span="9">
                        <el-input
                          v-model="temp.totalMoney"
                          class="classinputx"
                          placeholder="合同金额"
                        ></el-input>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3">备注</el-col>
                      <el-col :span="21">
                        <el-input
                          type="textarea"
                          class="classinputx"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="temp.contractRemark"
                        >
                        </el-input>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>

              <el-col v-show="!moreVisable" :span="4">
                <div style="height: 400px" class="step">
                  <el-steps direction="vertical" :active="activ">
                    <el-step
                      title="基本资料 1"
                      @click.native="miaodin(1)"
                    ></el-step>
                    <el-step
                      title="联系方式 2"
                      @click.native="miaodin(2)"
                    ></el-step>
                    <el-step
                      title="税务资料 3"
                      @click.native="miaodin(3)"
                      description=""
                    ></el-step>
                    <el-step
                      title="合同信息 4"
                      @click.native="miaodin(4)"
                      description=""
                    ></el-step>
                  </el-steps>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t("table.cancel") }}</el-button>
        <!-- <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
          >{{ $t("table.confirm") }}
        </el-button>
        <el-button v-else type="primary" @click="updateData">{{
          $t("table.confirm")
        }}</el-button> -->
        <el-button type="primary" v-if="type == 'create'" @click="createData">{{
          $t("table.confirm")
        }}</el-button>
        <el-button type="primary" v-if="type == 'update'" @click="updateData">{{
          $t("table.savebut")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getArea } from "@/api/rcdistract";
import { addclient, modifyClientData } from "@/api/client";
import { getlistPartData } from "@/api/syspar";
import { pinyin } from "pinyin-pro";
export default {
  props: ["status", "addVisable", "editData"],
  watch: {
    $route(to, from) {
      this.$refs.allScroll.scrollTop = 0;
    },
  },
  data() {
    return {
      type: "",
      textMap: {
        update: "编辑客户",
        create: "新增客户",
      },
      moreVisable: true,
      optionsfwlx: null,
      optionssshy: null,
      optionskhly: null,
      optionsfwxm: null,
      optionsshengshiqu: null,
      optionsnsqu: null,
      optionsnsxz: [
        { value: "1", label: "一般纳税人" },
        { value: "2", label: "小规模" },
      ],
      dialogStatus: null,
      dialogFormVisible: false,
      optionsskfs: null,
      valueskfs: null,
      activ: 1,
      temp: {
        account: null,
        accountStartData: null,
        accumulationFundAccount: null,
        accumulationFundPwd: null,
        addressId: [],
        clientName: null,
        clientNo: null,
        collectionDays: null,
        contacts: [
          {
            account: null,
            clientId: null,
            contactPosition: null,
            contactsName: null,
            contactsPhone: null,
            createBy: null,
            createTime: null,
            id: null,
            isDeleted: null,
            updateBy: null,
            updateTime: null,
          },
        ],
        contractNo: null,
        contractRemark: null,
        corporateIdCard: null,
        costAccounting: null,
        customersSource: null,
        detailedAddress: null,
        discountedPrice: null,
        email: null,
        endDate: null,
        establishData: null,
        id: null,
        industryId: null,
        inlandRevenue: null,
        isTaxControlPlate: null,
        ledgerPay: null,
        legalRepresentative: null,
        monthPay: null,
        officePhone: null,
        onlyCreditCode: null,
        otherCost: null,
        password: null,
        personalTaxAccount: null,
        personalTaxPwd: null,
        qq: null,
        valueskfs: null,
        realMonthPrice: null,
        receiveWay: null,
        remark: null,
        sendMonth: null,
        serviceItem: 677,
        serviceStartData: null,
        serviceType: 545,
        signUpDate: null,
        socialSecurityAccount: null,
        socialSecurityPwd: null,
        startDate: null,
        taxAreaId: [],
        taxDeclarationPwd: null,
        taxIdentificationCode: null,
        taxNature: null,
        taxPassword: null,
        taxPhone: null,
        taxRemark: null,
        taxesList: [
          {
            clientId: null,
            createBy: null,
            createTime: null,
            id: null,
            isDeleted: null,
            taxCategoriesId: null,
            taxDeadline: null,
            updateBy: null,
            updateTime: null,
          },
        ],
        totalMoney: null,
        userId: null,
      },
      rules: {
        clientName: [
          { required: true, message: "客户名称不能为空", trigger: "blur" },
        ],
        clientNo: [
          { required: true, message: "客户编号不能为空", trigger: "blur" },
        ],
        contractNo: [
          { required: true, message: "合同编号不能为空", trigger: "blur" },
        ],
        serviceType: [
          { required: true, message: "服务类型不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    addVisable(curVal, oldVal) {
      this.dialogFormVisible = curVal;
    },
    editData(val) {
      this.temp = val;
    },
    status(val) {
      this.type = val;
    },
  },
  created() {
    this.showparm(1);
    this.showparm(4);
    this.showparm(5);
    this.showparm(10);
    this.showparm(12);
    this.getshengshiqu();
  },
  methods: {
    autoNum(e) {
      if (this.type == "create") {
        const val = e.currentTarget.value.substring(0, 4);
        const py = pinyin(val, { pattern: "first" }).replace(/\s*/g, "");
        const y = new Date().getFullYear();
        const m = new Date().getMonth() + 1;
        const d = new Date().getDate();
        const h = new Date().getHours();
        const mm = new Date().getMinutes();
        const s = new Date().getSeconds();
        this.temp.clientNo = py + "0001";
        this.temp.contractNo = `JZ${y}${m > 10 ? m : "0" + m}${
          d > 10 ? d : "0" + d
        }${h > 10 ? h : "0" + h}${mm > 10 ? mm : "0" + mm}${
          s > 10 ? s : "0" + s
        }`;
      }
    },
    insertContact() {
      this.temp.contacts.push({
        account: null,
        clientId: null,
        contactPosition: null,
        contactsName: null,
        contactsPhone: null,
        createBy: null,
        createTime: null,
        id: null,
        isDeleted: null,
        updateBy: null,
        updateTime: null,
      });
    },
    deleteContact(index) {
      this.temp.contacts.splice(index, 1);
    },
    handleClose() {
      this.$emit("toggleViable", false);
    },
    handleChange(value) {},
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.addressId = this.temp.addressId.filter((_, i) => i == 2);
          this.temp.taxAreaId = this.temp.taxAreaId.filter((_, i) => i == 1);
          addclient(this.temp).then((res) => {
            if (res.data.retCode === 500)
              return this.$message.error(res.data.message);
            this.$emit("toggleViable", false, true);
            return this.$message.success("创建成功");
          });
        } else {
          this.$message.warning(
            "客户名称、服务类型、客户编号、合同编号不能为空"
          );
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.addressId =
            this.temp.addressId && (this.temp.addressId + "").split(",");
          this.temp.taxAreaId =
            this.temp.taxAreaId && (this.temp.taxAreaId + "").split(",");
          modifyClientData(this.temp).then((res) => {
            if (res.data.retCode === 500)
              return this.$message.error(res.data.message);
            this.$emit("toggleViable", false, true);
            return this.$message.success("修改成功");
          });
        } else {
          this.$message.warning(
            "客户名称、服务类型、客户编号、合同编号不能为空"
          );
        }
      });
    },
    detailShow() {
      this.moreVisable = !this.moreVisable;
    },
    showparm(pid) {
      getlistPartData(pid).then((response) => {
        var newdata = [];
        for (var i = 0; i < response.data.data.length; i++) {
          var value = response.data.data[i].id;
          var label = response.data.data[i].dataValue;

          var newitemdata = { value, label };
          newdata.push(newitemdata);
        }

        if (pid == 1) {
          this.optionsfwlx = newdata;
        } else if (pid == 4) {
          this.optionssshy = newdata;
        } else if (pid == 5) {
          this.optionskhly = newdata;
        } else if (pid == 10) {
          this.optionsfwxm = newdata;
        } else if (pid == 12) {
          this.optionsskfs = newdata;
        }

        this.listLoading = false;
      });
    },
    getshengshiqu() {
      getArea().then((response) => {
        const data1 = response.data.data[0].children;

        var newdata = [];

        for (var i = 0; i < data1.length; i++) {
          var value = data1[i].id;
          var label = data1[i].district;
          var children1 = data1[i].children;

          var children = [];

          for (var j = 0; j < children1.length; j++) {
            var value2 = children1[j].id;
            var label2 = children1[j].district;
            var children2 = children1[j].children;
            var childrena2 = [];

            for (var k = 0; k < children2.length; k++) {
              var value3 = children2[k].id;
              var label3 = children2[k].district;
              var newchide2 = { value3, label3 };
              childrena2.push(newchide2);
            }

            var chailre = { value2, label2, childrena2 };
            children.push(chailre);
          }

          var newitemdata = { value, label, children };
          newdata.push(newitemdata);
        }

        let data3 = JSON.stringify(newdata)
          .replace(/label2/g, "label")
          .replace(/value2/g, "value")
          .replace(/label3/g, "label")
          .replace(/value3/g, "value");

        let data2 = JSON.stringify(newdata)
          .replace(/label2/g, "label")
          .replace(/value2/g, "value")
          .replace(/label3/g, "label")
          .replace(/value3/g, "value")
          .replace(/childrena2/g, "children");
        this.optionsshengshiqu = JSON.parse(data2);

        this.optionsnsqu = JSON.parse(data3);
      });
    },
    miaodin(index) {
      this.activ = index;
      document.querySelector("#con" + index).scrollIntoView({
        behavior: "auto", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: "start", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        inline: "start", // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
    },
    scrollDiv(e) {
      if (e.target.scrollTop < 200) {
        this.activ = 1;
      }
      if (e.target.scrollTop > 286) {
        this.activ = 2;
      }
      if (e.target.scrollTop > 463) {
        this.activ = 3;
      }
      if (e.target.scrollTop > 977) {
        this.activ = 4;
      }
    },
    beforeHandle() {
      if (this.type === "create") {
        this.$confirm("确认关闭？")
          .then((_) => {
            this.$emit("toggleViable", false);
          })
          .catch((_) => {});
        return;
      }
      this.$emit("toggleViable", false);
    },
  },
};
</script>

<style lang='scss' scoped>
.form {
  height: 400px;
  overflow-y: scroll;
  margin-top: 10px;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0.625rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.625rem;
    background-color: #f5f5f5;
  }
}
.cur {
  color: #3f87ca;
  cursor: pointer;
}
.el-col-3 {
  text-align: center;
}
.con1,
.con2,
.con3,
.con4 {
  background: #f8f8f8;
  padding: 5px;
}
</style>