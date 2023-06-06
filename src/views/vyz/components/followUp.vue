<template>
  <el-dialog
    title="跟进记录"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <div class="follow-top">
      <el-form ref="form" :model="recordForm" label-width="80px">
        <el-form-item label="客户名称">
          <p>{{ data.clientName }}</p>
        </el-form-item>
        <el-form-item label="跟进类型">
          <el-select
            v-model="recordForm.recordType"
            placeholder="请选择"
            @change="typeChange"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.dataValue"
              :value="`${item.id},${item.dataValue}`"
            >
              <span style="float: left">{{ item.dataValue }}</span>
              <span
                style="float: right"
                v-if="!item.isDefault"
                @click.stop="editType(item)"
                ><i class="el-icon-edit"></i
              ></span>
              <span
                style="float: right"
                v-if="!item.isDefault"
                @click.stop="delType(item.id)"
                ><i class="el-icon-close"></i
              ></span>
            </el-option>
            <el-option :value="null">
              <span @click.stop="insertType">
                新增 <i class="el-icon-plus"></i>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进记录">
          <el-input type="textarea" v-model="recordForm.record"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <input type="file" />
        </el-form-item>
      </el-form>
    </div>
    <div style="margin: 10px 0; overflow: hidden">
      <span class="dialog-footer" style="float: left">
        <el-input size="mini" v-model="search">
          <el-button
            slot="append"
            size="mini"
            icon="el-icon-search"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </span>
      <span class="dialog-footer" style="float: right">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addRecordHandle" size="mini"
          >确 定</el-button
        >
      </span>
    </div>

    <div class="follow-table">
      <el-table :data="followList" size="mini" border>
        <el-table-column prop="createTimes" label="跟进日期"></el-table-column>
        <el-table-column prop="record" label="跟进记录"></el-table-column>
        <el-table-column prop="recordUser" label="跟进人"></el-table-column>
        <el-table-column prop="recordType" label="跟进类型"></el-table-column>
        <el-table-column prop="recordType" label="服务类型">
          <template slot-scope="scope">
            <p v-if="scope.row.serviceType === 1">代账服务</p>
            <p v-if="scope.row.serviceType === 0">工商服务</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.isTop === 1"
              @click="cancelTopHandle(scope.row)"
              >取消</el-button
            >
            <el-button type="text" v-else @click="topRecordHandle(scope.row)"
              >置顶</el-button
            >
            <el-button type="text" @click="delRecordHandle(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      append-to-body
      :title="textMap[dialogStatus]"
      width="30%"
      :visible.sync="handleVisible"
      :before-close="typeVisibleClose"
    >
      <div v-if="dialogStatus === 'update'">
        <el-input v-model="editText"></el-input>
      </div>
      <div v-if="dialogStatus === 'create'">
        <el-input v-model="insertText"></el-input>
      </div>
      <div v-if="dialogStatus === 'delete'">
        <p>确定删除吗</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editHandle"
          v-if="dialogStatus === 'update'"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="insertHandle"
          v-if="dialogStatus === 'create'"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="delHandle"
          v-if="dialogStatus === 'delete'"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-dialog>
</template>



<script>
import {
  getlistPartData,
  parameterAdd,
  parameterDel,
  parameterModify,
} from "@/api/syspar";
import {
  getFollowList,
  addRecord,
  delRecord,
  topRecord,
  cancelTopRecord,
} from "@/api/serverm";
export default {
  props: ["followupVisable", "followData", "followLists"],
  data() {
    return {
      typeList: [],
      dialogVisible: false,
      handleVisible: false,
      editText: "",
      insertText: "",
      data: "",
      deleteId: "",
      editId: "",
      recordForm: {
        clientId: "",
        record: "",
        recordType: "",
        recordTypeId: "",
        serviceType: 1,
      },
      textMap: {
        update: "编辑",
        create: "新增",
        delete: "删除",
      },
      dialogStatus: "",
      followList: [],
      search: "",
    };
  },
  created() {
    this.getTypeList();
  },
  watch: {
    followupVisable(val) {
      this.dialogVisible = val;
    },
    followData(val) {
      this.data = val;
      this.recordForm.clientId = val.id;
    },
    followLists(val) {
      this.followList = val;
    },
  },
  methods: {
    getTableList(search) {
      getFollowList(this.recordForm.clientId, search).then((res) => {
        this.followList = res.data.data;
      });
    },
    getTypeList() {
      getlistPartData(11).then((res) => {
        this.typeList = res.data.data;
      });
    },
    typeChange(val) {
      let [id, value] = val.split(",");
      this.recordForm.recordType = value;
      this.recordForm.recordTypeId = id;
    },
    handleClose() {
      this.$emit("toggleViable", false);
    },
    typeVisibleClose() {
      this.handleVisible = false;
    },
    insertType() {
      this.dialogStatus = "create";
      this.handleVisible = true;
    },
    editType(item) {
      this.dialogStatus = "update";
      this.handleVisible = true;
      this.editText = item.dataValue;
      this.editId = item.id;
    },
    delType(id) {
      this.deleteId = id;
      this.dialogStatus = "delete";
      this.handleVisible = true;
    },
    insertHandle() {
      parameterAdd({
        dataType: 11,
        dataValue: this.insertText,
        isDefault: 0,
      }).then((res) => {
        if (res.data.retCode === 200) {
          this.getTypeList();
          this.handleVisible = false;
          return this.$message.success("新增成功");
        }
      });
    },
    delHandle() {
      parameterDel(this.deleteId).then((res) => {
        if (res.data.retCode === 200) {
          this.getTypeList();
          this.handleVisible = false;
          return this.$message.success("删除成功");
        }
      });
    },
    editHandle() {
      parameterModify({
        dataType: 11,
        dataValue: this.editText,
        isDefault: 0,
        id: this.editId,
      }).then((res) => {
        if (res.data.retCode === 200) {
          this.getTypeList();
          this.handleVisible = false;
          return this.$message.success("修改成功");
        }
      });
    },
    addRecordHandle() {
      addRecord(this.recordForm).then((res) => {
        if (res.data.retCode === 200) {
          this.recordForm.recordType = "";
          this.recordForm.recordTypeId = "";
          this.recordForm.record = "";
          this.getTableList(null);
          return this.$message.success("添加成功");
        }
      });
    },
    handleSearch() {
      this.getTableList(this.search);
    },
    delRecordHandle(row) {
      delRecord(row.id).then((res) => {
        if (res.data.retCode === 200) {
          this.getTableList(null);
          return this.$message.success("删除成功");
        }
      });
    },
    topRecordHandle(row) {
      topRecord(row.id).then((res) => {
        if (res.data.retCode === 200) {
          this.getTableList(null);
          return this.$message.success("置顶成功");
        }
      });
    },
    cancelTopHandle(row) {
      cancelTopRecord(row.id).then((res) => {
        if (res.data.retCode === 200) {
          this.getTableList(null);
          return this.$message.success("取消成功");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.follow-top {
  padding: 10px;
  background-color: #f5f5f5;
}
</style>