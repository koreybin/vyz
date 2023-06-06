<template>
  <div>
    <div class="ui-header">
      <div>
        <label
          >利润表

          <el-select
            v-model="type"
            style="width: 80px"
            @change="updateList"
            size="mini"
          >
            <el-option :value="1" label="月报"></el-option>
            <el-option :value="2" label="季报"></el-option>
          </el-select>
          <el-select v-model="date" size="mini">
            <el-option
              v-for="item in periodList"
              :key="item.disPeriod"
              :label="item.disPeriod"
              :value="item.yearPeriod"
            ></el-option>
          </el-select>
        </label>
      </div>
      <div class="h-center">
        <el-button
          class="el-icon-refresh-right"
          @click="updateList"
          size="mini"
        ></el-button>
      </div>
      <div>
        <el-button size="mini">税局格式导出</el-button>
        <el-button size="mini"> 复制 </el-button>
        <el-button size="mini"> 打印 </el-button>
        <el-dropdown @command="output">
          <el-button size="mini"
            >导出<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="EXCEL格式">EXCEL格式</el-dropdown-item>
            <el-dropdown-item command="TXT格式">TXT格式</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini"> 批量导出 </el-button>
      </div>
    </div>

    <div style="margin: 0 10px">
      <table class="table" border="1">
        <thead>
          <tr>
            <th width="12%" style="height: 30px">项目</th>
            <th width="6%">行次</th>
            <th width="6%">本年累计金额</th>
            <th width="6%">本月金额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.rowIdL">
            <td
              @click="editMula(item)"
              class="pointer"
              style="text-align: left"
            >
              <a>{{ item.projectItem }}</a>
            </td>
            <td>{{ item.line }}</td>
            <td>{{ item.yearNum }}</td>
            <td>{{ item.periodNum }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <EditFormula
      :title="title"
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
      :formulaData="formulaData"
      :updateData="updateData"
      :rule="ruleList"
      :parent="self"
    ></EditFormula>
  </div>
</template>

<script>
import { mixins } from "@/mixins/mixin";
import { list, getProfitFormula } from "@/api/acc/profit";
import EditFormula from "./components/Editformula";
import XLSXS from "xlsx-js-style";
export default {
  name: "ProfitStatement",
  components: {
    EditFormula,
  },
  mixins: [mixins],
  data() {
    return {
      self: "ProfitStatement",
      formulaData: [],
      dialogVisible: false,
      title: "",
      date: "",
      tableData: [],
      type: 1,
      updateData: {
        date: "",
        id: "",
        type: "",
      },
      ruleList: [
        { value: 1, label: "实际损益额" },
        { value: 2, label: "借方发生额" },
        { value: 3, label: "贷方发生额" },
      ],
    };
  },
  created() {
    this.date =
      this.$store.state.children.childrenData.nOfPeriods[0].yearPeriod;
    this.getList();
  },
  computed: {
    periodList() {
      return this.$store.state.children.childrenData.nOfPeriods;
    },
  },
  methods: {
    // test(item) {
    //   console.log(item);
    // },
    getList() {
      list(this.date, this.type).then((res) => {
        if (res.data.retCode === 4001) {
          this.$alert(res.data.message, "会话过期", {
            confirmButtonText: "确认",
          }).then(() => {
            this.$router.push("/dashboard");
          });
        }
        res.data.data.forEach((item) => {
          item.yearNum = item.yearNum
            ? this.$numeral(item.yearNum).format("0,0.00")
            : null;
          item.periodNum = item.periodNum
            ? this.$numeral(item.periodNum).format("0,0.00")
            : null;
        });
        this.tableData = res.data.data;
      });
    },

    editMula(item) {
      this.updateData = { date: this.date, id: item.id, type: this.type };
      getProfitFormula(this.date, item.id, this.type).then((res) => {
        if (res.data.retCode !== 200)
          return this.$message.error(this.data.message);
        this.title = item.projectItem;
        this.dialogVisible = true;
        res.data.data.forEach((item) => {
          item.yearNum = this.$numeral(item.yearNum).format("0,0.00");
          item.periodNum = this.$numeral(item.periodNum).format("0,0.00");
        });
        this.formulaData = res.data.data;
      });
    },
    closeDialog(flag) {
      this.dialogVisible = flag;
    },
    updateList() {
      this.getList();
    },
    showDetail() {},
    output(type) {
      if (type === "EXCEL格式") {
        // 需要导出的数据源

        // 将数据源转成我们需要的二维数组
        const body = this.tableData.map((x) => [
          x.projectItem,
          x.line,
          x.yearNum,
          x.periodNum,
        ]);

        /* 定义表头
    定义表头，每一行即是一个数组，数组中的元素即是一个个单元格内容。
    如果单元格不需要样式，那么每个元素类型为字符串即可。如：['一月（2022年01月）'], 
    如果单元格需要样式，那么数组中的元素就需要为一个个对象，在此对象中定义单元格的样式等等。
    这里只针对第一行进行举例：
*/

        const header = [
          [
            {
              v: "利润表",
              t: "s",
              s: {
                // font 字体属性
                font: {
                  bold: true,
                  sz: 14,
                  name: "宋体",
                },
                // alignment 对齐方式
                alignment: {
                  vertical: "center", // 垂直居中
                  horizontal: "center", // 水平居中
                },
                // fill 颜色填充属性
                fill: {
                  fgColor: { rgb: "87CEEB" },
                },
              },
            },
          ],
          [
            `${this.$store.getters.childrenData.clientName}`,
            `${this.date}`,
            "单位：元",
          ],
          ["项目", "行次", "本期金额", "上期金额"],
        ];

        body.unshift(...header); // 将定义好的表头添加到 body 中
        const sheet = XLSXS.utils.aoa_to_sheet(body); // aoa_to_sheet 将二维数组转成 sheet

        // 设置合并单元格
        const merges = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
          { s: { r: 1, c: 2 }, e: { r: 1, c: 3 } },
        ];
        sheet["!merges"] = merges; // 将merges添加到sheet中
        console.log(sheet["!merges"]);
        // 设置列宽
        const cols = [{ wch: 20 }, { wch: 10 }, { wch: 15 }, { wch: 10 }];
        sheet["!cols"] = cols; // 将cols添加到sheet中

        //
        const rows = [{ hpx: 20 }, { hpx: 16 }, { hpx: 18 }];
        sheet["!rows"] = rows; // 将rows添加到sheet中，设置行高

        const workbook = XLSXS.utils.book_new(); // 创建虚拟的 workbook
        XLSXS.utils.book_append_sheet(workbook, sheet, "sheet名称"); // 向 workbook 中添加 sheet
        XLSXS.writeFile(
          workbook,
          `利润表_${this.$store.getters.childrenData.clientName}_${this.date}.xlsx`
        ); // 导出 workbook
        // 注意：定义导出 excel 的名称时需要加上后缀 .xlsx
      }
    },
  },
};
</script>

<style lang='scss' scoped>
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  padding: 0;
  margin: 0;
  font-size: 12px;
  border-color: #d0d0d0;
}
table td,
table th {
  text-align: center;
  table-layout: fixed;
  padding: 0px;
  position: relative;
}
.table tbody {
  height: calc(100% - 70px);
  overflow: auto;
}
.table tbody tr,
.table tbody td {
  height: 35px;
  padding: 0 10px;
}
.table tbody > tr:hover {
  background-color: #faffd1;
  a {
    text-decoration: underline;
  }
}
.debtor-table td {
  border-right: 1px solid #bab9b9;
  &:last-of-type {
    border-right: none;
  }
}
</style>