<script setup lang="tsx">
  import { computed } from 'vue'
  import { useLayoutContextData } from '@/layouts/createLayoutContextData'
  import Icon from '@/components/Icon/Icon.vue'

  const options = [
    {
      label: '个人中心',
      key: 'center',
      icon: () => <Icon name="ph:user-light"></Icon>
    },
    {
      label: '个人设置',
      key: 'setting',
      icon: () => <Icon name="ri:user-settings-line"></Icon>
    },
    {
      type: 'divider',
      key: 'divider'
    },
    {
      label: '项目地址',
      key: 'github',
      icon: () => <Icon name="mdi:github"></Icon>
    },
    {
      label: '使用文档',
      key: 'docs',
      icon: () => <Icon name="iconoir:google-docs"></Icon>
    },
    {
      type: 'divider',
      key: 'divider'
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: () => <Icon name="ant-design:logout-outlined"></Icon>
    }
  ]

  const { provideState } = useLayoutContextData()

  const isMobile = computed(() => {
    return provideState.value.isMobile
  })

  // const router = useRouter()

  function handleSelect(key: string) {
    switch (key) {
      case 'github':
        window.open('https://github.com/pearadmin/pear-admin-naive', '_target')
        break
      case 'docs':
        window.open('http://naive-doc.pearadmin.com/', '_target')
        break
      case 'logout':
        sessionStorage.clear()
        window.location.reload()
        break
    }
  }
</script>

<template>
  <n-dropdown trigger="hover" :on-select="handleSelect" :options="options">
    <NElement tag="div" class="pear-admin-user-dropdown" placement="bottom-end">
      <NAvatar
        round
        :size="24"
        object-fit="cover"
        src="https://www.yuexiaoya.cn/images/photo.jpg"
      />
      <span v-if="!isMobile" class="ml-2">落梅听风雪</span>
    </NElement>
  </n-dropdown>
</template>

<style scoped lang="less">
  .pear-admin-user-dropdown {
    @apply h-full flex flex-row justify-center items-center;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: var(--hover-color);
    }

    &-avatar {
    }
  }
</style>
