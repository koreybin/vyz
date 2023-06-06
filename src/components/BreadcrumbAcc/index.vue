<template>
<!-- 子系统tap标签内容 -->
<div style="height: 40px;">
    <svg-icon icon-class="home-alt"></svg-icon>
  <el-breadcrumb class="app-breadcrumb" separator="/">
  
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{generateTitle(item.meta.title)}}</span>
        <router-link v-else :to="item.redirect||item.path">{{generateTitle(item.meta.title)}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboardacc') {
        matched = [{ path: '/dashboardacc/dashboardacc', meta: { title: 'dashboardacc' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
     display: inline-block;
    font-size: 13px;
    line-height: 10px;
    margin-left: -5px;
    margin-top: 20px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
