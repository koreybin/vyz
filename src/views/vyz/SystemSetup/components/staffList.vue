<template>
  <el-dialog
    title="成员列表"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-row class="">
      <el-col :span="10">
        <p>组织架构</p>
        <div style="height: 400px; overflow: auto" class="scroll">
          <el-tree
            default-expand-all
            :data="data"
            show-checkbox
            :check-strictly="true"
            node-key="id"
            :expand-on-click-node="false"
            :default-checked-keys="checkList"
            @check="checkTag"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="12">
        <el-tag v-for="tag in tagList" :key="tag.name" closable>
          {{ tag.label }}
        </el-tag>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onsubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeToList } from "@/utils/treeToListDepth";
import { updateJob } from "@/api/job";
export default {
  data() {
    return {
      dialogVisible: false,
      data: "",
      checkList: [],
      checkListTag: [],
      postData: {
        post: "",
        postDesc: "",
        postId: "",
        service: "",
      },
    };
  },
  props: ["staffListVisible", "postObj", "treeData"],

  watch: {
    postObj(curVal) {
      this.postData.post = curVal && curVal.post;
      this.postData.postDesc = curVal && curVal.postDesc;
      this.postData.postId = curVal && curVal.id;
      this.postData.service = curVal && curVal.serviceId;
    },
    staffListVisible(curVal) {
      this.dialogVisible = curVal;
    },
    treeData(curVal) {
      let dataArray = [];
      dataArray.push(curVal);
      const data = JSON.parse(JSON.stringify(dataArray));
      this.data = data;
      const checkId = treeToList(data).map((item) => {
        if (item.checked) return item.id;
        return;
      });
      this.checkListTag = treeToList(data).map((item) => {
        if (item.checked) return item;
        return;
      });
      this.checkList = checkId.filter((item) => item);
    },
  },
  computed: {
    tagList() {
      return this.checkListTag.filter((item) => item);
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.$emit("toggleViable", false);
    },
    checkTag(data, check) {
      this.checkListTag = check.checkedNodes;
      this.checkList = check.checkedKeys;
    },
    onsubmit() {
      const filterArr = this.checkListTag.filter((item) => item);
      const job = filterArr.map((item) => {
        return {
          checked: item.checked,
          id: item.id,
          userName: item.label,
        };
      });
      if (this.postData.postId) {
        updateJob({ ...this.postData, member: job }).then((res) => {
          if (res.data.retCode === 200) {
            this.$emit("toggleViable", false, true);
            this.$notify({
              title: "修改成功",
              message: "修改成功",
              type: "success",
              duration: 2000,
            });
          } else {
            this.$notify({
              title: "修改失败",
              message: res.data.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      } else {
        this.$emit("toggleViable", false);
        this.$emit("getStaffList", job);
      }
    },
  },
};
</script>

<style>
</style>