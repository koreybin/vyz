<template>
  <div>
    <div class="header">
      <div>
        <el-input
          v-model="serial"
          placeholder="按编号,名称等查询"
          class="int"
        ></el-input
        ><el-button @click="search">搜索</el-button>
      </div>
      <div>
        <el-button>发票商品对应系统存货</el-button>
        <el-button @click="increased">新增</el-button>
        <el-button>导入</el-button>
        <download-excel
          style="display: inline"
          :data="arrList"
          :fields="json_fields"
          :name="'存货' + '_' + new Date().getTime()"
          ><el-button> 导出 </el-button>
        </download-excel>
      </div>
    </div>
    <div class="box">
      <el-table
        :key="tableKey"
        :data="arrList"
        border
        fit
        highlight-current-row
      >
        <el-table-column width="100" align="center" label="编码">
          <template slot-scope="scope">
            <span>{{ scope.row.inventoryCode }}</span>
          </template>
        </el-table-column>
        <el-table-column width="300" align="center" label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.inventoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="300" align="center" label="规格">
          <template slot-scope="scope">
            <span>{{ scope.row.specification }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit aa" @click="compile(scope.row)"></i>
            <i class="el-icon-close aa" @click="remove(scope.row.id)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[5, 10, 20, 30, 50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <div>
      <el-dialog title="新增卡片" :visible.sync="dialogFormVisible" width="20%">
        <el-form ref="temp" :rules="rules" :model="temp">
          <el-form-item label="编码:" prop="inventoryCode" label-width="80px">
            <el-input class="int" v-model="temp.inventoryCode"> </el-input>
          </el-form-item>
          <el-form-item label="名称:" prop="inventoryName" label-width="80px">
            <el-input class="int" v-model="temp.inventoryName"> </el-input>
          </el-form-item>
          <el-form-item label="规格:" prop="specification" label-width="80px">
            <el-input class="int" v-model="temp.specification"> </el-input>
          </el-form-item>
          <el-form-item label="单位:" prop="unit" label-width="80px">
            <el-input class="int" v-model="temp.unit"> </el-input>
          </el-form-item>
          <div class="footer">
            <el-button @click="cancel"> 取消</el-button>
            <el-button @click="submit"> 确定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <!-- 编辑弹窗 -->
    <div>
      <el-dialog
        title="新增卡片"
        :visible.sync="dialogFormVisible1"
        width="20%"
      >
        <el-form ref="temp2" :rules="rules" :model="temp2">
          <el-form-item label="编码:" prop="inventoryCode" label-width="80px">
            <el-input class="int" v-model="temp2.inventoryCode"> </el-input>
          </el-form-item>
          <el-form-item label="名称:" prop="inventoryName" label-width="80px">
            <el-input class="int" v-model="temp2.inventoryName"> </el-input>
          </el-form-item>
          <el-form-item label="规格:" prop="specification" label-width="80px">
            <el-input class="int" v-model="temp2.specification"> </el-input>
          </el-form-item>
          <el-form-item label="单位:" prop="unit" label-width="80px">
            <el-input class="int" v-model="temp2.unit"> </el-input>
          </el-form-item>

          <div class="footer">
            <el-button @click="cancel2"> 取消</el-button>
            <el-button @click="submit2"> 确定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  GetList,
  augment,
  del,
  modification,
} from "@/api/acc/Repertory/StockControl";
import { getSettingState } from "@/api/acc/Repertory/InventorySettings";
import { Message } from "element-ui";
export default {
  name: "StockControl",
  data() {
    return {
      json_fields: {
        编码: "inventoryCode",
        名称: "inventoryName",
        规格: "specification",
        单位: "unit",
      },
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      arrList: [],
      tableKey: 1,
      serial: "",
      temp: {
        id: "",
        inventoryCode: "", //存货编码
        inventoryName: "", //存货名称
        specification: "", //规格型号
        unit: "", //单位
      },
      temp2: {
        id: "",
        inventoryCode: "", //存货编码
        inventoryName: "", //存货名称
        specification: "", //规格型号
        unit: "", //单位
      },
      rules: {
        inventoryCode: [
          { required: true, message: "请输入编码", trigger: "blur" },
        ],
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    getSettingState().then((response) => {
      if (response.data.retCode === 500) {
        return Message.warning(response.data.message);
      }
      if (response.data.message === "未进入子系统") {
        this.$router.push("/");
        return;
      }
      next();
    });
  },
  created() {
    this.search();
  },
  methods: {
    // 搜索
    search() {
      GetList(
        this.serial,
        this.listQuery.pageNum,
        this.listQuery.pageSize
      ).then((res) => {
        this.arrList = res.data.data.object;
      });
    },

    // 新增按钮 清空
    increased() {
      this.dialogFormVisible = true;

      this.$nextTick(() => {
        this.$refs.temp.resetFields();
      });
    },
    // 取消按钮
    cancel() {
      this.dialogFormVisible = false;

      this.$nextTick(() => {
        this.$refs.temp.resetFields();
      });
    },
    cancel2() {
      this.dialogFormVisible1 = false;
    },

    //新增提交
    submit() {
      augment(this.temp).then((res) => {
        console.log(res);
        this.search();
      });
      this.dialogFormVisible = false;
    },
    // 删除
    remove(e) {
      this.$confirm("您确定要删除该存货吗？删除后不可恢复", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        del(e).then((res) => {
          console.log(res);
          this.search();
        });
      });
    },

    // 编辑按钮
    compile(e) {
      this.temp2.id = e.id;
      this.temp2.inventoryCode = e.inventoryCode;
      this.temp2.inventoryName = e.inventoryName;
      this.temp2.specification = e.specification;
      this.temp2.unit = e.unit;
      this.dialogFormVisible1 = true;
    },
    // 编辑提交
    submit2() {
      modification(this.temp2).then((res) => {
        this.search();
      });
      this.dialogFormVisible1 = false;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.search();
    },
  },
};
</script>

<style scoped>
.int {
  width: 200px;
}
.header {
  background: #ccc;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.box {
  margin-top: 10px;
  margin-left: 10px;
}
.footer {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.aa {
  margin-left: 10px;
  cursor: pointer;
}

.aa:hover {
  color: rgb(167, 167, 167);
}
</style>