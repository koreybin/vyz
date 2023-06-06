<template>
  <div class="app-container calendar-list-container" style="background: #eee">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-width="100px">
      <el-row>
        <el-col>
          <el-form-item label="基础参数" />
        </el-col>
        <el-col>
          <el-form-item
            :label="$t('parameterSettingsobj.clientName')"
            prop="clientName"
          >
            <el-input
              v-model="temp.clientName"
              disabled
              style="width: 250px"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            :label="$t('parameterSettingsobj.standardMoney')"
            prop="standardMoney"
          >
            <el-input
              v-model="temp.standardMoney"
              disabled
              style="width: 250px"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            :label="$t('parameterSettingsobj.period')"
            prop="period"
          >
            <el-input
              v-model="year"
              type="number"
              style="width: 100px"
              disabled
            ></el-input>
            <label>年</label>
            <el-input
              v-model="number"
              type="number"
              style="width: 100px"
              disabled
            ></el-input>
            <label>期</label>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item :label="$t('parameterSettingsobj.standards')">
            <el-select
              v-model="temp.standards"
              :disabled="true"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionszhunze"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item>
            <label>切换到：</label>
            <el-radio-group v-model="temp.standards">
              <el-radio :label="1">新会计准则(06年颁)</el-radio>
              <el-radio :label="2">小企业会计准则(2013年颁)</el-radio>
              <el-radio :label="3"
                >新企业会计准则(19年末执行新金融、新收入和新租赁准则)</el-radio
              >
              <el-radio :label="5"
                >新企业会计准则(2019年执行新金融、新收入和新租赁准则)</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="科目参数" />
        </el-col>
        <el-col>
          <el-form-item
            :label="$t('parameterSettingsobj.subjectParameter')"
            prop="subjectParameter"
          >
            <el-select
              v-model="temp.subjectParameter"
              placeholder="请选择"
              @change="changeSubjectParameter"
              style="width: 100px"
            >
              <el-option
                v-for="item in optionschengji"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <label class="yellow"
              ><i class="el-icon-warning"></i>
              科目级次调大后，不能再调小（即：不能再恢复到调整前的级次），请谨慎操作！</label
            >
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item
        :label="$t('parameterSettingsobj.encodingLengthsobj')"
        prop="encodingLengthsobj"
      >
        <template>
          <el-input
            v-model="temp.encodingLengths.first"
            style="width: 100px"
            type="number"
            max="8"
            min="4"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input>
          <el-input
            v-model="temp.encodingLengths.second"
            style="width: 100px"
            type="number"
            max="8"
            min="2"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input>
          <el-input
            v-model="temp.encodingLengths.third"
            style="width: 100px"
            type="number"
            max="8"
            min="2"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input>
          <el-input
            v-model="temp.encodingLengths.fourth"
            style="width: 100px"
            type="number"
            max="8"
            min="2"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input>
          <el-input
            v-show="ok5"
            v-model="temp.encodingLengths.fifth"
            style="width: 100px"
            type="number"
            max="8"
            min="2"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input>
          <el-input
            v-show="ok6"
            v-model="temp.encodingLengths.sixth"
            style="width: 100px"
            type="number"
            max="8"
            min="2"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input>
          <el-input
            v-show="ok7"
            v-model="temp.encodingLengths.seventh"
            style="width: 100px"
            type="number"
            max="8"
            min="2"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input>
          <el-input
            v-show="ok8"
            v-model="temp.encodingLengths.eighth"
            style="width: 100px"
            type="number"
            max="8"
            min="2"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input
          ><el-input
            v-show="ok9"
            v-model="temp.encodingLengths.ninth"
            style="width: 100px"
            type="number"
            max="8"
            min="2"
            oninput="if(value.length>1)value=value.slice(0,1)"
          ></el-input>
        </template>
      </el-form-item>
      <el-form-item label="账簿"> </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="temp.accountBalanceWith"
          :true-label="1"
          :false-label="0"
          >账簿余额方向与科目方向相同</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="temp.deficitCheck"
          label="1"
          :true-label="1"
          :false-label="0"
          >现金、银行存款科目赤字检查</el-checkbox
        >
      </el-form-item>
      <el-form-item label="凭证"> </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="temp.generateVouchers"
          label="1"
          :true-label="1"
          :false-label="0"
          >按票据日期生成凭证</el-checkbox
        >
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateData">{{
        $t("table.savebut")
      }}</el-button>
    </div>
  </div>
