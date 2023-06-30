<template>
  <div class="app-container">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <a href="javascript:void(0)" @click="back">查凭证</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 16px"
          >凭证导入</el-breadcrumb-item
        >
      </el-breadcrumb>
      <br />
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <span :class="{ current: flow === 1 }">1.下载模板</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><span :class="{ current: flow === 2 }">2.导入Excel </span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span :class="{ current: flow === 3 }"> 3.导入完毕 </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <br />
    <div class="tidy-filter" v-if="flow === 1">
      <strong>温馨提示：</strong>
      <p>
        请下载统一的模版，并按相应的格式在Excel软件中填写您的业务数据，然后再导入到系统中。
      </p>
      <a
        href="https://hjcrapp.oss-cn-shenzhen.aliyuncs.com/vyz/voucherTemplate.xls"
        target="_black"
        class="current"
        >下载模板</a
      >
      <el-button type="primary" @click="flow = 2">下一步</el-button>
    </div>
    <div v-if="flow === 2">
      <el-checkbox>凭证重新排列</el-checkbox>
      <br />
      <label for="">请选择要导入的Excel文件：</label>
      <el-upload
        class="upload-demo"
        ref="upload"
        :multiple="false"
        action="void"
        :http-request="customUpload"
        :auto-upload="false"
      >
        <el-button slot="trigger" type="primary">选择文件</el-button>
        <el-button type="success" @click="submitUpload">导入</el-button>
        <br />
        <br />
        <el-button @click="flow = 1">上一步</el-button>

        <!-- slot="trigger" 为触发文件选择框的内容 -->
        <!-- <el-button  type="success">上传</el-button> -->
      </el-upload>
      <br />
    </div>
    <div v-if="flow === 3">
      <p style="width: 800px">
        {{ responseMessage }}
      </p>

      <br />
      <a href="javascript:void(0)" @click="back">返回凭证列表</a>
      <a href="javascript:void(0)" @click="flow = 2">上一步</a>
    </div>
  </div>
</template>

<script>
import { inputVoucher } from "@/api/acc/recordVoucher";
export default {
  data() {
    return {
      dialogVisible: false,
      wordList: [],
      vcnSortingVo: {
        date: "",
        fromNum: 1,
        proveId: "",
        sortingWay: 1,
      },
      list: [],
      listShow: false,
      isComplete: false,
      isOk: false,
      flow: 1,
      fileList: [],
      fileName: "",
      responseMessage: "",
    };
  },
  created() {},
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    customUpload(file) {
      this.fileName = file.file;
      console.log(file);
    },
    submitUpload() {
      this.$refs.upload.submit();
      if (!this.fileName) return this.$message.warning("请选择文件！");

      let fd = new FormData();
      fd.append("file", this.fileName);
      console.log(fd);
      inputVoucher(fd).then((response) => {
        this.responseMessage = response.data.message;
        this.flow = 3;
      });
    },
    back() {
      this.$emit("backView", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.tidy-filter {
  width: 600px;
  border: 1px solid #ccc;
  padding: 20px 20px 20px 30px;
  overflow: hidden;
  -webkit-box-shadow: 0 0 10px #ddd;
  box-shadow: 0 0 10px #ddd;
}
.ui-btn {
  float: left;
  margin-left: 20px;
}
.tidy-confirm-tip {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.current {
  color: #317da7;
  font-weight: bold;
}
/deep/ .el-upload-list {
  width: 300px;
}
</style>