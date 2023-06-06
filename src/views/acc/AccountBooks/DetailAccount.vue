<template>
  <div style="height: 100%">
    <div class="ui-header">
      <div>
        <label> 明细账 </label>
        <div class="ui-btn-menu">
          <span class="ui-btn pointer" @click="moreVisible = !moreVisible">
            <span class="selected-period">
              <strong>{{ disperiodTit }}</strong>
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
                    size="mini"
                    v-model="query.subjectStart"
                    autocomplete="off"
                    class="int"
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
                    size="mini"
                    v-model="query.subjectEnd"
                    autocomplete="off"
                    class="int"
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
              <el-form-item label="科目级次" prop="money">
                <el-col :span="10">
                  <el-input
                    v-model.number="query.levelS"
                    type="number"
                    size="mini"
                  >
                  </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"> 至 </el-col>
                <el-col :span="10">
                  <el-input
                    size="mini"
                    v-model.number="query.levelE"
                    type="number"
                  ></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="摘要" prop="summary">
                <el-input v-model="query.summary" size="mini"></el-input>
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
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="cancelHandle">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- <el-button class="el-icon-caret-left" @click="prev"> </el-button>
        <el-button class="el-icon-caret-right" @click="next"></el-button> -->
      </div>
      <div class="h-center">
        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
          type="mini"
        ></el-button>
      </div>

      <el-button v-print="'#printTest'" type="mini"> 打印 </el-button>
      <el-button type="mini"> 连续打印 </el-button>
      <el-dropdown @command="output">
        <el-button type="mini"
          >导出<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="导出当前科目"
            >导出当前科目</el-dropdown-item
          >
          <el-dropdown-item command="导出全部科目"
            >导出全部科目</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="main-wrap">
      <div
        class="w-center"
        id="printTest"
        :style="{ width: showRight ? '1410px' : '1690px' }"
      >
        <div class="w-header">科目：{{ subjectName }}</div>
        <div style="padding: 0 10px; height: 93%">
          <el-table
            :data="tableData"
            class="t-scroll"
            style="width: 100%; height: 100%"
            size="mini"
            border
          >
            <el-table-column prop="ymd" label="日期" width="180">
            </el-table-column>
            <el-table-column label="凭证字号" width="180">
              <template slot-scope="scope">
                <a
                  href="/#/CheckVoucher/CheckVoucher/Voucher"
                  @click="getVoucher(scope.row)"
                  >{{ scope.row.voucherNo }}</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="summary" label="摘要"> </el-table-column>
            <el-table-column prop="debit" label="借方"> </el-table-column>
            <el-table-column prop="loan" label="贷方"> </el-table-column>
            <el-table-column label="方向">
              <template slot-scope="scope">
                <div v-if="scope.row.dc == 1">借</div>
                <div v-if="scope.row.dc == 2">贷</div>
                <div v-if="scope.row.dc == 3">平</div>
              </template>
            </el-table-column>
            <el-table-column prop="balance" label="余额"> </el-table-column>
          </el-table>
        </div>
        <div style="height: 32px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
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
              highlight-current
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
import { getTree, detailedBooks } from "@/api/acc/book";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
import { treeToList } from "@/utils/treeToListDepth";
import { export_json_to_excel } from "@/vendor/Export2Excel";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "DetailAccount",
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
      subjectId: "",
      query: {
        endDate: null,
        isAssist: null,
        levelE: null,
        levelS: null,
        startDate: null,
        subjectEnd: "",
        subjectStart: "",
        summary: null,
      },
      searchBoxShow: false,
      searchStartBoxShow: false,
      searchEndBoxShow: false,
      data11: [],
      voucherData: [],
      defaultProps: {
        children: "sub",
        label: "combination",
      },
      subjectAllList: [],
      depthTree: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
    };
  },
  computed: {
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
    startEndList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
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
  },
  created() {
    this.subjectAllList = this.$store.getters.allSubjectList;
    this.query.startDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.firstGetTree();
  },
  mounted() {},

  activated() {
    this.$bus.$on("generalToDetail", (data, date) => {
      this.cancelHandle();
      setTimeout(() => {
        this.query.startDate = date.startDate;
        this.query.endDate = date.endDate;
        this.subjectId = data.id;
        this.subjectName = data.number + " " + data.name;
        this.notFirstGetTree(data.id);
      }, 500);
    });
    this.$bus.$on("summaryToDetail", (data, date) => {
      this.cancelHandle();
      setTimeout(() => {
        this.query.startDate = `${date.startDate.split("-")[0]}-${
          date.startDate.split("-")[1]
        }`;
        this.query.endDate = `${date.endDate.split("-")[0]}-${
          date.endDate.split("-")[1]
        }`;
        this.subjectId = data.id;
        this.subjectName = data.number + " " + data.name;
        this.notFirstGetTree(data.id);
      }, 500);
    });
    this.$bus.$on("balanceToDetail", (data, date) => {
      this.cancelHandle();
      setTimeout(() => {
        this.query.startDate = date.startDate;
        this.query.endDate = date.endDate;
        this.subjectId = data.id;
        this.subjectName = data.number + " " + data.name;
        this.notFirstGetTree(data.id);
      }, 500);
    });
  },
  deactivated() {
    this.$bus.$off("getVoucherDetail");
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    },
    getList() {
      detailedBooks(this.assistId, this.query, this.subjectId).then((res) => {
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
      this.subjectName = this.data11[0].combination;
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data11[0].subjectId); // 默认选中节点第一个
      });
      this.getList();
    },
    handleNodeClick(data) {
      this.subjectId = data.subjectId;
      this.subjectName = data.combination;
      if (typeof data.assist == "string" && data.assist.indexOf(",")) {
        this.assistId = data.assist.split(",");
      } else this.assistId = data.assist == null ? 0 : data.assist;
      this.getList();
    },
    async getVoucher(row) {
      const { data: res } = await getVoucher(row.voucherId);
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
        this.$bus.$emit("getVoucherDetail", this.voucherData);
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
      this.moreVisible = false;
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data11[0].subjectId); // 默认选中节点第一个
      });
      this.firstGetTree();
    },
    cancelHandle() {
      this.resetTime();
      this.query = {
        endDate: this.query.endDate,
        isAssist: null,
        levelE: null,
        levelS: null,
        startDate: this.query.startDate,
        subjectEnd: "",
        subjectStart: "",
        summary: null,
      };
    },
    async firstGetTree() {
      const { data: res } = await getTree(this.query);
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
      const { data: res } = await getTree(this.query);
      this.data11 = res.data;
      const selected = this.$refs.tree.getCurrentNode();
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(id); // 默认选中节点第一个
        if (
          this.$refs.tree.getNode(selected) &&
          this.$refs.tree.getNode(selected).parent
        ) {
          this.expandParents(this.$refs.tree.getNode(selected).parent);
        }
      });
      this.getList();
    },
    searchSelect(item) {
      this.searchSubject = item.combination;
      this.searchBoxShow = false;
      this.subjectId = item.subjectId;
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
    expandParents(node) {
      node.expanded = true;
      if (node.parent) {
        this.expandParents(node.parent);
      }
    },
    searchBlur() {
      if (this.depthTree.some((item) => item.combination == this.searchSubject))
        return;
      this.searchSubject = "";
      this.searchBoxShow = false;
    },
    output(command) {
      if (command === "导出当前科目") {
        const multiHeader = [["明细表", "", "", "", "", "", "", ""]];
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
          filename: "明细表" + "_" + this.disperiodTit,
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.updateList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.updateList();
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
/deep/.el-table__body-wrapper {
  height: 95%;
}
</style>