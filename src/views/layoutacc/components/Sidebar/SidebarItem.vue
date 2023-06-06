<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <router-link
        v-if="
          item.children.length === 1 &&
          !item.children[0].children &&
          !item.alwaysShow
        "
        v-show="item.meta.showed"
        :to="item.path + '/' + item.children[0].path"
        :key="item.children[0].name"
      >
        <el-menu-item
          class="zi"
          :index="item.path + '/' + item.children[0].path"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg-icon
            v-if="item.children[0].meta && item.children[0].meta.icon"
            :icon-class="item.children[0].meta.icon"
          ></svg-icon>
          <span v-if="item.children[0].meta && item.children[0].meta.title">{{
            generateTitle(item.children[0].meta.title)
          }}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <svg-icon
            v-if="item.meta && item.meta.icon"
            :icon-class="item.meta.icon"
          ></svg-icon>
          <span v-if="item.meta && item.meta.title">{{
            generateTitle(item.meta.title)
          }}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item
            :is-nest="true"
            v-show="item.meta.showed"
            class="nest-menu"
            v-if="child.children && child.children.length > 0"
            :routes="[child]"
            :key="child.path"
          ></sidebar-item>

          <router-link
            style="background: #fff"
            v-else
            :to="item.path + '/' + child.path"
            :key="child.name"
          >
            <el-menu-item
              :ref="child.name"
              class="zi"
              :index="item.path + '/' + child.path"
              v-show="child.meta.showed"
            >
              <!-- <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon> -->
              <span v-if="child.meta && child.meta.title">{{
                generateTitle(child.meta.title)
              }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { generateTitle } from "@/utils/i18n";
import { GetList } from "@/api/acc/InitialAmountOfCashFlow";
export default {
  name: "SidebarItem",
  data() {
    return {
      disabled: false,
    };
  },
  props: {
    routes: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    generateTitle,
  },
};
</script>
<style>
/* .el-menu li{border-bottom: 1px solid rgb(255, 150, 0);} */
/* .menu-wrapper{
    background-color: #30598c !important;
 } */
</style>