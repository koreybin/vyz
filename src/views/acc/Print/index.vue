<template>
  <div>
    <div style="padding: 10px">
      <!-- <el-button type="primary" @click="print">打印</el-button> -->
      <el-button type="primary" v-print="'#printTest'">打印</el-button>
    </div>
    <div class="printBox" ref="print" id="printTest">
      <div class="ph">
        <span>记账凭证</span>
        <span>附件数：{{ printData.attachedDocument }}</span>
      </div>
      <div class="pc">
        <span>{{ $store.getters.childrenData.clientName }}</span>
        <span>日期：{{ printData.date }}</span>
        <span>凭证号：{{ printData.prove }}（1/1）</span>
      </div>
      <div class="pt">
        <table>
          <thead style="background: none">
            <tr>
              <th width="18%">摘要</th>
              <th width="40%">科目</th>
              <th width="14%" v-if="isQuantity">数量</th>
              <th width="14%">借方</th>
              <th width="14%">贷方</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in printData.list" :key="index">
              <td>{{ item.content }}</td>
              <td>{{ item.subject }}</td>
              <td v-if="isQuantity">
                <p v-if="item.isQuantity && item.subject">
                  数量：{{ item.subjectImportAmount }}{{ item.unit }}
                </p>
                <p v-if="item.isQuantity && item.subject">
                  单价：{{ item.unitPrice }}
                </p>
              </td>
              <td>{{ item.debtor }}</td>
              <td>{{ item.lender }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td :colspan="isQuantity ? '3' : '2'">
                合计：{{ printData.num }}
              </td>
              <td>{{ printData.sum }}</td>
              <td>{{ printData.sum }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="pf">
        <span>主管：{{ detail.manager }}</span
        ><span>审核：{{ detail.examine }}</span
        ><span>出纳：{{ detail.cashier }}</span
        ><span>制单：manager</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mixins } from "@/mixins/mixin";
export default {
  mixins: [mixins],
  name: "Print",
  data() {
    return {
      isQuantity: false,
      printData: {
        attachedDocument: 0,
        date: "",
        prove: "",
        list: [],
        isQuantity: false,
        num: "",
        sum: "",
      },
      detail: {
        manager: "",
        examine: "",
        cashier: "",
      },
    };
  },
  created() {},
  mounted() {},
  activated() {
    this.receivePrint();
  },
  methods: {
    receivePrint() {
      this.$bus.$on("sendPrintData", (data, detail) => {
        typeof data.sum === "number" && (data.sum = data.sum.toFixed(2));
        data.list.forEach((item) => {
          typeof item.lender === "number" &&
            (item.lender = item.lender.toFixed(2));
          typeof item.debtor === "number" &&
            (item.debtor = item.debtor.toFixed(2));
        });
        this.printData = data;
        let flag = this.printData.list.some((item) => {
          return item.isQuantity == true;
        });
        this.isQuantity = flag;
        this.detail = detail;
      });
    },
    calcDebtorTotal(index) {
      let debtorTotal = 0;
      for (let i in this.list) {
        if (this.list[i].debtor != null && this.list[i].debtor != "") {
          if (!(index && index == i)) {
            debtorTotal += this.list[i].debtor * 1;
          }
        }
      }

      this.debtorTotal = debtorTotal;
      debtorTotal = debtorTotal + "";
      let debtorTotalList = ["", "", "", "", "", "", "", "", "", "", ""];
      this.debtorTotalList = collatingData(debtorTotal, debtorTotalList);
      if (this.debtorTotal === this.lenderTotal) {
        this.num = toChinesNum(this.debtorTotal);
        this.sum = this.debtorTotal;
      } else {
        this.num = "";
      }
    },
    calcLenderTotal(index) {
      let lenderTotal = 0;
      for (let i in this.list) {
        if (this.list[i].lender != null && this.list[i].lender != "") {
          if (!(index && index == i)) {
            lenderTotal += this.list[i].lender * 1;
          }
        }
      }
      this.lenderTotal = lenderTotal;
      lenderTotal = lenderTotal + "";
      let lenderTotalList = ["", "", "", "", "", "", "", "", "", "", ""];
      this.lenderTotalList = collatingData(lenderTotal, lenderTotalList);
      if (this.debtorTotal === this.lenderTotal) {
        this.num = toChinesNum(this.debtorTotal);
        this.sum = this.debtorTotal;
      } else {
        this.num = "";
      }
    },
    print() {
      this.$print(this.$refs.print);
    },
  },
};
</script>

<style lang="scss" scope>
.printBox {
  width: 1060px;
  margin: 0px auto;
  .ph {
    display: flex;
    justify-content: space-between;
    line-height: 36px;
    font-size: 16px;
    span:nth-of-type(1) {
      flex: 1;
      text-align: center;
      font-size: 24px;
    }
  }
  .pc {
    display: flex;
    justify-content: space-between;
    line-height: 36px;
    font-size: 16px;
    span:nth-of-type(2) {
      text-align: center;
      flex: 1;
    }
  }
  .pt table {
    width: 100%;
    border: 1px solid #000;
    border-collapse: collapse;

    td,
    th {
      padding: 10px 5px;
      border: 1px solid #000;
    }
  }
  .pf {
    display: flex;
    justify-content: space-between;
    line-height: 36px;
  }
}
</style>