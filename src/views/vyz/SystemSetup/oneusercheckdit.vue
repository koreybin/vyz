<template>
  <el-container>
    <el-row ref="oneusercheck">
      <el-col :span="24">
        <div v-for="item in list" :key="item.dictionaryId" style="width: 100%">
          <childcheck
            :dictionaryId="item.dictionaryId"
            :children="item.children"
            :dataName="item.dataName"
            :status="item.status"
            ref="childcheck"
          ></childcheck>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import { getlistByUser } from "@/api/authority";
import childcheck from "./childcheck.vue";
export default {
  components: { childcheck },
  props: ["userid"],
  watch: {
    userid(val, oldVal) {
      if (val != oldVal) {
      }

      this.getListbyuser();
    },
  },

  data() {
    return {
      list: null,
      checkboxobj: {
        dictionaryId: 0,
        dataName: "",
        statue: null,
        children: null,
      },
      cuk: 0,
    };
  },
  created() {
    this.getListbyuser();
  },

  methods: {
    getListbyuser() {
      console.log("this userid=" + this.userid);
      getlistByUser(this.userid).then((response) => {
        this.list = response.data.data;
        this.$forceUpdate();
      });
    },
    getAllcheckdata() {
      var che = this.$refs.childcheck.length;

      var lastdata = new Array();
      for (var i = 0; i < che; i++) {
        this.checkboxobj.dictionaryId = this.$refs.childcheck[i].dictionaryId;
        this.checkboxobj.dataName = this.$refs.childcheck[i].dataName;
        this.checkboxobj.statue = this.$refs.childcheck[i].checkVa1;
        if (this.$refs.childcheck[i].children != null) {
          var erjidata = new Array();
          for (var m = 0; m < this.$refs.childcheck[i].children.length; m++) {
            const checkboxobj2 = Object.assign(
              {},
              { dictionaryId: 0, dataName: "", statue: null, children: null }
            );
            checkboxobj2.dictionaryId =
              this.$refs.childcheck[i].children[m].dictionaryId;
            checkboxobj2.dataName =
              this.$refs.childcheck[i].children[m].dataName;
            checkboxobj2.statue = false;
            for (var j = 0; j < this.$refs.childcheck[i].checkVa2.length; j++) {
              if (
                this.$refs.childcheck[i].checkVa2[j] ==
                this.$refs.childcheck[i].children[m].dataName
              ) {
                console.log(this.$refs.childcheck[i].checkVa2[j]);
                checkboxobj2.statue = true;
              }
            }
            if (this.$refs.childcheck[i].children[m].children != null) {
              var lastdata2 = new Array();
              for (
                var n = 0;
                n < this.$refs.childcheck[i].children[m].children.length;
                n++
              ) {
                const checkboxobj3 = Object.assign(
                  {},
                  {
                    dictionaryId: 0,
                    dataName: "",
                    statue: null,
                    children: null,
                  }
                );
                checkboxobj3.dictionaryId =
                  this.$refs.childcheck[i].children[m].children[n].dictionaryId;
                checkboxobj3.dataName =
                  this.$refs.childcheck[i].children[m].children[n].dataName;
                checkboxobj3.statue = false;
                for (
                  var p = 0;
                  p < this.$refs.childcheck[i].checkVa3.length;
                  p++
                ) {
                  if (
                    this.$refs.childcheck[i].checkVa3[p] ==
                    this.$refs.childcheck[i].children[m].children[n].dataName
                  ) {
                    checkboxobj3.statue = true;
                  }
                }
                checkboxobj3.children = null;
                lastdata2[n] = checkboxobj3;
              }
              checkboxobj2.children = lastdata2;
            } else {
              checkboxobj2.children = null;
            }
            erjidata[m] = checkboxobj2;
          }
          this.checkboxobj.children = erjidata;
        } else {
          this.checkboxobj.children = null;
        }
        const tempData = Object.assign({}, this.checkboxobj);
        lastdata[i] = tempData;
      }

      return lastdata;
    },
  },
};
</script>