<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar></navbar>
      <sidebar class="sidebar-container sidebar"></sidebar>
      <breadcard></breadcard>
      <app-main></app-main>
      <fix-wrap></fix-wrap>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, Breadcard, FixWrap } from "./components";
export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Breadcard,
    FixWrap,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.tags-navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  //  background-image: url('~@/assets/images/4e.png');

  position: fixed;
  z-index: 1001;
  width: 100%;
  color: white;
}
.sidebar {
  background-color: #30598c;
}
.sidebarul {
  background-color: #30598c !important;
}
.main-container {
  height: 100%;
}
</style>
