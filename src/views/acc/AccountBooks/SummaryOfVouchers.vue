<template>
  <div style="height: 100%">
    <div style="padding-bottom: 10px" class="ui-header">
      <div>
        <label> 凭证汇总表 </label>
        <div class="ui-btn-menu">
          <span
            class="ui-btn pointer"
            tabindex="0"
            @click="moreVisible = !moreVisible"
          >
            <span class="selected-period">
              <strong>{{ query.startDate }}</strong>
              <span>至</span>
              <strong>{{ query.endDate }}</strong>
            </span>
            <b></b>
          </span>
          <div v-if="moreVisible" class="moreBox" style="width: 380px">
            <el-form
              ref="form"
              :model="query"
              label-width="80px"
              label-position="right"
            >
              <el-form-item label="会计期间">
                <el-row>
                  <el-col :span="10">
                    <el-date-picker
                      data-v-004
                      v-model="query.startDate"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期"
                      size="mini"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col :span="2" style="text-align: center"> 至 </el-col>
                  <el-col :span="10">
                    <el-date-picker
                      data-v-004
                      v-model="query.endDate"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期"
                      size="mini"
                    >
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="凭证字">
                <el-col :span="18">
                  <el-select v-model="query.voucherId" size="mini">
                    <el-option
                      v-for="item in wordList"
                      :key="item.name"
                      :label="item.prove"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="凭证号" prop="money">
                <el-col :span="10">
                  <el-input v-model="query.snumber" type="number" size="mini">
                  </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"> 至 </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="query.enumber"
                    type="number"
                    size="mini"
                  ></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="科目级次" prop="money">
                <el-col :span="10">
                  <el-input v-model="query.slevel" type="number" size="mini">
                  </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"> 至 </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="query.elevel"
                    type="number"
                    size="mini"
                  ></el-input>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
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
        <span class="voucherData"
          >凭证总张数：{{ voucherData.voucherTotal }}张，附件总张数：{{
            voucherData.voucherAttchTotal
          }}张</span
        >
      </div>
      <div>
        <el-button size="mini">打印</el-button>
        <el-button size="mini" @click="output"> 导出 </el-button>
      </div>
    </div>
    <el-table :data="tableData" border class="t-scroll" size="mini">
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
      <el-table-column label="借方金额" width="180" prop="debit" align="center">
      </el-table-column>
      <el-table-column label="贷方金额" width="180" prop="loan" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPeriod } from "@/api/acc/Repertory/InventorySettings";
import { GetList } from "@/api/acc/prov";
import { generalLedger, voucherSummary } from "@/api/acc/book";
import { export_json_to_excel } from "@/vendor/Export2Excel";
import { autoGetDate } from "@/utils/autoGetDate";
import { mixins } from "@/mixins/mixin";
import BillVoucherTemplatea from "@/views/acc/Setup/BillVoucherTemplatea";
export default {
  components: {
    BillVoucherTemplatea,
  },
  name: "SummaryOfVouchers",
  mixins: [mixins],
  data() {
    return {
      value1: "",
      tableData: [],
      voucherData: {
        voucherTotal: "",
        voucherAttchTotal: "",
      },
      moreVisible: false,
      msg: "",
      subjectName: "",
      loading: true,
      assistId: 0,
      query: {
        elevel: 1,
        endDate: null,
        enumber: null,
        slevel: 1,
        snumber: null,
        startDate: null,
        voucherId: null,
      },
      data11: [],
    };
  },
  created() {
    GetList(1, 10).then((res) => {
      this.wordList = res.data.data.object;
      this.value1 = this.dateRange;
      this.getData();
      this.query.startDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;

      this.query.endDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    });
  },
  activated() {},
  deactivated() {
    this.$bus.$off("summaryToDetail");
  },
  computed: {},
  methods: {
    resetTime() {
      this.query.startDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
      this.query.endDate =
        this.$store.state.children.childrenData.numberOfPeriods[0].yearPeriod;
    },
    async getData() {
      voucherSummary(this.query).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        res.data.data.list.forEach((item) => {
          item.debit = item.debit
            ? this.$numeral(item.debit).format("0,0.00")
            : null;
          item.loan = item.loan
            ? this.$numeral(item.loan).format("0,0.00")
            : null;
        });
        this.tableData = res.data.data.list;
        this.voucherData = res.data.data;
      });
    },
    updateList() {
      this.getData();
    },

    async getDetail(row) {
      setTimeout(() => {
        this.$bus.$emit("summaryToDetail", row, this.query);
      }, 500);
    },
    onSubmit() {
      this.getData();
      this.value1 = [this.query.startDate, this.query.endDate];
      this.moreVisible = false;
    },
    cancelHandle() {
      this.query = {
        endDate: this.query.endDate,
        isAssist: null,
        slevel: 1,
        elevel: 1,
        startDate: this.query.startDate,
        subjectEnd: null,
        subjectStart: null,
        summary: null,
      };
    },
    output() {
      const multiHeader = [
        [
          `${this.$store.getters.childrenData.clientName}`,
          "",
          `${this.query.startDate}至${this.query.endDate}`,
          "",
        ],
      ];
      const tHeader = ["科目编码", "科目名称", "借方金额", "贷方金额"]; //二级表头
      const filterVal = ["number", "name", "debit", "loan"]; //表头所对应后台返回的字段
      const data = this.formatJson(filterVal, this.tableData);
      const merges = ["A1:B1", "C1:D1"];
      export_json_to_excel({
        multiHeader, //这里是第一行的表头
        header: tHeader, //这里应该是算第二行的表头
        data, //数据
        merges, //合并行
        filename:
          "凭证汇总表" + "_" + this.query.startDate + "至" + this.query.endDate,
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
.el-date-editor.el-input[data-v-004],
.el-date-editor.el-input__inner[data-v-004] {
  width: 120px;
}
</style>