<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <el-col :span="8">
        <el-radio-group
          v-model="tabPosition"
          v-for="item in tabs"
          :key="item.id"
          @change="getListType(item.id)"
          style="margin-bottom: 30px"
        >
          <el-radio-button :label="item.name"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="8" :offset="8">
        <div class="filter-item-right">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate"
            plain
            >添加</el-button
          >
          <el-button type="primary" plain>导入</el-button>
          <download-excel
            :data="exportList"
            :fields="json_fields"
            :name="`${new Date()}科目列表`"
          >
            <el-button type="primary" plain>导出</el-button>
          </download-excel>

          <el-button type="primary" plain>删除</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column width="55"> </el-table-column>

      <el-table-column
        width="220px"
        align="center"
        :label="$t('table.actions')"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button size="mini" @click="handleUpdate(scope.row)">{{
            $t("setobjbut.butuptdate")
          }}</el-button>
          <!-- 删除按钮 -->
          <el-button size="mini" @click="handleDelete(scope.row)"
            >{{ $t("setobjbut.butdelete") }}
          </el-button>
          <!-- 添加子级 -->
          <el-button size="mini" @click="handleUp(scope.row)"
            >{{ $t("setobjbut.butaddchild") }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('setobjectobj.subjectCode')">
        <template slot-scope="scope">
          <span>{{ scope.row.subjectCode }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        :label="$t('setobjectobj.subjectName')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.subjectName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        align="center"
        :label="$t('setobjectobj.dataType')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dataType }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        :label="$t('setobjectobj.balanceDirection')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.balanceDirection == "1" ? "借" : "贷" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="250px"
        align="center"
        :label="$t('setobjectobj.helpAccounting')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.helpAccounting }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        :label="$t('setobjectobj.foreignCurrency')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.foreignCurrency }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="this.currtype == 1"
        width="130px"
        align="center"
        :label="$t('setobjectobj.isCashSubject')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isCashSubject === 1 ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        :label="$t('setobjectobj.quantityAccount')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.quantityAccount }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        :label="$t('setobjectobj.status')"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            @change="upstate(scope.row)"
            active-color="#13ce66"
            inactive-color="#999"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-tabs type="border-card">
        <el-tab-pane label="科目">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-width="310px"
          >
            <el-row>
              <el-col :span="spans.subjectCode">
                <el-form-item
                  :label="$t('setobjectobj.subjectCode')"
                  prop="subjectCode"
                >
                  <el-input
                    v-model="temp.subjectCode"
                    @blur="judgeNum($event.target.value)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.subjectName">
                <el-form-item
                  :label="$t('setobjectobj.subjectName')"
                  prop="subjectName"
                >
                  <el-input v-model="temp.subjectName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.isDefault">
                <el-form-item
                  :label="$t('setobjectobj.balanceDirection')"
                  prop="balanceDirection"
                >
                  <el-radio-group v-model="temp.balanceDirection">
                    <el-radio :label="1">借</el-radio>
                    <el-radio :label="2">贷</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item
                  :label="$t('setobjectobj.dataType')"
                  prop="dataType"
                >
                  <el-select v-model="temp.dataType" placeholder="请选择">
                    <el-option
                      v-for="item in newlist"
                      :key="item.dataValue"
                      :label="item.dataValue"
                      :value="item.dataValue"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="辅助核算">
                  <el-checkbox
                    v-model="checkedhesuan"
                    @change="changehesuan"
                  ></el-checkbox>
                  <div v-show="box" class="box">
                    <el-checkbox-group
                      v-for="item in star"
                      :key="item.id"
                      v-model="temp.helpAccountingList"
                    >
                      <el-checkbox :label="item.id">
                        {{ item.dataValue }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="数量核算">
                  <el-checkbox v-model="checked" @change="check"></el-checkbox>
                  <div class="lala" v-show="checke">
                    <span>计量单位</span>
                    <el-input
                      class="int"
                      v-model="temp.quantityAccount"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="外币核算">
                  <el-checkbox
                    disabled
                    v-model="checkeda"
                    @change="checkedaa"
                  ></el-checkbox>
                  <div v-show="money">
                    <el-checkbox-group v-model="temp.isTransfer" disabled>
                      <el-checkbox :label="1">期末调汇</el-checkbox>
                    </el-checkbox-group>
                    <!-- <el-checkbox-group v-model="temp.foreignCurrencyIdList">
                      <el-checkbox :label="0">人民币</el-checkbox>
                    </el-checkbox-group> -->
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.currtype == 1">
              <el-col :span="spans.dataType">
                <el-form-item label="现金及现金等价物">
                  <el-checkbox
                    @change="iscash"
                    v-model="temp.isCashSubject"
                  ></el-checkbox>
                </el-form-item>
                <span class="footer el-icon-warning">
                  修改现金流量属性，可能会改变以前期间标准现金流量表，请谨慎操作！</span
                >
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{
          $t("table.cancel")
        }}</el-button>
        <!-- 创建确定 -->
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
          >{{ $t("table.confirm") }}
        </el-button>
        <!-- 编辑确定 -->
        <el-button v-else type="primary" @click="updateData">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 添加子级 -->
    <el-dialog title="添加子级" :visible.sync="part">
      <el-tabs type="border-card">
        <el-tab-pane label="科目">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-width="310px"
          >
            <el-row>
              <el-col :span="spans.subjectCode">
                <el-form-item
                  :label="$t('setobjectobj.subjectCode')"
                  prop="subjectCode"
                >
                  <el-input
                    @input="judge"
                    @blur="judgeNum($event.target.value)"
                    v-model="temp.subjectCode"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.subjectName">
                <el-form-item
                  :label="$t('setobjectobj.subjectName')"
                  prop="subjectName"
                >
                  <el-input v-model="temp.subjectName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.isDefault">
                <el-form-item
                  :label="$t('setobjectobj.balanceDirection')"
                  prop="balanceDirection"
                >
                  <el-radio-group v-model="temp.balanceDirection">
                    <el-radio :label="1">借</el-radio>
                    <el-radio :label="2">贷</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.subjectCode">
                <el-form-item label="上级科目">
                  <el-input disabled :value="subjectCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item
                  :label="$t('setobjectobj.dataType')"
                  prop="dataType"
                >
                  <el-select
                    v-model="temp.dataType"
                    disabled
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in newlist"
                      :key="item.dataValue"
                      :label="item.dataValue"
                      :value="item.dataValue"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="辅助核算">
                  <el-checkbox
                    v-model="checkedhesuan"
                    @change="changehesuan"
                  ></el-checkbox>
                  <div v-show="box" class="box">
                    <el-checkbox-group
                      v-for="item in star"
                      :key="item.id"
                      v-model="temp.helpAccountingList"
                    >
                      <el-checkbox :label="item.id">
                        {{ item.dataValue }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="数量核算">
                  <el-checkbox v-model="checked" @change="check"></el-checkbox>
                  <div class="lala" v-show="checke">
                    <span>计量单位</span>
                    <el-input
                      class="int"
                      v-model="temp.quantityAccount"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="spans.dataType">
                <el-form-item label="外币核算">
                  <el-checkbox
                    v-model="checkeda"
                    disabled
                    @change="checkedaa"
                  ></el-checkbox>
                  <div v-show="money">
                    <el-checkbox-group disabled v-model="temp.isTransfer">
                      <el-checkbox :label="1">期末调汇</el-checkbox>
                    </el-checkbox-group>
                    <!-- <el-checkbox-group v-model="temp.foreignCurrencyIdList">
                      <el-checkbox :label="0">人民币</el-checkbox>
                    </el-checkbox-group> -->
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.currtype == 1">
              <el-col :span="spans.dataType">
                <el-form-item label="现金及现金等价物">
                  <el-checkbox
                    @change="iscash"
                    v-model="this.temp.isCashSubject"
                  ></el-checkbox>
                </el-form-item>

                <span class="footer el-icon-warning">
                  修改现金流量属性，可能会改变以前期间标准现金流量表，请谨慎操作！</span
                >
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="part = false">{{ $t("table.cancel") }}</el-button>
        <!-- 添加子级确定 -->
        <el-button type="primary" @click="createDataed">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import waves from "@/components/waves"; // 水波纹指令
import {
  GetList,
  addprov,
  updateDataprov,
  deleteprov,
  upstate,
  added,
  course,
  addChild,
} from "@/api/acc/setsubject";

export default {
  name: "Subject",
  directives: {
    waves,
  },
  data() {
    return {
      json_fields: {
        编码: "subjectCode",
        名称: "subjectName",
        类别: "dataType",
        辅助核算: "helpAccounting",
        余额方向: {
          field: "balanceDirection",
          callback: (value) => {
            let str = "";
            value === 1 ? (str = "借") : (str = "贷");
            return str;
          },
        },
        数量: "quantityAccount",
        状态: {
          field: "status",
          callback: (value) => {
            let str = "";
            value === 1 ? (str = "已启用") : (str = "未启用");
            return str;
          },
        },
      },
      validmsg: "",
      valid: {
        isnumber: false,
        isstring: false,
      },
      subjectCode: "",
      part: false,
      aa: true,
      star: "",
      star1: "",
      money: "",
      checke: "",
      vale: "",
      box: false,
      checked: "",
      checkeda: "",
      checkedb: "",
      checkedc: "",
      checkedhesuan: "",
      tabs: [
        { id: 1, name: "资产" },
        { id: 2, name: "负债" },
        { id: 5, name: "共同" },
        { id: 3, name: "权益" },
        { id: 4, name: "成本" },
        { id: 6, name: "损益" },
      ],

      tabPosition: "资产",
      tableKey: 0,
      list: [],
      listLoading: true,
      multipleSelection: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      currtype: 1,
      total: 0,

      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogFormVisible: false,
      dialogStatus: "",

      rules: {
        subjectCode: [
          {
            required: true,
            message: "编码不能为空",
            trigger: "red",
            trigger: "blur",
          },
        ],
        subjectName: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "red",
            trigger: "blur",
          },
          {
            pattern: /^[A-Za-z0-9_\{\}\(\)\（\）\u4E00-\u9FA5]{1,}$/,
            message: "不能含有特殊符号",
            trigger: "blur",
          },
        ],
      },
      temp: {
        balanceDirection: 1, //现金方向(1:贷 2:借)
        dataType: "", //科目类别
        foreignCurrencyIdList: [], //外币核算id集合(不存入数据库)
        enable: 1, //是否启用
        helpAccountingList: 0, //辅助核算id集合(不存入数据库)
        isCashSubject: 0, //是否为现金科目(0:否 1:是)(仅限资产才有现金科目)
        isTransfer: 0, //是否期末调汇(0否1是)
        level: "",
        quantityAccount: "", //数量核算(计量单位)
        subjectCode: "", //科目编码
        subjectName: "", //科目名称
        subjectType: "", //资产/负债/权益/成本/损益类别
        id: "",
        helpAccounting: "",
        system: "", //会计制度
      },

      spans: {
        subjectCode: 10,
        subjectName: 10,
        subjectType: 5,
        balanceDirection: 5,
        helpAccounting: 5,
        foreignCurrency: 5,
        isCashSubject: 5,
        quantityAccount: 5,
        status: 5,
      },
      // updown: { proveId: null, value: null },

      options: [],
      newlist: [],
      value: "流动资产",
      exportList: [],
    };
  },
  created() {
    this.getListdata();
    this.temp.subjectType = this.currtype;
    added().then((response) => {
      this.star = response.data.data;
    });
  },

  methods: {
    getExportList() {
      GetList(1, this.total, this.currtype).then((res) => {
        this.exportList = res.data.data.object;
      });
    },
    iscash() {
      // console.log(this.temp.isCashSubject);
      // console.log(this.list);
    },
    judgeNum(val) {
      let flag = new RegExp("^[0-9]*$").test(val);
      if (!flag) {
        this.$message({
          type: "warning",
          message: "格式错误,正确格式为数字,不包含空格等",
          duration: 5000,
        });
      } else {
        this.valid.isnumber = true;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.getListdata();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getListdata();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getListdata();
    },
    getListType(val) {
      // console.log(this.currtype);
      this.listQuery.pageNum = 1;
      this.currtype = val;
      this.temp.subjectType = this.currtype;
      this.getListdata();
    },
    getType() {
      this.newlist = [];
      course(10).then((response) => {
        this.options = response.data.data;

        this.options.forEach((a) => {
          // console.log(this.currtype)
          if (a.parentId == this.currtype) {
            // console.log('對象', a)
            this.newlist.push(a);
          }
        });
      });
      // console.log('bb', this.newlist)
    },

    getListdata() {
      this.listLoading = true;
      GetList(
        this.listQuery.pageNum,
        this.listQuery.pageSize,
        this.currtype
      ).then((response) => {
        if (response.data.message == "成功") {
          this.list = response.data.data.object;
          this.total = response.data.data.totalCount;
          this.listLoading = false;
          this.getExportList();
        } else {
          console.log(response.data.message);
          this.listLoading = false;
          this.total = 0;
          this.list = [];
        }
      });
    },
    // resetTemp() { },
    // 添加方法
    handleCreate() {
      let temp = {
        balanceDirection: 1, //现金方向(1:贷 2:借)
        dataType: "", //科目类别
        foreignCurrencyIdList: [], //外币核算id集合(不存入数据库)
        helpAccountingList: [], //辅助核算id集合(不存入数据库)
        isCashSubject: 0, //是否为现金科目(0:否 1:是)(仅限资产才有现金科目)
        isTransfer: 0, //是否期末调汇(0否1是
        quantityAccount: "", //数量核算(计量单位)
        subjectCode: "", //科目编码
        subjectName: "", //科目名称
        subjectType: "", //资产/负债/权益/成本/损益类别
        id: "",
      };
      this.temp = temp;
      this.temp.subjectCode = "";
      this.temp.subjectName = "";
      this.temp.subjectType = this.currtype;
      this.money = false;
      this.checke = false;
      this.checkedhesuan = false;
      this.checked = false;
      this.checkeda = false;
      this.box = false;
      this.getType();
      this.dialogStatus = "create";
      if (this.dialogStatus == "create") {
        this.temp.helpAccountingList = [];
      }
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
    //创建提交
    createData() {
      this.temp.isCashSubject = this.temp.isCashSubject ? 1 : 0;
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.valid.isnumber = false;
          this.valid.isstring = false;
          addprov(this.temp).then((res) => {
            if (res.data.retCode === 200) {
              this.getListdata();
              this.dialogFormVisible = false;
              this.$message({
                title: "成功",
                message: "成功",
                type: "success",
                duration: 2000,
              });
              this.$store.dispatch("getAllList");
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "输入的格式错误",
            duration: 5000,
          });
        }
      });
    },

    //修改按钮
    handleUpdate(row) {
      this.temp.isCashSubject = this.temp.isCashSubject ? 1 : 0;
      this.getType();

      this.temp = JSON.parse(JSON.stringify(row)); // copy obj
      if (this.temp.helpAccountingList == null) {
        this.temp.helpAccountingList = 0;
        this.box = false;
        this.checkedhesuan = false;
        console.log(this.temp.helpAccountingList);
      } else if (this.temp.helpAccountingList != 0) {
        this.checkedhesuan = true;
        this.box = true;
      }

      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      if (this.temp.quantityAccount) {
        this.checked = true;
        this.checke = true;
      } else {
        this.checked = false;
        this.checke = false;
      }
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    // 编辑提交
    updateData() {
      this.temp.helpAccounting = "";
      // if (!this.checked) {
      //   this.temp.helpAccountingList = [0];
      // }
      this.judgeNum(this.temp.subjectCode);
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.valid.isnumber = false;
          this.valid.isstring = false;
          const tempData = Object.assign({}, this.temp);
          updateDataprov(tempData).then((res) => {
            this.dialogFormVisible = false;
            if (res.data.retCode === 200) {
              this.getListdata();
              this.$store.dispatch("getAllList");
              return this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
            }
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "warning",
              duration: 2000,
            });
          });
        } else {
          this.$message({
            type: "warning",
            message: "输入的格式错误",
            duration: 5000,
          });
        }
      });
    },

    // 删除按钮

    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteprov(row.id).then((ress) => {
          if (ress.data.message == "成功") {
            this.getListdata();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            this.$store.dispatch("getAllList");
          } else {
            this.$notify({
              title: "失败",
              message: ress.data.message,
              type: "warning",
              duration: 2000,
            });
          }
        });
      });
    },
    judge() {
      if (this.star1.length > this.temp.subjectCode.length) {
        this.temp.subjectCode = this.star1;
      }
      console.log("la1", this.temp.subjectCode);
    },

    // 添加子集
    handleUp(row) {
      this.temp = JSON.parse(JSON.stringify(row));
      this.part = true;
      this.getType();
      this.temp.subjectName = "";
      this.star1 = JSON.parse(JSON.stringify(this.temp.subjectCode));
      this.subjectCode = this.temp.subjectCode;
      if (this.temp.helpAccountingList == null) {
        this.temp.helpAccountingList = 0;
        this.box = false;
        this.checkedhesuan = false;
        console.log(this.temp.helpAccountingList);
      } else if (this.temp.helpAccountingList != 0) {
        this.checkedhesuan = true;
        this.box = true;
      }
      if (this.temp.quantityAccount) {
        this.checked = true;
        this.checke = true;
      } else {
        this.checked = false;
        this.checke = false;
      }

      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    // 创建子级提交
    createDataed() {
      this.judgeNum(this.temp.subjectCode);
      this.psubjectCode = this.subjectCode;
      this.temp.isCashSubject
        ? (this.temp.isCashSubject = 1)
        : (this.temp.isCashSubject = 0);
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          addChild(this.temp, this.subjectCode).then((res) => {
            console.log(res.data.retCode);
            if (res.data.retCode == 200) {
              this.getListdata();
              this.part = false;
            } else {
              this.$message({
                type: "warning",
                message: res.data.message,
                duration: 5000,
              });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "输入错误",
            duration: 5000,
          });
        }
      });
    },
    handleDown(row) {
      updownprov(row.id, "down").then(() => {
        this.getListdata();
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000,
        });
      });
    },

    upstate(row) {
      upstate(row.subjectCode).then(() => {
        this.getListdata();
        this.dialogFormVisible = false;
      });
    },
    checkedaa() {
      if (this.checkeda) {
        this.money = true;
      } else {
        this.money = false;
      }
    },
    check() {
      if (this.checked) {
        this.checke = true;
      } else {
        this.checke = false;
      }
    },
    changehesuan() {
      if (this.dialogStatus == "create") {
        this.temp.helpAccountingList = [];
      }
      if (this.checkedhesuan) {
        this.box = true;
      } else {
        this.box = false;
        this.temp.helpAccountingList = [];
      }
    },
  },
};
</script>
<style scoped>
.int input {
  width: 100px;
  height: 26px !important;
}

.lala {
  display: flex;
  width: 200px;
}

.lala span {
  width: 100px;
}

.box {
  display: flex;
}

.box label {
  margin-left: 30px !important;
}

.filter-item-right {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}

.footer {
  margin-left: 190px;
  color: #e1a762;
  font-size: 14px;
}
</style>