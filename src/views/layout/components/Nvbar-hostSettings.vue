<template>


  <el-dialog
     title="个人设置"
    :visible.sync="visible"
    :append-to-body="true">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户名称">
        <i class="el-icon-user"></i>
        <span>{{ userName }}</span>
      </el-form-item>
       
      <el-form-item label="用户账号">
        <i class=" el-icon-phone"></i>
        <span>{{ phone }}</span>
      </el-form-item>
      <el-form-item label="用户职位" >
        
        <i class="el-icon-postcard"></i>
          <span :key='item' v-for="item in post">{{ item }};</span>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="dataForm.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="dataForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="dataForm.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
  import { removeToken } from '@/utils/auth'
  export default {
    data () {
      var validateConfirmPassword = (rule, value, callback) => {
        if (this.dataForm.newPassword !== value) {
          callback(new Error('确认密码与新密码不一致'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        dataForm: {
          password: '',
          newPassword: '',
          confirmPassword: '',
          userPhone:this.$store.state.user.phone
        },
        dataRule: {
          password: [
            { required: true, message: '原密码不能为空', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: validateConfirmPassword, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      userName: {
        get () { return this.$store.state.user.name }
      },
      post:{
        get(){return this.$store.state.user.roles}
      },
      phone:{
        get(){return this.$store.state.user.phone}
      },
      // mainTabs: {
      //   get () { return this.$store.state.common.mainTabs },
      //   set (val) { this.$store.commit('common/updateMainTabs', val) }
      // }
    },
    methods: {
      // 初始化
      init () {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$api+'/account/accounting/user/password',
              method: 'post',
              data: this.$http.adornData({
                'password': this.dataForm.password,
                'newPassword': this.dataForm.newPassword,
                 'phone': this.dataForm.userPhone
              })
            }).then(({data}) => {
              console.log(data)
              if (data.retCode===200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$nextTick(() => {
                      this.mainTabs = []
                      removeToken()
                      this.$router.replace({ name: 'login' })
                      location.reload
                    })
                  }
                })
              } else {
                  this.$message.error(data.message)
              }
            })
          }
        })
      }
    }
  }
</script>

