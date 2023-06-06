<template>
  <el-dialog
    title="派工"
    :visible.sync="dialogVisible"
    width="45%"
    :before-close="handleClose"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <div class="pg-h">
          <div class="pg-h-top">
            <span> 已选客户{{ total }}家 </span>
            <span
              v-if="isCustomShow"
              style="float: right"
              class="pointer"
              @click="isCustomShow = false"
              >收起∧</span
            >
            <span
              style="float: right"
              class="pointer"
              @click="isCustomShow = true"
              v-else
              >展开∨</span
            >
          </div>
          <div class="pg-h-main" v-show="isCustomShow">
            <table border="1">
              <tr>
                <td>客户名称</td>
                <td>纳税性质</td>
                <td>地址</td>
              </tr>
              <tbody>
                <tr v-for="item in data" :key="item.id">
                  <td>{{ item.clientName }}</td>
                  <td>{{ item.clientNo }}</td>
                  <td>{{ item.address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="pg-b">
          <div class="pg-b-top">
            <div class="pg-b-top-tool">
              <span
                v-for="(item, index) in postList"
                :key="item.id"
                @click="getOtherNumTree(item, index)"
                :class="{ selected: index === currentIndex }"
                >{{ item.postName }}</span
              >
            </div>
          </div>
          <div class="pg-b-main">
            <div class="pg-b-main-l">
              <div class="pg-b-l-top">
                <el-input
                  size="mini"
                  style="width: 200px; margin: 10px 0 0 20px"
                  ><el-button slot="append" icon="el-icon-search"></el-button
                ></el-input>
                <span class="pg-b-l-top-btn">
                  <span :class="{ selected: showNum === 0 }" @click="getDepart"
                    >部门</span
                  >
                  <span :class="{ selected: showNum === 1 }" @click="getStaff"
                    >人员</span
                  >
                </span>
              </div>
              <div class="pg-b-l-list">
                <div class="pg-b-l-list-top">
                  <span style="flex: 1">深圳皇嘉财润财务顾问股份有限公司</span>
                  <span>总客户数</span>
                  <span>今日</span>
                  <span>近七日</span>
                  <span>操作</span>
                </div>
                <div class="pg-b-l-list-main scroll" v-show="showNum === 0">
                  <div
                    v-for="item in DepartTotalList"
                    :key="item.name"
                    class="item"
                  >
                    <div class="item-hd">
                      <span style="flex: 1">
                        {{ item.name }}
                      </span>
                      <span>{{ item.sum }}</span>
                      <span>{{ item.todaySum }}</span>
                      <span>{{ item.sevenSum }}</span>
                      <span>
                        <el-button type="text" @click="insertDepart(item)"
                          >添加</el-button
                        >
                      </span>
                    </div>
                    <div class="item-con"></div>
                  </div>
                </div>
                <div class="pg-b-l-list-main scroll" v-show="showNum === 1">
                  <div
                    v-for="item in staffTotalList"
                    :key="item.name"
                    class="item"
                  >
                    <div class="item-hd">
                      <span style="flex: 1">
                        {{ item.name }}
                      </span>
                      <span>{{ item.sum }}</span>
                      <span>{{ item.todaySum }}</span>
                      <span>{{ item.sevenSum }}</span>
                      <span v-if="!item.userId">∨</span>
                      <span v-else
                        ><el-button type="text" @click="insertStaff(item)"
                          >添加</el-button
                        ></span
                      >
                    </div>
                    <div class="item-con"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pg-b-main-r">
              <div class="pg-b-r-top">
                <p v-show="showNum === 0">已选部门</p>
                <p v-show="showNum === 1">已选人员</p>
              </div>
              <div v-show="showNum === 0">
                <div
                  v-for="(item, index) in saveDepartList"
                  :key="item.id"
                  style="display: flex; line-height: 30px"
                >
                  <span style="flex: 1">{{ item.label }}</span>
                  <span
                    style="padding: 0 5px"
                    class="pointer"
                    @click="delSaveDepartList(index)"
                    >X</span
                  >
                </div>
              </div>
              <div v-show="showNum === 1">
                <div
                  v-for="(item, index) in saveStaffList"
                  :key="item.id"
                  style="display: flex; line-height: 30px"
                >
                  <span style="flex: 1">{{ item.label }}</span>
                  <span
                    style="padding: 0 5px"
                    class="pointer"
                    @click="delSaveStaffList(index)"
                    >X</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <span class="dialog-footer" style="float: right; margin: 10px 0">
          <el-button type="primary" v-if="showNum === 0" @click="saveDepart"
            >确 定</el-button
          >
          <el-button type="primary" v-else @click="saveStaff">确 定</el-button>
        </span>
      </el-tab-pane>
      <el-tab-pane label="派工查询" name="second">
        <div>
          <el-table :data="dispatchList" border size="mini" data-v-005>
            <el-table-column label="客户" prop="client" />
            <el-table-column label="服务类型" prop="service" />
            <el-table-column label="服务项目" prop="service" />
            <el-table-column label="角色" prop="role" />
            <el-table-column label="人员" prop="staff" />
            <el-table-column label="部门" prop="org" />
            <el-table-column label="操作" prop="clientName" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="updatePG(scope.row)"
                  >转派工</el-button
                >
                <el-button type="text" @click="handleDel(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      width="30%"
      title="转派工"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div style="height: 400px; overflow: auto" class="scroll">
        <el-tree
          default-expand-all
          :data="orgTree"
          :check-strictly="true"
          node-key="id"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
        ></el-tree>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="transDispatch">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { getNumTree, save, transferred, delDispatch } from "@/api/serverm";
import { orgTree } from "@/api/job";
import { getPost } from "@/api/user";
import { treeToList, staffTreeToList } from "@/utils/treeToListDepth";

export default {
  props: ["dispatchVisable", "dispatchData"],
  data() {
    return {
      innerVisible: false,
      postList: [],
      postid: 0,
      postName: "",
      total: 0,
      showNum: 1,
      currentIndex: 0,
      activeName: "first",
      dialogVisible: false,
      isCustomShow: false,
      data: "",
      saveDepartList: [],
      saveStaffList: [],
      DepartTotalList: [],
      staffTotalList: [],
      sendId: [],
      dispatchList: [],
      orgTree: [],
      transForm: {
        userid: "",
        dispatchid: "",
      },
    };
  },
  watch: {
    dispatchVisable(val) {
      this.dialogVisible = val;
    },
    dispatchData(val) {
      console.log(val);
      this.dispatchList = [];
      this.data = val;
      this.total = val.length;
      this.sendId = val.map((item) => item.id);
      val.forEach((item) => {
        this.dispatchList = this.dispatchList.concat(item.dispatchList);
      });
    },
  },
  created() {
    getPost().then((res) => {
      this.postList = res.data.data.children[0].children;
      this.postid = this.postList[0].id;
      this.postName = this.postList[0].postName;
      this.getList();
    });
    orgTree().then((res) => {
      const arr = [];
      arr.push(res.data.data);
      this.orgTree = arr;
    });
  },
  methods: {
    getList() {
      getNumTree(this.postid, this.showNum).then((res) => {
        const arr = [];
        arr.push(res.data.data);
        if (this.showNum === 0) this.DepartTotalList = treeToList(arr);
        if (this.showNum === 1) this.staffTotalList = staffTreeToList(arr);
      });
    },
    handleClose() {
      this.$emit("toggleViable", false, true, []);
      this.saveStaffList = [];
      this.saveDepartList = [];
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    updatePG(row) {
      console.log(row);
      this.transForm.dispatchid = row.id;
      this.innerVisible = true;
    },
    getOtherNumTree(item, index) {
      this.currentIndex = index;
      this.postid = item.id;
      this.postName = item.postName;
      getNumTree(item.id, this.showNum).then((res) => {
        const arr = [];
        arr.push(res.data.data);
        if (this.showNum === 0) this.DepartTotalList = treeToList(arr);
        if (this.showNum === 1) this.staffTotalList = staffTreeToList(arr);
      });
    },
    getDepart() {
      this.showNum = 0;
      getNumTree(this.postid, this.showNum).then((res) => {
        const arr = [];
        arr.push(res.data.data);
        this.DepartTotalList = treeToList(arr);
      });
    },
    getStaff() {
      this.showNum = 1;
      getNumTree(this.postid, this.showNum).then((res) => {
        const arr = [];
        arr.push(res.data.data);
        this.staffTotalList = staffTreeToList(arr);
      });
    },
    insertDepart(item) {
      let flag = 1;
      let arrItem = {
        org: item.id,
        post: this.postid,
        sendId: this.sendId,
        label: item.name,
      };
      console.log(this.saveDepartList);
      this.saveDepartList.length &&
        this.saveDepartList.forEach((item) => {
          if (item.label === arrItem.label) flag = 0;
        });
      if (flag) this.saveDepartList.push(arrItem);
    },
    delSaveDepartList(index) {
      this.saveDepartList.splice(index, 1);
    },
    insertStaff(item) {
      let flag = 1;
      let arrItem = {
        org: item.id,
        post: this.postid,
        sendId: this.sendId,
        label: item.name,
        userId: item.userId,
      };
      this.dispatchList.forEach((item) => {
        if (item.staff === arrItem.label && item.role === this.postName) {
          flag = 0;
          return this.$message.warning("该用户已派工该职位");
        }
      });
      this.saveStaffList.length &&
        this.saveStaffList.forEach((item) => {
          if (item.userId === arrItem.userId) flag = 0;
        });
      if (flag) this.saveStaffList.push(arrItem);
    },
    delSaveStaffList(index) {
      this.saveStaffList.splice(index, 1);
    },
    saveDepart() {
      const org = this.saveDepartList.map((item) => item.org);
      const obj = {
        post: this.postid,
        sendIds: this.sendId,
        orgs: org,
      };
      save(obj).then((res) => {
        if (res.data.retCode === 200) {
          this.$emit("toggleViable", false, true, []);
          this.saveStaffList = [];
          this.saveDepartList = [];
          return this.$message.success("派工成功");
        }
        return this.$message.success("派工有误");
      });
    },
    saveStaff() {
      const user = this.saveStaffList.map((item) => item.userId);
      const obj = {
        post: this.postid,
        sendIds: this.sendId,
        user,
      };
      save(obj).then((res) => {
        if (res.data.retCode === 200) {
          this.$emit("toggleViable", false, true, []);
          this.saveStaffList = [];
          this.saveDepartList = [];
          return this.$message.success("派工成功");
        }
        return this.$message.success("派工有误");
      });
    },
    handleNodeClick(data) {
      this.transForm.userid = data.id;
    },
    transDispatch() {
      transferred(this.transForm.dispatchid, this.transForm.userid).then(
        (res) => {
          if (res.data.retCode === 200) {
            this.innerVisible = false;
            return this.$message.success("转派工成功,请重开派工界面查看");
          }
          return this.$message.error(res.data.message);
        }
      );
    },
    handleDel(row) {
      delDispatch(row.id).then((res) => {
        if (res.data.retCode === 200) {
          return this.$message.success("删除成功,请重开派工界面查看");
        }
        return this.$message.error(res.data.message);
      });
    },
  },
};
</script>

<style lang='scss' scope>
td {
  padding: 5px;
}
.selected {
  color: #1fadf6 !important;
}
.el-table[data-v-005] .el-table__body-wrapper {
  min-height: 400px;
  max-height: 480px;
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
</style>