<template>
  <div class="form-wrap">
    <n-form class="form-info" :model="model" :rules="rules">
      <n-form-item class="input" path="username">
        <n-input
          v-model:value="model.username"
          size="large"
          placeholder="用户名"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item class="input" path="password">
        <n-input
          v-model:value="model.password"
          size="large"
          placeholder="密码"
          @keydown.enter.prevent
        />
      </n-form-item>
    </n-form>
    <n-button
      class="form-btn"
      size="large"
      type="primary"
      :disabled="isDisabled"
      @click="messageSubmit"
      >Login</n-button
    >
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs, watch } from "vue";

import { NInput, NForm, NFormItem, NButton, useMessage } from "naive-ui";

import { login } from "../apis/auth";
import { LoginInfo } from "../types/types";
import { useRouter } from "vue-router";

export default {
  name: "LoginForm",
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
  },

  setup() {
    const userInfo = ref<LoginInfo>({
      username: "zhangsan",
      password: "zhangsan123",
    });

    const isDisabled = ref(true);

    const router = useRouter();

    const message = useMessage();

    const messageSubmit = (): void => {
      const data: LoginInfo = {
        username: userInfo.value.username,
        password: userInfo.value.password,
      };
      login(data).then((res) => {
        console.log(res);
        if (res) {
          router.push({ path: "/home" });
        } else if (res.status === 1) {
          message.error(res.msg, { duration: 2000 });
        }
      });
    };

    watch(
      () => {
        return userInfo.value.username && userInfo.value.password;
      },
      (value) => {
        value ? (isDisabled.value = false) : (isDisabled.value = true);
      }
    );

    const rules = {
      username: [
        {
          required: true,
          validator(rule: any, value: string) {
            if (!value) {
              return new Error("需要填写用户名");
            } else if (!/^[a-zA-Z0-9_-]{4,16}$/.test(value)) {
              return new Error("4到16位(字母，数字，下划线，减号)");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
          required: true,
          validator(rule: any, value: string) {
            if (!value) {
              return new Error("需要填写密码");
            } else if (
              !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)
            ) {
              return new Error("密码至少包含 数字和英文，长度6-20");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
    };

    return {
      model: userInfo,
      rules,
      messageSubmit,
      isDisabled,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-info {
  width: 90%;
  margin-left: 10%;
  margin-top: 25px;

  .input {
    width: 90%;
  }
}
.form-btn {
  width: 30%;
  margin-left: 31%;
  margin-top: 10px;
}
</style>
