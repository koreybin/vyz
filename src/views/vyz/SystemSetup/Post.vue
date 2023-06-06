<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select
        clearable
        style="width: 250px"
        class="filter-item"
        v-model="listQuery.source"
        :placeholder="$t('jobobj.post')"
      >
        <el-option
          v-for="item in sourceOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        >
        </el-option>
      </el-select>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 300px"
        class="filter-item"
        :placeholder="$t('jobobj.searchflag')"
        v-model="listQuery.post"
      >
      </el-input>
      <!-- 搜索按钮 -->
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>
      <!-- 添加按钮 -->
      <div class="filter-item-right">
        <el-button
          style="margin-left: 10px"
          @click="handleCreate"
          type="primary"
          icon="el-icon-edit"
          >{{ $t("table.add") }}
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="180px" :label="$t('jobobj.post')">
        <template slot-scope="scope">
          <span class="pointer" @click="handleUpdate(scope.row)">{{
            scope.row.post
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" :label="$t('jobobj.service')">
        <template slot-scope="scope">
          <span>{{ scope.row.service }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="500px"
        align="center"
        :label="$t('jobobj.postDesc')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.postDesc }}</span>
        </template>
      </el-table-column>
      <!-- 成员 -->
      <el-table-column
        width="680px"
        align="center"
        label="成员列表"
        :show-overflow-tooltip="true"
        prop="member"
      >
        <template slot-scope="scope">
          <div
            class="pointer"
            style="min-height: 23px"
            @click="showList(scope.row)"
          >
            <span v-for="item in scope.row.member" :key="item.id">
              {{ item.userName }}、
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="140"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
            >{{ $t("table.edit") }}</el-button
          >
          <!-- s删除按钮 -->
          <el-button
            v-if="scope.row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >{{ $t("table.delete") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :rules="rules" ref="dataForm" :model="temp" label-width="110px">
        <el-row>
          <el-col :span="spans.post">
            <el-form-item :label="$t('jobobj.post')" prop="post">
              <el-input v-model="temp.post"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="spans.service">
            <el-form-item :label="$t('jobobj.service')" prop="service">
              <el-radio-group v-model="temp.service">
                <el-radio :label="0">工商服务</el-radio>
                <el-radio :label="1">代账服务</el-radio>
                <el-radio :label="2">其他服务</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="spans.postDesc">
            <el-form-item :label="$t('jobobj.postDesc')">
              <el-input type="textarea" v-model="temp.postDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="岗位成员">
            <el-row>
              <el-button @click="addStaffList">选择岗位成员</el-button>
            </el-row>
            <div style="height: 150px; border: 1px solid #999">
              <el-tag
                v-for="tag in tagList"
                :key="tag.userName"
                closable
                @close="closeHandle(tag)"
              >
                {{ tag.userName }}
              </el-tag>
            </div>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button @click="dialogFormVisible = false">{{
          $t("table.cancel")
        }}</el-button>
        <!-- 确定按钮 -->
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
          >{{ $t("table.confirm") }}
        </el-button>
        <!-- 确定按钮 -->
        <el-button v-else type="primary" @click="updatePost">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <staffList
      @toggleViable="toggleViable"
      @getStaffList="getStaffList"
      :staffListVisible="staffListVisible"
      :postObj="postObj"
      :treeData="treeData"
    />
  </div>
</template>

<script>
import { fetchList, addJob, deleteJob, updateJob, orgTree } from "@/api/job";
import staffList from "./components/staffList.vue";

import waves from "@/components/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import Template from "../../acc/Setup/Template.vue";

const sourceOptions = [
  { key: "岗位名称", display_name: "岗位名称" },
  { key: "岗位描述", display_name: "岗位描述" },
];

//arr to obj ,such as { CN : "China", US : "USA" }

const calendarTypeKeyValue = sourceOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  components: { Template, staffList },
  name: "Post",
  directives: {
    waves,
  },
  data() {
    return {
      tagList: [],
      treeData: "",
      postObj: "",
      staffListVisible: false,
      data: null,
      parentid: 0,
      orgid: 17,
      dialogFormVisible: false,
      dialogStatus: "",
      prop: "",
      no: false,
      outerVisible: false,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      sourceOptions,
      showReviewer: false,
      spans: {
        id: 24,
        postDesc: 8,
        post: 8,
      },

      temp: {
        postId: "",
        post: "",
        postDesc: "",
        service: 0,
      },

      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑岗位",
        create: "新增岗位",
      },
      rules: {
        post: [
          { required: true, message: "this value is post", trigger: "blur" },
        ],
      },
      downloadLoading: false,
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.data.object;
        this.total = response.data.data.totalCount;
        // console.log(this.list);
        this.listLoading = false;
      });
    },

    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success",
      });
      row.status = status;
    },
    resetTemp() {
      this.temp = {
        postid: undefined,
        postDesc: "",
        post: "",
        service: 0,
      };
    },
    async handleCreate() {
      this.tagList = [];
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      const { data: res } = await orgTree("");
      let dataArray = [];
      dataArray.push(res.data);
      const data = JSON.parse(JSON.stringify(dataArray));
      this.treeData = data;
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          addJob({ ...this.temp, member: this.tagList }).then((res) => {
            if (res.data.message == "成功") {
              this.getList();
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000,
              });
            }
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.tagList = row.member.map((item) => {
        return {
          id: item.id,
          userName: item.userName,
          checked: item.checked,
        };
      });
      if (row.service == "工商服务") {
        this.temp.service = 0;
      } else {
        this.temp.service = 1;
      }
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
        console.log(row);
      });
    },
    updatePost() {
      console.log("1");
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.postId = tempData.id;
          updateJob({
            post: tempData.post,
            postDesc: tempData.postDesc,
            postId: tempData.id,
            service: tempData.serviceId,
            member: this.tagList,
          }).then((res) => {
            if (res.data.message == "成功") {
              this.getList();
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
            } else {
              this.$notify({
                title: "失败",
                message: "更新失败",
                type: "success",
                duration: 2000,
              });
            }
          });
        }
      });
    },
    handleDelete(row) {
      if (row.member.length)
        return this.$notify({
          title: "不能删除",
          message: "成员列表有数据，不能删除",
          type: "danger",
          duration: 2000,
        });
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteJob(row.id).then((ress) => {
            if (ress.data.message == "成功") {
              this.getList();
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000,
              });
            } else {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "success",
                duration: 2000,
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    async showList(row) {
      this.postObj = row;
      const { data } = await orgTree(row.id);
      this.treeData = data.data;
      this.staffListVisible = true;
    },
    async addStaffList() {
      this.postObj = null;
      const { data } = await orgTree();
      this.treeData = data.data;
      this.staffListVisible = true;
    },
    toggleViable(bool, update) {
      this.staffListVisible = bool;
      if (update) this.getList();
    },
    getStaffList(list) {
      this.tagList = list;
    },
    closeHandle(val) {
      this.tagList = this.tagList.filter((item) => item.id !== val.id);
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style scoped>
.pople {
  margin-left: 300px;
}
.personnel {
  display: flex;
  border: 1px solid #ccc;
  box-shadow: #ccc 1px 1px 1px 1px;
}

.personnel-b {
  width: 963px;
  height: 400px;
}

.personnel-a {
  width: 35%;
  height: 400px;
  border-right: 1px solid #ccc;
}
.btn {
  width: 120px;
  height: 30px;
  font-size: 16px;
  margin-top: 10px;
  color: #409eff;
  cursor: pointer;
}
.btn:hover {
  color: #a9d3fc;
}
.sp {
  font-size: 16px;
  font-weight: 700;
  width: 963px;
  height: 30px;
  line-height: 23px;
  border-bottom: 1px solid #ccc;
  margin-top: 10px;
  color: #606266;
  text-indent: 10px;
}
.pp {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.pp > div {
  margin: 10px 10px 10px 10px;
}
.gd {
  overflow: auto;
  width: 100%;
  height: 400px;
}
.ql-editor {
  height: 600px;
}
</style>
