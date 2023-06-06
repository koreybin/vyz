<template>
  <div class="calendar-list-container"><voucher></voucher></div>
</template>

<script>
import voucher from "./voucher";
import { GetListabs } from "@/api/acc/abstract";

export default {
  name: "EnteringVoucher",
  data() {
    return {
      tableKey: 0,
      restaurants: [],
      restaurantskm: [],
      state1: "",
      state2: "",

      list: [
        {
          abstract: "",
          accountantCourse: "",
          number: " ",
        },
        {
          abstract: "",
          accountantCourse: "",
          number: " ",
        },
        {
          abstract: "",
          accountantCourse: "",
          number: " ",
        },
        {
          abstract: "",
          accountantCourse: "",
          number: " ",
        },
      ],

      dialogStatus: "",

      textMap: {
        update: "编辑",
        create: "创建",
      },

      rules: {},
      downloadLoading: false,
    };
  },
  components: {
    voucher,
  },
  created() {
    this.dialogStatus = "create";
  },

  mounted() {
    // this.loadzhaiyao();
  },
  methods: {
    tableCellStyle() {
      return "border-color: #999;";
    },
    tableHeaderCellStyle() {
      return "border-color: #999;";
    },
    handleCreate() {
      console.log("1");
    },
    goclick(row, column, event, cell) {
      console.log(row, event, cell);
      if (column.label == "会计科目") {
        console.log("选择会计科目");
      } else if (column.label == "数量") {
        console.log("输入数量");
      } else {
        console.log("abc");
      }
    },

    loadzhaiyao() {
      GetListabs().then((response) => {
        let datares = response.data.data;
        var lastares = [];
        var arrdata = new Array();
        arrdata = datares;
        for (var i = 0; i < arrdata.length; i++) {
          var id = arrdata[i].id;
          var content = arrdata[i].content;
          var obj = { value: content, address: id };
          lastares.push(obj);
        }

        this.restaurants = lastares;
      });
    },
    loadkemu() {
      GetListkemu().then((response) => {
        let datares = response.data.data;
        var lastares = [];
        var arrdata = new Array();
        arrdata = datares;
        for (var i = 0; i < arrdata.length; i++) {
          var id = arrdata[i].id;
          var content = arrdata[i].content;
          var obj = { value: content, address: id };
          lastares.push(obj);
        }

        this.restaurantskm = lastares;
      });
    },

    handleSelect(item) {
      this.state1 = item.value;
    },
    handleSelectkm(item) {
      this.state2 = item.value;
    },
    //合计行
  },
};
</script>

<style lang="scss" scoped>
/* .el-table--border{
  border: 2px solid #F333FF;
} */
.fidex {
  /* border: 1px solid #ff6600; */
  position: fixed;
  margin-left: -30px;
  margin-top: -20px;
}
.pinzheng {
  background-color: #fff;
  box-shadow: 2px 2px 20px #ddd;
  padding: 10px 30px;
}
.el-table {
  border: 2px solid #999;
}
</style>
