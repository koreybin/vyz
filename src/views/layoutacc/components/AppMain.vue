<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="minorCachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    minorCachedViews() {
      return this.$store.state.tagsView.minorCachedViews;
    },
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  methods: {},
};
</script>
<style scoped>
.app-main {
  height: calc(100% - 100px);
}
</style>
