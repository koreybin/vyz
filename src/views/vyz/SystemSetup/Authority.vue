<template>
  <el-container class="jurisdiction">
    <el-header class="el-header" style="margin-bottom: 10px">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">职员权限</el-menu-item>
        <el-menu-item index="2">岗位权限 </el-menu-item>
      </el-menu>
    </el-header>

    <el-container>
      <el-aside
        class="scroll"
        width="380px"
        style="height: calc(100vh - 160px)"
      >
        <div v-if="type == '1'">
          <el-tree
            :data="data"
            ref="tree"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
            @node-click="showAuthority"
          >
          </el-tree>
        </div>
        <div v-else>
          <el-tree
            :data="data1"
            ref="tree1"
            node-key="id"
            default-expand-all
            :expand-on-click-node="true"
            :render-content="renderContent1"
          >
          </el-tree>
        </div>
      </el-aside>

      <el-main class="quan scroll">
        <div v-if="type == '1'">
          <el-form ref="dataForm1">
            <oneusercheckdit
              :userid="userid"
              ref="oneuser"
              :key="userid"
            ></oneusercheckdit>
          </el-form>
        </div>

        <div v-else>
          <el-form ref="dataForm">
            <onejobcheckdit
              :orgid="orgid"
              ref="onejob"
              :key="orgid"
            ></onejobcheckdit>
          </el-form>
        </div>
      </el-main>
      <el-row>
        <el-button
          v-if="type == '1'"
          type="primary"
          @click="updateDataUserau"
          >{{ $t("table.confirm") }}</el-button
        >
        <el-button v-else type="primary" @click="updateDataOrgau">{{
          $t("table.confirm")
        }}</el-button>
      </el-row>
    </el-container>
  </el-container>
</template>
<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px #e6e6e6;
}
.el-header {
  line-height: 170px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import Onejobcheckdit from "./onejobcheckdit.vue";
import Treejobnocheck from "./treejobnocheck.vue";

import { postByUser } from "@/api/demptree";
import { updateorg, addUserOrg } from "@/api/authority";
import { orgTree } from "@/api/job";
import { orginuser } from "@/api/user";
import Oneusercheckdit from "./oneusercheckdit.vue";

export default {
  components: { Treejobnocheck, Onejobcheckdit, Oneusercheckdit },

  watch: {
    orgid(val, oldVal) {
      if (val != oldVal) {
        console.log("变化了333333" + val);
      }
    },
  },
  data() {
    return {
      activeIndex: "activeIndex1",
      type: 1,
      data: null,

      data1: null,
      userid: 0,
      orgid: 24,
      subrendata: {
        postid: 0,
        data: null,
      },
      subuserdata: {
        userid: 0,
        data: null,
      },
    };
  },
  created() {
    this.userid = this.$store.getters.userid;
    this.getList();
    this.getList1();
  },

  methods: {
    handleSelect(key, keyPath) {
      this.type = key;
    },
    getList() {
      this.listLoading = true;
      orgTree(this.userid).then((response) => {
        const data1 = response.data.data;
        let dataArray = [];
        dataArray.push(data1);
        this.data = JSON.parse(JSON.stringify(dataArray));
        this.listLoading = false;
      });
    },

    getList1() {
      this.listLoading = true;
      postByUser().then((response) => {
        const data3 = response.data.data.children;
        let data2 = JSON.stringify(data3).replace(/postName/g, "label");
        this.data1 = JSON.parse(data2);
        // this.data=JSON.parse(JSON.stringify(dataArray)) ;
        this.listLoading = false;
      });
    },

    getCheckedKeys() {
      let data = this.$refs.tree1.getCheckedKeys();
      return data;
    },
    renderContent1(h, { node, data, store }) {
      if (data.children == null) {
        return (
          <span
            class="custom-tree-node"
            on-click={() => this.showonejobau(data)}
          >
            <span>{node.label}</span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      }
    },
    renderContent(h, { node, data, store }) {
      if (data.children == null) {
        return (
          <span
            class="custom-tree-node"
            on-click={() => this.showoneuserau(data)}
          >
            <span>{node.label}</span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      }
    },

    showonejobau(data) {
      this.orgid = data.id;
      this.key = data.id;
    },

    showoneuserau(data) {
      console.log(data.id);
      this.userid = data.id;
      this.key = data.id;
    },

    updateDataOrgau() {
      let oneuserid = this.$refs.onejob.getAllcheckdata();
      console.log(oneuserid);

      this.subrendata.postid = this.orgid;
      this.subrendata.data = oneuserid;
      const tempData = Object.assign({}, this.subrendata);

      var data = new Array();
      data[0] = tempData;

      updateorg(data).then(() => {
        this.getList1();

        this.$notify({
          title: "更新成功",
          message: "更新成功",
          type: "success",
          duration: 2000,
        });
      });
    },

    updateDataUserau() {
      let oneuserid = this.$refs.oneuser.getAllcheckdata();
      //    console.log(oneuserid)

      this.subuserdata.userid = this.userid;
      this.subuserdata.data = oneuserid;
      const tempData = Object.assign({}, this.subuserdata);

      var data = new Array();
      data[0] = tempData;

      addUserOrg(data).then(() => {
        this.getList();
        this.$notify({
          title: "更新成功",
          message: "更新成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    showAuthority(data) {
      if (data.children.length) {
        return this.$message.warning("只能选择用户！");
      }
      this.userid = data.id;
    },
  },
};
</script>
<style>
.custom-tree-node {
  width: 120px;
}

.quan {
  margin-left: 80px;
  height: calc(100vh - 160px);
  overflow: auto;
}
.jurisdiction {
  position: absolute !important;
}
</style>