<template>
  <div>
    <div class="header">
      <div class="header-a">套打模板</div>
      <div>
        <el-button>导入模板</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 80%"
      >
        <el-table-column width="500px" align="center" label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.templateName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="类别">
          <template slot-scope="scope">
            <span>{{ scope.row.templateSort }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="模板类型">
          <template slot-scope="scope">
            <span>{{
              scope.row.templateType == "1" ? "系统模板" : "自定义模板"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="默认模板">
          <template slot-scope="scope">
            <span>{{ scope.row.isDefault == "0" ? "否" : "是" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="btn(scope.row)">修改</el-button>
            <el-button>下载</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div>
        <el-dialog
          title="编辑套打模版"
          :visible.sync="dialogFormVisible"
          center
          width="35%"
          class="doalog"
        >
          <el-form ref="form" :model="this.add" label-width="80px">
            <el-form-item label="名称:">
              <el-input v-model="this.add.templateName" disabled></el-input>
            </el-form-item>
            <el-form-item label="是否默认:">
              <el-radio-group v-model="radio">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { GetList, amend } from "@/api/acc/Template";
export default {
  data() {
    return {
      radio: 1,
      add: "",
      list: null,
      tableKey: 0,
      dialogFormVisible: false,
    };
  },
  created() {
    GetList().then((res) => {
      // console.log(res.data.data);
      this.list = res.data.data;
    });
  },
  methods: {
    btn(e) {
      this.add = e;
      this.dialogFormVisible = true;
    },

    // 编辑提交按钮
    confirm() {
      // console.log(this.add.id);
      // console.log(this.add.templateName);
      // console.log( this.radio);
      amend(this.add.id, this.radio, this.add.templateName).then((ress) => {
        console.log(ress);
        GetList().then((res) => {
          // console.log(res.data.data);
          this.list = res.data.data;
        });
      });
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 20px 20px 10px 20px;
}

.header-a {
  font-size: 16px;
  font-weight: bold;
  position: relative;
  color: #555;
}

.table {
  margin: 0 20px;
}

span {
  cursor: pointer;
}

.doalog {
  margin: 0 auto;
}

.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>