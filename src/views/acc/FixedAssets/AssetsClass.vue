<template>
  <div>
    <div class="header">
      <el-button type="primary" @click="newly">新增</el-button>
    </div>
    <el-table :key="tableKey" :data="listAdd" border fit highlight-current-row>
      <el-table-column width="100px" align="center" label="操作">
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="ball(scope.row)"></i>

          <i class="el-icon-close" @click="dell(scope.row.id)"></i>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="类别编码">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="类别名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="折旧方法">
        <template slot-scope="scope">
          <span>{{
            scope.row.depreciationMethod == "1" ? "平均年限法" : "不提折旧"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="预计使用年限">
        <template slot-scope="scope">
          <span>{{ scope.row.estimatedServiceLife }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="预计净残值率%">
        <template slot-scope="scope">
          <span>{{ scope.row.residuaValueRatio }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="固定资产科目">
        <template slot-scope="scope">
          <span>{{ scope.row.accumulatedDepreciationSubject2 }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="累计折旧科目">
        <template slot-scope="scope">
          <span>{{ scope.row.fixedAssetsSubject2 }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        title="编辑资产类别"
        :visible.sync="dialogFormVisible"
        max-height="250"
        width="35%"
        class="doalog"
      >
        <el-form :model="list" ref="list" label-width="100px">
          <el-form-item label="类别编码" label-width="100px" prop="prove">
            <el-input
              v-model="list.number"
              autocomplete="off"
              class="int"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别名称" label-width="100px" prop="prove">
            <el-input
              v-model="list.name"
              autocomplete="off"
              class="intt"
            ></el-input>
          </el-form-item>
          <el-form-item label="折旧方法" label-width="100px">
            <el-select v-model="value" @change="wu">
              <el-option label="平均年限法" :value="1"></el-option>
              <el-option label="不提折旧" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计使用年限" label-width="100px">
            <el-input
              v-if="this.value == 1 || this.value == '平均年限法'"
              v-model="list.estimatedServiceLife"
              autocomplete="off"
              @blur="judgeNum($event.target.value)"
              class="int"
            ></el-input>
            <el-input
              v-else
              autocomplete="off"
              disabled="disabled"
              class="int"
            ></el-input>
            <span>折为</span>
            <el-input
              v-if="this.value == 1 || this.value == '平均年限法'"
              v-model="this.addList"
              disabled
              autocomplete="off"
              class="int"
            >
            </el-input>
            <el-input
              v-else
              autocomplete="off"
              disabled="disabled"
              class="int"
            ></el-input>
            <span>期</span>
          </el-form-item>
          <el-form-item label="预计净残值率" label-width="100px">
            <el-input
              v-if="this.value == 1 || this.value == '平均年限法'"
              v-model="list.residuaValueRatio"
              autocomplete="off"
              class="int"
            ></el-input>
            <el-input
              v-else
              autocomplete="off"
              disabled="disabled"
              class="int"
            ></el-input>
            <span>%</span>
          </el-form-item>
          <el-form-item label="固定资产科目" label-width="100px">
            <el-input
              v-model="list.accumulatedDepreciationSubject2"
              autocomplete="off"
              class="intt"
            >
            </el-input>
            <i class="el-icon-folder-add" @click="putt"></i>
          </el-form-item>
          <el-form-item label="累计折旧科目" label-width="100px">
            <el-input
              v-if="this.value == 1 || this.value == '平均年限法'"
              v-model="list.fixedAssetsSubject2"
              autocomplete="off"
              class="intt"
            >
            </el-input>
            <el-input
              v-else
              autocomplete="off"
              disabled="disabled"
              class="intt"
            ></el-input>
            <i
              v-if="this.value == 1 || this.value == '平均年限法'"
              class="el-icon-folder-add"
              @click="put"
            ></i>
          </el-form-item>
          <el-form-item label="备注" label-width="100px">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入"
              v-model="list.remark"
              class="inttt"
            >
            </el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button @click="cancel('list')">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <!-- 新增 -->

    <div>
      <el-dialog
        title="新增资产类别"
        :visible.sync="dialogFormVisible1"
        max-height="250"
        width="35%"
        class="doalog"
      >
        <el-form :model="Arr" ref="Arr" label-width="100px">
          <el-form-item label="类别编码" label-width="100px" prop="number">
            <el-input
              v-model="Arr.number"
              autocomplete="off"
              class="int"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别名称" label-width="100px" prop="name">
            <el-input
              v-model="Arr.name"
              autocomplete="off"
              class="intt"
            ></el-input>
          </el-form-item>
          <el-form-item label="折旧方法" label-width="100px">
            <el-select v-model="value" @change="wu">
              <el-option label="平均年限法" :value="1"></el-option>
              <el-option label="不提折旧" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="预计使用年限"
            label-width="100px"
            prop="estimatedServiceLife"
          >
            <el-input
              v-if="this.value == 1 || this.value == '平均年限法'"
              v-model="Arr.estimatedServiceLife"
              autocomplete="off"
              @blur="judgeNum($event.target.value)"
              class="int"
            ></el-input>
            <el-input
              v-else
              autocomplete="off"
              disabled="disabled"
              class="int"
            ></el-input>
            <span>折为</span>
            <el-input
              v-if="this.value == 1 || this.value == '平均年限法'"
              v-model="this.addList"
              disabled
              autocomplete="off"
              class="int"
            >
            </el-input>
            <el-input
              v-else
              autocomplete="off"
              disabled="disabled"
              class="int"
            ></el-input>
            <span>期</span>
          </el-form-item>
          <el-form-item
            label="预计净残值率"
            label-width="100px"
            prop="residuaValueRatio"
          >
            <el-input
              v-if="this.value == 1 || this.value == '平均年限法'"
              v-model="Arr.residuaValueRatio"
              oninput="value=value.replace(/[^\d]/g,'')"
              autocomplete="off"
              class="int"
            ></el-input>
            <el-input
              v-else
              autocomplete="off"
              disabled="disabled"
              class="int"
            ></el-input>
            <span>%</span>
          </el-form-item>
          <el-form-item
            label="固定资产科目"
            label-width="100px"
            prop="accumulatedDepreciationSubject2"
          >
            <el-input
              v-model="Arr.accumulatedDepreciationSubject2"
              autocomplete="off"
              class="intt"
            >
            </el-input>
            <i class="el-icon-folder-add" @click="select1"></i>
          </el-form-item>
          <el-form-item
            label="累计折旧科目"
            label-width="100px"
            prop="fixedAssetsSubject2"
          >
            <el-input
              v-if="this.value == 1 || this.value == '平均年限法'"
              v-model="Arr.fixedAssetsSubject2"
              autocomplete="off"
              class="intt"
            >
            </el-input>
            <el-input
              v-else
              autocomplete="off"
              disabled="disabled"
              class="intt"
            ></el-input>
            <i
              v-if="this.value == 1 || this.value == '平均年限法'"
              class="el-icon-folder-add"
              @click="select2"
            ></i>
          </el-form-item>
          <el-form-item label="备注" label-width="100px">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入"
              v-model="Arr.remark"
              class="inttt"
            >
            </el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button @click="cancel('Arr')">取 消</el-button>
            <el-button type="primary" @click="confirm2">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>

    <div v-if="aa">
      <BillVoucherTemplatea :msgData="msg" @getData="fn"></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import {
  GetList,
  del,
  compile,
  increased,
} from "@/api/acc/FixedAssets/AssetsClass";
import BillVoucherTemplatea from "../Setup/BillVoucherTemplatea";

export default {
  components: { BillVoucherTemplatea },
  name: "AssetsClass",
  data() {
    return {
      data: "",
      msgData: "",

      value: 1,
      aa: false,
      addList: "",
      tableKey: 1,
      listAdd: [],
      msg: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      list: {
        id: 0,
        accumulatedDepreciationSubject: "",
        depreciationMethod: "",
        estimatedServiceLife: "",
        number: "",
        name: "",
        remark: "",
        residuaValueRatio: "",
      },

      Arr: {
        accumulatedDepreciationSubject: 0, //累计折旧科目id
        depreciationMethod: 1, //折旧方法(1:平均年限法,2:不提折旧)
        estimatedServiceLife: 0, //预计使用年限
        fixedAssetsSubject: 0, //固定资产科目id
        name: "", //类别名称
        number: "", //资产类别编码
        remark: "", //备注
        residuaValueRatio: 0, //预计净残值率(忽略百分号)
      },
      temp: "",
      remark1: "",
      remark2: "",
      modul: false,
      // rules: { prove: [{ required: true, message: '编码/名称不能为空', trigger: 'blur' }], },
    };
  },
  created() {
    this.getlisttab();
  },

  methods: {
    getlisttab() {
      GetList().then((res) => {
        console.log(res);
        this.listAdd = res.data.data;
      });
    },
    // 删除
    dell(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(e);
        del(e).then((res) => {
          console.log(res);
          this.getlisttab();
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },

    // 年转期
    judgeNum(e) {
      this.addList = e * 12;
    },

    wu(e) {
      this.list.depreciationMethod = e;
      this.Arr.depreciationMethod = e;
      if ((e = 2)) {
        this.Arr.fixedAssetsSubject = "";
        this.Arr.estimatedServiceLife = "";
        this.Arr.residuaValueRatio = "";
        this.Arr.accumulatedDepreciationSubject = "";
        this.list.fixedAssetsSubject = "";
        this.list.estimatedServiceLife = "";
        this.list.residuaValueRatio = "";
        this.list.accumulatedDepreciationSubject = "";
      }
    },

    // 修改按钮
    ball(row) {
      this.list.id = row.id;
      this.list = JSON.parse(JSON.stringify(row));
      this.addList = row.estimatedServiceLife * 12;
      if (this.list.depreciationMethod == 2) {
        this.value = 2;
      } else {
        this.value = 1;
      }
      this.dialogFormVisible = true;
    },
    //固定资产科目////////////////
    // 编辑 资产/折旧
    putt() {
      this.msg = 1;
      this.aa = true;
    },
    // 添加 资产/折旧
    select1() {
      this.msg = 2;
      this.aa = true;
    },

    // 添加累计折旧科目///////////////////////
    put() {
      this.msg = 0;
      this.aa = true;
    },
    select2() {
      this.msg = 3;
      this.aa = true;
    },

    // 子组件传过来的值////////////
    fn(e, a, b) {
      this.aa = e;
      console.log(a);
      if (b == 0) {
        if (a == undefined) {
          this.list.fixedAssetsSubject2 = this.list.fixedAssetsSubject2;
        } else {
          this.list.fixedAssetsSubject2 = a.subjectName;
          this.list.accumulatedDepreciationSubject = a.id;
        }
      }
      if (b == 1) {
        if (a == undefined) {
          this.list.accumulatedDepreciationSubject2 =
            this.list.accumulatedDepreciationSubject2;
        } else {
          this.list.accumulatedDepreciationSubject2 = a.subjectName;
          this.list.fixedAssetsSubject = a.id;
        }
      }
      if (b == 2) {
        if (a == undefined) {
          this.Arr.accumulatedDepreciationSubject2 =
            this.Arr.accumulatedDepreciationSubject2;
        } else {
          this.Arr.accumulatedDepreciationSubject2 = a.subjectName;
          this.Arr.fixedAssetsSubject = a.id;
        }
      }
      if (b == 3) {
        if (a == undefined) {
          this.Arr.fixedAssetsSubject2 = this.Arr.fixedAssetsSubject2;
        } else {
          this.Arr.fixedAssetsSubject2 = a.subjectName;
          this.Arr.accumulatedDepreciationSubject = a.id;
        }
      }
    },

    // 取消
    cancel() {
      this.dialogFormVisible = false;
      this.dialogFormVisible1 = false;
    },

    // 新增按钮
    newly() {
      this.dialogFormVisible1 = true;
      this.$nextTick(() => {
        this.$refs.Arr.resetFields();
      });
    },

    // 修改提交
    confirm() {
      console.log(this.list);
      compile(this.list).then((res) => {
        this.getlisttab();
        this.dialogFormVisible = false;
      });
    },

    // 添加提交

    confirm2() {
      console.log(this.Arr);
      increased(this.Arr).then((res) => {
        this.getlisttab();

        this.dialogFormVisible1 = false;
      });
    },
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
  margin-left: 10px;
}

i:hover {
  color: rgb(167, 167, 167);
}

.doalog {
  margin: 0 auto;
  height: 900px;
}

.int {
  width: 120px;
}

.intt {
  width: 200px;
}

.inttt {
  width: 250px;
}

.header {
  margin: 20px 20px;
  width: 90%;
  display: flex;
  justify-content: right;
}

.dialog-footer {
  display: flex;
  justify-content: right;
}
</style>