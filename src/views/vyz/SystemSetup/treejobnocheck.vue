<template>
 
<el-row>
 
     <el-tree
      :data="data"
      ref="tree"
      node-key="id"
      default-expand-all
      :expand-on-click-node="true"
     :render-content="renderContent">
     
    </el-tree>
</el-row>

</template>

<script>
  import {postByUser} from '@/api/demptree'

  export default
  {
    name: 'jobtree',
    data() 
    {    

      return {      
          data: null,             
        }       
    },

    created() {
      this.getList()  
    },

    methods:
     {
       getList(){

        this.listLoading = true
        postByUser().then(response => 
        {
       
        const  data1 =response.data.data.children;
          let data2=JSON.stringify(data1).replace(/postName/g,"label")
          this.data=JSON.parse(data2)
          // this.data=JSON.parse(JSON.stringify(dataArray)) ;
          this.listLoading = false
        })
       },

      getCheckedKeys()
     {
        let data=this.$refs.tree.getCheckedKeys()
        return data;
      },

       renderContent(h, { node, data, store }) 
       {

        if(data.children==null){
        return (
          <span class="custom-tree-node">
            <span on-click={ () => this.showonejob(data) }>{node.label}</span>
          </span>);

        }else{
         return (
          <span class="custom-tree-node">
            <span>{node.label}</span>      
          </span>);
        }
       


      },

      showonejob (data)
      {
          this.$parent.orgid=data.id
          this.$parent.key=data.id

      }
    

    },

  };
</script>
<style scoped>
fieldset{ color: salmon;}
</style>