<template>
  <div>
    <el-dialog
      title="新建摘要库"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleClose"
    >
      <el-row>
        <el-col>
          <p>摘要内容：</p>
        </el-col>
        <el-col :span="24">
          <el-input type="textarea" v-model="main"></el-input>
        </el-col>
        <el-col :offset="17" style="margin-top: 10px; margin-bottom: 10px">
          <el-button type="primary" @click="addMain" v-if="flag === 1"
            >保存</el-button
          >
          <el-button type="primary" @click="updateMain" v-if="flag === 2"
            >更新</el-button
          >
          <el-button @click="main = ''">取消</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table
            :data="mainData"
            style="width: 100%; height: 200px; overflow: auto; font-size: 14px"
            @row-dblclick="rowHandle"
          >
            <el-table-column prop="date" label="操作" width="180">
              <template slot-scope="scope">
                <div
                  class="charge-table-icon"
                  @click="beforeUpdateMain(scope.row)"
                >
                  <i class="el-icon-edit"></i>
                </div>
                <div class="charge-table-icon">
                  <i
                    class="el-icon-close"
                    style="color: #4a90e2"
                    @click="delMain(scope.row.id)"
                  ></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="摘要内容"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetListabs,
  addListabs,
  delListabs,
  updateListabs,
} from "@/api/acc/abstract";
export default {
  data() {
    return {
      flag: 1,
      dialogVisible: true,
      mainData: [],
      main: "",
      data: "",
      mainId: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      GetListabs().then((res) => {
        this.mainData = res.data.data;
      });
    },
    handleClose() {
      this.$emit("getMain", false);
      this.dialogVisible = false;
    },
    rowHandle(row, cloumn, event) {
      this.data = row;
      this.$emit("getMain", false, this.data);
    },
    async addMain() {
      const res = await addListabs(this.main);
      if (res.data.retCode !== 200)
        return this.$message.error(res.data.message);
      this.$message.success("新增成功");
      this.getList();
    },
    async delMain(id) {
      const res = await delListabs(id);
      if (res.data.retCode !== 200)
        return this.$message.error(res.data.message);
      this.$message.success("删除成功");
      this.getList();
    },
    beforeUpdateMain(row) {
      this.flag = 2;
      this.main = row.content;
      this.mainId = row.id;
    },
    async updateMain() {
      let params = {
        id: this.mainId,
        content: this.main,
      };

      const res = await updateListabs(params);
      if (res.data.retCode !== 200)
        return this.$message.error(res.data.message);
      this.$message.success("更新成功");
      this.flag = 1;
      this.main = "";
      this.getList();
    },
  },
};
</script>

<style lang="scss" scpoed>
.charge-table-icon {
  display: inline-block;
  cursor: pointer;
  padding: 0 10px;
}
</style>