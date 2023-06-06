<template>
  <div class="back">
    <div class="back-a">
      <h1 class="header">{{ vale }}</h1>
      <p v-html="val.ncontent" v-show="neirong">
        {{ val.ncontent }}
      </p>

      <quill-editor
        v-show="faxian"
        v-model="val.ncontent"
        ref="myQuillEditor"
        class="ql-editor-class"
        :options="editorOption"
      >
      </quill-editor>

      <el-upload
        style="display: none"
        class="quill-picture-uploader"
        action="http://192.168.1.71:8001/api/account/da-notice/image"
        :before-upload="bfUpload"
        :on-success="uploadSuccess"
      >
      </el-upload>
      <div>
        <button class="btn" @click="btn" v-show="neirong">编辑</button>
        <button class="btn" @click="cancel" v-show="faxian">取消</button>
        <button class="btn" @click="btnn" v-show="faxian">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Sinatv } from "@/api/CCTV.js";
import { getToken, removeToken } from "@/utils/auth";
import "quill/dist/quill.snow.css"; //引入样式,不引入的话页面比较夸张
export default {
  data() {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
      ["blockquote", "code-block"], // 引用  代码块
      [{ header: 1 }, { header: 2 }], // 1、2 级标题
      [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
      [{ script: "sub" }, { script: "super" }], // 上标/下标

      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
      [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
      [{ font: [] }], // 字体种类

      ["clean"], // 清除文本格式
      ["link", "image"], // 链接、图片、视频 ['link', 'image', 'video']
    ];
    return {
      notice: {
        id: "",
        ncontent: "",
      },
      row: "",
      list: "",
      vale: "",
      faxian: false,
      neirong: true,
      val: "",
      //图片url
      urlList: [],
      //正文
      content: "",
      //富文本配置
      editorOption: {
        placeholder: "正文内容支持上传图片和视频",
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbarOptions, //自定义工具栏，略
            handlers: {
              image: function (value) {
                //替换原图片上传功能
                // if (value) {
                document.querySelector(".quill-picture-uploader input").click(); //核心
                // } else {
                //   this.quill.format("image", false);
                // }
              },
            },
          },
        },
      },
    };
  },
  methods: {
    //上传图片之前校验
    bfUpload(file) {
      console.log(file);
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif"
      ) {
        this.$message.error("只支持jpg、png、gif格式的图片！");
        return false;
      }
    },
    //正文插入图片上传成功调用
    uploadSuccess(response, file, fileList) {
      this.urlList.push(response);

      // console.log("122223", fileList);
      // console.log("123", this.urlList);

      let quill = this.$refs.myQuillEditor.quill;

      if (response != null) {
        //获取光标所在位置
        let length = quill.getSelection().index;
        //插入图片
        quill.insertEmbed(length, "image", response);
        //移动光标到图片后
        quill.setSelection(length + 1);
      }
    },
    // 编辑按钮
    btn() {
      this.neirong = false;
      this.faxian = true;
    },
    // 取消
    cancel() {
      this.faxian = false;
      this.neirong = true;
    },
    // 提交
    btnn() {
      this.faxian = false;
      this.neirong = true;
      this.notice.id = this.val.id;
      this.notice.ncontent = this.val.ncontent;
      this.$http({
        url: this.$api + "/account/da-notice/update",
        method: "post",
        data: this.$http.adornData({
          id: this.notice.id,
          ncontent: this.notice.ncontent,
        }),
      }).then(({ data }) => {
        console.log(data);
        if (data.retCode === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1500,
          });
        }
      });
    },
  },
  created() {
    this.vale = this.$route.params.text.noticeTitle;
    this.val = this.$route.params.text;
    console.log("123", this.val);
    console.log(this.val);
  },
};
</script>

<style scoped>
.btn {
  width: 80px;
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: center;
  background: #1fadf6;
  color: #fff;
  cursor: pointer;
  position: relative;
  left: 800px;
}

.quill-editor {
  width: 850px;
  margin-left: 70px;
}
.back {
  background-color: #f0f2f6;
}
.header {
  /* display: flex; */
  text-align: center;
  width: 0 auto;
}
.back-a a:hover {
  color: rgb(83, 128, 187);
  text-decoration: underline;
}
.back-a a {
  border-bottom: 1px black solid;
}
.item {
  width: 750px;
}

.back-a {
  box-shadow: 0px 1px 2px #d3d1d1;
  width: 1000px;
  background-color: rgb(252, 255, 248);
  padding-top: 10px;
  margin-left: 80px;
  padding-left: 20px;
  padding-bottom: 100px;
}
</style>