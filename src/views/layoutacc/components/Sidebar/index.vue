<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :default-active="$route.path"
      background-color="#30598c"
      unique-opened
      text-color="#ffffff"
    >
      <sidebar-item :routes="permission_routers2"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBarAcc";

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(["permission_routers2", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
