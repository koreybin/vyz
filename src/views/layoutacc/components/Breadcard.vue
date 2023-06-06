<template>
  <div class="wu" style="display: flex; width: 100%">
    <!-- <el-menu class="navbar" mode="horizontal">
      <hamburger
        class="hamburger-container"
        :toggleClick="toggleSideBar"
        :isActive="sidebar.opened"
      ></hamburger>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
    </el-menu> -->
    <scroll-pane
      class="tags-view-wrapper"
      ref="scrollPane"
      style="overflow: visible"
    >
      <div>
        <router-link
          ref="tag"
          class="tags-view-item"
          :class="isActive(tag) ? 'active' : ''"
          v-for="(tag, index) in Array.from(minorVisitedViews)"
          :to="tag.path"
          :key="tag.path"
          @contextmenu.prevent.native="openMenu(tag, $event)"
        >
          {{ generateTitle(tag.title) }}
          <span
            class="el-icon-close"
            v-show="index != 0"
            @click.prevent.stop="closeSelectedTag(tag)"
          ></span>
        </router-link>
      </div>
      <div class="wr" @click="showClose = !showClose">
        <div v-if="showClose">
          <li @click="closeAll">关闭全部</li>
          <li @click="closeCurrent">关闭当前页</li>
        </div>
      </div>
    </scroll-pane>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { generateTitle } from "@/utils/i18n";
import Breadcrumb from "@/components/BreadcrumbAcc";
import Hamburger from "@/components/Hamburger";
import ScrollPane from "@/components/ScrollPane";
export default {
  data() {
    return {
      setHead: false,
      showClose: false,
      set: false,
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      headUrl: null,
      index: "",
    };
  },
  components: {
    Hamburger,
    Breadcrumb,
    ScrollPane,
  },
  computed: {
    minorVisitedViews() {
      return this.$store.state.tagsView.minorVisitedViews;
    },
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    },
  },
  mounted() {
    this.$store.dispatch("getCustomData");
    // this.addViewTags();
    this.$router.push("/dashboardacc/dashboardacc");
    let headUrl = localStorage.getItem("headUrl");
    if (headUrl == "null") {
      this.headUrl = require("@/assets/img/default.png");
    } else {
      this.headUrl = headUrl;
    }
  },
  methods: {
    closeCurrent() {
      const route = this.generateRoute();
      this.$store.dispatch("delMinorVisitedViews", route).then((views) => {
        if (this.isActive(route)) {
          const latestView = views.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            this.$router.push("/");
          }
        }
      });
    },
    closeAll() {
      this.$store.dispatch("delMinorAllViews");
      this.$router.push("/dashboardacc/dashboardacc");
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch("addMinorVisitedViews", route);
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    closeSelectedTag(view) {
      this.index = view;
      this.$store.dispatch("delMinorVisitedViews", view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            this.$router.push("/");
          }
        }
      });
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    generateTitle,
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    openMenu(tag, e) {
      this.visible = true;
      this.selectedTag = tag;
      this.left = e.clientX;
      this.top = e.clientY;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wu {
  height: 40px;
  border-bottom: 1px dashed #ccc;
}
.navbar {
  height: 40px;
  line-height: 40px;
  border-radius: 0px !important;
  width: 100%;
  border-bottom: 1px solid #ccc;

  position: fixed;
  background: #fff;
  z-index: 999;

  .breadcrumb-container {
    float: left;
  }

  .hamburger-container {
    line-height: 45px;
    height: 40px;
    float: left;
    padding: 0 10px;
  }
}
.tags-view-item {
  display: inline-block;
  position: relative;
  line-height: 30px;
  min-width: 60px;
  border-right: 1px solid #eee;
  color: #000;
  background: #f8f8f8;
  padding: 0 8px;
  font-size: 12px;
  margin-top: 4px;
  vertical-align: super;
  &:first-of-type {
    margin-left: 15px;
  }
  &:last-of-type {
    border-right: none;
  }
  &.active {
    background-color: #436ec9;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    border-color: #436ec9;
  }
}
.wr {
  position: relative;
  float: right;
  div {
    position: absolute;
    height: 50px;
    line-height: 20px;
    width: 80px;
    text-align: center;
    bottom: -50px;
    left: -55px;
    padding: 4px 0;
    font-size: 12px;
    background-color: #fff;
    border: 1px solid #d0d0d0;
    box-shadow: 0 0 10px #ddd;
    z-index: 10000;
  }
  div li:hover {
    background-color: #ddd;
    cursor: pointer;
  }
  &::before {
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #999;
    position: absolute;
    border: 1px solid #d0d0d0;
    border-radius: 0 2px 2px 0;
    text-align: center;
    right: -25px;
    bottom: 1px;
    cursor: pointer;
    content: "▼";
  }
}
</style>
