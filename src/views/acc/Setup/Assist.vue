<template>
  <div class="app-container calendar-list-container">


    <el-row>
      <el-col :span="6" v-for="item in list" :key="item.id" :offset="item > 0 ? 2 : 0">
        <el-card class="box-card">
          <div style="padding:10px;">
            <span>{{ item.dataValue }}</span>
            <div class="bottom clearfix">
              <div v-if="item.parentId == '0'">
                <el-button @click="xiangqing(item.id, item.dataValue)" class="el-icon-tickets"></el-button>
              </div>
              <div v-else>
                <el-button @click="updatetyoe(item)" class="el-icon-edit"></el-button>
                <el-button @click="deletedtypeass(item.id)" class="el-icon-delete"></el-button>
                <el-button @click="xiangqing(item.id, item.dataValue)" class="el-icon-tickets"></el-button>
              </div>

            </div>
          </div>

        </el-card>

      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div style="padding:10px;">
            <span>新增分类</span>
            <div class="bottom clearfix">
              <el-button @click="addtypename" class="el-icon-circle-plus"></el-button>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-tabs type="border-card">
        <el-tab-pane label="辅助核算类别">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-width="310px">
            <el-row>
              <el-col :span="spans.name">
                <el-form-item :label="$t('assistobj.name')" prop="name">
                  <el-input @blur="judgeNum($event.target.value)" v-model="temp.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="createData">{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="typetitle" :visible.sync="dialogFormVisible1">

      <assistTypeList :pid="pid"></assistTypeList>

    </el-dialog>


  </div>
</template>
<script>

</script>

<script>
import waves from '@/components/waves' // 水波纹指令
import{GetListType,Addassisttype,updateType,deletedType} from '@/api/acc/assist'
import assistTypeList from './AssistTypeList.vue'
export default 
{
  components: {assistTypeList},
    name:'assist',
    directives: {
      waves
    },
    
    data()
    {
      return {

valid:{
  isnumber:false
  },
        list:null,
         textMap:
        {
          update: '编辑',
          create: '创建'
        },
        dialogFormVisible1:false,
        pid:0,
        typetitle:'',

        dialogFormVisible: false,
        dialogStatus: '',
        rules: {  name: [{required: true, message: '分类名称不能为空', trigger: 'blur'}] },
        temp: 
        {
         id:'',
          name:'',   
        },
        spans: 
        {
         name:10,
       
        },
      }
    },
    created() { 
        this.getListdata()
    },
    methods:
    {
       judgeNum(val) {
      let flag = new RegExp('^[A-z0-9\\u4e00-\\u9fa5]*$').test(val)

      if (!flag) {
         this.valid.isnumber = false
        this.$message({
          type: 'warning',
          message: '格式错误,正确格式为数字,不包含空格等',
          duration: 5000,
        })
      } else {
        this.valid.isnumber = true
      }

    },

        getListdata()
        {
                 
            GetListType().then(response => 
            {   
        
              this.list = response.data.data

            })
        },
      
        changehesuan(){
         if(this.checkedhesuan)  {
          
         }else{
           
         }
        },
        addtypename()
        {
          
           this.dialogFormVisible = true
           // this.resetTemp()
             this.dialogStatus = 'create'
             this.$nextTick(() => {
             this.$refs['dataForm'].clearValidate()
            })
        },
        createData(){
  
          this.$refs['dataForm'].validate((valid) => {
          if (valid&&this.valid.isnumber)  {
             Addassisttype(this.temp.name).then(() => {
              this.getListdata()
             // this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }else{
            this.valid.isnumber=false
             this.$message({
          type: 'warning',
          message: '请输入正确格式,不能有特殊符号',
          duration: 5000,
        })
          }
        })
        },
        updatetyoe(item){
           // this.temp = Object.assign({}, row) // copy obj

            this.temp.id=item.id
            this.temp.name=item.dataValue

            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
        },
        updateData(){

           this.$refs['dataForm'].validate((valid) => {
          if (valid) {

           // const tempData = Object.assign({}, this.temp)
            
            updateType(this.temp.id, this.temp.name).then(() => {
             
               this.getListdata()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
        },
        deletedtypeass(id){
            deletedType(id).then(() => {
             
               this.getListdata()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })

        },
        
        xiangqing(id,name)
        {
             this.dialogFormVisible1 = true
             this.typetitle=name
             this.pid=id
        }

    }

}
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.box-card {
  margin: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>