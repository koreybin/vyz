<template>
  <el-container class="aa">
    <el-container class="bb">
      <el-aside width="420px">
        <div style="height: 800px; overflow-y: auto" class="scroll">
          <el-tree
            default-expand-all
            :data="data"
            show-checkbox
            node-key="id"
            :expand-on-click-node="false"
            :render-content="renderContent"
          >
          </el-tree>
          <div>
            <el-dialog
              :title="textMap[dialogStatus]"
              :visible.sync="dialogFormVisible"
            >
              <el-tabs type="border-card">
                <el-tab-pane label="组织架构">
                  <el-form
                    :rules="rules"
                    ref="dataForm"
                    :model="temp"
                    label-width="310px"
                  >
                    <el-row>
                      <el-col :span="spans.dataValue">
                        <el-form-item
                          :label="$t('dempartobj.dataValue')"
                          prop="dataValue"
                        >
                          <el-input v-model="temp.dataValue"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{
                  $t("table.cancel")
                }}</el-button>
                <el-button
                  v-if="dialogStatus == 'create'"
                  type="primary"
                  @click="createData"
                  >{{ $t("table.confirm") }}
                </el-button>
                <el-button v-else type="primary" @click="updateData">{{
                  $t("table.confirm")
                }}</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-aside>

      <el-main>
        <orguser :orgid="orgid" :departList="departList"></orguser>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getlistdata, adddemp, deletedemp, updatedemp } from "@/api/demptree";
import { childrenTreeToList } from "@/utils/treeToListDepth";
import Orguser from "./orguser.vue";

export default {
  name: "DepartmentStaff",
  components: {
    Orguser,
  },

  data() {
    return {
      data: null,
      parentid: 1,
      orgid: 17,
      dialogFormVisible: false,
      dialogStatus: "",

      textMap: {
        update: "编辑",
        create: "创建",
      },

      rules: {
        dataValue: [
          { required: true, message: "组织架构不能为空", trigger: "change" },
        ],
      },

      temp: {
        id: undefined,
        parentId: undefined,
        dataValue: "",
      },

      spans: {
        dataValue: 12,
      },
      departList: "",
    };
  },

  created() {
    this.parentid = this.$store.getters.userid;
    this.orgid = this.$store.getters.org;
    this.getList();
  },
  mounted() {},

  methods: {
    getList() {
      this.listLoading = true;
      getlistdata(this.parentid).then((response) => {
        const data1 = response.data.data;
        let dataArray = [];
        dataArray.push(data1);
        this.data = JSON.parse(JSON.stringify(dataArray));
        this.listLoading = false;
        this.departList = childrenTreeToList(this.data);
      });
    },

    resetTemp(parentid) {
      this.temp = {
        id: undefined,
        dataValue: "",
        parentId: parentid,
      };
    },

    append(data) {
      this.resetTemp(data.id);
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          adddemp(this.temp).then(() => {
            this.getList();
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },

    updatedemp(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.dataValue = row.label;

      this.dialogStatus = "update";
      this.dialogFormVisible = true;

      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          updatedemp(tempData).then(() => {
            this.getList();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },

    remove(node, data) {
      this.$confirm("此操作将永久删除该文件, 确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletedemp(data.id).then((ress) => {
            if (ress.data.message == "成功") {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex((d) => d.id === data.id);
              children.splice(index, 1);
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000,
              });
            } else {
              this.$notify({
                title: "失败",
                message: ress.data.message,
                type: "warning",
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

    chengyuan(data) {
      //this.$router.push({name:'orguser',params:data.id})
      this.orgid = data.id;
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              class="el-icon-circle-plus-outline"
              on-click={() => this.append(data)}
            ></el-button>
            <el-button
              size="mini"
              type="text"
              class="el-icon-edit"
              on-click={() => this.updatedemp(data)}
            ></el-button>
            <el-button
              size="mini"
              type="text"
              class="el-icon-remove-outline"
              on-click={() => this.remove(node, data)}
            ></el-button>
            <el-button
              size="mini"
              type="text"
              class="el-icon-user"
              on-click={() => this.chengyuan(data)}
            ></el-button>
          </span>
        </span>
      );
    },
  },
};
</script>
<style scoped>
.el-aside {
  color: #333;
}

/* .el-checkbox__inner{
  border-radius: 14px;
} */
.aa {
  position: absolute !important;
}

.bb {
  overflow-y: auto !important;
}
</style>