<template>
  <div style="height: 100%">
    <div class="ui-header" style="padding: 10px" v-if="toggle">
      <div>
        <label>查凭证： </label>
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
              :model="searchData"
              label-width="80px"
              label-position="right"
              :rules="rules"
            >
              <el-form-item label="会计期间">
                <el-row>
                  <el-col :span="10">
                    <el-select v-model="searchData.startChapter" size="mini">
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
                    <el-select v-model="searchData.endChapter" size="mini">
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
              <el-form-item label="凭证字" prop="proveId">
                <el-select
                  clearable
                  v-model="searchData.proveId"
                  placeholder="不限"
                >
                  <el-option
                    v-for="item in wordList"
                    :key="item.name"
                    :label="item.prove"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="凭证号" prop="proveNo">
                <el-input v-model="searchData.proveNo"></el-input>
                <span style="color: #999">例：1,2,3,5-7</span>
              </el-form-item>
              <el-form-item label="状态" prop="audit">
                <el-select
                  v-model="searchData.audit"
                  clearable
                  placeholder="不限"
                >
                  <el-option label="已审核" value="1"></el-option>
                  <el-option label="未审核" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="摘要" prop="summary">
                <el-input v-model="searchData.summary"></el-input>
              </el-form-item>
              <el-form-item label="制单人" prop="createId">
                <el-input v-model="searchData.createId"></el-input>
              </el-form-item>
              <el-form-item label="科目" prop="subjectCode">
                <el-col :span="18">
                  <el-input
                    v-model="searchData.subjectCode"
                    autocomplete="off"
                    class="int"
                    @focus="searchBoxShow = true"
                    @blur="searchBoxShow = false"
                  >
                  </el-input>
                  <div class="ui-box" v-if="searchBoxShow">
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
                  <span style="color: #999">例：1001,1002</span>
                </el-col>

                <i class="el-icon-folder-add aa" @click="subjectSelect"></i>
              </el-form-item>
              <!-- <el-form-item label="辅助核算">
              <el-cascader
                :options="form.options"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </el-form-item> -->
              <el-form-item label="金额" prop="money">
                <el-col :span="10">
                  <el-input v-model="searchData.startMoney"> </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"> 至 </el-col>
                <el-col :span="10">
                  <el-input v-model="searchData.endMoney"></el-input>
                </el-col>
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
        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
          size="mini"
        ></el-button>
      </div>
      <div>
        <el-button
          type="primary"
          @click="
            $router.push('/EnteringVoucher/EnteringVoucher/EnteringVoucher')
          "
          size="mini"
          >新增</el-button
        >
        <el-dropdown @command="copyHandle">
          <el-button size="mini">
            复制<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="批量复制">批量复制</el-dropdown-item>
            <el-dropdown-item command="整月复制">整月复制</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="printHandle">
          <el-button size="mini">
            打印<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="凭证打印">凭证打印</el-dropdown-item>
            <el-dropdown-item command="列表打印">列表打印</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini">导出</el-button>
        <el-dropdown @command="examineHandle">
          <el-button size="mini">
            审核<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="审核">审核</el-dropdown-item>
            <el-dropdown-item command="反审核">反审核</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="moreHandle">
          <el-button size="mini">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="凭证号整理">凭证号整理</el-dropdown-item>
            <el-dropdown-item command="凭证号移动">凭证号移动</el-dropdown-item>
            <el-dropdown-item command="导入凭证">导入凭证</el-dropdown-item>
            <download-excel
              :data="tableData"
              :fields="json_fields"
              :header="json_header"
              type="xls"
              :name="`凭证列表#${disperiodTit}#`"
              :export-fields="exportFields"
            >
              <el-dropdown-item command="导出列表">导出列表</el-dropdown-item>
            </download-excel>
            <el-dropdown-item command="批量删除">批量删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button @click="recycleBtn" size="mini">
          <i class="el-icon-delete"></i>
          回收站
        </el-button>
      </div>
    </div>
    <div ref="pdf" style="height: calc(100% - 48px)" v-if="toggle">
      <el-table
        class="t-scroll"
        style="height: calc(100% - 32px)"
        data-v-003
        :data="tableData"
        @selection-change="handleSelectionChange"
        :row-style="selectChangeStyle"
        border
        align="center"
        @row-dblclick="rowHandle"
        v-loading="loading"
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="凭证字号"
          prop="prove"
          sortable
          :sort-method="sortProveNo"
        >
          <template slot-scope="scope">
            <a @click="rowHandle(scope.row)">{{ scope.row.proveNo }}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="附单据">
          <template slot-scope="scope"
            >{{
              scope.row.attachDocument ? scope.row.attachDocument : 0
            }}
            张</template
          >
        </el-table-column>
        <el-table-column align="center" label="摘要">
          <template slot-scope="scope">
            <p
              v-for="(item, index) in scope.row.amounts"
              :key="index"
              class="table-cell"
            >
              {{ item.summary }}
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="科目" width="450">
          <template slot-scope="scope">
            <p
              v-for="(item, index) in scope.row.amounts"
              :key="index"
              class="table-cell"
            >
              {{ item.subjectName }}
            </p>
          </template></el-table-column
        >
        <el-table-column align="center" label="借方金额">
          <template slot-scope="scope">
            <p
              v-for="(item, index) in scope.row.amounts"
              :key="index"
              class="table-cell"
            >
              {{ item.moneyOfDebit }}
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="贷方金额">
          <template slot-scope="scope">
            <p
              v-for="(item, index) in scope.row.amounts"
              :key="index"
              class="table-cell"
            >
              {{ item.moneyOfLender }}
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="制单人" prop="createUser">
        </el-table-column>
        <el-table-column align="center" label="审核人" prop="reviewer">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div class="operatext" @click="updateHandle(scope.row)">修改</div>
            <div class="operatext" @click="deleteHandle(scope.row)">删除</div>
            <div class="operatext" @click="insertHandle(scope.row.id)">
              插入
            </div>
          </template>
        </el-table-column>
      </el-table>
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

    <div v-if="toggle1">
      <CheckVoucherIn
        :voucherList="voucherList"
        @toggleView="toggleView"
      ></CheckVoucherIn>
    </div>
    <div v-if="copyVisable">
      <bulkCopy :proves="proves" @copyClick="fn" @copySuccess="fn1"></bulkCopy>
    </div>
    <div v-if="monthCopyVisable">
      <monthCopy
        :proves="proves"
        @copyClick="fn"
        @copySuccess="fn1"
      ></monthCopy>
    </div>
    <div v-if="aa">
      <BillVoucherTemplatea
        @getData="fn2"
        :msgData="msg"
      ></BillVoucherTemplatea>
    </div>
    <div v-if="toggle2">
      <VoucherSort @backView="backView"></VoucherSort>
    </div>
    <div v-if="toggle3">
      <voucher-input @backView="inputBackView"></voucher-input>
    </div>
  </div>
