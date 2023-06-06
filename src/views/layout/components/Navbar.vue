<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref="scrollPane">
      <img src="@/assets/home/logo.png" class="logo" />
      <font class="title">{{ $t("navbar.title") }}</font>

      <el-menu class="navbar">
        <div class="right-menu">
          <error-log class="errLog-container right-menu-item"></error-log>

          <el-tooltip
            effect="dark"
            s
            :content="$t('navbar.screenfull')"
            placement="bottom"
          >
            <screenfull class="screenfull right-menu-item"></screenfull>
          </el-tooltip>

          <lang-select class="international right-menu-item"
            ><svg-icon icon-class="language"
          /></lang-select>

          <el-tooltip
            effect="dark"
            :content="$t('navbar.theme')"
            placement="bottom"
          >
            <theme-picker class="theme-switch right-menu-item"></theme-picker>
          </el-tooltip>

          <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper">
              <el-tooltip effect="dark" :content="name" placement="bottom">
                <img class="user-avatar" :src="headUrl" />
              </el-tooltip>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/">
                <el-dropdown-item>
                  {{ $t("navbar.dashboard") }}
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item @click.native="headUpload()">
                {{ $t("navbar.uploadHeadImg") }}
              </el-dropdown-item>
              <el-dropdown-item @click.native="hostSettings()">
                {{ $t("navbar.settings") }}
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="logout" style="display: block">{{
                  $t("navbar.logout")
                }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-menu>
    </scroll-pane>
    <ul
      class="contextmenu"
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags">Close All</li>
    </ul>
    <hostSettings v-if="set" ref="updatePassowrd"></hostSettings>
    <headUpload v-if="setHead" ref="head"></headUpload>
  </div>
</template>

<script>
import HostSettings from "./Nvbar-hostSettings";
import headUpload from "./Nvbar-headUpload";
import { mapGetters } from "vuex";
import ScrollPane from "@/components/ScrollPane";
import { generateTitle } from "@/utils/i18n";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import LangSelect from "@/components/LangSelect";
import ThemePicker from "@/components/ThemePicker";
import TagsView from "./Navbar";
export default {
  components: {
    headUpload,
    HostSettings,
    ScrollPane,
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker,
    TagsView,
  },
  data() {
    return {
      setHead: false,
      set: false,
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      headUrl: null,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"]),
  },

  created() {},
  mounted() {
    this.addViewTags();
    // console.log("标签", this.$route);

    let headUrl = localStorage.getItem("headUrl");
    if (headUrl == "null") {
      this.headUrl = require("@/assets/img/default.png");
    } else {
      this.headUrl = headUrl;
    }
    // console.log('路由：',this.$store.state.user);
  },
  methods: {
    // 个人设置
    hostSettings() {
      this.set = true;
      this.$nextTick(() => {
        this.$refs.updatePassowrd.init();
      });
    },
    // 头像上传
    headUpload() {
      this.setHead = true;
      this.$nextTick(() => {
        this.$refs.head.init();
      });
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
    closeAllTags() {
      this.$store.dispatch("delMajorAllViews");
      this.$router.push("/");
    },
    openMenu(tag, e) {
      this.visible = true;
      this.selectedTag = tag;
      this.left = e.clientX;
      this.top = e.clientY;
    },
    closeMenu() {
      this.visible = false;
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  .logo {
    display: inline-block;
    transition: width 0.28s;
    width: 35px !important;
    height: 35px;
    margin-right: 10px;
    margin-left: 10px;
    vertical-align: sub;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    vertical-align: super;
  }
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    background-color: rgb(152, 0, 0);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1001;
    width: 0;
    color: white;

    .errLog-container {
      display: inline-block;
      vertical-align: top;
      color: white;
    }
    .right-menu {
      color: white;
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
        color: white;
      }
      .screenfull {
        height: 20px;
        color: white;
      }
      .international {
        vertical-align: top;
        color: white;
      }
      .theme-switch {
        vertical-align: 15px;
        color: white;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            color: white;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
            color: white;
          }
        }
      }
    }
  }
  .tags-view-wrapper {
    background: rgb(152, 0, 0);
    height: 50px;
    border-bottom: 1px solid #b73162;
    box-shadow: 0 1px 3px 0 rgb(154, 0, 0), 0 0 3px 0 rgba(0, 0, 0, 0.04);
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
      margin-left: 5px;
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
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: rgb(6, 30, 245);
    box-shadow: 2px 2px 3px 0 rgba(223, 92, 92, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: rgba(202, 23, 23, 0.61);
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #d68e21;
        color: #fff;
      }
    }
  }
}
</style>
