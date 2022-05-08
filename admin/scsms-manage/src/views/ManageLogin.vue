<template>
  <div class="bg-wrap">
    <div class="login-wrap">
      <n-message-provider>
        <login-form></login-form>
      </n-message-provider>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { NMessageProvider } from "naive-ui";

import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "ManageLogin",
  components: {
    NMessageProvider,
    LoginForm,
  },
  setup() {},
};
</script>

<style lang="scss">
.bg-wrap {
  background-color: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.login-wrap {
  width: 30%;
  height: 300px;
  background-color: #fff;
  opacity: 0.9;
  border-radius: 20px;
}
</style>