</template>

<script>
import {
  getVoucherList,
  getVoucher,
  delVoucher,
  antiAuditVoucher,
  auditVoucher,
  voucherDel,
  batchReview,
  batchAntiReview,
} from "@/api/acc/recordVoucher";
import CheckVoucherIn from "./CheckVoucherIn";
import VoucherSort from "./VoucherSort";
import VoucherInput from "./VoucherInput";
import { GetList } from "@/api/acc/prov";
import bulkCopy from "./components/BulkCopy";
import monthCopy from "./components/monthCopy";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
import { downloadPDF } from "@/utils/print.js";
export default {
  name: "CheckVoucher",
  components: {
    CheckVoucherIn,
    bulkCopy,
    BillVoucherTemplatea,
    VoucherSort,
    monthCopy,
    VoucherInput,
  },
  data() {
    return {
      exportFields: {
        公司名称: this.$store.getters.childrenData.clientName,
        日期: this.startChapter,
        单位: "元",
      },
      json_header: "凭证列表",
      json_fields: {
        日期: "date",
        凭证字号: "proveNo",
        附单据: "attachedDocument",
        摘要: {
          field: "amounts",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              item.summary = item.summary ? item.summary : "";
              if (index < value.length - 1) str += item.summary + "\n";
              else str += item.summary;
            });
            return str;
          },
        },
        科目: {
          field: "amounts",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              if (index < value.length - 1) str += item.subjectName + "\n";
              else str += item.subjectName;
            });
            return str;
          },
        },
        借方金额: {
          field: "amounts",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              item.moneyOfDebit = item.moneyOfDebit ? item.moneyOfDebit : "";
              if (index < value.length - 1) str += item.moneyOfDebit + "\n";
              else str += item.moneyOfDebit;
            });
            return str;
          },
        },
        贷方金额: {
          field: "amounts",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              item.moneyOfLender = item.moneyOfLender ? item.moneyOfLender : "";
              if (index < value.length - 1) str += item.moneyOfLender + "\n";
              else str += item.moneyOfLender;
            });
            return str;
          },
        },
        制单人: "createUser",
        审核人: "reviewer",
      },
      workList: [],
      proves: [],
      copyVisable: false,
      monthCopyVisable: false,
      tableData: [],
      multipleSelection: [],
      voucherList: [],
      toggle: true,
      toggle1: false,
      toggle2: false,
      toggle3: false,
      moreVisible: false,
      msg: "",
      aa: false,
      loading: true,
      subjectCodeList: [],
      searchData: {
        audit: null,
        createId: null,
        endChapter: null,
        endMoney: null,
        proveId: null,
        proveNo: null,
        startChapter: null,
        startMoney: null,
        subjectCode: "",
        summary: null,
      },
      printList: [],
      rules: {
        proveNo: [
          { required: true, trigger: "blur", message: "凭证号不能为空" },
        ],
        subjectCode: [
          { required: true, trigger: "blur", message: "科目不能为空" },
        ],
        summary: [{ required: true, trigger: "blur", message: "摘要不能为空" }],
        createId: [
          { required: true, trigger: "blur", message: "制单人不能为空" },
        ],
      },
      selectAutData: [],
      selectUnautData: [],
      pageNum: 1,
      pageSize: 50,
      total: 0,
      subjectAllList: [],
      searchBoxShow: false,
    };
  },
  created() {
    this.subjectAllList = this.$store.getters.allSubjectList;
    this.searchData.startChapter =
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    this.searchData.endChapter =
      this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    GetList(1, 10).then((res) => {
      this.wordList = res.data.data.object;
      this.getList();
    });
  },
  computed: {
    startEndList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
    disperiodTit() {
      if (this.searchData.startChapter === this.searchData.endChapter)
        return `${
          this.searchData.startChapter.split("-")[0]
        }年第${this.searchData.startChapter
          .split("-")[1]
          .replace(/^0/g, "")}期`;
      if (this.searchData.startChapter !== this.searchData.endChapter) {
        return `${
          this.searchData.startChapter.split("-")[0]
        }年第${this.searchData.startChapter
          .split("-")[1]
          .replace(/^0/g, "")}期 至 ${
          this.searchData.endChapter.split("-")[0]
        }年第${this.searchData.endChapter.split("-")[1].replace(/^0/g, "")}期`;
      }
    },
    subjectList() {
      return this.subjectAllList.filter((item) =>
        item.otherSubjectName.includes(this.searchData.subjectCode)
      );
    },
  },
  methods: {
    resetTime() {
      this.searchData.startChapter =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
      this.searchData.endChapter =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    },
    getList() {
      getVoucherList(this.searchData, this.pageNum, this.pageSize).then(
        (res) => {
          if (res.data.retCode === 4001) {
            this.$alert(res.data.message, "会话过期", {
              confirmButtonText: "确认",
            }).then(() => {
              this.$router.push("/dashboard");
            });
          }
          this.total = res.data.data.totalCount;
          res.data.data.object.forEach((item) => {
            item.amounts.forEach((item1) => {
              if (item1.moneyOfLender) {
                item1.moneyOfLender = this.$numeral(item1.moneyOfLender).format(
                  "0,0.00"
                );
              }
              if (item1.moneyOfDebit) {
                item1.moneyOfDebit = this.$numeral(item1.moneyOfDebit).format(
                  "0,0.00"
                );
              }
            });
          });
          this.tableData = res.data.data.object;
        }
      );
      this.loading = false;
    },
    recycleBtn() {
      this.$router.push("/Setup/Setup/Recycle");
    },
    onSubmit() {
      this.getList();
      this.moreVisible = false;
    },
    cancelHandle() {
      this.searchData = {
        audit: null,
        createId: null,
        startChapter:
          this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod,
        endChapter:
          this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod,
        endMoney: null,
        proveId: null,
        proveNo: null,
        startMoney: null,
        subjectCode: null,
        summary: null,
      };
    },
    async examineHandle(command) {
      if (command === "审核") {
        if (this.proves.length === 0)
          return this.$message.warning("请选择要审核的凭证");
        let data = this.selectUnautData.map((item) => item.id);
        let data1 = this.selectAutData.map((item) => item.id);
        let detail = this.selectAutData.map((item) => item.proveNo);
        if (detail.length > 0) detail = detail + "已审核";
        let lender = 0;
        let debtor = 0;
        let flag = false;
        this.multipleSelection.forEach((item) => {
          console.log(item);
          item.amounts.forEach((item1) => {
            lender += item1.moneyOfLender
              ? this.$numeral(item1.moneyOfLender).value()
              : 0;
            debtor += item1.moneyOfDebit
              ? this.$numeral(item1.moneyOfDebit).value()
              : 0;
          });
          console.log(lender, "lender");
          console.log(debtor, "debtor");
          if (item.amounts.length === 0 || lender !== debtor) flag = true;
        });
        if (flag) return this.$message.error("数据有误");
        let res = await batchReview(data);
        if (res.data.retCode === 500) {
          return this.$message.error(res.data.message);
        }
        this.updateList();
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            "审核成功" +
            data.length +
            " 张！，失败: " +
            data1.length +
            "张<br/>" +
            detail,
          type: "success",
        });
      }
      if (command === "反审核") {
        if (this.proves.length === 0)
          return this.$message.warning("请选择要反审核的凭证");
        let data = this.selectUnautData.map((item) => item.id);
        let data1 = this.selectAutData.map((item) => item.id);
        let detail = this.selectUnautData.map((item) => item.proveNo);
        if (detail.length > 0) detail = detail + "未审核";
        let lender = 0;
        let debtor = 0;
        let flag = false;
        this.multipleSelection.forEach((item) => {
          item.amounts.forEach((item1) => {
            lender += item1.moneyOfLender ? item1.moneyOfLender : 0;
            debtor += item1.moneyOfDebit ? item1.moneyOfDebit : 0;
          });
          if (item.amounts.length === 0 || lender !== debtor) flag = true;
        });
        if (flag) return this.$message.error("数据有误");
        let res = await batchAntiReview(data1);
        if (res.data.retCode === 500) {
          return this.$message.error(res.data.message);
        }
        this.updateList();
        return this.$message({
          dangerouslyUseHTMLString: true,
          message:
            "反审核成功" +
            data1.length +
            " 张！，失败: " +
            data.length +
            "张<br/>" +
            detail,
          type: "success",
        });
      }
    },
    copyHandle(command) {
      if (command === "批量复制") {
        if (this.proves.length === 0)
          return this.$message.warning("请选择要复制的凭证");
        this.copyVisable = true;
      }
      if (command === "整月复制") {
        this.monthCopyVisable = true;
      }
    },
    printHandle(command) {
      if (command === "列表打印") {
        downloadPDF(this.$refs.pdf);
      }
    },
    async moreHandle(command) {
      let data = this.selectUnautData.map((item) => item.id);
      let data1 = this.selectAutData.map((item) => item.id);
      let detail = this.selectAutData.map((item) => item.proveNo);
      if (detail.length > 0) detail = detail + "已审核";
      if (command === "批量删除") {
        if (this.proves.length === 0)
          return this.$message.warning("请选择要删除的凭证");
        this.$confirm("是否删除选中的凭证？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const res = await voucherDel(data);
            if (res.data.retCode === 500)
              return this.$message.error(res.data.message);
            this.$message({
              dangerouslyUseHTMLString: true,
              message:
                "共删除成功" +
                data.length +
                " 张！，失败: " +
                data1.length +
                "张<br/>" +
                detail,
              type: "success",
            });
            this.updateList();
          })
          .catch(() => {});
      }
      if (command === "凭证号整理") {
        this.toggle = false;
        this.toggle2 = true;
      }
      if (command === "导入凭证") {
        this.toggle = false;
        this.toggle3 = true;
      }
    },
    fn(bool) {
      this.copyVisable = bool;
      this.monthCopyVisable = bool;
    },
    fn1(visable, status) {
      this.copyVisable = visable;
      this.monthCopyVisable = visable;
      if (status) this.updateList();
    },
    fn2(bool, data, c) {
      this.aa = bool;
      this.msg = 0;
      let str = "";
      if (data) {
        this.subjectCodeList.push(data.subjectCode);
        str = this.subjectCodeList.join(",");
        this.searchData.subjectCode = str;
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.proves = [];
      this.printList = [];
      this.selectUnautData = []; //未审核
      this.selectAutData = []; //已审核
      this.multipleSelection = val;
      this.selectUnautData = val.filter((item) => item.reviewer === "未审核");
      this.selectAutData = val.filter((item) => item.reviewer !== "未审核");
      this.selectData = val;
      let list = val.map((item) => item.id);
      this.proves = list;
      this.printList = val;
    },
    selectChangeStyle({ row }) {
      const checkIdList = this.proves;
      if (checkIdList.includes(row.id)) {
        return {
          backgroundColor: "#f8ff94",
        };
      }
    },
    updateHandle(row) {
      this.rowHandle(row);
    },
    deleteHandle(row) {
      if (row.reviewer !== "未审核")
        return this.$message.warning("已审核的凭证不能删除");
      this.$confirm("是否删除该凭证？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delVoucher(row.id);
          if (res.data.retCode !== 200) return this.$message.error("删除失败");
          this.updateList();
          return this.$message.success("删除成功");
        })
        .catch(() => {});
    },
    insertHandle(id) {
      console.log(id);
    },
    changeHandle() {
      console.log(this.searchData.startChapter);
      console.log(this.searchData.endChapter);
    },
    rowHandle(row) {
      getVoucher(row.id).then((res) => {
        this.voucherList = res.data.data;
        this.voucherList.reviewer = row.reviewer;
      });
      this.toggle = false;
      this.toggle1 = true;
    },
    updateList() {
      this.loading = true;
      this.getList();
      this.loading = false;
    },
    toggleView(e) {
      this.toggle = e;
      this.toggle1 = !e;
      this.updateList();
    },
    backView(e) {
      this.toggle = e;
      this.toggle2 = !e;
    },
    inputBackView(e) {
      this.toggle = e;
      this.toggle3 = !e;
    },
    sortProveNo(obj1, obj2) {
      let reg = /([^-]+)$/;
      let p1 = obj1.proveNo.match(reg)[1];
      let p2 = obj2.proveNo.match(reg)[1];
      return p1 - p2;
    },
    subjectSelect() {
      this.aa = true;
    },
    print() {
      let printdata = {
        attachedDocument: this.voucher.attachedDocument,
        date: this.voucher.chapter,
        prove: this.voucher.prove + "-" + this.voucher.proveNo,
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
      this.$router.push("/Print/Print/Print");
      setTimeout(() => {
        this.$bus.$emit("sendPrintData", printdata);
      }, 500);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.updateList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.updateList();
    },
    searchSubjectSelect(item) {
      this.searchData.subjectCode = item.otherSubjectName.split(" ")[0];
      this.searchBoxShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-pagination button:disabled,
/deep/.el-pagination .btn-next {
  background-color: transparent; /*进行修改未选中背景和字体*/
}
/deep/ .el-pager li {
  background-color: transparent !important; /*进行修改未选中背景和字体*/
}

.b-item:hover {
  background-color: #ddd;
}
.operatext {
  color: #999;
  cursor: pointer;
}
.table-cell {
  padding: 0 5px;
  margin: 0 -5px -1px;
  border-bottom: 1px solid #ddd;
  height: 34px;
  line-height: 34px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .el-table[data-v-003] .cell,
.el-table[data-v-003] th div {
  padding-left: 0;
  padding-right: 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .el-table[data-v-003] td,
.el-table[data-v-003] th {
  padding: 0;
}

/deep/ .el-table--medium[data-v-003] th {
  padding: 0;
  font-size: 12px;
}
/deep/ .t-scroll .el-table__body-wrapper {
  height: 95%;
}
.el-date-editor.el-input[data-v-004],
.el-date-editor.el-input__inner[data-v-004] {
  width: 120px;
}
</style>