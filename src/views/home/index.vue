<template>
  <div> abcd </div>
</template>

<script setup lang="ts">
  const response = await fetch('/api/get')
  console.log(response)
</script>

<style scoped lang="less"></style>
