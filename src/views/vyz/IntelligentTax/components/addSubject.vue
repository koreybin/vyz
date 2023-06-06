<template>
  <div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="addVisible"
      width="30%"
      @close="handleClose"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="科目">
          <el-form
            style="width: 100%"
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-width="150px"
          >
            <el-row>
              <el-col :span="spans.subjectCode">
                <el-form-item
                  :label="$t('setobjectobj.subjectCode')"
                  prop="subjectCode"
                >
                  <el-input
                    v-model="temp.subjectCode"
                    @blur="judgeNum($event.target.value)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.subjectName">
                <el-form-item
                  :label="$t('setobjectobj.subjectName')"
                  prop="subjectName"
                >
                  <el-input
                    @blur="budgeNum($event.target.value)"
                    v-model="temp.subjectName"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.subjectName">
                <el-form-item
                  :label="$t('setobjectobj.parentAccount')"
                  prop="subjectName"
                >
                  <el-input
                    disabled
                    @blur="budgeNum($event.target.value)"
                    v-model="temp.psubjectCode"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.isDefault">
                <el-form-item
                  :label="$t('setobjectobj.balanceDirection')"
                  prop="balanceDirection"
                >
                  <el-radio-group v-model="temp.balanceDirection">
                    <el-radio :label="1">贷</el-radio>
                    <el-radio :label="2">借</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item
                  :label="$t('setobjectobj.subjectType')"
                  prop="subjectType"
                >
                  <el-select v-model="temp.subjectType" placeholder="请选择">
                    <el-option
                      v-for="item in newList"
                      v-show="item.parentId == tabType"
                      :key="item.dataValue"
                      :label="item.dataValue"
                      :value="item.dataValue"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="辅助核算">
                  <el-checkbox
                    v-model="checkedhesuan"
                    @change="changehesuan"
                  ></el-checkbox>
                  <div v-show="box" class="box">
                    <el-checkbox-group
                      v-for="item in star"
                      :key="item.id"
                      v-model="temp.helpAccounting"
                    >
                      <el-checkbox :label="item.id">
                        {{ item.value }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="数量核算">
                  <el-checkbox v-model="checked" @change="check"></el-checkbox>
                  <div class="lala" v-show="checke">
                    <span>计量单位</span>
                    <el-input
                      class="int"
                      v-model="temp.quantityAccount"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="外币核算">
                  <el-checkbox
                    v-model="checkeda"
                    @change="checkedaa"
                  ></el-checkbox>
                  <div v-show="money">
                    <el-checkbox-group v-model="temp.isTransfer">
                      <el-checkbox :label="1">期末调汇</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group
                      v-model="temp.foreignCurrencyId"
                      disabled
                    >
                      <el-checkbox :label="0">人民币</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="tabType == 1">
              <el-col>
                <el-form-item label="现金及现金等价物">
                  <el-checkbox v-model="temp.isCashSubject"></el-checkbox>
                </el-form-item>
                <span class="footer el-icon-warning">
                  修改现金流量属性，可能会改变以前期间标准现金流量表，请谨慎操作！</span
                >
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t("table.cancel") }}</el-button>
        <!-- 创建确定 -->
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
          >{{ $t("table.confirm") }}
        </el-button>
        <!-- 编辑确定 -->
        <el-button
          v-else-if="dialogStatus == 'update'"
          type="primary"
          @click="updateData"
          >{{ $t("table.confirm") }}</el-button
        >
        <!-- 添加子级 -->
        <el-button v-else type="primary" @click="upData">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add } from "@/api/acc/BillVoucherTemplate";
