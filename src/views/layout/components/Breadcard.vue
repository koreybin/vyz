<template>
  <div class="wu" style="display: flex">
    <!-- <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
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
          v-for="(tag, index) in Array.from(majorVisitedViews)"
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
          <li @click="reloadCurrent">刷新当前页</li>
        </div>
      </div>
    </scroll-pane>
  </div>
</template>

<script>
import { generateTitle } from "@/utils/i18n";
import { mapGetters } from "vuex";
import ScrollPane from "@/components/ScrollPane";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
export default {
  inject: ["reload"],
  data() {
    return {
      showClose: false,
    };
  },
  components: {
    Hamburger,
    Breadcrumb,
    ScrollPane,
  },
  computed: {
    majorVisitedViews() {
      return this.$store.state.tagsView.majorVisitedViews;
    },
    ...mapGetters(["sidebar", "name", "avatar"]),
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {
    this.closeAll();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    closeCurrent() {
      const route = this.generateRoute();
      this.$store.dispatch("delMajorVisitedViews", route).then((views) => {
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
    reloadCurrent() {
      this.reload();
    },
    generateTitle, // generateTitle by vue-i18n
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch("addMajorVisitedViews", route);
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
    closeSelectedTag(view) {
      this.$store.dispatch("delMajorVisitedViews", view).then((views) => {
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
    closeOthersTags() {
      this.$router.push(this.selectedTag.path);
      this.$store.dispatch("delMajorOthersViews", this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAll() {
      this.$store.dispatch("delMajorAllViews");
      this.$router.push("/");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-wrapper {
  .tags-view-item {
    display: inline-block;
    position: relative;
    min-width: 60px;
    text-align: center;
    height: 26px;
    line-height: 26px;
    border: 1px solid rgb(230, 104, 104);
    color: #fff;
    background: rgb(152, 0, 0);
    padding: 0 8px;
    font-size: 12px;
    margin-top: 4px;
    vertical-align: super;
    &:first-of-type {
      margin-left: 15px;
    }
    &.active {
      background-color: #f3a807;
      color: #fff;
      border-color: #f3a807;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
}

.navbar {
  height: 40px;
  line-height: 40px;
  border-radius: 0px !important;
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
.wu {
  height: 40px;
  border-bottom: 1px dashed #ccc;
}
.wr {
  position: relative;
  float: right;
  div {
    position: absolute;
    height: 70px;
    line-height: 20px;
    width: 80px;
    text-align: center;
    bottom: -70px;
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
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #999;
    position: absolute;
    border: 1px solid #d0d0d0;
    border-radius: 0 2px 2px 0;
    text-align: center;
    right: -20px;
    bottom: 3px;
    cursor: pointer;
    content: "▼";
  }
}
</style>
