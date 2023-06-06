<template>
  <div style="width: 900px">
    <div
      style="
        width: 890px;
        background: #edd35f;
        clear: both;
        padding-top: 15px;
        padding-bottom: 15px;
        border: 5px #fff solid;
      "
    >
      {{ this.dataName }}

      <el-checkbox
        label="显示菜单"
        v-model="checkVa1"
        :checked="checkedcheckbox(this.status)"
      ></el-checkbox>
    </div>
    <div
      v-for="item2 in this.children"
      :key="item2.dictionaryId"
      style="width: 900px; float: left"
    >
      <div
        style="
          width: 890px;
          background: #f7f8d0;
          padding-top: 5px;
          padding-bottom: 5px;
          border: 5px #fff solid;
        "
      >
        <el-checkbox
          :label="item2.dataName"
          :key="item2.dictionaryId"
          v-model="checkVa2"
          :checked="checkedcheckbox(item2.status)"
        ></el-checkbox>
      </div>
      <div
        v-for="item3 in item2.children"
        :key="item3.dictionaryId"
        style="width: 150px; float: left"
      >
        <el-checkbox
          :label="item3.dataName"
          v-model="checkVa3"
          :checked="checkedcheckbox(item3.status)"
        ></el-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dictionaryId", "children", "dataName", "status"],
  created() {
    // console.log(this.dictionaryId + "自给接收到");
  },

  watch: {
    dictionaryId(val, oldVal) {
      if (val != oldVal) {
        console.log("变化了3");
      }

      console.log(val + "页面接收到了3");
    },
  },

  data() {
    return {
      checkVa1: "",

      checkVa2: [],
      checkVa3: [],
    };
  },

  methods: {
    checkedcheckbox(statu) {
      if (statu == 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.row_zhu1 {
  width: 100%;
  border: 1px solid #999;
}
</style>