<template>
  <el-dialog
    title="用户头像上传"
    :close-on-click-modal="false"
    @close="closeHandle"
    :append-to-body="true"
    :visible.sync="visible">
    <el-upload
      drag
      :action="url"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
      multiple
      style="text-align: center;">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只支持jpg、png、gif格式的图片！</div>
    </el-upload>
  </el-dialog>
</template>

<script>
  export default {
      inject:['reload'],   
    data () {
      return {
        visible: false,
        url: '',

      }
    },
    methods: {
    
    init(){
     this.visible = true
     this.url=this.$api+'/account/accounting/user/importImg?phone='+this.$store.state.user.phone
    },
    // toUpload(){
    //        this.url=this.$http({
    //           url: this.$api+'/account/accounting/user/importImg',
    //           method: 'post',
    //           data: this.$http.adornData({
    //              'phone': this.$store.state.user.phone
    //           })
    //   })
    // },
   
      // 上传之前
      beforeUploadHandle (file) {
        
        if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          this.$message.error('只支持jpg、png、gif格式的图片！')
          return false
        }
      },
      // 上传成功
      successHandle (response, file,) {
    
        if (response!=null&&response!='') {
            localStorage.setItem('headUrl',response)
            location.reload()
             this.$message({
                  message: '上传头像成功!',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                   
                    this.visible = false
                  }
                })
             
        } else {
          this.$message.error(response.msg)
        }
      },
      // 弹窗关闭时,首页显示图标以及公告
      closeHandle () {
            console.log(this.$store.state.user);
           this.reload()
        // this.fileList = []
        // this.$emit('refreshDataList')
      }
    }
  }
</script>
