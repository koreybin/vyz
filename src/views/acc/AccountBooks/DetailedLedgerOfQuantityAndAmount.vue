<template>
  <div style="height: 100%">
    <div class="ui-header">
      <div>
        <label> 数量金额明细账 </label>
        <div class="ui-btn-menu">
          <span class="ui-btn pointer" @click="moreVisible = !moreVisible">
            <span class="selected-period">
              <span class="selected-period">
                <strong>{{ disperiodTit }}</strong>
              </span>
            </span>
            <b></b>
          </span>
          <div v-if="moreVisible" class="moreBox">
            <el-form
              ref="form"
              :model="query"
              label-width="80px"
              label-position="right"
            >
              <el-form-item label="会计期间">
                <el-row>
                  <el-col :span="10">
                    <el-select v-model="query.startDate" size="mini">
                      <el-option
                        v-for="item in startEndList"
                        :key="item.disPeriod"
                        :label="item.disPeriod"
                        :value="item.yearPeriod"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2" style="text-align: center"> 至 </el-col>
                  <el-col :span="10">
                    <el-select v-model="query.endDate" size="mini">
                      <el-option
                        v-for="item in startEndList"
                        :key="item.disPeriod"
                        :label="item.disPeriod"
                        :value="item.yearPeriod"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      icon="el-icon-refresh-left"
                      circle
                      size="mini"
                      type="text"
                      @click="resetTime"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="起始科目">
                <el-col :span="18">
                  <el-input
                    v-model="query.subjectStart"
                    autocomplete="off"
                    class="int"
                    size="mini"
                    @focus="searchStartBoxShow = true"
                    @blur="searchStartBoxShow = false"
                  >
                  </el-input>
                  <div class="ui-box" v-if="searchStartBoxShow">
                    <div v-if="!subjectStartList.length" class="b-item">
                      没有匹配的选项
                    </div>
                    <div
                      v-else
                      class="b-item"
                      v-for="item in subjectStartList"
                      :key="item.id"
                      @mousedown.prevent="searchSubjectSelect(item, 1)"
                    >
                      {{ item.otherSubjectName }}
                    </div>
                  </div>
                </el-col>

                <i class="el-icon-folder-add aa" @click="subjectSelect(0)"></i>
              </el-form-item>
              <el-form-item label="结束科目">
                <el-col :span="18">
                  <el-input
                    v-model="query.subjectEnd"
                    autocomplete="off"
                    class="int"
                    size="mini"
                    @focus="searchEndBoxShow = true"
                    @blur="searchEndBoxShow = false"
                  >
                  </el-input>
                  <div class="ui-box" v-if="searchEndBoxShow">
                    <div v-if="!subjectEndList.length" class="b-item">
                      没有匹配的选项
                    </div>
                    <div
                      v-else
                      class="b-item"
                      v-for="item in subjectEndList"
                      :key="item.id"
                      @mousedown.prevent="searchSubjectSelect(item, 2)"
                    >
                      {{ item.otherSubjectName }}
                    </div>
                  </div>
                </el-col>

                <i class="el-icon-folder-add aa" @click="subjectSelect(1)"></i>
              </el-form-item>
              <el-form-item label="科目级次">
                <el-col :span="10">
                  <el-input v-model="query.levelS" type="number"> </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"> 至 </el-col>
                <el-col :span="10">
                  <el-input v-model="query.levelE" type="number"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="数量显示小数位数" label-width="130px">
                <el-col :span="8">
                  <el-input v-model="query.quantity" type="number"> </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="单价显示小数位数" label-width="130px">
                <el-col :span="8">
                  <el-input v-model="query.price" type="number"> </el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.isAssist"
                  label="显示辅助核算"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.ist"
                  label="无发生额且余额为0不显示"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.isw"
                  label="余额为0不显示"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.isz"
                  label="无发生额不显示本期合计、本年累计"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="cancelHandle">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
          size="mini"
        ></el-button>
      </div>
      <div class="h-center">
        <span class="voucherData">科目：{{ subjectName }}</span>
      </div>

      <div>
        <el-button size="mini"> 打印 </el-button>
        <el-button size="mini"> 连续打印 </el-button>
        <el-button size="mini">导出</el-button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="w-center">
        <div style="padding: 0 10px; max-width: 1413px; height: 100%">
          <el-table :data="tableData" class="t-scroll" size="mini" border>
            <el-table-column prop="ymd" label="日期" width="180">
            </el-table-column>
            <el-table-column label="凭证字号" width="180">
              <template slot-scope="scope">
                <a
                  href="/#/CheckVoucher/CheckVoucher/Voucher"
                  @click="getVoucher(scope.row)"
                  >{{ scope.row.proveNumber }}</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="摘要"> </el-table-column>
            <el-table-column prop="debit" label="借方发生额">
              <el-table-column label="数量" prop="deAm"> </el-table-column>
              <el-table-column label="单价" prop="dePrice"> </el-table-column>
              <el-table-column label="金额" prop="deM"> </el-table-column>
            </el-table-column>
            <el-table-column prop="loan" label="贷方发生额">
              <el-table-column label="数量" prop="loAm"> </el-table-column>
              <el-table-column label="单价" prop="loPrice"> </el-table-column>
              <el-table-column label="金额" prop="loM"> </el-table-column>
            </el-table-column>

            <el-table-column prop="balance" label="余额">
              <el-table-column label="方向">
                <template slot-scope="scope">
                  <div v-if="scope.row.dc === 1">借</div>
                  <div v-if="scope.row.dc === 2">贷</div>
                  <div v-if="scope.row.dc === 3">平</div>
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="baAm"> </el-table-column>
              <el-table-column label="单价" prop="baPrice"> </el-table-column>
              <el-table-column label="金额" prop="baM"> </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="w-right" style="width: 300px">
        <div>
          <div class="hd">
            <form class="ui-search">
              <input
                type="text"
                class="ui-input"
                v-model="searchSubject"
                @input="searchBoxShow = true"
                @blur="searchBlur"
              />
              <div class="ui-box" v-if="searchBoxShow">
                <div v-if="!searchList.length" class="b-item">
                  没有匹配的选项
                </div>
                <div
                  v-else
                  class="b-item"
                  v-for="item in searchList"
                  :key="item.id"
                  @mousedown.prevent="searchSelect(item)"
                >
                  {{ item.combination }}
                </div>
              </div>
              <button class="ui-button" @click="searchHandle"></button>
            </form>
          </div>
          <div class="bd">
            <el-tree
              class="tree"
              ref="tree"
              :data="data11"
              :props="defaultProps"
              node-key="subjectId"
              @node-click="handleNodeClick"
              :highlight-current="true"
              :expand-on-click-node="false"
            ></el-tree>
          </div>
        </div>
      </div>
    </div>
    <div v-if="aa">
      <BillVoucherTemplatea
        @getData="fn2"
        :msgData="msg"
      ></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import { getVoucher } from "@/api/acc/recordVoucher";
