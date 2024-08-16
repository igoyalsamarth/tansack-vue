<script lang="ts">
import { Layout, Menu } from 'ant-design-vue';

export default defineComponent({
  components: {
    'a-layout': Layout,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,
    'a-menu': Menu,
    'a-menu-item': Menu.Item
  },
  setup() {
    const route = useRoute();
    const selectedKeys = computed(() => [
      route.path === '/' ? 'dashboard' : route.path.slice(1)
    ]);

    const handleLogout = () => {
      console.log('logout!');
    };
    return { handleLogout, selectedKeys };
  }
});
</script>

<template>
  <a-menu mode="horizontal" class="w-full px-6 flex items-center text-[#71717A] font-medium" :selected-keys="selectedKeys">
    <a-menu-item :disabled="true" class="border hover:cursor-default border-[#00336B]">
      <span class="text-[#00336B] text-sm font-medium">ERP4</span>
      <span class="text-[#6A6E05] text-sm font-normal">Impact</span>
    </a-menu-item>
    <a-menu-item class="py-2" key="dashboard">
      <nuxt-link to="/">Dashboard</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="expenses">
      <nuxt-link to="/expenses">Expenses</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="advances">
      <nuxt-link to="/advances">Advances</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="donors">
      <nuxt-link to="/donors">Donors</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="donations">
      <nuxt-link to="/donations">Donations</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="grants">
      <nuxt-link to="/grants">Grants</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="pledges">
      <nuxt-link to="/pledges">Pledges</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="budgets">
      <nuxt-link to="/budgets">Budgets</nuxt-link>
    </a-menu-item>
    <a-menu-item key="utilities" class="utilities py-2">
      <nuxt-link to="/utilities">Utilities</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="setup"
      ><nuxt-link to="/setup">Setup</nuxt-link></a-menu-item
    >
    <a-menu-item class="py-2" key="admin">
      <nuxt-link to="/admin">Admin</nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" key="Support">
      <nuxt-link to="/support" class="flex items-center justify-between">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.364 6.136L14.828 9.672M18.364 6.136C16.6762 4.44817 14.3869 3.5 12 3.5C9.61305 3.5 7.32383 4.44817 5.636 6.136M18.364 6.136C20.0518 7.82383 21 10.1131 21 12.5C21 13.6819 20.7672 14.8522 20.3149 15.9442C19.8626 17.0361 19.1997 18.0283 18.364 18.864M14.828 9.672C14.0779 8.92185 13.0609 8.5 12 8.5C10.9391 8.5 9.92215 8.92185 9.172 9.672M14.828 9.672C15.5781 10.4221 16 11.4391 16 12.5C16 13.5609 15.5781 14.5779 14.828 15.328M14.828 15.328L18.364 18.864M14.828 15.328C14.0779 16.0781 13.0609 16.5 12 16.5C10.9391 16.5 9.92215 16.0781 9.172 15.328M18.364 18.864C17.5283 19.6997 16.5361 20.3626 15.4442 20.8149C14.3522 21.2672 13.1819 21.5 12 21.5C10.8181 21.5 9.64778 21.2672 8.55585 20.8149C7.46392 20.3626 6.47173 19.6997 5.636 18.864M9.172 9.672L5.636 6.136M9.172 9.672C8.42185 10.4221 8 11.4391 8 12.5C8 13.5609 8.42185 14.5779 9.172 15.328M5.636 6.136C3.94817 7.82383 3 10.1131 3 12.5C3 13.6819 3.23279 14.8522 3.68508 15.9442C4.13738 17.0361 4.80027 18.0283 5.636 18.864M9.172 15.328L5.636 18.864"
            stroke="#52525B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <span>Support</span>
      </nuxt-link>
    </a-menu-item>
    <a-menu-item class="py-2" @click="handleLogout">Logout</a-menu-item>
  </a-menu>
</template>

<style>
.utilities {
  margin-left: auto !important;
}
</style>
