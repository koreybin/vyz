<template>
  <el-select v-model="selecttype" @change="selectchange" placeholder="请选择">
    <el-option
      v-for="item in typeoptions"
      :key="item.value"
      :label="item.label"
      :value="{value:item.value,label:item.label}">
    </el-option>
  </el-select>
</template>

<script>
import {gettypeList} from '@/api/acc/vouchertemp'

  export default {
     data()
     {
      return {
        typeoptions: [],      
        selecttype: ''
      }
    },
 
  props:{typename:''},
   watch:
   {
     typename(val,ole)
     {
       this.selecttype=val
     }
     
   },

    created() {
      
        this.getListdata()
        this.selecttype=this.typename
    },

      methods:
    {
      
        getListdata()
        {
              gettypeList().then(response => 
            {
        
             // this.list = response.data.data
             
                //console.log(response.data.data)
                let datares=response.data.data

               var arrdata=new Array();
                   arrdata=datares
                   var lastares=[]

                   
                    for(var i=0;i<arrdata.length;i++)
                    {
                        var id=arrdata[i].id
                        var dataValue=arrdata[i].dataValue
                      //  var narr=[];
                        // lastares.push('value:'+id,'label:'+dataValue)

                     //   narr.push('value:'+id)
                      //  narr.push('label:'+dataValue)
                      var obj = {'value':id, 'label':dataValue}
                        lastares.push(obj)
                       // console.log(narr)

                    }

                // console.log(lastares);
                 this.typeoptions=lastares

            

               //  let data2=JSON.stringify(datares).replace(/id/g,"value").replace(/dataValue/g,"label")
              
            })
        },
        selectchange(parms)
        {
          const {value,label}=parms
          this.$emit('childvalue',parms)
          
        }
    }
  }
</script>