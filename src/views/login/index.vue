<script lang="ts" setup>
  import { markRaw, ref } from 'vue'
  import { useUserStore } from '@/store/modules/userInfo'
  import type { FormState } from '@/views/login/type'
  import { NForm } from 'naive-ui'
  import { useRouter } from 'vue-router'
  import { login } from '@/api/moduels/demo/app'

  const userStore = useUserStore()
  const router = useRouter()

  // form refEl
  const formRefEl = ref<typeof NForm | null>(null)
  // form model
  const model = ref<FormState>({
    username: 'admin',
    password: 'admin'
  })

  const rules = markRaw({
    username: [
      {
        required: true,
        message: '请输入账号'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码'
      }
    ],
    captchaCode: [
      {
        required: true,
        message: '请输入验证码'
      }
    ]
  })

  // login
  const { data: loginData, loading: loginLoading, executor: loginFn } = login(model)

  // 登录
  async function handleLogin() {
    await formRefEl.value?.validate()
    await loginFn.value()
    if (loginData.value) {
      userStore.setUserInfo(loginData.value?.userInfo as Recordable)
      userStore.setToken(loginData.value?.token as string)
      userStore.setUserMenuRoutes()
      await router.push({
        name: 'Dashboard'
      })
    }
  }
</script>
<template>
  <div class="login-wrapper">
    <ThemeTool class="float-right my-4 mr-4" />
    <div class="relative w-full py-5 my-40 ml-auto mr-auto login-form sm:w-full">
      <div class="flex flex-row items-center justify-around">
        <img class="w-16" src="~@/assets/logo.png" alt="" />
        <n-element
          tag="h2"
          class="text-4xl"
          style="color: var(--primary-color); transition: 0.3s var(--cubic-bezier-ease-in-out)"
        >
          Pear Admin
        </n-element>
      </div>
      <n-form ref="formRefEl" class="mt-10" :model="model" :rules="rules" size="large">
        <n-form-item path="username">
          <n-input v-model:value="model.username" placeholder="请输入账号(admin)" />
        </n-form-item>
        <n-form-item class="block" path="password">
          <n-input
            v-model:value="model.password"
            type="password"
            placeholder="请输入密码(admin)"
            show-password-on="click"
          />
        </n-form-item>
        <n-form-item class="block">
          <n-grid :cols="2" :x-gap="24">
            <n-gi>
              <n-checkbox>记住我</n-checkbox>
            </n-gi>
            <n-gi class="flex flex-row justify-end">
              <n-button text class="block text-right">忘记密码</n-button>
            </n-gi>
          </n-grid>
        </n-form-item>
        <n-form-item class="block">
          <n-button
            type="primary"
            class="w-full"
            attr-type="submit"
            :loading="loginLoading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>
<style scoped lang="less">
  @screen md {
    .login-form {
      width: 340px;
    }
  }

  .login-wrapper {
    @apply w-full absolute;
    background: url('@/assets/svg/background.svg') no-repeat;
    background-size: cover;
  }
</style>
