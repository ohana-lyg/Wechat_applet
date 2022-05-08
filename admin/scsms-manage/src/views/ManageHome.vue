<template>
  <div class="sss">
    <n-layout class="layout" position="absolute">
      <n-layout-header class="layout-header" bordered :inverted="inverted">
        <div class="header-title">校园点餐管理平台</div>
        <div class="switch-wrap">
          <span class="switch-font">switch</span>
          <n-switch v-model:value="inverted" />
        </div>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 50px; bottom: 0">
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="50"
          :width="180"
          :native-scrollbar="false"
          :inverted="inverted"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="46"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <n-message-provider>
            <router-view></router-view>
          </n-message-provider>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts">
import { h, defineComponent, ref, onMounted, Component } from "vue";

import { RouterLink } from "vue-router";

import {
  NIcon,
  NSwitch,
  NLayout,
  NLayoutHeader,
  NMenu,
  NLayoutSider,
  NMessageProvider,
  MenuOption,
} from "naive-ui";

import { People as PeopleIcon, Apps as AppIcon } from "@vicons/ionicons5";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "order",
          },
        },
        { default: () => "订单管理" }
      ),
    key: "go-to-order",
    // disabled: true,
    icon: renderIcon(AppIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "people",
          },
        },
        { default: () => "用户管理" }
      ),
    key: "go-to-people",
    // disabled: true,
    icon: renderIcon(PeopleIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "comment",
          },
        },
        { default: () => "评论管理" }
      ),
    key: "go-to-comment",
    // disabled: true,
    icon: renderIcon(AppIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "business",
          },
        },
        { default: () => "商家管理" }
      ),
    key: "go-to-business",
    // disabled: true,
    icon: renderIcon(AppIcon),
  },
];

export default defineComponent({
  name: "ManageHome",
  components: {
    NLayoutSider,
    NMenu,
    NSwitch,
    NLayout,
    NLayoutHeader,
    NMessageProvider,
  },
  setup() {
    return {
      inverted: ref(true),
      menuOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-header {
  height: 50px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-title {
    font-size: large;
  }
  .switch-wrap {
    width: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    .switch-font {
      margin-right: 5%;
    }
  }
}
</style>
