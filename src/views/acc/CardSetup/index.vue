<template>
  <div style="width: 1144px">
    <div class="one">
      <el-button @click="dialogTableVisible = true">复制</el-button>
      <el-button @click="remove(arrData)">删除</el-button>
      <el-button @click="clear" v-if="!isClear">清理</el-button>
      <el-button @click="cancelClear" v-else>取消清理</el-button>
    </div>

    <div class="form-box">
      <div class="photo">
        <img src="@/assets/images/normalUsing.png" alt="" v-if="!isClear" />
        <img src="@/assets/images/cleared.png" alt="" v-else />
      </div>
      <el-form ref="arrData" :model="arrData">
        <div class="from">
          <el-form-item
            label="资产编码:"
            prop="assetsNumber"
            label-width="80px"
          >
            <el-input class="int" v-model="arrData.assetsNumber"> </el-input>
          </el-form-item>
          <el-form-item label="资产名称:" prop="assetsName" label-width="185px">
            <el-input class="int" v-model="arrData.assetsName"> </el-input>
          </el-form-item>
        </div>
        <div class="from">
          <el-form-item label="资产类别:" prop="value2" label-width="80px">
            <el-select v-model="arrData.assetsType2" @change="assetsTypeChange">
              <el-option
                v-for="item in list"
                :key="item.id"
                :label="item.name"
                :value="`${item.id},${item.name},${item.residuaValueRatio},${item.estimatedServiceLife}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="录入时间:" label-width="120px">
            <el-input
              class="int"
              v-model="$store.getters.childrenData.numberOfPeriods[0].disPeriod"
              disabled
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="from">
          <el-form-item label="使用部门:" prop="value1" label-width="80px">
            <el-select v-model="arrData.department2">
              <el-option
                v-for="item in arr"
                :key="item.id"
                :label="item.value"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="开始使用日期:"
            prop="usageDate"
            label-width="120px"
          >
            <el-date-picker
              v-model="arrData.usageDate"
              type="date"
              class="int"
              placeholder="选择日期"
            >
            </el-date-picker>
            <!-- <span>数量</span> -->
          </el-form-item>
          <el-form-item label="清理期间:" prop="subjectCode" label-width="80px">
            <el-input class="int" disabled v-model="arrData.subjectCode">
            </el-input>
          </el-form-item>
        </div>
        <span>折旧方式</span>
        <div class="xian"></div>
        <div class="from">
          <el-form-item label="折旧方式:" prop="value" label-width="100px">
            <el-select
              v-model="arrData.depreciationMethod"
              @change="changeMethod"
            >
              <el-option label="平均年限法" :value="1"></el-option>
              <el-option label="不提折旧" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="预计使用期限:"
            prop="estimatedServiceLife"
            label-width="120px"
          >
            <el-input class="int" v-model="arrData.estimatedServiceLife">
            </el-input
            ><span>期</span>
          </el-form-item>
        </div>
        <div class="from">
          <el-form-item
            label="固定资产科目"
            label-width="100px"
            prop="fixedAssetsSubject2"
          >
            <el-input
              v-model="arrData.fixedAssetsSubject2"
              autocomplete="off"
              class="int"
            >
            </el-input>
            <i class="el-icon-folder-add aa" @click="select1"></i>
          </el-form-item>
          <el-form-item
            label="累计折旧科目:"
            label-width="170px"
            prop="accumulatedDepreciationSubject2"
          >
            <el-input
              v-model="arrData.accumulatedDepreciationSubject2"
              autocomplete="off"
              class="int"
            >
            </el-input>
            <i class="el-icon-folder-add aa" @click="select2"></i>
          </el-form-item>
          <el-form-item
            label="折旧费用科目"
            label-width="140px"
            prop="depreciationExpenseSubject2"
          >
            <el-input
              v-model="arrData.depreciationExpenseSubject2"
              autocomplete="off"
              class="int"
            >
            </el-input>
            <i class="el-icon-folder-add aa" @click="select3"></i>
            <span class="pointer" @click="defaultHandle">设为默认</span>
          </el-form-item>
        </div>
        <span>原值、净值、累计折旧</span>
        <div class="xian"></div>
        <div class="from">
          <el-form-item label="原值:" prop="originalValue" label-width="110px">
            <el-input
              class="int"
              v-model.number="arrData.originalValue"
              @change="yuan"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="from">
          <el-form-item
            label="残值率:"
            prop="residualValueRate"
            label-width="110px"
          >
            <el-input
              class="int"
              v-model.number="arrData.residualValueRate"
              @change="lv"
            >
            </el-input
            >%
          </el-form-item>
          <el-form-item
            label="预计残值:"
            prop="estimatedResidualValue"
            label-width="100px"
          >
            <el-input
              class="int"
              disabled
              v-model.number="arrData.estimatedResidualValue"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="from">
          <el-form-item
            label="减值准备:"
            prop="provisionImpairment"
            label-width="110px"
          >
            <el-input
              class="int"
              v-model.number="arrData.provisionImpairment"
              @change="jian"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="已折旧期间:"
            prop="depreciatedPeriod"
            label-width="120px"
          >
            <el-input
              class="int"
              v-model.number="arrData.depreciatedPeriod"
              @change="zhejiu"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="from">
          <el-form-item
            label="期初累计折旧:"
            prop="initialDepreciation"
            label-width="110px"
          >
            <el-input class="int" v-model.number="arrData.initialDepreciation">
            </el-input>
          </el-form-item>
          <el-form-item
            label="期初净值:"
            prop="openingNetValue"
            label-width="120px"
          >
            <el-input
              class="int"
              disabled
              v-model.number="arrData.openingNetValue"
            >
            </el-input>
          </el-form-item>
        </div>
        <el-form-item
          label="月折旧:"
          prop="monthlyDepreciation"
          label-width="110px"
        >
          <el-input
            class="int"
            v-model.number="arrData.monthlyDepreciation"
            :disabled="isNotMethod"
          >
          </el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" @click="editSubmission(arrData)"
            >确 定</el-button
          >
        </div>
      </el-form>
    </div>
    <div v-if="aa">
      <BillVoucherTemplatea :msgData="msg" @getData="fn"></BillVoucherTemplatea>
    </div>
    <el-dialog
      title="复制并新增卡片"
      :visible.sync="dialogTableVisible"
      width="20%"
    >
      <div>
        <label>复制卡片的数量：</label>
        <el-input type="number" v-model="quantity"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="copy">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetList,
  GetListPageByType,
  cancel,
  addSubjectId,
  modification,
  getById,
  copyCard,
  clearCard,
  cancelClear,
} from "@/api/acc/FixedAssets/Card";
import BillVoucherTemplatea from "../Setup/BillVoucherTemplatea";
export default {
  name: "CardSetup",
  components: { BillVoucherTemplatea },
  data() {
    return {
      isClear: false,
      dialogTableVisible: false,
      aa: false,
      quantity: 0,
      arrData: {
        subjectCode: null,
        accumulatedDepreciationSubject: null, //累计折旧科目id
        accumulatedDepreciationSubject2: null, //累计折旧科目
        assetsName: null, //资产名称
        assetsNumber: null, //资产编码
        assetsType: null, //资产类别
        assetsType2: null,
        clearDate: null, //	string($date)清除日期
        clientId: null, //	integer($int64)客户公司id
        department: null, //	integer($int64)使用部门id
        department2: null, //
        depreciatedPeriod: 0, //	integer($int32)z已折旧期间
        depreciationExpenseSubject: null, //	integer($int64)折旧费用科目id
        depreciationExpenseSubject2: null, //string折旧费用科目
        depreciationMethod: null, //	integer($int32)折旧方式(1: 平均年限法,2: 不提折扣)
        estimatedResidualValue: 0, //	number预计残值
        estimatedServiceLife: null, //	integer($int32)预计使用期限
        fixedAssetsSubject: null, //	integer($int64)固定资产科目id
        fixedAssetsSubject2: null,
        id: null, //	integer($int64)
        importPeriod: null, //	string录入期间
        initialDepreciation: 0, //	number期初折旧
        monthlyDepreciation: 0, //	number月折旧
        openingNetValue: 0, //	number期初净值
        originalValue: 0, //	number原值
        provisionImpairment: 0, //	number减值准备
        quantity: null, //	integer($int32)数量
        remarks: null, //string备注
        residualValueRate: 0, //	number($double)残值率
        usageDate: null, //	string($date)开始使用日
      },
      isNotMethod: false,
      list: [],
      arr: [],
      value: 1,
      defaultList: [
        { assetSubjectType: 1, subjectId: "" },
        { assetSubjectType: 2, subjectId: "" },
        { assetSubjectType: 3, subjectId: "" },
      ],
    };
  },
  created() {
    this.arrData.importPeriod = this.$store.getters.childrenData.setNowPeriod;
    this.getTypeList();
  },
  activated() {
    this.$bus.$on("getCard", (val) => {
      this.arrData.id = val.id;
      this.arrData.assetsNumber = val.assetsNumber;
      this.arrData.assetsName = val.assetsName;
      this.arrData.assetsType = val.assetsType;
      this.arrData.assetsType2 = val.assetsType2;
      this.arrData.department = val.department;
      this.arrData.department2 = val.department2;
      this.arrData.depreciationExpenseSubject2 =
        val.depreciationExpenseSubject2;
      this.arrData.depreciationExpenseSubject = val.depreciationExpenseSubject;
      this.arrData.fixedAssetsSubject = val.fixedAssetsSubject;
      this.arrData.fixedAssetsSubject2 = val.fixedAssetsSubject2;
      this.arrData.accumulatedDepreciationSubject =
        val.accumulatedDepreciationSubject;
      this.arrData.accumulatedDepreciationSubject2 =
        val.accumulatedDepreciationSubject2;
      this.arrData.depreciationMethod = val.depreciationMethod;
      this.arrData.estimatedServiceLife = val.estimatedServiceLife;
      this.arrData.originalValue = val.originalValue;
      this.arrData.residualValueRate = val.residualValueRate;
      this.arrData.estimatedResidualValue = val.estimatedResidualValue;
      this.arrData.provisionImpairment = val.provisionImpairment;
      this.arrData.depreciatedPeriod = val.depreciatedPeriod;
      this.arrData.initialDepreciation = val.initialDepreciation;
      this.arrData.openingNetValue = val.openingNetValue;
      this.arrData.monthlyDepreciation = val.monthlyDepreciation;
      this.arrData.depreciatedPeriod = val.depreciatedPeriod;
      this.arrData.usageDate = val.usageDate;
      this.arrData.remarks = val.remarks;
      if (val.clearDate) this.isClear = true;
    });
  },
  methods: {
    getTypeList() {
      GetList().then((res) => {
        this.list = res.data.data;
      });
      GetListPageByType().then((res) => {
        this.arr = res.data.data.object;
      });
    },
    //固定资产科目
    select1() {
      this.msg = 1;
      this.aa = true;
    },
    //累计折旧科目
    select2() {
      this.msg = 0;
      this.aa = true;
    },
    //折旧费用科目
    select3() {
      this.msg = 2;
      this.aa = true;
    },
    editSubmission(e) {
      modification(this.arrData).then((res) => {
        if (res.data.retCode === 200) return this.$message.success("修改成功");
      });
    },
    yuan(e) {
      // 预计残值
      this.arrData.estimatedResidualValue =
        e * (this.arrData.residualValueRate / 100);
      this.arrData.estimatedResidualValue =
        this.arrData.estimatedResidualValue.toFixed(2);
      // 期初净值
      this.arrData.openingNetValue =
        e - this.arrData.provisionImpairment - this.arrData.initialDepreciation;
      this.arrData.openingNetValue = this.arrData.openingNetValue.toFixed(2);
      if (!this.arrData.provisionImpairment) {
        this.arrData.monthlyDepreciation = (
          e -
          (e * (this.arrData.residualValueRate / 100)) /
            this.arrData.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
      if (!this.arrData.residualValueRate) {
        this.arrData.monthlyDepreciation = (
          (e - this.arrData.provisionImpairment) /
          this.arrData.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
      if (this.arrData.provisionImpairment && this.arrData.residualValueRate) {
        this.arrData.monthlyDepreciation = (
          (e -
            e * (this.arrData.residualValueRate / 100) -
            this.arrData.provisionImpairment) /
          this.arrData.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
    },
    lv(e) {
      this.arrData.estimatedResidualValue =
        this.arrData.originalValue * (e / 100);
      this.arrData.estimatedResidualValue =
        this.arrData.estimatedResidualValue.toFixed(2);
      if (!this.arrData.provisionImpairment) {
        this.arrData.monthlyDepreciation = (
          this.arrData.originalValue -
          (this.arrData.originalValue * (e / 100)) /
            this.arrData.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }

      if (this.arrData.provisionImpairment && e) {
        this.arrData.monthlyDepreciation = (
          (this.arrData.originalValue -
            this.arrData.originalValue * (e / 100) -
            this.arrData.provisionImpairment) /
          this.arrData.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
    },
    jian(e) {
      this.arrData.openingNetValue =
        this.arrData.originalValue - e - this.arrData.initialDepreciation;
      this.arrData.openingNetValue = this.arrData.openingNetValue.toFixed(2);
      if (!this.arrData.residualValueRate) {
        this.arrData.monthlyDepreciation = (
          (this.arrData.originalValue - e) /
          this.arrData.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }

      if (this.arrData.residualValueRate && e) {
        this.arrData.monthlyDepreciation = (
          (this.arrData.originalValue -
            this.arrData.originalValue *
              (this.arrData.residualValueRate / 100) -
            e) /
          this.arrData.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
    },
    zhejiu() {
      this.arrData.initialDepreciation =
        this.arrData.monthlyDepreciation * this.arrData.depreciatedPeriod;
      this.arrData.openingNetValue =
        this.arrData.originalValue -
        this.arrData.initialDepreciation -
        this.arrData.provisionImpairment;
    },
    qi(e) {
      if (this.arrData.originalValue - this.arrData.provisionImpairment < e) {
        this.$message.error("期初累计折旧 不能大于 原值-减值准备");
        this.arrData.openingNetValue =
          this.arrData.originalValue - this.arrData.provisionImpairment - e;
      } else {
        this.arrData.openingNetValue =
          this.arrData.originalValue - this.arrData.provisionImpairment - e;
      }
    },

    defaultHandle() {
      const first = this.arrData.fixedAssetsSubject;
      const second = this.arrData.accumulatedDepreciationSubject;
      const third = this.arrData.depreciationExpenseSubject;
      this.defaultList[0].subjectId = first && first;
      this.defaultList[1].subjectId = second && second;
      this.defaultList[2].subjectId = third && third;
      addSubjectId(this.defaultList).then((res) => {
        if (res.data.retCode === 200) return this.$message.success("设置成功");
      });
    },
    changeMethod(val) {
      this.isNotMethod = val === 1 ? false : true;
      this.arrData.monthlyDepreciation =
        val === 1
          ? (
              (this.arrData.originalValue -
                this.arrData.originalValue *
                  (this.arrData.residualValueRate / 100) -
                this.arrData.provisionImpairment) /
              this.arrData.estimatedServiceLife
            ).toFixed(2)
          : "0.00";
    },
    assetsTypeChange(val) {
      const data = this.arrData;
      const [id, name, can, year] = val.split(",");
      data.assetsType = id;
      data.assetsType2 = name;
      data.estimatedServiceLife = year * 12;
      data.residualValueRate = can;
      this.lv(data.residualValueRate);
      this.jian(data.provisionImpairment);
      this.yuan(data.originalValue);
    },
    remove() {
      this.$confirm(
        `删除卡片可能会影响以前计提的折旧，如果资产已经报废，可以进行清理。请确认是否继续删除？`,
        "提示",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          cancel(this.arrData.id).then((res) => {
            if (res.data.retCode === 200) {
              const route = this.generateRoute();
              this.$store
                .dispatch("delMinorVisitedViews", route)
                .then((views) => {
                  if (this.isActive(route)) {
                    const latestView = views.slice(-1)[0];
                    if (latestView) {
                      this.$router.push(latestView.path);
                    } else {
                      this.$router.push("/");
                    }
                    return this.$message.success("删除成功");
                  }
                });
            }
          });
        })
        .catch(() => {});
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    async clear() {
      const { data: res } = await clearCard(this.arrData.id);
      if (res.retCode !== 200) {
        return this.$message.success("清理失败");
      }
      const { data } = await getById(this.arrData.id);
      data.clearDate ? (this.isClear = true) : (this.isClear = false);
      this.arrData.clearDate = data.clearDate;
      return this.$message.success("清理成功");
    },
    async cancelClear() {
      const { data: res } = await cancelClear(this.arrData.id);
      if (res.retCode !== 200) {
        return this.$message.success("取消清理失败");
      }
      const { data } = await getById(this.arrData.id);
      data.clearDate ? (this.isClear = true) : (this.isClear = false);
      this.arrData.clearDate = data.clearDate;
      return this.$message.success("取消清理成功");
    },
    copy() {
      copyCard(this.arrData.id, this.quantity).then((res) => {
        this.dialogTableVisible = false;
        if (res.data.retCode === 200) return this.$message.success("复制成功");
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.from {
  display: flex;
}
.form-box {
  position: relative;
  margin-left: 18px;
  padding: 20px 30px;
  border: 1px solid #cfcfcf;
  background: #fff;
  box-shadow: 0 1px 3px rgb(244, 244, 244);
  .photo {
    position: absolute;
    top: 20px;
    right: 100px;
  }
}
.int {
  width: 150px;
}
.xian {
  width: 99%;
  height: 2px;
  background: #ccc;
  margin: 7px 0;
}
.one {
  margin: 10px 10px 10px 18px;
  display: flex;
}
</style>