import { treeToList } from "@/utils/treeToListDepth";
import {
  quantityAmountDetailsTree,
  quantityAmountDetails,
} from "@/api/acc/book";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "DetailedLedgerOfQuantityAndAmount",
  data() {
    return {
      tableData: [],
      moreVisible: false,
      msg: "",
      subjectName: "",
      aa: false,
      loading: true,
      assistId: 0,
      subjectId: "",
      query: {
        endDate: null,
        isAssist: null,
        ist: null,
        isz: null,
        levelS: null,
        levelE: null,
        priceDisplay: null,
        quantityDisplay: null,
        startDate: null,
        subjectEnd: "",
        subjectStart: "",
        price: 2,
        quantity: 2,
      },
      data11: [],
      searchBoxShow: false,
      searchSubject: "",
      voucherData: [],
      defaultProps: {
        children: "sub",
        label: "combination",
      },
      depthTree: [],
      subjectAllList: [],
      searchStartBoxShow: false,
      searchEndBoxShow: false,
    };
  },
  created() {
    this.subjectAllList = this.$store.getters.allSubjectList;
    this.query.startDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.firstGetTree();
  },
  computed: {
    disperiodTit() {
      if (this.query.startDate === this.query.endDate)
        return `${this.query.startDate.split("-")[0]}年第${this.query.startDate
          .split("-")[1]
          .replace(/^0/g, "")}期`;
      if (this.query.startDate !== this.query.endDate) {
        return `${this.query.startDate.split("-")[0]}年第${this.query.startDate
          .split("-")[1]
          .replace(/^0/g, "")}期 至 ${
          this.query.endDate.split("-")[0]
        }年第${this.query.endDate.split("-")[1].replace(/^0/g, "")}期`;
      }
    },
    startEndList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
    searchList() {
      return this.depthTree.filter((item) =>
        item.combination.includes(this.searchSubject)
      );
    },
    subjectStartList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(this.query.subjectStart)
      );
    },
    subjectEndList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(this.query.subjectEnd)
      );
    },
  },

  activated() {
    this.$bus.$on("quantityGeneralToDetail", (data, date) => {
      this.cancelHandle();
      this.query.startDate = date.startDate;
      this.query.endDate = date.endDate;
      this.subjectId = data.id;
      this.subjectName = data.number + " " + data.name;
      setTimeout(() => {
        this.notFirstGetTree(data.id);
      }, 500);
    });
  },
  deactivated() {
    this.$bus.$off("getQuantityVoucher");
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    },
    getList() {
      let q = this.query.quantity;
      let p = this.query.price;
      quantityAmountDetails(this.assistId, this.query, this.subjectId).then(
        (res) => {
          if (res.data.retCode === 4001) {
            this.$alert(res.data.message, "会话过期", {
              confirmButtonText: "确认",
            }).then(() => {
              this.$router.push("/dashboard");
            });
          }
          if (res.data.retCode === 500) {
            this.$message.warning(res.data.message);
          }
          res.data.data &&
            res.data.data.forEach((item) => {
              item.deAm = item.deAm ? item.deAm.toFixed(q) : null;
              item.dePrice = item.dePrice ? item.dePrice.toFixed(p) : null;
              item.deM = item.deM ? item.deM.toFixed(p) : null;
              item.loAm = item.loAm ? item.loAm.toFixed(q) : null;
              item.loPrice = item.loPrice ? item.loPrice.toFixed(p) : null;
              item.loM = item.loM ? item.loM.toFixed(p) : null;
              item.baAm = item.baAm ? item.baAm.toFixed(q) : null;
              item.baPrice = item.baPrice ? item.baPrice.toFixed(p) : null;
              item.baM = item.baM ? item.baM.toFixed(p) : null;
            });
          this.tableData = res.data.data;
        }
      );
    },
    updateList() {
      this.subjectId = this.data11[0].subjectId;
      this.subjectName = this.data11[0].combination;
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data11[0].subjectId); // 默认选中节点第一个
      });
      this.getList();
    },
    handleNodeClick(data) {
      this.subjectId = data.subjectId;
      this.subjectName = data.combination;
      if (typeof data.assist === "string" && data.assist.indexOf(",")) {
        this.assistId = data.assist.split(",");
      } else this.assistId = data.assist === null ? 0 : data.assist;
      this.getList();
    },
    async getVoucher(row) {
      const { data: res } = await getVoucher(row.id);
      // this.$store.dispatch("sendVoucher", res.data);
      res.data.content.forEach((item, index) => {
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
      });
      this.voucherData = res.data;
      this.sendData();
    },
    sendData() {
      setTimeout(() => {
        this.$bus.$emit("getQuantityVoucher", this.voucherData);
      }, 500);
    },

    subjectSelect(type) {
      this.aa = true;
      if (type === 0) {
        this.msg = 0;
      }
      if (type === 1) {
        this.msg = 1;
      }
    },
    fn2(bool, data, c) {
      this.aa = bool;
      if (!c) {
        this.query.subjectStart = data.otherSubjectName;
      } else {
        this.query.subjectEnd = data.otherSubjectName;
      }
    },
    onSubmit() {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data11[0].subjectId); // 默认选中节点第一个
      });
      this.firstGetTree();
      this.moreVisible = false;
    },
    cancelHandle() {
      this.resetTime();
      this.query = {
        endDate: this.query.endDate,
        isAssist: null,
        levelE: null,
        levelS: null,
        startDate: this.query.startDate,
        subjectEnd: null,
        subjectStart: null,
        summary: null,
      };
    },
    async firstGetTree() {
      const { data: res } = await quantityAmountDetailsTree(this.query);
      this.depthTree = treeToList(res.data);
      this.data11 = res.data;
      this.subjectId = res.data[0] ? res.data[0].subjectId : 0;
      this.subjectName = res.data[0] && res.data[0].combination;
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data11[0].subjectId); // 默认选中节点第一个
      });
      this.getList();
    },
    async notFirstGetTree(id) {
      const { data: res } = await quantityAmountDetailsTree(this.query);
      this.data11 = res.data;
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(id); // 默认选中节点第一个
      });
      this.getList();
    },
    searchSelect(item) {
      this.searchSubject = item.combination;
      this.searchBoxShow = false;
      this.subjectId = item.subjectId;
    },
    searchHandle() {
      if (this.searchSubject) {
        this.subjectName = this.searchSubject;
        this.$refs.tree.setCurrentKey(this.subjectId);
        const selected = this.$refs.tree.getCurrentNode();
        if (
          this.$refs.tree.getNode(selected) &&
          this.$refs.tree.getNode(selected).parent
        ) {
          this.expandParents(this.$refs.tree.getNode(selected).parent);
        }
        this.getList();
        this.searchSubject = "";
      }
    },
    // 展开父节点判断
    expandParents(node) {
      node.expanded = true;
      if (node.parent) {
        this.expandParents(node.parent);
      }
    },
    searchBlur() {
      if (
        this.depthTree.some((item) => item.combination === this.searchSubject)
      )
        return;
      this.searchSubject = "";
      this.searchBoxShow = false;
    },
    searchSubjectSelect(item, type) {
      if (type === 1) {
        this.query.subjectStart = item.otherSubjectName;
        this.searchStartBoxShow = false;
      }
      if (type === 2) {
        this.query.subjectEnd = item.otherSubjectName;
        this.searchEndBoxShow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.b-item:hover {
  background-color: #ddd;
}
.el-date-editor.el-input[data-v-004],
.el-date-editor.el-input__inner[data-v-004] {
  width: 120px;
}
.tree {
  height: 690px;
  overflow: auto;
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
.t-scroll {
  height: 100%;
}
/deep/.el-table__body-wrapper {
  height: 100%;
}
</style>