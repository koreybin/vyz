<template>
  <div class="charge" style="width: 60vw; padding: 15px">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="会计制度" name="first">
        <div class="charge-nav">
          <h2>会计制度</h2>
          <div v-for="item in systemOptions" :key="item.id">
            <div
              :class="[
                `charge-nav-title`,
                `pointer`,
                { selected: item.id == system },
              ]"
              @click="search('', item.id, 1)"
            >
              {{ item.dataValue }}
            </div>
          </div>
        </div>
        <div class="charge-main">
          <div class="main-hd">
            <el-radio-group
              class="header"
              v-model="tabPosition"
              v-for="item in tabs"
              :key="item.id"
              size="mini"
              @change="getListType(item.id, 0)"
              fill="#f78989"
              style="margin-bottom: 5px"
            >
              <el-radio-button :label="item.dataValue"></el-radio-button>
            </el-radio-group>
            <div style="float: right">
              <el-button size="mini" type="danger">恢复预置</el-button>
              <el-button size="mini" type="danger" @click="insert(0)"
                >新 增</el-button
              >
              <el-button size="mini" type="danger" @click="del(0)"
                >删除</el-button
              >
            </div>
          </div>
          <div style="margin-top: 10px">
            <el-table
              :key="tableKey"
              :data="typeTableData"
              element-loading-text="给我一点时间"
              border
              fit
              size="mini"
              highlight-current-row
              @selection-change="handleSelectionChange"
              class="tree"
            >
              <el-table-column type="selection" align="center">
              </el-table-column>

              <el-table-column
                align="center"
                min-width="20%"
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

              <el-table-column
                min-width="10%"
                align="center"
                :label="$t('setobjectobj.subjectCode')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.subjectCode }}</span>
                </template>
              </el-table-column>

              <el-table-column
                min-width="10%"
                align="center"
                :label="$t('setobjectobj.subjectName')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.subjectName }}</span>
                </template>
              </el-table-column>

              <el-table-column
                min-width="10%"
                align="center"
                :label="$t('setobjectobj.dataType')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.subjectType }}</span>
                </template>
              </el-table-column>

              <el-table-column
                min-width="10%"
                align="center"
                :label="$t('setobjectobj.balanceDirection')"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.balanceDirection == "1" ? "借" : "贷"
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="10%"
                align="center"
                :label="$t('setobjectobj.isCashSubject')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.isCashSubject === 0 ? "否" : "是" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="10%"
                align="center"
                :label="$t('setobjectobj.status')"
              >
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isDeleted"
                    @change="upstate(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#999"
                    :active-value="0"
                    :inactive-value="1"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div>
          <addSubject
            :dialogStatus="dialogStatus"
            :addDialogVisible="addDialogVisible"
            :tabType="tabType"
            :formData="formData"
            @closeAddSubject="closeAddSubject"
            :system="system"
          ></addSubject>
        </div>
      </el-tab-pane>
      <el-tab-pane label="票据类型" name="second">
        <div style="float: right">
          <el-button size="mini" type="danger">恢复预置</el-button>
          <el-button size="mini" type="danger">新 增</el-button>
        </div>
        <el-table :data="nameList">
          <el-table-column label="编码" prop="id"></el-table-column>
          <el-table-column label="单据类别" prop="parentId">
            <template slot-scope="scope">
              <span
                v-for="item1 in billList"
                :key="item1.id"
                v-show="item1.id == scope.row.parentId"
                >{{ item1.dataValue }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="单据名称" prop="dataValue"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="票据凭证模板" name="third">
        <div class="charge-nav">
          <h2>会计制度</h2>
          <div v-for="item in systemOptions" :key="item.id">
            <div class="charge-nav-title">{{ item.dataValue }}</div>
            <div>
              <ul>
                <li
                  :class="{
                    selected: taxtype == 2 && item.id == system,
                  }"
                  @click="search(2, item.id)"
                >
                  小规模纳税人
                </li>
                <li
                  :class="{
                    selected: taxtype == 1 && item.id == system,
                  }"
                  @click="search(1, item.id)"
                >
                  一般纳税人
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="charge-main">
          <div class="main-hd">
            <ul>
              <li
                v-for="(item, index) in billList"
                :key="item.id"
                :class="{ selected: liActiveClass == index }"
                @click="change(index, item.id)"
              >
                {{ item.dataValue }}
              </li>
            </ul>
            <div style="float: right">
              <el-button size="mini" type="danger">恢复预置</el-button>
              <el-button size="mini" type="danger" @click="insert(1)"
                >新 增</el-button
              >
              <el-button size="mini" type="danger">复制模板</el-button>
              <el-button size="mini" type="danger">同步凭证模板</el-button>
            </div>
          </div>
          <div style="margin-top: 10px">
            <new-table
              :tableData="tableData"
              @changeListByType="changeListByType"
              :system="system"
              :systemType="systemType"
            ></new-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="现金流量项目模板" name="fourth"
        ><div class="charge-nav">
          <h2>会计制度</h2>
          <div v-for="item in systemOptions" :key="item.id">
            <div
              :class="[
                `charge-nav-title`,
                `pointer`,
                { selected: item.id == system },
              ]"
              @click="search('', item.id, 4)"
            >
              {{ item.dataValue }}
            </div>
          </div>
        </div>
        <div class="charge-main">
          <div class="main-hd">
            <el-radio-group
              class="header"
              v-model="tabPosition"
              v-for="item in tabs"
              :key="item.id"
              size="mini"
              fill="#f78989"
              @change="getListType(item.id, 1)"
              style="margin-bottom: 5px"
            >
              <el-radio-button :label="item.dataValue"></el-radio-button>
            </el-radio-group>
            <div style="float: right">
              <el-button size="mini" type="danger">恢复预置</el-button>
            </div>
          </div>
          <div style="margin-top: 10px">
            <el-table
              :key="tableKey"
              :data="cashTableData"
              element-loading-text="给我一点时间"
              border
              size="mini"
              highlight-current-row
              class="tree"
            >
              <el-table-column label="会计科目" align="center" width="300">
                <el-table-column
                  align="center"
                  width="50"
                  :label="$t('acccountcashflowitemobj.subjectCode')"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.subjectCode }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  width="70"
                  :label="$t('acccountcashflowitemobj.subjectName')"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.subjectName }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  width="70"
                  :label="$t('acccountcashflowitemobj.subjectType')"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.subjectType }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  width="80"
                  :label="$t('acccountcashflowitemobj.balanceDirection')"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="现金流量主表项目" align="center">
                <el-table-column
                  align="center"
                  width="190"
                  :label="$t('acccountcashflowitemobj.cashInflow')"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.isCash == 1">
                      <span>现金及现金等价物</span>
                    </div>
                    <div v-else>
                      <span
                        v-for="item in majorData"
                        :key="item.id"
                        v-show="scope.row.cashInflow === item.id"
                        >{{ item.itemValue }}</span
                      >
                      <i
                        class="el-icon-date pointer"
                        @click="select(scope.row, 0)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="190"
                  :label="$t('acccountcashflowitemobj.cashOutflow')"
                >
                  <div slot-scope="scope" v-if="scope.row.isCash == 1">
                    <span> </span>
                  </div>
                  <div slot-scope="scope" v-else>
                    <span
                      v-for="item in majorData"
                      :key="item.id"
                      v-show="scope.row.cashOutflow === item.id"
                      >{{ item.itemValue }}</span
                    >
                    <i
                      class="el-icon-date pointer"
                      @click="select(scope.row, 1)"
                    ></i>
                  </div>
                </el-table-column>
              </el-table-column>
              <el-table-column label="现金流量附表项目" align="center">
                <el-table-column
                  align="center"
                  :label="$t('acccountcashflowitemobj.lender')"
                >
                  <div slot-scope="scope" v-if="scope.row.isCash == 1">
                    <span> </span>
                  </div>
                  <div slot-scope="scope" v-else>
                    <span
                      v-for="item in minorData"
                      :key="item.id"
                      v-show="scope.row.lender === item.id"
                      >{{ item.itemValue }}</span
                    >
                    <i
                      class="el-icon-date pointer"
                      @click="select(scope.row, 2)"
                    ></i>
                  </div>
                </el-table-column>

                <el-table-column
                  align="center"
                  :label="$t('acccountcashflowitemobj.debit')"
                >
                  <div slot-scope="scope" v-if="scope.row.isCash == 1">
                    <span> </span>
                  </div>
                  <div slot-scope="scope" v-else>
                    <span
                      v-for="item in minorData"
                      :key="item.id"
                      v-show="scope.row.debit === item.id"
                      >{{ item.itemValue }}</span
                    >
                    <i
                      class="el-icon-date pointer"
                      @click="select(scope.row, 3)"
                    ></i>
                  </div>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <selectFlowObj
          :selectDialogVisible="selectDialogVisible"
          @selectDialogShow="selectDialogShow"
          :selectData="selectData"
          :updateData="updateData"
          :title="selectTitle"
          :systemType="systemType"
        ></selectFlowObj>
      </el-tab-pane>
    </el-tabs>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertOne">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import newTable from "@/components/BillVoucherTemplate";
