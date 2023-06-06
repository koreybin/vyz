<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
    <el-footer class="foot">
       <span>2022 Baidu 贴吧协议</span>|<span>隐私政策</span>|<span>霸主制度</span>|<span>意见反馈</span>|<span>网络谣言警示</span>
    </el-footer>
  </div>
</template>

<script>
  

import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() 
  {
    
    if (!this.roles.includes('admin')) 
    {
      this.currentRole = 'editorDashboard'
    }
  },
  



}
</script>
<style scoped>
.foot {
  display: flex;
 justify-content: center;
 color: rgb(54, 54, 54);
  margin-top: 20px;
}
.foot span{
  margin: 0 10px;
  cursor: pointer;
  color: rgb(146, 149, 151);
}
.foot span:hover{
  color: rgb(54, 53, 53);
}
</style>
