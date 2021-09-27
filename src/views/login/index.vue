<script lang="ts" setup>
  import {
    NForm,
    NFormItem,
    useMessage,
    NInput,
    NElement,
    NGrid,
    NGi,
    NCheckbox,
    NButton,
    NSpin
  } from 'naive-ui'
  import { markRaw, ref, computed, watch } from 'vue'
  // import { getCapture, login } from '@/api/moduels/app/app'
  import { useApi } from '@/api/http/useApi'
  // formRef
  const formRefEl = ref<null | typeof NForm>(null)
  // form model
  const model = ref({
    username: 'admin',
    password: 'admin',
    captchaCode: ''
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

  // login button disabled
  const btnNotDisable = computed(() =>
    Object.values(model.value).every((val) => val && val.trim() !== '')
  )

  // 验证码
  // const {
  //   data: validateCodeState,
  //   isFinished: hasCode,
  //   isLoading: codeLoading,
  //   execute: refreshValidateCode
  // } = useApi('/user/getCapture')

  const validateCodeState = {code: '', image: ''}
  const hasCode = ref(false)
  const codeLoading = ref(false)
  const loginLoading = ref(false)
  const refreshValidateCode = () => {}
  useApi()

  // console.log(validateCodeState)

  // 自动填写验证码
  watch(hasCode, (code) => {
    if (code) {
      model.value.captchaCode = validateCodeState.value?.code
    }
  })

  // 重新加载验证码
  function reloadCapture() {
    refreshValidateCode()
  }


  // login
  // const {
  //   data: loginData,
  //   isFetching: loginLoading,
  //   execute: loginFn,
  //   isFinished
  // } = useApi('user/login').post({username: 'nmd', password: 'nnn'}).json()
  async function handleLogin() {
    console.log(model)
    await loginFn()
  }

</script>
<template>
  <div class="px-5 login-wrapper">
    <!--    <ThemeTool class="float-right my-4 mr-4" />-->
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
        <n-form-item class="block" path="captchaCode">
          <n-grid x-gap="12" :cols="2">
            <n-gi>
              <n-input v-model:value="model.captchaCode" placeholder="请输入验证码" maxlength="5" />
            </n-gi>
            <n-gi class="flex flex-row-reverse">
              <n-spin :show="codeLoading">
                <img
                  class="cursor-pointer"
                  :src="validateCodeState?.image"
                  alt="验证码"
                  :loading="codeLoading"
                  @click="reloadCapture"
                />
              </n-spin>
            </n-gi>
          </n-grid>
        </n-form-item>
        <n-form-item class="block">
          <n-grid :cols="2" :x-gap="24">
            <n-checkbox>记住我</n-checkbox>
            <n-element
              tag="a"
              href="javascript:;"
              class="block text-right"
              style="color: var(--primary-color); transition: 0.3s var(--cubic-bezier-ease-in-out)"
            >
              忘记密码
            </n-element>
          </n-grid>
        </n-form-item>
        <n-form-item class="block">
          <n-button
            :disabled="!btnNotDisable"
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
    @apply w-full h-screen absolute;
    background: url('@/assets/svg/background.svg') no-repeat;
    background-size: cover;
  }
</style>
