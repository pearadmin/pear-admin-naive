<script setup lang="ts"></script>

<template>
  <NElement class="pear-admin-settings" tag="span">
    <Icon name="ic:sharp-settings" />
  </NElement>
</template>

<style scoped lang="less">
  .pear-admin-settings {
    @apply h-full flex flex-row justify-center items-center;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: var(--hover-color);
    }
  }
</style>
