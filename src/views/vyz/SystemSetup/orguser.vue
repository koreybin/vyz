<template>
  <div class="section">
    <el-row>
      <el-col :span="14">
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 300px"
          class="filter-item"
          :placeholder="$t('userobj.searchflag')"
          v-model="listQuery.search"
          size="mini"
        >
        </el-input>

        <el-button
          class="filter-item"
          type="primary"
          size="mini"
          @click="handleFilter"
        >
          {{ $t("table.search") }}
        </el-button>
      </el-col>

      <el-col :span="8" :offset="2">
        <div class="filter-item-right">
          <el-button
            style="margin-left: 10px"
            @click="updatedempfun"
            type="primary"
            size="mini"
            >{{ $t("orguserobj.updatedemp") }}
          </el-button>
          <el-button
            style="margin-left: 10px"
            @click="updateworkfun"
            type="primary"
            size="mini"
            >{{ $t("orguserobj.updatework") }}
          </el-button>
          <el-button
            style="margin-left: 10px"
            @click="handleDelete"
            type="primary"
            size="mini"
            >{{ $t("table.delete") }}
          </el-button>
          <el-button
            style="margin-left: 10px"
            @click="handleCreate"
            type="primary"
            size="mini"
            >{{ $t("table.add") }}
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
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
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column width="100px" :label="$t('userobj.id')">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          align="center"
          :label="$t('userobj.userName')"
        >
          <template slot-scope="scope">
            <a @click.prevent="edit(scope.row)">{{ scope.row.userName }}</a>
          </template>
        </el-table-column>

        <el-table-column width="180px" :label="$t('userobj.organization')">
          <template slot-scope="scope">
            <span>{{ scope.row.organization }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" :label="$t('userobj.phone')">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="300px"
          align="center"
          :label="$t('userobj.post')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.post }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          :label="$t('table.actions')"
          width="150"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(scope.row)"
              >{{ $t("userobj.authorization") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <el-row>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[5, 10]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-row>
    <addStaff
      :addVisable="dialogFormVisible"
      :title="title"
      @toggleViable="toggleViable"
      @updateList="updateList"
      :postList="postList"
      :departList="departList"
      :formData="formData"
    ></addStaff>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible2"
      width="30%"
    >
      <el-select
        v-if="dialogStatus == 'updem'"
        v-model="departId"
        prop="organizationId"
        class="classmarg"
        @change="changeSelect($event)"
      >
        <el-option
          v-for="item in departList"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        ></el-option>
      </el-select>
      <div v-if="dialogStatus == 'upwork'">
        <el-row v-for="item in postList.children" :key="item.id">
          <el-col :span="3">{{ item.postName }}</el-col>
          <el-col :span="21" v-if="item.postName">
            <el-checkbox-group v-model="postId">
              <el-checkbox
                v-for="cItem in item.children"
                :key="cItem.id"
                :label="cItem.id"
                >{{ cItem.postName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
          <el-col :span="21" v-else :offset="3">
            <el-checkbox-group v-model="postId">
              <el-checkbox
                v-for="cItem in item.children"
                :key="cItem.id"
                :label="cItem.id"
                >{{ cItem.postName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{
          $t("table.cancel")
        }}</el-button>
        <el-button
          type="primary"
          v-if="dialogStatus == 'updem'"
          @click="updateuserorg"
          >{{ $t("table.confirm") }}</el-button
        >
        <el-button
          type="primary"
          v-if="dialogStatus == 'upwork'"
          @click="updateuserwork"
          >{{ $t("table.confirm") }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getlistuserByorgid,
  changeDept,
  changePost,
  getPost,
  deleteUser,
} from "@/api/user";
import sel_mou_treejob from "./sel_mou_treejob.vue";
import selectoneorgtree from "./selectoneorgtree.vue";
import addStaff from "./components/addStaff.vue";

const sourceOptions = [
  { key: "phone", display_name: "手机号码" },
  { key: "userName", display_name: "用户名称" },
  { key: "resign", display_name: "用户状态" },
];

//arr to obj ,such as { CN : "China", US : "USA" }

const calendarTypeKeyValue = sourceOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  components: { sel_mou_treejob, selectoneorgtree, addStaff },
  name: "orguser",
  props: ["orgid", "departList"],
  watch: {
    orgid(val, oldVal) {
      this.listQuery.orgId = val;
      if (val == 0) {
        this.listQuery.orgId = 17;
      }
      this.getListuser();
    },
  },
  data() {
    return {
      title: "",
      radio: 0,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        orgId: this.orgid,
        pageNum: 1,
        pageSize: 10,
        search: "",
      },
      sourceOptions,
      showReviewer: false,
      spans: {
        userName: 12,
        phone: 12,
        password: 12,
        gender: 12,
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增职员",
        updem: "转部门",
        upwork: "调整岗位",
      },
      rules: {
        post: [
          { required: true, message: "this value is post", trigger: "blur" },
        ],
      },
      downloadLoading: false,
      multipleSelection: [],
      postList: "",
      formData: "",
      departId: "",
      postId: [],
    };
  },

  created() {
    this.getListuser();
    getPost().then((res) => {
      this.postList = res.data.data;
    });
  },
  methods: {
    getListuser() {
      this.listLoading = true;
      getlistuserByorgid(this.listQuery).then((response) => {
        if (response.data.data) {
          this.list = response.data.data.object;
          this.total = response.data.data.totalCount;
        } else {
          this.list = [];
          this.total = 0;
        }
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getListuser();
    },

    handleCreate() {
      this.title = "新增职员";
      this.dialogFormVisible = true;
      this.formData = {
        userName: "",
        phone: "",
        gender: "",
        organizationId: "",
        organization: "",
        postId: [],
        id: "",
      };
    },
    toggleViable(bool, update) {
      this.dialogFormVisible = bool;
      if (update) this.getListuser();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getListuser();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getListuser();
    },
    updateDataorg() {
      console.log("updateorg");
    },
    updatedempfun() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "最少选择一个用户才可以转移部门",
          type: "warning",
        });
      } else {
        this.dialogStatus = "updem";
        this.dialogFormVisible2 = true;
      }
    },
    updateworkfun() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "最少选择一个用户才可以调整岗位",
          type: "warning",
        });
      } else {
        this.dialogStatus = "upwork";
        this.dialogFormVisible2 = true;
      }
    },
    updateuserorg() {
      var userId = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        userId.push(this.multipleSelection[i].id);
      }
      const newobj = { id: this.departId, userId };
      const tempData = Object.assign({}, newobj);
      changeDept(tempData).then((res) => {
        if (res.data.message == "成功") {
          this.getListuser();
          this.dialogFormVisible2 = false;
          this.$notify({
            title: "调整成功",
            message: "调整成功",
            type: "success",
            duration: 2000,
          });
        } else {
          this.$notify({
            title: "调整失败",
            message: res.data.message,
            type: "error",
            duration: 2000,
          });
        }
      });
    },
    updateuserwork() {
      var userId = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        userId.push(this.multipleSelection[i].id);
      }
      const newobj = { id: this.postId.join(","), userId };
      const tempData = Object.assign({}, newobj);
      changePost(tempData).then((res) => {
        console.log(res.data.message);
        if (res.data.message == "成功") {
          this.getListuser();
          this.dialogFormVisible2 = false;
          this.$notify({
            title: "调整成功",
            message: "调整成功",
            type: "success",
            duration: 2000,
          });
        } else {
          this.$notify({
            title: "调整失败",
            message: res.data.message,
            type: "error",
            duration: 2000,
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    updateList() {
      this.getListuser();
    },
    edit(row) {
      this.title = "编辑职员";
      this.formData = row;
      this.dialogFormVisible = true;
    },
    handleDelete() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "最少选择一个用户才可以删除",
          type: "warning",
        });
      } else {
        this.$confirm("此操作将删除选中员工, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let phone = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
              phone.push(this.multipleSelection[i].phone);
            }
            deleteUser(phone).then((res) => {
              console.log(res);
              if (res.data.retCode !== 200)
                return this.$message.error("删除失败");
              this.getListuser();
              return this.$message.success("删除成功");
            });
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style scoped>
.section {
  margin-left: 30px;
}
.el-row {
  display: flex;
  margin-bottom: 20px;
}
.filter-item-right {
  display: flex;
}
.pagination-container {
  margin-top: 10px;
  margin-right: 250px;
}
</style>
