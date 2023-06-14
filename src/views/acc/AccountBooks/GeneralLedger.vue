<template>
  <div style="height: 100%">
    <div class="ui-header">
      <div>
        <label> 总账 </label>
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
                    size="mini"
                    v-model="query.levelS"
                    type="number"
                    min="1"
                  >
                  </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"> 至 </el-col>
                <el-col :span="10">
                  <el-input
                    size="mini"
                    v-model="query.levelE"
                    min="1"
                    type="number"
                  ></el-input>
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
          type="mini"
        ></el-button>
        <!-- <span class="pointer" @click="pull">拉取最新数据</span> -->
      </div>

      <div>
        <el-button v-print="'#printTest'" type="mini">打印</el-button>
        <el-button type="mini">
          <download-excel
            :fields="json_fields"
            :data="tableData"
            :name="`总账_#${disperiodTit}#`"
          >
            导出
          </download-excel>
        </el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      size="mini"
      border
      class="t-scroll"
      id="printTest"
    >
      <el-table-column label="科目编码" width="180" align="center">
        <template slot-scope="scope">
          <a
            @click="getDetail(scope.row)"
            href="/#/AccountBooks/AccountBooks/DetailAccount"
            >{{ scope.row.number }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="科目名称" width="180" prop="name" align="center">
      </el-table-column>
      <el-table-column label="期间" align="center" width="100">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.details"
            :key="index"
            class="table-cell"
          >
            {{ item.date }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="摘要" align="center" width="150">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.details"
            :key="index"
            class="table-cell"
          >
            {{ item.summary }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="debit" label="借方" align="center" width="100">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.details"
            :key="index"
            class="table-cell"
          >
            {{ item.debit }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="loan" label="贷方" align="center" width="100">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.details"
            :key="index"
            class="table-cell"
          >
            {{ item.loan }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="方向" align="center" width="100">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.details"
            :key="index"
            class="table-cell"
          >
            {{ item.dc === 1 ? "借" : item.dc === 2 ? "贷" : "平" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="余额" align="center" width="100">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.details"
            :key="index"
            class="table-cell"
          >
            {{ item.balance }}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="aa">
      <BillVoucherTemplatea
        @getData="fn2"
        :msgData="msg"
      ></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import { generalLedger, pull } from "@/api/acc/book";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "GeneralLedger",
  data() {
    return {
      json_fields: {
        科目编码: "number",
        科目名称: "name",
        期间: {
          field: "details",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              if (index < value.length - 1) str += item.date + "\n";
              else str += item.date;
            });
            return str;
          },
        },
        摘要: {
          field: "details",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              if (index < value.length - 1) str += item.summary + "\n";
              else str += item.summary;
            });
            return str;
          },
        },
        借方: {
          field: "details",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              item.debit = item.debit ? item.debit : "";
              if (index < value.length - 1) str += item.debit + "\n";
              else str += item.debit;
            });
            return str;
          },
        },
        贷方: {
          field: "details",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              item.loan = item.loan ? item.loan : "";
              if (index < value.length - 1) str += item.loan + "\n";
              else str += item.loan;
            });
            return str;
          },
        },
        方向: {
          field: "details",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              item.dc = item.dc === 1 ? "借" : item.dc === 2 ? "贷" : "平";
              if (index < value.length - 1) str += item.dc + "\n";
              else str += item.dc;
            });
            return str;
          },
        },
        余额: {
          field: "details",
          callback: (value) => {
            let str = "";
            value.forEach((item, index) => {
              item.balance = item.balance ? item.balance : "";
              if (index < value.length - 1) str += item.balance + "\n";
              else str += item.balance;
            });
            return str;
          },
        },
      },
      tableData: [],
      moreVisible: false,
      msg: "",
      subjectName: "",
      aa: false,
      loading: true,
      assistId: 0,
      query: {
        endDate: null,
        isAssist: 0,
        ist: 0,
        isw: 0,
        isz: 0,
        levelE: 1,
        levelS: 1,
        startDate: null,
        subjectEnd: "",
        subjectStart: "",
      },
      data11: [],
      searchStartBoxShow: false,
      searchEndBoxShow: false,
    };
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
    subjectStartList() {
      return this.$store.getters.allSubjectList.filter((item) =>
        item.otherSubjectName.includes(this.query.subjectStart)
      );
    },
    subjectEndList() {
      return this.$store.getters.allSubjectList.filter((item) =>
        item.otherSubjectName.includes(this.query.subjectEnd)
      );
    },
  },
  created() {
    this.query.startDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.query.endDate =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.getList();
  },
  deactivated() {
    this.$bus.$off("generalToDetail");
  },
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    },
    async getList() {
      generalLedger(this.query).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        res.data.data.forEach((item) => {
          item.details.forEach((item1) => {
            item1.debit = item1.debit
              ? this.$numeral(item1.debit).format("0,0.00")
              : null;
            item1.loan = item1.loan
              ? this.$numeral(item1.loan).format("0,0.00")
              : null;
            item1.balance = item1.balance
              ? this.$numeral(item1.balance).format("0,0.00")
              : null;
          });
        });
        this.tableData = res.data.data;
      });
    },
    updateList() {
      this.getList();
      // this.pull();
    },
    async getDetail(row) {
      setTimeout(() => {
        this.$bus.$emit("generalToDetail", row, this.query);
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
      this.getList();
      this.moreVisible = false;
    },
    cancelHandle() {
      this.query = {
        endDate: this.query.startDate,
        isAssist: 0,
        ist: 0,
        isw: 0,
        isz: 0,
        levelE: 1,
        levelS: 1,
        startDate: this.query.startDate,
        subjectEnd: "",
        subjectStart: "",
        summary: null,
      };
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
    pull() {
      pull().then();
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
/deep/ .el-table .cell,
.el-table th div {
  padding-left: 0;
  padding-right: 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .el-table td,
.el-table th {
  padding: 0;
}

/deep/ .el-table--medium th {
  padding: 0;
  font-size: 12px;
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
.h-center span {
  line-height: 30px;
  color: #4591bb;
}
</style>