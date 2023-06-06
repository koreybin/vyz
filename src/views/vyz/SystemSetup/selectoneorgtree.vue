<template>
  <div>
    <treeselect v-model="value" :multiple="false" :options="options" />
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

 import {getlistdata} from '@/api/demptree'
  export default {
    // register the component
    components: { Treeselect },

    data() {
      return {
        // define the default value
        value: null,
        // define options
        options: [],    
          }

    },

    created() {
      this.getList()  
    },
  methods:
     {
       getList(){
        this.listLoading = true
        getlistdata(0).then(response => 
        {
       
        const  data1 =response.data.data;
        let dataArray = [];
        dataArray.push(data1);
        this.options=dataArray
       // this.options=JSON.parse(JSON.stringify(dataArray)) ;
          this.listLoading = false
        })
       },
        getselectval(){
          return this.value
        },
     }
  }
</script>