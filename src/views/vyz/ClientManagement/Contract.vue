<template>
  <div class="big">
    <div class="big-a">
      <div class="big-aa">
        <div class="aa-a kai">
          <div class="aa-a-a">签约日期</div>
          <div class="shai">今天</div>
          <div class="shai">近七天</div>
          <div class="shai">本月</div>
          <div class="shai">本年</div>
          <div class="shai">自定义：</div>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="到"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
       
      </div>
      <div class="big-aa">
        <div class="aa-b kai">
          <div class="yewu">业务员：</div>
          <el-input v-model="yewu" style="width:300px" placeholder="请输入内容"></el-input>
        </div>
      
      </div>
    </div>
    <div class="big-a">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button>搜索</el-button>
        </el-col>
      </el-row>

      <el-button class="jia" @click.native="fromme()">添加</el-button>
    </div>

    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100% margin-top:20px"
        height="500"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="合同编号" width="110%">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="客户名称" width="120">
        </el-table-column>
        <el-table-column prop="address" label="签约日期" width="110%">
        </el-table-column>
        <el-table-column prop="contract" label="合同期限" width="90%">
        </el-table-column>
        <el-table-column prop="serve" label="服务类型" width="110%">
        </el-table-column>
        <el-table-column prop="item" label="服务项目" width="110%">
        </el-table-column>
        <el-table-column prop="viability" label="服务期限" width="110%">
        </el-table-column>
        <el-table-column prop="price" label="服务总价" width="110%">
        </el-table-column>
        <el-table-column prop="figure" label="合同金额" width="110%">
        </el-table-column>
        <el-table-column prop="received" label="已收金额" width="110%">
        </el-table-column>
        <el-table-column prop="gathering" label="收款折扣" width="110%">
        </el-table-column>
        <el-table-column prop="residue" label="剩余未收" width="110%">
        </el-table-column>
        <el-table-column prop="whether" label="是否完款" width="110%">
        </el-table-column>
        <el-table-column prop="make" label="开票状态" width="110%">
        </el-table-column>
        <el-table-column prop="cost" label="成本合计" width="110%">
        </el-table-column>
        <el-table-column prop="salesman" label="业务员" width="110%">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="110%">
        </el-table-column>
        <el-table-column label="操作" width="100%">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <fromme v-if="insert" ref="creat"></fromme>
  </div>
</template>


<script>
import fromme from "./Contract-fromme";
export default {
  components: {
    fromme,
  },
  data() {
    return {
      insert: false,
        value1:'',
      input: "",
      yewu:'',
      tableData: [
        {
          date: 12321321,
          name: "王小虎",
          address: "2016-05-03",
          contract: "23",
          serve: "qwe",
          item: "sad",
          viability: "fgds",
          price: "sad",
          figure: "dsf",
          received: "fdgh",
          gathering: "sfds",
          residue: "sdf",
          whether: "hbf",
          make: "sdf ",
          cost: "sdfs",
          salesman: "gfh",
          remark: "23ewf",
        },
      ],
      multipleSelection: [],
    };
  },

  methods: {
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
      this.multipleSelection = val;
    },
    //添加
    fromme() {
      this.insert = true;
      this.$nextTick(() => {
        this.$refs.creat.init();
      });
    },
  },
};
</script>
<style scoped>
.big {
  height: 10vh;
  margin: 20px 20px 0 20px;
}

.big-a {
  display: flex;
  /* margin-bottom: 20px; */
  width: 100vw;
  margin-bottom: 15px;
}

.big-a .jia {
  position: relative;
  margin-left: 1320px;
}
.big-a .big-aa {
  width: 43.7%;
  border: 1px solid #ccc;
}
.kai {
  line-height: 40px;
}
.aa-b{
  display: flex;
}
.aa-b .yewu{
  width: 100px;
  height: 100%;
  background: rgb(236, 71, 71);
  line-height: 40px;
  color: #fff;
  text-align: center;
  margin-right: 30px;
}
.big-aa div {
  height: 40px;
}
.aa-a .aa-a-a {
  width: 100px;
  height: 100%;
  background: rgb(236, 71, 71);
  line-height: 40px;
  color: #fff;
  text-align: center;
}
.aa-a {
  display: flex;
}
.shai {
  width: 80px;
  height: 20px;

  line-height: 40px;

  margin-left: 10px;

  text-align: center;
}
.shai:hover {
  color: rgb(112, 44, 44);

  background: rgb(156, 147, 147);
}
</style>
