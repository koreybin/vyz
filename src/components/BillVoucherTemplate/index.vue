<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column label="单据名称" min-width="12%">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.document"
            placeholder="请选择"
            size="mini"
            @change="changeSelect(scope.$index, $event, 'djmc')"
          >
            <el-option
              v-for="item in optiondjmc"
              :key="item.id"
              :label="item.dataValue"
              :value="`${item.id},${item.dataValue}`"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="结算方式" min-width="10%">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.method"
            placeholder="请选择"
            size="mini"
            @change="changeSelect(scope.$index, $event, 'jsfs')"
          >
            <el-option
              v-for="item in optionjsfs"
              :key="item.id"
              :label="item.dataValue"
              :value="`${item.id},${item.dataValue}`"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="业务类型" min-width="10%">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.business"
            size="mini"
            @change="changeSelect(scope.$index, $event, 'ywlx')"
          >
            <el-option
              v-for="item in optionywlx"
              :key="item.id"
              :label="item.dataValue"
              :value="`${item.id},${item.dataValue}`"
            >
            </el-option>
          </el-select> </template
      ></el-table-column>
      <el-table-column label="摘要" min-width="10%"
        ><template slot-scope="scope">
          <span>
            {{ scope.row.summary }}
          </span>

          <i
            class="el-icon-edit pointer"
            @click="editSummaryShow(scope.row)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="分录" min-width="18%"
        ><template slot-scope="scope">
          <p v-for="item in scope.row.entries" :key="item.id">
            <span
              >{{ item.debitOrCredit === 1 ? "借" : "贷" }}：{{
                item.subjectName
              }}</span
            >
            <span
              v-for="item1 in optionjely"
              :key="item1.id"
              v-show="item1.id == item.sourceOfAmount"
              style="float: right"
              >{{ item1.dataValue }}</span
            >
          </p>

          <i
            class="el-icon-edit pointer"
            @click="entriesEditShow(scope.row)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="5%"
        ><template slot-scope="scope">
          <i class="el-icon-close pointer" @click="del(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="摘要修改"
      :visible.sync="summaryDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="消息内容">
          <el-input v-model="summary"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="editSumHandle">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="凭证分录"
      :visible.sync="entriesDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-table :data="entriesList" v-if="entriesList.length > 0">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="借贷方向">
          <template slot-scope="scope">
            <el-select v-model="scope.row.debitOrCredit">
              <el-option :value="1" label="借"></el-option>
              <el-option :value="2" label="贷"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="科目名称">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.subjectName"
              @change="changeSelect(scope.$index, $event, 'kmmc')"
            >
              <el-option
                v-for="item in subjectOption"
                :key="item.id"
                :value="`${item.id},${item.subjectName}`"
                :label="item.subjectName"
              ></el-option>
            </el-select>
            <i
              class="el-icon-folder-opened pointer subject"
              @click="subjectTreeShow(scope.$index)"
            ></i>
          </template>
        </el-table-column>

        <el-table-column label="金额来源">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="18">
                <el-select
                  v-model="scope.row.amount"
                  @change="changeSelect(scope.$index, $event, 'jely')"
                >
                  <el-option
                    v-for="item in optionjely"
                    :key="item.id"
                    :label="item.dataValue"
                    :value="`${item.id},${item.dataValue}`"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :offset="2" :span="4" style="margin: 5px">
                <i class="el-icon-plus pointer" @click="addEntItem"></i>
                <i
                  v-if="scope.$index !== 0"
                  class="el-icon-minus pointer"
                  @click="delEntItem(scope.$index)"
                ></i>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="entriesList" v-else>
        <el-table-column label="借贷方向">
          <template slot-scope="scope">
            <el-select v-model="scope.row.debitOrCredit">
              <el-option :value="1" label="借"></el-option>
              <el-option :value="2" label="贷"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="科目名称">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.subjectId"
              @change="changeSelect(scope.$index, $event, 'kmmc')"
            >
              <el-option
                v-for="item in subjectOption"
                :key="item.id"
                :value="`${item.id},${item.subjectName}`"
                :label="item.subjectName"
              ></el-option>
            </el-select>
            <i
              class="el-icon-folder-opened pointer subject"
              @click="subjectTreeShow(scope.$index)"
            ></i>
          </template>
        </el-table-column>

        <el-table-column label="金额来源">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.amount"
              @change="changeSelect(scope.$index, $event, 'jely')"
            >
              <el-option
                v-for="item in optionjely"
                :key="item.id"
                :label="item.dataValue"
                :value="`${item.id},${item.dataValue}`"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="editEntHandle">保 存</el-button>
      </span>
      <div v-if="subjectTreeVisible" class="tree">
        <el-radio-group
          class="header"
          v-model="tabPosition"
          v-for="item in tabs"
          :key="item.id"
          size="mini"
          @change="getListType(item.id)"
          style="margin-bottom: 5px"
        >
          <el-radio-button :label="item.dataValue"></el-radio-button>
        </el-radio-group>

        <div class="gd tree-item">
          <el-tree
            :data="list"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :default-expand-all="true"
            v-loading="loading"
            node-key="id"
          ></el-tree>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
          style="position: fixed; z-index: 99; bottom: 380px"
        >
          <el-button @click="subjectTreeVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubHandle">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  add,
  GetList,
  editSummary,
  saveTempEntries,
  getSubjectTree,
  getSubjectAll,
  updateTemp,
} from "@/api/acc/BillVoucherTemplate";
import {
  editInSummary,
  saveInTempEntries,
  upIndateTemp,
} from "@/api/acc/BillTemplateInSystem";
export default {
  props: ["tableData", "system", "systemType"],
  data() {
    return {
      systemTypes: "",
      optiondjmc: null,
      optionjsfs: null,
      optionywlx: null,
      optionjely: null,
      subjectOption: null,
      summaryDialogVisible: false,
      entriesDialogVisible: false,
      subjectTreeVisible: false,
      summary: "",
      sumId: "",
      value: "",
      entriesList: [
        {
          billId: "",
          debitOrCredit: "",
          id: "",
          sourceOfAmount: "",
          subjectId: "",
          subjectName: "",
          amount: "",
        },
      ],
      currtype: 1,
      tabs: [],
      tabPosition: "资产",
      list: [],
      data: "",
      loading: true,
      treeIndex: "",
      defaultProps: {
        label: "subjectName", // 作为对应节点的名字显示
        children: "children", // 指定子树为节点对象的某个属性值
      },
    };
  },
  watch: {
    tableData: {
      handler(val) {},
      immediate: true,
    },
    systemType: {
      handler(val) {
        this.systemTypes = val;
        console.log(this.systemTypes);
      },
      immediate: true,
    },
  },
  created() {
    add(4).then((res) => (this.optiondjmc = res.data.data));
    add(5).then((res) => (this.optionjsfs = res.data.data));
    add(6).then((res) => (this.optionywlx = res.data.data));
    add(9).then((res) => (this.optionjely = res.data.data));
    add(1).then((res) => (this.tabs = res.data.data));
  },
  methods: {
    addEntItem() {
      this.entriesList.push({
        billId: this.entId,
        debitOrCredit: "",
        id: "",
        sourceOfAmount: "",
        subjectId: "",
        subjectName: "",
        amount: "",
      });
    },
    delEntItem(index) {
      this.entriesList.splice(index, 1);
    },
    changeSelect(index, e, type) {
      let [id, val] = e.split(",");

      const list = this.tableData.map((item) => {
        return {
          documentsName: item.documentsName,
          businessType: item.businessType,
          id: item.id,
          settlementMethod: item.settlementMethod,
        };
      });
      if (type == "djmc") {
        list[index].document = val;
        list[index].documentsName = id;
        if (this.systemTypes == "outSystem") updateTemp(list[index]).then();
        if (this.systemTypes == "inSystem") upIndateTemp(list[index]).then();
      }
      if (type == "jsfs") {
        list[index].method = val;
        list[index].settlementMethod = id;
        if (this.systemTypes == "outSystem") updateTemp(list[index]).then();
        if (this.systemTypes == "inSystem") upIndateTemp(list[index]).then();
      }
      if (type == "ywlx") {
        list[index].business = val;
        list[index].businessType = id;
        if (this.systemTypes == "outSystem") updateTemp(list[index]).then();
        if (this.systemTypes == "inSystem") upIndateTemp(list[index]).then();
      }
      if (type == "kmmc") {
        this.entriesList[index].subjectName = val;
        this.entriesList[index].subjectId = id;
      }
      if (type == "jely") {
        this.entriesList[index].amount = val;
        this.entriesList[index].sourceOfAmount = id;
      }
    },
    getListType(val) {
      this.loading = true;
      this.currtype = val;
      this.getListdata().then(() => {
        this.loading = false;
      });
    },
    getListdata() {
      if (this.systemTypes === "outSystem") {
        getSubjectTree(this.system, this.currtype).then((response) => {
          this.list = response.data.data;
          this.loading = false;
        });
      }
      if (this.systemTypes === "inSystem") {
        GetList(this.currtype).then((response) => {
          this.list = response.data.data;
          this.loading = false;
        });
      }
    },
    del(row) {
      console.log(this.tableData);
    },
    editSummaryShow(row) {
      this.sumId = row.id;
      this.summary = row.summary;
      this.summaryDialogVisible = true;
    },
    entriesEditShow(row) {
      this.entId = row.id;
      row.entries == null || row.entries.length === 0
        ? (this.entriesList = [
            {
              billId: "",
              debitOrCredit: "",
              id: "",
              sourceOfAmount: "",
              subjectId: "",
              subjectName: "",
              amount: "",
            },
          ])
        : (this.entriesList = row.entries);
      this.entriesList.forEach((item) => (item.billId = row.id));
      console.log(this.entriesList);
      this.entriesDialogVisible = true;
      getSubjectAll(this.system).then(
        (res) => (this.subjectOption = res.data.data)
      );
    },
    subjectTreeShow(index) {
      this.subjectTreeVisible = !this.subjectTreeVisible;
      this.treeIndex = index;
      this.getListdata();
    },
    editSumHandle() {
      if (this.systemTypes == "outSystem") {
        editSummary(this.sumId, this.summary).then((res) => {
          if (res.data.data === 500) return this.$message.error("修改失败");
          this.summaryDialogVisible = false;
          this.$emit("changeListByType", true);
          this.$message.success("修改成功");
        });
      }
      if (this.systemTypes == "inSystem") {
        editInSummary(this.sumId, this.summary).then((res) => {
          if (res.data.data === 500) return this.$message.error("修改失败");
          this.summaryDialogVisible = false;
          this.$emit("changeListByType", true);
          this.$message.success("修改成功");
        });
      }
    },
    editEntHandle() {
      if (this.systemTypes == "outSystem") {
        saveTempEntries(this.entriesList).then((res) => {
          if (res.data.data === 500) return this.$message.error("修改失败");
          this.entriesDialogVisible = false;
          this.$emit("changeListByType", true);
          return this.$message.success("修改成功");
        });
      }
      if (this.systemTypes == "inSystem") {
        saveInTempEntries(this.entriesList).then((res) => {
          if (res.data.data === 500) return this.$message.error("修改失败");
          this.entriesDialogVisible = false;
          this.$emit("changeListByType", true);
          return this.$message.success("修改成功");
        });
      }
    },
    editSubHandle() {
      let index = this.treeIndex;
      this.entriesList[index].subjectId = this.data.id;
      this.entriesList[index].subjectName = this.data.subjectName;
      this.subjectTreeVisible = false;
    },
    handleClose() {
      this.summaryDialogVisible = false;
      this.entriesDialogVisible = false;
      this.subjectTreeVisible = false;
    },
    handleNodeClick(data) {
      if (data.children == null) {
        this.disabled = false;
        this.data = data;
      } else {
        this.disabled = true;
        this.$message.warning("科目不能选择费明细科目");
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.subject {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 99;
}
/deep/ .el-select .el-input .el-select__caret.el-input__icon::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tree {
  width: 400px;
  height: 420px;
  padding: 20px;
  padding-bottom: 50px;
  position: absolute;
  background: #fff;
  z-index: 99;
  top: 0;
  right: -200px;
  &-item {
    height: 280px;
    overflow: auto;
  }
  &-item::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &-item::-webkit-scrollbar-track {
    border-radius: 0.625rem;
  }
  &-item::-webkit-scrollbar-thumb {
    border-radius: 0.625rem;
    background-color: #f5f5f5;
  }
}
</style>