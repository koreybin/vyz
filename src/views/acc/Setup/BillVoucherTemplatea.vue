<template>
  <div>
    <el-row span="24">
      <el-dialog
        title="选择科目"
        :visible.sync="dialogFormVisible"
        width="30%"
        @close="closeHandle"
      >
        <el-radio-group
          class="header"
          v-model="tabPosition"
          v-for="item in tabs"
          :key="item.id"
          @change="getListType(item.id)"
          style="margin-bottom: 30px"
        >
          <el-radio-button :label="item.name"></el-radio-button>
        </el-radio-group>

        <div class="gd">
          <el-tree
            :data="list"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
            v-loading="loading"
            node-key="id"
          ></el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" :disabled="disabled" @click="confirm"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { GetList } from "@/api/acc/BillVoucherTemplate";
export default {
  props: ["msgData", "sDetail", "nDetail"],
  data() {
    return {
      data: "",
      disabled: false,
      loading: true,
      tabs: [
        { id: 1, name: "资产" },
        { id: 2, name: "负债" },
        { id: 3, name: "权益" },
        { id: 4, name: "成本" },
        { id: 5, name: "损益" },
      ],
      tabPosition: "资产",
      dialogFormVisible: true,
      currtype: 1,
      tableKey: 0,
      add: [],
      list: [],
      defaultProps: {
        label: "subjectName", // 作为对应节点的名字显示
        children: "children", // 指定子树为节点对象的某个属性值
      },
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    getListType(val) {
      this.loading = true;
      this.getList(val);
    },
    getList(type) {
      GetList(type).then((res) => {
        this.loading = false;
        this.list = res.data.data;
      });
    },
    handleNodeClick(data) {
      this.disabled = false;
      this.data = data;
      if (this.sDetail && data.children) {
        this.disabled = true;
        this.$message.warning("科目不能选择费明细科目");
      }
      if (this.nDetail && data.children == null) {
        this.disabled = true;
        this.$message.warning(
          "您所选的科目无法生成多栏账，请选择非明细科目或挂核算项目的科目！"
        );
      }
    },
    closeHandle() {
      this.$emit("getData", false);
      this.dialogFormVisible = false;
    },
    // 取消
    cancel() {
      this.$emit("getData", false);
      this.dialogFormVisible = false;
      console.log(this.msgData);
    },

    // 确定按钮
    confirm() {
      if (this.msgData == 0) {
        this.$emit("getData", false, this.data, 0);
      }
      if (this.msgData == 1) {
        this.$emit("getData", false, this.data, 1);
      }
      if (this.msgData == 2) {
        this.$emit("getData", false, this.data, 2);
      }
      if (this.msgData == 3) {
        this.$emit("getData", false, this.data, 3);
      }
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.doalog {
  margin: 0 auto;
  height: 800px;
}

.gd {
  overflow: auto;
  width: 100%;
  height: 400px;
}
</style>