import { addSubject, modifySubject, getType } from "@/api/acc/setsubject";
export default {
  props: ["dialogStatus", "addDialogVisible", "tabType", "formData", "system"],
  data() {
    return {
      valid: {
        isnumber: false,
        isstring: false,
      },
      addVisible: false,
      textMap: {
        update: "编辑科目",
        create: "创建科目",
        addSec: "添加子级",
      },
      checkedhesuan: "",
      box: false,
      star: [],
      money: false,
      checke: "",
      checked: "",
      checkeda: "",
      checkedb: "",
      checkedc: "",
      temp: {
        balanceDirection: 1, //现金方向(1:贷 2:借)
        dataType: null, //资产/负债/权益/成本/损益类别
        foreignCurrencyId: null, //外币核算id集合(不存入数据库)
        enable: 1, //是否启用
        helpAccounting: [], //辅助核算id集合(不存入数据库)
        isCashSubject: 0, //是否为现金科目(0:否 1:是)(仅限资产才有现金科目)
        isTransfer: 0, //是否期末调汇(0否1是)
        level: null,
        psubjectCode: null, //父级编码
        quantityAccount: null, //数量核算(计量单位)
        subjectCode: null, //科目编码
        subjectFinalCode: null,
        subjectName: null, //科目名称
        subjectType: null, //科目类别
        id: null,
        system: null, //会计制度
        psubjectName: null,
      },
      rules: {
        subjectCode: [
          { required: true, message: "编码不能为空", trigger: "red" },
        ],
        subjectName: [
          { required: true, message: "名称不能为空", trigger: "red" },
        ],
      },
      newList: [],
      spans: {
        subjectCode: 20,
        subjectName: 20,
        subjectType: 10,
        balanceDirection: 10,
        helpAccounting: 10,
        dataType: 20,
        foreignCurrency: 10,
        isCashSubject: 10,
        quantityAccount: 10,
        status: 10,
      },
    };
  },
  watch: {
    formData: {
      handler(val) {
        console.log(val);
        this.temp.subjectCode = val.subjectCode;
        this.temp.subjectName = val.subjectName;
        this.temp.psubjectCode = val.psubjectCode
          ? val.psubjectCode + " " + val.psubjectName
          : "无上级科目";
        this.temp.dataType = this.tabType;
        this.temp.subjectType = val.subjectType;
        this.temp.system = val.system;
        this.temp.id = val.id ? val.id : null;
        console.log(this.temp, "temp");
      },
      deep: true,
    },
    addDialogVisible(val) {
      this.addVisible = val;
    },
  },
  created() {
    add(10).then((res) => (this.newList = res.data.data));
    getType().then((res) => (this.star = res.data.data));
  },
  methods: {
    judgeNum(val) {
      let flag = new RegExp("^[0-9]*$").test(val);

      if (!flag) {
        this.$message({
          type: "warning",
          message: "格式错误,正确格式为数字,不包含空格等",
          duration: 5000,
        });
      } else {
        this.valid.isnumber = true;
      }
    },
    budgeNum(val) {
      let flag = new RegExp("^[A-z0-9\\u4e00-\\u9fa5]*$").test(val);
      if (!flag) {
        this.$message({
          type: "warning",
          message: "格式错误,正确格式为中文、英文、数字,不包含空格等",
          duration: 5000,
        });
      } else {
        this.valid.isstring = true;
      }
    },
    handleClose() {
      this.$emit("closeAddSubject", false);
    },
    createData() {
      if (this.temp.psubjectCode == "无上级科目") this.temp.psubjectCode = null;
      this.temp.system = this.system;
      this.temp.helpAccounting =
        this.temp.helpAccounting == []
          ? null
          : this.temp.helpAccounting.join(",");
      this.temp.isCashSubject ? (this.temp.isCashSubject = 1) : 0;
      this.temp.isTransfer ? (this.temp.isTransfer = 1) : 0;
      addSubject(this.temp).then((res) => {
        if (res.data.retCode === 500)
          return this.$message.error(res.data.message);
        this.$emit("closeAddSubject", false, true);
        this.temp = {
          balanceDirection: 1, //现金方向(1:贷 2:借)
          dataType: null, //资产/负债/权益/成本/损益类别
          foreignCurrencyId: null, //外币核算id集合(不存入数据库)
          enable: 1, //是否启用
          helpAccounting: [], //辅助核算id集合(不存入数据库)
          isCashSubject: 0, //是否为现金科目(0:否 1:是)(仅限资产才有现金科目)
          isTransfer: 0, //是否期末调汇(0否1是)
          level: null,
          psubjectCode: null, //父级编码
          quantityAccount: null, //数量核算(计量单位)
          subjectCode: null, //科目编码
          subjectFinalCode: null,
          subjectName: null, //科目名称
          subjectType: null, //科目类别
          id: null,
          system: null, //会计制度
          psubjectName: null,
        };
        this.checkedhesuan = false;
        this.checked = false;
        this.checkeda = false;
        this.checke = false;
        this.box = false;
        return this.$message.success("新增成功");
      });
    },
    updateData() {
      this.temp.helpAccounting =
        this.temp.helpAccounting == []
          ? null
          : this.temp.helpAccounting.join(",");
      this.temp.psubjectCode = this.temp.psubjectCode.split(" ")[0];
      this.temp.psubjectName = this.temp.psubjectCode.split(" ")[1];
      this.temp.isCashSubject ? (this.temp.isCashSubject = 1) : 0;
      this.temp.isTransfer ? (this.temp.isTransfer = 1) : 0;
      modifySubject(this.temp).then((res) => {
        if (res.data.retCode === 500)
          return this.$message.error(res.data.message);
        this.$emit("closeAddSubject", false, true);
        this.temp = {
          balanceDirection: 1, //现金方向(1:贷 2:借)
          dataType: null, //资产/负债/权益/成本/损益类别
          foreignCurrencyId: null, //外币核算id集合(不存入数据库)
          enable: 1, //是否启用
          helpAccounting: [], //辅助核算id集合(不存入数据库)
          isCashSubject: 0, //是否为现金科目(0:否 1:是)(仅限资产才有现金科目)
          isTransfer: 0, //是否期末调汇(0否1是)
          level: null,
          psubjectCode: null, //父级编码
          quantityAccount: null, //数量核算(计量单位)
          subjectCode: null, //科目编码
          subjectFinalCode: null,
          subjectName: null, //科目名称
          subjectType: null, //科目类别
          id: null,
          system: null, //会计制度
          psubjectName: null,
        };
        this.checkedhesuan = false;
        this.checked = false;
        this.checkeda = false;
        this.checke = false;
        this.box = false;
        return this.$message.success("修改成功");
      });
    },
    upData() {
      this.temp.helpAccounting =
        this.temp.helpAccounting == []
          ? null
          : this.temp.helpAccounting.join(",");
      this.temp.psubjectCode = this.temp.psubjectCode.split(" ")[0];
      this.temp.psubjectName = this.temp.psubjectCode.split(" ")[1];
      this.temp.isCashSubject ? (this.temp.isCashSubject = 1) : 0;
      this.temp.isTransfer ? (this.temp.isTransfer = 1) : 0;
      addSubject(this.temp).then((res) => {
        if (res.data.retCode === 500)
          return this.$message.error(res.data.message);
        this.$emit("closeAddSubject", false, true);
        this.temp = {
          balanceDirection: 1, //现金方向(1:贷 2:借)
          dataType: null, //资产/负债/权益/成本/损益类别
          foreignCurrencyId: null, //外币核算id集合(不存入数据库)
          enable: 1, //是否启用
          helpAccounting: [], //辅助核算id集合(不存入数据库)
          isCashSubject: 0, //是否为现金科目(0:否 1:是)(仅限资产才有现金科目)
          isTransfer: 0, //是否期末调汇(0否1是)
          level: null,
          psubjectCode: null, //父级编码
          quantityAccount: null, //数量核算(计量单位)
          subjectCode: null, //科目编码
          subjectFinalCode: null,
          subjectName: null, //科目名称
          subjectType: null, //科目类别
          id: null,
          system: null, //会计制度
          psubjectName: null,
        };
        this.checkedhesuan = false;
        this.checked = false;
        this.checkeda = false;
        this.checke = false;
        this.box = false;
        return this.$message.success("新增成功");
      });
    },
    changehesuan() {
      if (this.dialogStatus == "create") {
        this.temp.helpAccounting = [];
      }
      if (this.checkedhesuan) {
        this.box = true;
      } else {
        this.box = false;
        this.temp.helpAccounting = [];
      }
    },
    check() {
      if (this.checked) {
        this.checke = true;
      } else {
        this.checke = false;
      }
    },
    checkedaa() {
      if (this.checkeda) {
        this.money = true;
      } else {
        this.money = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  .box label {
    margin-left: 30px !important;
  }
}
</style>