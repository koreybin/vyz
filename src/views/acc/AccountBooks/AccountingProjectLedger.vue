<template>
  <div style="height: 100%">
    <div class="ui-header">
      <div>
        <label> 核算项目明细账 </label>
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
                        :key="item.period"
                        :label="item.cnPeriod"
                        :value="item.period"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2" style="text-align: center"> 至 </el-col>
                  <el-col :span="10">
                    <el-select v-model="query.endDate" size="mini">
                      <el-option
                        v-for="item in startEndList"
                        :key="item.period"
                        :label="item.cnPeriod"
                        :value="item.period"
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
              <el-form-item label="辅助项目">
                <el-col :span="18">
                  <el-input
                    v-model="query.assist"
                    autocomplete="off"
                    class="int"
                    size="mini"
                  >
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="科目">
                <el-col :span="18">
                  <el-input
                    v-model="query.subject"
                    autocomplete="off"
                    class="int"
                    size="mini"
                    @focus="searchSubjectBoxShow = true"
                    @blur="searchSubjectBoxShow = false"
                  >
                  </el-input>
                  <div class="ui-box" v-if="searchSubjectBoxShow">
                    <div v-if="!subjectList.length" class="b-item">
                      没有匹配的选项
                    </div>
                    <div
                      v-else
                      class="b-item"
                      v-for="item in subjectList"
                      :key="item.id"
                      @mousedown.prevent="searchSubjectSelect(item)"
                    >
                      {{ item.otherSubjectName }}
                    </div>
                  </div>
                </el-col>

                <i class="el-icon-folder-add aa" @click="subjectSelect(1)"></i>
              </el-form-item>
              <el-form-item label="科目级次" prop="money">
                <el-col :span="10">
                  <el-input v-model="query.levelS" type="number" size="mini">
                  </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"> 至 </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="query.levelE"
                    type="number"
                    size="mini"
                  ></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.show"
                  label="显示科目"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.isz"
                  label="余额为0不显示"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="query.ist"
                  label="本期无发生额且余额为0不显示"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="cancelHandle">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="h-center">
        <div>
          <label>
            辅助类别：
            <el-select v-model="assistTypeId" style="width: 120px" size="mini">
              <el-option
                v-for="item in list"
                :key="item.id"
                :value="item.id"
                :label="item.dataValue"
              >
              </el-option>
            </el-select>
          </label>
          <el-button @click="onSubmit" size="mini">查询</el-button>
        </div>
      </div>
      <div>
        <el-button size="mini"> 打印 </el-button>
        <el-button size="mini" @click="output"> 导出 </el-button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="w-center" :style="{ width: showRight ? '1410px' : '1690px' }">
        <div class="w-header">科目：{{ subjectName }}</div>
        <div style="padding: 0 10px">
          <el-table
            :data="tableData"
            class="t-scroll"
            style="width: 100%"
            size="mini"
            border
          >
            <el-table-column prop="date" label="日期" width="180">
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
            <el-table-column prop="debit" label="借方"> </el-table-column>
            <el-table-column prop="loan" label="贷方"> </el-table-column>
            <el-table-column label="方向">
              <template slot-scope="scope">
                <div v-if="scope.row.balanceDirection === 1">借</div>
                <div v-if="scope.row.balanceDirection === 2">贷</div>
                <div v-if="scope.row.balanceDirection === 3">平</div>
              </template>
            </el-table-column>
            <el-table-column prop="balance" label="余额"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="w-right" :style="{ width: showRight ? '300px' : '22px' }">
        <div class="w-header" v-if="showRight">
          <i class="el-icon-d-arrow-right pointer hv" @click="toggleRight"></i>
          快速切换
        </div>
        <div class="w-header" v-else>
          <i class="el-icon-d-arrow-left pointer" @click="toggleRight"></i>
        </div>
        <div v-show="showRight">
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
                  {{ item.name }}
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
              node-key="id"
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
import { getPeriod } from "@/api/acc/Repertory/InventorySettings";
import { getVoucher } from "@/api/acc/recordVoucher";
import { accItemDetailedTree, accountingItemDetailed } from "@/api/acc/book";
import { GetListType } from "@/api/acc/assist";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
import { treeToList } from "@/utils/treeToListDepth";
import { export_json_to_excel } from "@/vendor/Export2Excel";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "AccountingProjectLedger",
  data() {
    return {
      tableData: [],
      searchSubject: "",
      showRight: true,
      moreVisible: false,
      msg: "",
      subjectName: "",
      aa: false,
      loading: true,
      assistId: 0,
      selected: "",
      subjectId: "",
      assistTypeId: 7,
      query: {
        assist: null,
        endDate: null,
        ist: null,
        isz: null,
        levelE: null,
        levelS: null,
        show: null,
        startDate: null,
        subject: "",
      },
      searchBoxShow: false,
      data11: [],
      treeToList: [],
      voucherData: [],
      defaultProps: {
        children: "subs",
        label: "fullName",
      },
      list: [],
      subjectAllList: [],
      searchSubjectBoxShow: false,
    };
  },
  created() {
    this.query.startDate =
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    this.firstGetTree();
    GetListType().then((res) => (this.list = res.data.data));
    this.subjectAllList = this.$store.getters.allSubjectList;
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
      return this.treeToList.filter((item) =>
        item.fullName.includes(this.searchSubject)
      );
    },
    subjectList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(this.query.subject)
      );
    },
  },

  activated() {
    this.$bus.$on("generalToDetail", (data, date) => {
      this.query.startDate = date.startDate;
      this.query.endDate = date.endDate;
      this.subjectId = data.id;
      this.subjectName = data.number + " " + data.name;
      this.getList();
      this.notFirstGetTree(data.id);
    });
    this.$bus.$on("summaryToDetail", (data, date) => {
      this.query.startDate = date.startDate;
      this.query.endDate = date.endDate;
      this.subjectId = data.id;
      this.subjectName = data.number + " " + data.name;
      this.getList();
      this.notFirstGetTree(data.id);
    });
    this.$bus.$on("balanceToDetail", (data, date) => {
      this.query.startDate = date.startDate;
      this.query.endDate = date.endDate;
      this.subjectId = data.id;
      this.subjectName = data.number + " " + data.name;
      this.getList();
      this.notFirstGetTree(data.id);
    });
  },
  deactivated() {
    this.$bus.$off("ledgerToDetail");
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    },
    getList() {
      accountingItemDetailed(
        this.assistId,
        this.assistTypeId,
        this.query,
        this.subjectId
      ).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        if (res.data.retCode !== 200) {
          this.tableData = [];
          return this.$message.warning(res.data.message);
        } else if (!res.data.data.length) {
          this.tableData = [];
          return this.$message.warning("无数据！");
        }

        res.data.data.forEach((item) => {
          item.debit = item.debit
            ? this.$numeral(item.debit).format("0,0.00")
            : null;
          item.loan = item.loan
            ? this.$numeral(item.loan).format("0,0.00")
            : null;
          item.balance = item.balance
            ? this.$numeral(item.balance).format("0,0.00")
            : null;
        });
        this.tableData = res.data.data;
      });
    },
    toggleRight() {
      this.showRight = !this.showRight;
    },
    updateList() {
      this.subjectId = this.data11[0].subjectId;
      this.subjectName = this.data11[0].fullName;
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data11[0].subjectId); // 默认选中节点第一个
      });
      this.getList();
    },
    handleNodeClick(data) {
      if (data.level) {
        console.log(data);
        this.subjectId = data.id;
        this.assistId = data.pid;
      } else {
        this.subjectId = "";
        this.assistId = data.id;
      }

      this.getList();
    },
    async getVoucher(row) {
      const { data: res } = await getVoucher(row.id);
      if (res.retCode !== 200) return this.$message.error(res.message);
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
        this.$bus.$emit("ledgerToDetail", this.voucherData);
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
      this.firstGetTree();
      this.moreVisible = false;
      // let str = `<ul>
      // <li>
      // <a>肖生克</a>
      // <p>1994</p>
      // </li>
      // <li>
      // <a>123</a>
      // <p>1992234</p>
      // </li>
      // </ul>`;
      // const reg = /<li>\s+?<a>(.*?)<\/a>\s+?<p>(.*?)<\/p>/g;
      // const result = reg.exec(str);
      // console.log(result);
    },
    cancelHandle() {
      this.query = {
        endDate: this.query.endDate,
        isAssist: null,
        levelE: null,
        levelS: null,
        startDate: this.query.startDate,
        subject: "",
        summary: null,
      };
    },
    async firstGetTree() {
      const { data: res } = await accItemDetailedTree(
        this.query,
        this.assistTypeId
      );
      if (!res.data.length) {
        this.tableData = [];
        this.data11 = [];
        return this.$message.warning("无数据！");
      }
      this.treeToList = treeToList(res.data);
      this.data11 = res.data;
      this.selected = res.data[0];
      this.assistId = res.data[0].id;
      this.subjectName = res.data[0].fullName;
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data11[0].id); // 默认选中节点第一个
      });

      this.getList();
    },
    async notFirstGetTree(id) {
      const { data: res } = await accItemDetailedTree(
        this.query,
        this.assistTypeId
      );

      this.data11 = res.data;
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(id); // 默认选中节点第一个
      });

      this.getList();
    },
    searchSelect(item) {
      this.searchSubject = item.fullName;
      this.searchBoxShow = false;
      this.assistId = item.id;
    },
    searchHandle() {
      if (this.searchSubject) {
        this.subjectName = this.searchSubject;
        this.$refs.tree.setCurrentKey(this.assistId);
        this.getList();
        this.searchSubject = "";
      }
    },
    searchBlur() {
      if (this.treeToList.some((item) => item.fullName === this.searchSubject))
        return;
      this.searchSubject = "";
      this.searchBoxShow = false;
    },
    searchSubjectSelect(item) {
      this.query.subject = item.otherSubjectName.split(" ")[0];
      this.searchSubjectBoxShow = false;
    },
    output() {
      const multiHeader = [["核算项目明细表", "", "", "", "", "", "", ""]];
      const multiHeader2 = [
        [
          `${this.$store.getters.childrenData.clientName}`,
          "",
          "",
          "",
          `${this.disperiodTit}`,
          "",
          "",
          "",
        ],
      ];
      const tHeader = [
        "科目",
        "日期",
        "凭证字号",
        "摘要",
        "借方",
        "贷方",
        "方向",
        "余额",
      ]; //二级表头
      const filterVal = [
        "subject",
        "ymd",
        "voucherNo",
        "summary",
        "debit",
        "loan",
        "cnDc",
        "balance",
      ]; //表头所对应后台返回的字段
      const data = this.formatJson(filterVal, this.tableData);
      const merges = ["A1:H1", "A2:D2", "E2:H2"];
      export_json_to_excel({
        multiHeader, // 这里是第一行的表头
        multiHeader2, // 这里是第二行的表头
        header: tHeader, // 这里是第三行的表头
        data, //数据
        merges, //合并行
        filename: "核算项目明细表" + "_" + this.disperiodTit,
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
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
</style>