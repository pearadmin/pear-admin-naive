<script setup lang="ts">
  import Icon from '@/components/Icon'
  import { NElement } from 'naive-ui'
</script>

<template>
  <NElement
    class="pear-admin-settings"
  >
    <Icon name="ic:sharp-settings"></Icon>
  </NElement>
</template>

<style scoped lang="less">
  .pear-admin-settings {
    @apply h-full flex flex-row justify-center items-center;
    padding: 0 10px;
    cursor: pointer;
    //background: var(--primaryColor);
    //background: green;
    color: var(--primary-color);
    &:hover {
      background: var(--hover-color);
      //background: var(--option-color-hover);
      //background: var(--primaryColor);
    }
  }
</style>
