<template>
  <div style="padding: 20px">
    <div></div>

    <div class="charge-nav">
      <h2>会计制度</h2>
      <div>
        <div class="charge-nav-title">{{ customData.accountingSystem }}</div>
        <div>
          <ul>
            <li class="selected">{{ customData.taxNature }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-hd">
      <el-radio-group
        class="header"
        v-model="tabPositiond"
        v-for="item in tabAdd"
        :key="item.id"
        size="mini"
        @change="getListTypedd(item.id)"
        style="margin-bottom: 30px"
      >
        <el-radio-button plain :label="item.dataValue"></el-radio-button>
      </el-radio-group>
      <div style="float: right">
        <el-button size="mini" type="primary">复制至其他账套</el-button>
        <el-button size="mini" @click="insert">新 增</el-button>
        <el-button size="mini">复制模板</el-button>
        <el-button size="mini">同步最新模板</el-button>
      </div>
    </div>
    <div class="charge-main">
      <new-table
        :tableData="listAdd"
        @changeListByType="changeListByType"
        :system="type"
        :systemType="systemType"
      ></new-table>
    </div>
    <el-dialog
      title="新增凭证模板"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="单据名称">
          <el-select v-model="doName">
            <el-option
              v-for="item in optiondjmc"
              :key="item.id"
              :value="item.id"
              :label="item.dataValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-select v-model="setMethod">
            <el-option
              v-for="item in optionjsfs"
              :key="item.id"
              :value="item.id"
              :label="item.dataValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="business">
            <el-option
              v-for="item in optionywlx"
              :key="item.id"
              :value="item.id"
              :label="item.dataValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="insertOne">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { GetList, add, gain } from "@/api/acc/BillVoucherTemplate";
import { addInTemp } from "@/api/acc/BillTemplateInSystem";
import newTable from "@/components/BillVoucherTemplate";
import { mixins } from "@/mixins/mixin";

export default {
  name: "BillVoucherTemplate",
  components: {
    newTable,
  },
  mixins: [mixins],
  data() {
    return {
      doName: "",
      setMethod: "",
      business: "",
      optiondjmc: "",
      optionjsfs: "",
      optionywlx: "",
      dialogVisible: false,
      gg: [],
      arr1: "",
      arr2: "",
      arr3: "",
      arr4: "",
      form: {
        region: "",
      },
      listAdd: [],
      tabAdd: [],
      tabPosition: "资产",
      tabPositiond: "销售发票",
      dialogFormVisible: false,
      dier: false,
      systemType: "inSystem",
      currtype: 1,
      type: 13,
      add: [],
      list: [],
      addTemp: {
        billType: null,
        businessType: null,
        documentsName: null,
        settlementMethod: null,
        system: null,
        taxpayerType: null,
      },
      defaultProps: {
        label: "subjectCode", // 作为对应节点的名字显示
        children: "children", // 指定子树为节点对象的某个属性值
      },
      selectClassEnd: "", //类别默认选择
      select_class_id: "", //类别id提交报名需要
    };
  },
  created() {
    // this.bb();
    this.getListdata();
    add(3).then((res) => {
      this.tabAdd = res.data.data;
    });
    add(4).then((res) => (this.optiondjmc = res.data.data));
    add(5).then((res) => (this.optionjsfs = res.data.data));
    add(6).then((res) => (this.optionywlx = res.data.data));
    this.gain(this.type);
  },
  methods: {
    insert() {
      this.dialogVisible = true;
    },

    async insertOne() {
      this.addTemp.billType = this.type;
      this.addTemp.businessType = this.business;
      this.addTemp.documentsName = this.doName;
      this.addTemp.settlementMethod = this.setMethod;
      this.addTemp.system = this.system;
      this.addTemp.taxpayerType = this.taxtype;
      const { data: res } = await addInTemp(this.addTemp);
      if (res.retCode === 500) return this.$message.error("新增失败");
      this.dialogVisible = false;
      this.$message.success("新增成功");
      this.changeListByType(true);
    },

    handleClose() {
      this.dialogVisible = false;
    },
    gain(type) {
      type = this.type;
      gain(type).then((res) => {
        this.listAdd = res.data.data;
      });
    },
    getListType(val) {
      this.currtype = val;
      this.getListdata();
    },
    getListdata() {
      GetList(this.currtype).then((response) => {
        this.list = response.data.data;
        // for (let i = 0; i < this.list.length; i++) {
        //     let code ='';
        //     code = this.list[i].subjectCode +'   '+this.list[i].subjectName
        //     this.list[i].subjectCode = code;
        // }
        //    console.log(this.list);
        this.list.forEach((item) => {
          item.subjectCode = item.subjectCode + "      " + item.subjectName;
        });
      });
    },

    // 列表
    getListTypedd(e) {
      this.type = e;
      gain(this.type).then((ress) => {
        console.log(ress.data);
        this.listAdd = ress.data.data;
      });
    },
    // bb() {
    //   Spinne(this.type, 1).then((res) => {
    //     this.arr1 = res.data.data;
    //   });
    //   Spinne(this.type, 2).then((res) => {
    //     this.arr2 = res.data.data;
    //   });
    //   Spinne(this.type, 3).then((res) => {
    //     this.arr3 = res.data.data;
    //   });
    //   Spinne(this.type, 4).then((res) => {
    //     this.arr4 = res.data.data;
    //   });
    // },
    selectClass(event) {
      this.select_class_id = event.target.value; //获取option对应的value值 select_class_id是后台约定的提交数据的名称
      console.log(this.select_class_id);
    },

    popup(e) {
      this.gg = e;
      console.log(this.gg);
      this.dier = true;
    },
    journalizing() {
      this.dialogFormVisible = true;
    },
    // 删除模板
    del(e) {
      console.log(e);

      // delet(e,).then((res) => {

      //   console.log(res);

      // })
    },

    handleNodeClick(data) {
      console.log(data);
    },
    // 确定按钮
    confirm() {
      this.dialogFormVisible = false;
    },
    aa() {
      this.dialogFormVisible = true;
    },
    changeListByType(bool) {
      if (bool) {
        this.gain(this.type);
      }
    },
  },
};
</script>

<style scoped>
.doalog {
  margin: 0 auto;
  height: 900px;
}

.gd {
  overflow: auto;
  width: 100%;
  height: 400px;
}

.item {
  display: flex;
}

.dive {
  width: 300px;
  display: flex;
  justify-content: space-around;
}

.footer-a {
  width: 500px;
  display: flex;
  justify-content: space-around;
}

.footer-a span,
.footer-a i {
  margin-top: 10px;
}

.divv,
.div {
  width: 43px;
  border: 1px solid #ddd;
  padding: 2px 3px;
  border-radius: 2px;
  margin: 0px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  margin: 5px 0;
}

.div {
  width: 150px;
}
.selected {
  background-color: #eee;
  font-weight: 700;
}
.butt i {
  position: absolute;
  bottom: 20px;
}

.btn,
i {
  cursor: pointer;
}

.select {
  border: 0;
  width: 120px;
  text-overflow: ellipsis;
}

.dai {
  border: 0;
}

.wu {
  width: 100px;
}

.foot {
  width: 95px;
}
</style>