</template>
<style>
.red {
  color: red;
  font-size: 20px;
  font-weight: 700;
}
.yellow {
  color: #999;
  font-size: 12px;
}
</style>
<script>
import isObjectValueEqual from "@/utils/isObjectValueEqual";
import deepFreeze from "@/utils/deepFreeze";
import waves from "@/components/waves"; // 水波纹指令
import {
  GetList,
  updateCurrency,
  updateSubject,
} from "@/api/acc/parameterSettings";

export default {
  name: "ParameterSettings",
  directives: {
    waves,
  },
  data() {
    return {
      year: "",
      number: "",
      optionszhunze: [
        {
          value: 1,
          label: "新会计准则(2006年颁)",
        },
        {
          value: 2,
          label: "小企业会计准则(2013年颁)",
        },
        {
          value: 3,
          label: "新企业会计准则(2019年未执行新金融、新收入和新租赁准则)",
        },
        {
          value: 5,
          label: "新企业会计准则(2019年执行新金融、新收入和新租赁准则)",
        },
      ],
      optionschengji: [
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
      ],
      ok5: false,
      ok6: false,
      ok7: false,
      ok8: false,
      ok9: false,
      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogStatus: "update",
      rules: {
        currencyCode: [
          { required: true, message: "编码不能为空", trigger: "blur" },
        ],
        currencyName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
        ],
        exchangeRate: [
          { required: true, message: "汇率不能为空", trigger: "blur" },
        ],
      },
      temp: {
        clientId: "",
        clientName: "",
        encodingLengths: {
          first: 4,
          second: 2,
          third: 2,
          fourth: 2,
          fifth: 2,
          sixth: 2,
          seventh: 2,
          eighth: 2,
          ninth: 2,
          id: "1",
        },
        id: "",
        period: null,
        standardMoney: "",
        standards: null,
        subjectParameter: "",
        accountBalanceWith: 0,
        deficitCheck: 0,
        generateVouchers: 0,
      },
      spans: {
        currencyCode: 8,
        currencyName: 8,
        exchangeRate: 8,
        changdu: 2,
      },
      updown: { proveId: null, value: null },
      beforeUpdateData: null,
    };
  },
  created() {
    this.getListdata();
    this.temp.period = this.$store.getters.childrenData.setStartTime;
    this.year = this.temp.period.split("-")[0];
    this.number = this.temp.period.split("-")[1].replace(/^[0]/g, "");
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    async getListdata() {
      const { data } = await GetList();
      this.beforeUpdateData = data.data;
      this.temp = JSON.parse(JSON.stringify(data.data));
      if (data.data.subjectParameter == 4) {
        this.optionschengji = [
          { value: 4, label: 4 },
          { value: 5, label: 5 },
          { value: 6, label: 6 },
          { value: 7, label: 7 },
          { value: 8, label: 8 },
          { value: 9, label: 9 },
        ];
      } else if (data.data.subjectParameter == 5) {
        this.optionschengji = [
          { value: 5, label: 5 },
          { value: 6, label: 6 },
          { value: 7, label: 7 },
          { value: 8, label: 8 },
          { value: 9, label: 9 },
        ];
        this.ok5 = true;
      } else if (data.data.subjectParameter == 6) {
        this.optionschengji = [
          { value: 6, label: 6 },
          { value: 7, label: 7 },
          { value: 8, label: 8 },
          { value: 9, label: 9 },
        ];
        this.ok5 = true;
        this.ok6 = true;
      } else if (data.data.subjectParameter == 7) {
        this.optionschengji = [
          { value: 7, label: 7 },
          { value: 8, label: 8 },
          { value: 9, label: 9 },
        ];
        this.ok5 = true;
        this.ok6 = true;
        this.ok7 = true;
      } else if (data.data.subjectParameter == 8) {
        this.optionschengji = [
          { value: 8, label: 8 },
          { value: 9, label: 9 },
        ];
        this.ok5 = true;
        this.ok6 = true;
        this.ok7 = true;
        this.ok8 = true;
      } else if (data.data.subjectParameter == 9) {
        this.optionschengji = [{ value: 9, label: 9 }];
        this.ok5 = true;
        this.ok6 = true;
        this.ok7 = true;
        this.ok8 = true;
        this.ok9 = true;
      }
      this.temp.subjectParameter = data.data.subjectParameter;
    },
    resetTemp() {
      (this.temp.currencyCode = ""),
        (this.temp.currencyName = ""),
        (this.temp.exchangeRate = null),
        (this.temp.isStandardMoney = 0);
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      console.log(
        isObjectValueEqual(
          this.temp.encodingLengths,
          this.beforeUpdateData.encodingLengths
        )
      );
      console.log(this.beforeUpdateData, "before");
      if (this.temp.standards !== this.beforeUpdateData.standards) {
        this.$confirm(
          `<p class='red'>切换新会计制度后，可能需要手工调节取数公式，请您谨慎操作!</p> 
            切换账套后，不影响您的会计科目、凭证、账簿，仅仅影响会计报表的样式，请先预览一下报表（<a href='/#/ReportForms/ReportForms/ProfitStatement'>利润表</a>、<a href='/#/ReportForms/ReportForms/BalanceSheet'>资产负债表</a>），再决定是否切换。
            建议您切换之前先备份账套`,
          "提示",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            let obj = { ...this.temp };
            delete obj.encodingLengths;
            delete obj.subjectParameter;
            updateCurrency(obj).then(() => {
              this.getListdata();
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
            });
          })
          .catch(() => {});
      } else if (
        this.temp.subjectParameter !== this.beforeUpdateData.subjectParameter ||
        !isObjectValueEqual(
          this.temp.encodingLengths,
          this.beforeUpdateData.encodingLengths
        )
      ) {
        this.$confirm(
          `<p class='red'>更改科目行为不可恢复！确定要修改吗？</p> `,
          "提示",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            let obj = {
              subjectParameter: this.temp.subjectParameter,
              encodingLengths: this.temp.encodingLengths,
            };
            updateSubject(obj).then(() => {
              this.getListdata();
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
            });
          })
          .catch(() => {});
      } else {
        let obj = { ...this.temp };
        delete obj.encodingLengths;
        delete obj.subjectParameter;
        updateCurrency(obj).then(() => {
          this.getListdata();
          this.$notify({
            title: "成功",
            message: "更新成功",
            type: "success",
            duration: 2000,
          });
        });
      }
    },
    changeSubjectParameter(val) {
      if (val === 4) {
        this.ok5 = false;
        this.ok6 = false;
        this.ok7 = false;
        this.ok8 = false;
        this.ok9 = false;
      }
      if (val === 5) {
        this.ok5 = true;
        this.ok6 = false;
        this.ok7 = false;
        this.ok8 = false;
        this.ok9 = false;
      }
      if (val === 6) {
        this.ok5 = true;
        this.ok6 = true;
        this.ok7 = false;
        this.ok8 = false;
        this.ok9 = false;
      }
      if (val === 7) {
        this.ok5 = true;
        this.ok6 = true;
        this.ok7 = true;
        this.ok8 = false;
        this.ok9 = false;
      }
      if (val === 8) {
        this.ok5 = true;
        this.ok6 = true;
        this.ok7 = true;
        this.ok8 = true;
        this.ok9 = false;
      }
      if (val === 9) {
        this.ok5 = true;
        this.ok6 = true;
        this.ok7 = true;
        this.ok8 = true;
        this.ok9 = true;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
</style>