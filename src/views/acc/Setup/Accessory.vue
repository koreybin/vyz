<template>
  <div>
    <div class="header">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="附件名称:">
          <el-input
            placeholder="请输入文件名"
            class="int"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件:">
          <!-- <input type="file" name="File" @change="handleFiles">
          <div>支持txt、xls、doc、jpg、gif、pdf等文件格式,大小不超过5M</div> -->

          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="false"
            action="void"
            :http-request="customUpload"
            :before-upload="beforeUploadFile"
            :auto-upload="false"
          >
            <el-button slot="trigger" type="primary">选择文件</el-button>
            <el-button type="success" @click="submitUpload">上传</el-button>

            <!-- slot="trigger" 为触发文件选择框的内容 -->
            <!-- <el-button  type="success">上传</el-button> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="list">
        <div class="title">
          <span>附件列表</span>
          <span>当前共 {{ this.list.length }} 记录</span>
        </div>
        <div class="head">
          <div>名称</div>
          <div>上传人</div>
          <div>上传时间</div>
          <div>操作</div>
        </div>
        <div class="footer">
          <ul>
            <li v-for="item in list" :key="item.id">
              <div>{{ item.fileName }}</div>
              <div>{{ item.fileBelongUser }}</div>
              <div>{{ item.createTime }}</div>
              <div>
                <button type="button" @click="examine(item)">查看</button>
                <button @click="delle(item.id)">删除</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <iframe :src="url" style="border: none; width: 100%; height: 100%"></iframe>
  </div>
</template>

<script>
import { GetListabs, uploading, check, del } from "@/api/acc/Accessory";
import Axios from "axios";
export default {
  data() {
    return {
      add: "",
      list: [],
      fileList: {},
      model: "",
      form: {
        name: "",
      },
      url: "",
    };
  },
  created() {
    this.GetList();
  },
  methods: {
    downLoadFileImg(fileUrl, fileName) {
      // 后端文件地址和名称

      // 可下载，名称也有效 -- 推荐
      const x = new window.XMLHttpRequest();
      x.open("GET", fileUrl, true);
      x.responseType = "blob"; // 选择返回格式为blob --- 一般后端返回的是看不懂的文件流 故需要转成blob
      x.onload = () => {
        this.url = window.URL.createObjectURL(x.response); //将后端返回的blob文件读取出url

        console.log("blob====", x.response); //Blob {size: 38617, type: 'application/pdf'}
        console.log("url====", this.url); //blob:http://localhost:7197/cb047277-e5e6-4905-bf8c-dbecd86a0105

        // url可以预览和下载------如果想要下载就把下方注释打开即可
        // const a = document.createElement('a')
        // a.href = this.url
        // a.download = fileName
        // a.click()
      };
      x.send();
      // // 或者下方的方式
      // axios({
      //   url: G_CGI_PHP.superOrder.upfile + "?id=" + this.rowData.id,
      //   method: 'get',
      //   timeout: 100000,
      //   responseType: 'blob',
      //   headers: {
      //     // "type": 'application/pdf'
      //   },
      // }).then(res => {
      //   console.log('res.data', res.data)
      //   this.url = window.URL.createObjectURL(res.data) //将后端返回的blob文件读取出url
      //   console.log('通过读取blob文件得到url地址===', this.url)
      // }).catch(error => {
      //   console.log(error)
      // })
    },

    // 上传文件之前的钩子, 参数为上传的文件,若返回 false，则停止上传
    beforeUploadFile(file) {
      // let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      // if (extension !== "pdf") {
      //   alert('文件格式不正确')
      //   return false
      // }
    },
    GetList() {
      GetListabs().then((res) => {
        console.log(res.data.data);
        this.list = res.data.data;
      });
    },
    //上传文件
    customUpload(file) {
      console.log(file);
      this.model = file.file;
      console.log(file.file.name);
      // this.add = file.file.name
      console.log(this.form.name);
    },
    submitUpload() {
      console.log();
      this.$refs.upload.submit();
      let fd = new FormData();
      fd.append("File", this.model);
      uploading(fd, this.form.name).then((response) => {
        // console.log(response.data);
        this.GetList();
      });
    },
    // 查看
    examine(e) {
      console.log(e);
      check(e.id).then((res) => {
        //使用Blob对象将后端返回的Arraybuffer格式得数据转成blob类型的数据 window.URL.createObjectURL(blob)可以把一个blob转成blobURL，用作图片显示，文件下载（不能再服务器上存储，只能在浏览器使用）
        let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
        // 使用URL对象将blob类型的数据生成一个在线下载的链接
        // 然后我们使用a标签进行下载
        var downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.setAttribute("download", e.fileName);
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
    },
    // 删除

    delle(e) {
      del(e).then(() => {
        this.GetList();
      });
    },
  },
};
</script>

<style scoped>
.header {
  padding: 10px 10px 0 10px;
}

.int {
  width: 400px;
}

.list {
  width: 1000px;
  height: 650px;
  border: 1px solid #ccc;
}

.title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 10px 10px 15px;
  font-size: 14px;
  font-family: "宋体";
  box-sizing: border-box;
}

.head {
  display: flex;
  justify-content: space-around;

  padding: 10px 10px 10px 15px;
  background: #ccc;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  padding: 10px 10px 10px 15px;
  font-size: 14px;
  font-family: "宋体";
  box-sizing: border-box;
}

li div:nth-child(2) {
  margin-left: 60px;
  margin-right: 40px;
}

.footer {
  height: 650px;
  overflow: auto;
}
</style>