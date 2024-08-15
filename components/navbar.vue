<script lang="ts">
import { Layout, Menu } from "ant-design-vue";

export default defineComponent({
  components: {
    "a-layout": Layout,
    "a-layout-header": Layout.Header,
    "a-layout-content": Layout.Content,
    "a-menu": Menu,
    "a-menu-item": Menu.Item,
  },
  setup() {
    const handleLogout = () => {
      console.log("logout!");
    };
    return { handleLogout };
  },
});
</script>

<template>
  <a-menu mode="horizontal" class="py-2 px-4">
    <a-menu-item class="border border-[#00336B] inline-block my-[10px]">
      <span class="text-[#00336B]">ERP4</span>
      <span class="text-[#6A6E05]">Impact</span>
    </a-menu-item>
    <a-menu-item key="dashboard">
      <nuxt-link to="/">Dashboard</nuxt-link>
    </a-menu-item>
    <a-menu-item key="expenses">
      <nuxt-link to="/expenses">Expenses</nuxt-link>
    </a-menu-item>
    <a-menu-item key="advances">
      <nuxt-link to="/advances">Advances</nuxt-link>
    </a-menu-item>
    <a-menu-item key="donors">
      <nuxt-link to="/donors">Donors</nuxt-link>
    </a-menu-item>
    <a-menu-item key="donations">
      <nuxt-link to="/donations">Donations</nuxt-link>
    </a-menu-item>
    <a-menu-item key="grants">
      <nuxt-link to="/grants">Grants</nuxt-link>
    </a-menu-item>
    <a-menu-item key="pledges">
      <nuxt-link to="/pledges">Pledges</nuxt-link>
    </a-menu-item>
    <a-menu-item key="budgets">
      <nuxt-link to="/budgets">Budgets</nuxt-link>
    </a-menu-item>

    <a-menu-item key="utilities">
      <nuxt-link to="/utilities">Utilities</nuxt-link>
    </a-menu-item>
    <a-menu-item key="setup"
      ><nuxt-link to="/setup">Setup</nuxt-link></a-menu-item
    >
    <a-menu-item key="admin">
      <nuxt-link to="/admin">Admin</nuxt-link>
    </a-menu-item>
    <a-menu-item key="Support">
      <nuxt-link to="/support">Support</nuxt-link>
    </a-menu-item>
    <a-menu-item @click="handleLogout">Logout</a-menu-item>
  </a-menu>
</template>
