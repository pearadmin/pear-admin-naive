<script setup lang="ts">
  const { showTitle = true } = defineProps<{
    showTitle: boolean
  }>()
</script>

<template>
  <div class="pear-admin-app-logo">
    <img v-if="!showTitle" src="@/assets/logo.png" alt="logo" />
    <span v-if="showTitle" class="pear-admin-app-logo-title">Pear Admin Naive</span>
  </div>
</template>

<style scoped lang="less">
  .pear-admin-app-logo {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    padding: 5px 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    img {
      width: 35px;
      height: auto;
    }
    &-title {
      font-weight: bolder;
      opacity: 100%;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
