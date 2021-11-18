<script setup lang="tsx">
  import Icon from '@/components/Icon'
  import { NElement, NDropdown, NAvatar } from "naive-ui";

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
      label: '退出登录',
      key: 'logout',
      icon: () => <Icon name="ant-design:logout-outlined"></Icon>
    }
  ]
  function handleSelect() {}
</script>

<template>
  <n-dropdown trigger="hover" @select="handleSelect" :options="options">
    <NElement
      tag="div"
      class="pear-admin-user-dropdown"
    >
      <NAvatar
        round
        :size="24"
        object-fit="cover"
        src="https://www.yuexiaoya.cn/images/photo.jpg"
      />
      <span class="ml-2">落梅听风雪</span>
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
