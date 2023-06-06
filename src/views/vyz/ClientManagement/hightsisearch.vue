<template>
<div>

<el-row>
  <el-col :span="2"><div class="grid1">新增日期</div></el-col>
  <el-col :span="10">
    <div class="grid-content bg-purple-light">
     <span data-v-af112ad2="" class="select_item">今天</span>
     <span data-v-af112ad2="" class="select_item">近七天</span>
     <span data-v-af112ad2="" class="select_item">本月</span>
     <span data-v-af112ad2="" class="select_item">本年</span>
     <span data-v-af112ad2="" class="select_item">自定义</span>    

      <el-date-picker
      v-model="value7"
      type="daterange"
      siaze="mini"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">

    </el-date-picker>  
  </div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">客户经理</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">
         <span data-v-af112ad2="" class="select_item">未分配</span>
         <span data-v-af112ad2="" class="select_item">分配单个</span>
         <span data-v-af112ad2="" class="select_item">分配多个</span>    
         <el-input></el-input>

</div></el-col>
</el-row>

<el-row>
  <el-col :span="2"><div class="grid1">服务类别</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">
      <span data-v-af112ad2="" class="select_item">代账服务</span>
     <span data-v-af112ad2="" class="select_item">工商服务</span>
     <span data-v-af112ad2="" class="select_item">代账+工商</span>
  </div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">派工日期</div></el-col>
  <el-col :span="10">
     <div class="grid-content bg-purple-light">
       <span data-v-af112ad2="" class="select_item">今天</span>
       <span data-v-af112ad2="" class="select_item">近七天</span>
       <span data-v-af112ad2="" class="select_item">本月</span>
       <span data-v-af112ad2="" class="select_item">本年</span>
       <span data-v-af112ad2="" class="select_item">自定义</span>      
      </div>
      
</el-col>
</el-row>

<el-row>
<i class="el-icon-caret-bottom">展开</i>
</el-row>

<el-row>

<el-col :span="2"><div class="grid1">服务类型</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">
      <span data-v-af112ad2="" class="select_item">代理记账</span>
     <span data-v-af112ad2="" class="select_item">工商注册</span>
     <span data-v-af112ad2="" class="select_item">工商变更</span>
    <span data-v-af112ad2="" class="select_item">工商注销</span>

  </div></el-col>

  <el-col :span="2"><div class="grid-content bg-purple">省市区</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">
         <span data-v-af112ad2="" class="select_item">今天</span>
     <span data-v-af112ad2="" class="select_item">近七天</span>
     <span data-v-af112ad2="" class="select_item">本月</span>
       <span data-v-af112ad2="" class="select_item">本年</span>
      <span data-v-af112ad2="" class="select_item">自定义</span> </div>
</el-col>
</el-row>

<el-row>
  <el-col :span="2"><div class="grid1">客户来源</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">
      
    <el-select v-model="value" size="mini" placeholder="请选择">
    <el-option
      v-for="item in optionskhly"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  </div></el-col>

  <el-col :span="2"><div class="grid-content bg-purple">纳税性质</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">

         <span data-v-af112ad2="" class="select_item">一般纳税人</span>
         <span data-v-af112ad2="" class="select_item">小规模</span>
     </div>
</el-col>
</el-row>
<el-row>

</el-row>
<el-row>
<el-col :span="2"><div class="grid1">跟进日期</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">
      <span data-v-af112ad2="" class="select_item">代理记账</span>

  <el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>

  </div></el-col>

  <el-col :span="2"><div class="grid-content bg-purple">跟进记录</div></el-col>
  <el-col :span="10">
    <div class="grid-content bg-purple-light">

         <span data-v-af112ad2="" class="select_item">一般纳税人</span>
         <span data-v-af112ad2="" class="select_item">小规模</span>
     </div>
</el-col>
</el-row>

<el-row>
<el-col :span="2"><div class="grid1">未跟进</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">
      <span data-v-af112ad2="" class="select_item">代理记账</span>
  
  </div></el-col>

  <el-col :span="2"><div class="grid-content bg-purple">是否有税控盘</div></el-col>
  <el-col :span="10">
    <div class="grid-content bg-purple-light">
         <span data-v-af112ad2="" class="select_item">是</span>
         <span data-v-af112ad2="" class="select_item">小规模</span>
     </div>
</el-col>
</el-row>

<el-row>
<el-col :span="2"><div class="grid1">状态</div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple-light">
      <span data-v-af112ad2="" class="select_item">代理记账</span>
  
  </div></el-col>

  <el-col :span="2"><div class="grid-content bg-purple">公司成立月份</div></el-col>
  <el-col :span="10">
    <div class="grid-content bg-purple-light">
      <el-date-picker
    v-model="value4"
    type="month"
    placeholder="选择月">
  </el-date-picker>
     </div>
</el-col>
</el-row>


</div>
 
</template>


<script>
   export default {
    data() {
      return {
optionskhly:[{
          value: '未设置',
          label: '未设置'
        }, {
          value: '转介绍',
          label: '转介绍'
        }, {
          value: '营销',
          label: '营销'
        }, {
          value: '其他',
          label: '其他'
        }],
        value: '',
        
        value4:'',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: ''
      };
    }
  };
</script>

<style>
  .select_item{padding-left: 3px; padding-right: 3px;}
  .select_item:hover { background:#f3a807;}
</style>