import { getSystemList } from "@/api/serverm";
import addSubject from "./components/addSubject.vue";
import selectFlowObj from "./components/selectFlowObj.vue";
import { delSubject } from "@/api/acc/setsubject";
import {
  add,
  getDefListByType,
  addTemp,
  getAllByType,
  getCFAllByType,
  getMasterTableItem,
} from "@/api/acc/BillVoucherTemplate";
export default {
  name: "IntelligentAccount",
  components: {
    newTable,
    addSubject,
    selectFlowObj,
  },
  data() {
    return {
      systemType: "outSystem",
      tableKey: 0,
      activeName: "first",
      dialogStatus: "create",
      addDialogVisible: false,
      selectDialogVisible: false,
      selectTitle: "",
      dialogVisible: false,
      formData: {
        balanceDirection: 1, //现金方向(1:贷 2:借)
        dataType: null, //科目类别
        foreignCurrencyId: null, //外币核算id集合(不存入数据库)
        enable: 1, //是否启用
        helpAccounting: "", //辅助核算id集合(不存入数据库)
        isCashSubject: 0, //是否为现金科目(0:否 1:是)(仅限资产才有现金科目)
        isTransfer: 0, //是否期末调汇(0否1是)
        level: null,
        psubjectCode: null, //父级编码
        quantityAccount: null, //数量核算(计量单位)
        subjectCode: null, //科目编码
        subjectFinalCode: null,
        subjectName: null, //科目名称
        subjectType: null, //资产/负债/权益/成本/损益类别
        id: null,
        system: null, //会计制度
        psubjectName: null,
      },
      optiondjmc: "",
      optionjsfs: "",
      optionywlx: "",
      doName: "",
      setMethod: "",
      business: "",
      taxtype: 2,
      system: 1,
      tabs: [],
      tabPosition: "资产",
      type: 13,
      tabType: 1,
      billList: [],
      nameList: [],
      liActiveClass: 0,
      systemOptions: [],
      tableData: [],
      typeTableData: [],
      cashTableData: [],
      majorData: [],
      minorData: [],
      selectData: [],
      updateData: null,
      addTemp: {
        billType: null,
        businessType: null,
        documentsName: null,
        settlementMethod: null,
        system: null,
        taxpayerType: null,
      },
      //   会计制度
      delList: [],
    };
  },
  created() {
    getSystemList().then((res) => (this.systemOptions = res.data.data));
    this.getDefListByType(this.system, this.taxtype, this.type);
    this.getAllByType(this.system, 1);
    this.getCFAllByType(this.system, 1);
    getMasterTableItem(0, 1).then((res) => (this.minorData = res.data.data));
    getMasterTableItem(1, 1).then((res) => (this.majorData = res.data.data));
    add(3).then((res) => (this.billList = res.data.data));
    add(4).then((res) => {
      this.optiondjmc = res.data.data;
      this.nameList = res.data.data;
    });
    add(1).then((res) => (this.tabs = res.data.data));
  },
  methods: {
    getCFAllByType(system, type) {
      getCFAllByType(system, type).then(
        (res) => (this.cashTableData = res.data.data)
      );
    },
    getAllByType(system, type) {
      getAllByType(system, type).then(
        (res) => (this.typeTableData = res.data.data)
      );
    },
    getListType(type, tab) {
      this.tabType = type;
      if (tab == 0) this.getAllByType(this.system, this.tabType);
      if (tab == 1) this.getCFAllByType(this.system, this.tabType);
    },
    getDefListByType(system, taxtype, type) {
      getDefListByType(system, taxtype, type).then(
        (res) => (this.tableData = res.data.data)
      );
    },
    handleClick() {
      this.system = 1;
      this.tabType = 1;
    },
    change(i, id) {
      this.liActiveClass = i;
      this.type = id;
      this.getDefListByType(this.system, this.taxtype, id);
    },
    search(i, id, activeIndex) {
      this.system = id;

      if (activeIndex == 1) {
        this.getAllByType(this.system, this.tabType);
        return;
      }
      if (activeIndex == 4) {
        this.getCFAllByType(this.system, this.tabType);
        if (id === 5) {
          getMasterTableItem(0, 3).then(
            (res) => (this.minorData = res.data.data)
          );
          getMasterTableItem(1, 3).then(
            (res) => (this.majorData = res.data.data)
          );
        } else {
          getMasterTableItem(0, id).then(
            (res) => (this.minorData = res.data.data)
          );
          getMasterTableItem(1, id).then(
            (res) => (this.majorData = res.data.data)
          );
        }

        return;
      }
      this.navLiActiveClass = i;
      this.taxtype = i;
      this.getDefListByType(id, i, this.type);
    },
    insert(type) {
      if (type === 0) {
        this.addDialogVisible = true;
        this.dialogStatus = "create";
        this.formData = {
          balanceDirection: 1, //现金方向(1:贷 2:借)
          dataType: null, //科目类别
          foreignCurrencyId: null, //外币核算id集合(不存入数据库)
          enable: 1, //是否启用
          helpAccounting: null, //辅助核算id集合(不存入数据库)
          isCashSubject: 0, //是否为现金科目(0:否 1:是)(仅限资产才有现金科目)
          isTransfer: 0, //是否期末调汇(0否1是)
          level: null,
          psubjectCode: null, //父级编码
          quantityAccount: null, //数量核算(计量单位)
          subjectCode: null, //科目编码
          subjectFinalCode: null,
          subjectName: null, //科目名称
          subjectType: null, //资产/负债/权益/成本/损益类别
          id: null,
          system: this.system, //会计制度
          psubjectName: null,
        };
      }
      if (type === 1) {
        this.dialogVisible = true;
        add(5).then((res) => (this.optionjsfs = res.data.data));
        add(6).then((res) => (this.optionywlx = res.data.data));
      }
    },
    async insertOne() {
      this.addTemp.billType = this.type;
      this.addTemp.businessType = this.business;
      this.addTemp.documentsName = this.doName;
      this.addTemp.settlementMethod = this.setMethod;
      this.addTemp.system = this.system;
      this.addTemp.taxpayerType = this.taxtype;
      const { data: res } = await addTemp(this.addTemp);
      if (res.retCode === 500) return this.$message.error("新增失败");
      this.dialogVisible = false;
      this.$message.success("新增成功");
      this.changeListByType(true);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    select(row, type) {
      this.selectDialogVisible = true;
      if (type == 0 || type == 1) {
        this.selectData = this.majorData;
        this.selectTitle = "选择现金流量主表项目";
        row.system = this.system;
        this.updateData = row;
      }
      if (type == 2 || type == 3) {
        this.selectData = this.minorData;
        this.selectTitle = "选择附表现金流量项目";
        row.system = this.system;
        this.updateData = row;
      }
      this.updateData.type = type;
    },
    handleUpdate(row) {
      this.addDialogVisible = true;
      this.dialogStatus = "update";
      this.formData.subjectCode = row.subjectCode;
      this.formData.subjectName = row.subjectName;
      this.formData.psubjectCode = row.psubjectCode;
      this.formData.psubjectName = row.psubjectName;
      this.formData.subjectType = row.subjectType;
      this.formData.id = row.id;
      this.formData.system = this.system;
    },
    handleUp(row) {
      this.addDialogVisible = true;
      this.dialogStatus = "addSec";
      this.formData.subjectCode = row.subjectCode + "01";
      this.formData.subjectName = null;
      this.formData.psubjectCode = row.subjectCode;
      this.formData.psubjectName = row.subjectName;
      this.formData.subjectType = row.subjectType;
      this.formData.system = this.system;
    },
    handleDelete(row) {
      let arr = [];
      arr.push(row.id);
      this.$confirm("是否删除选中的凭证？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data: res } = await delSubject(arr);
        if (res.retCode === 500) return this.$message.error(res.message);
        this.$message.success("删除成功");
        this.getAllByType(this.system, this.tabType);
      });
    },
    upstate(row) {},
    del(type) {
      if (type == 0) {
        this.$confirm("是否删除选中的数据？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const { data: res } = await delSubject(this.delList);
          if (res.retCode === 500) return this.$message.error(res.message);
          this.$message.success("删除成功");
          this.getAllByType(this.system, this.tabType);
        });
      }
    },
    changeListByType(bool) {
      if (bool) {
        getDefListByType(this.system, this.taxtype, this.type).then(
          (res) => (this.tableData = res.data.data)
        );
      }
    },
    handleSelectionChange(val) {
      this.delList = [];
      this.delList = val.map((item) => item.id);
    },
    closeAddSubject(bool, update) {
      this.addDialogVisible = bool;
      if (update) this.getAllByType(this.system, this.tabType);
    },
    selectDialogShow(bool, update) {
      this.selectDialogVisible = bool;
      if (update) this.getCFAllByType(this.system, this.tabType);
    },
  },
};
</script>

<style lang='scss' scoped>
/deep/ .el-tabs__item.is-active {
  color: #fff;
  background-color: #980000;
}
/deep/ .el-tabs__item.is-active:hover {
  color: #fff;
}
/deep/ .el-tabs__item:hover {
  color: #303133;
}
.selected {
  background-color: #eee;
  font-weight: 700;
}
.tree {
  overflow-y: auto;
  /deep/ .el-table__body-wrapper {
    height: 640px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }
    &::-webkit-scrollbar-track {
      border-radius: 0.625rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 0.625rem;
      background-color: #f5f5f5;
    }
  }
}
</style>