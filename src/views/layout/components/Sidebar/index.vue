<template>
  <scroll-bar>
    <el-menu
      mode="vertical "
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#980000"
      text-color="#ffffff"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";

export default {
  components: { SidebarItem, ScrollBar },
  created() {
    console.log(this);
  },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
