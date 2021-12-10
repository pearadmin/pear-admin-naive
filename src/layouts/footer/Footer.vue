<script setup lang="ts"></script>

<template>
  <NLayoutFooter class="pear-admin-footer">
    <div>©{{ new Date().getFullYear() }} 落小梅</div>
    &nbsp;&nbsp;&nbsp;
    <div> 赞助: <a href="https://cmy.cn" target="_blank">茶猫云</a> </div>
  </NLayoutFooter>
</template>

<style scoped lang="less">
  .pear-admin-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }
</style>
