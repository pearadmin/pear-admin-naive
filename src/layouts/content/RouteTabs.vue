<script lang="ts">
  export default {
    name: 'RouteTabs'
  }
</script>

<script setup lang="ts">
  import { NScrollbar, NSpace, NTag } from 'naive-ui'
  import Icon from '@/components/Icon'
  import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'

  const route = useRoute()
  console.log(route)

  const tags = ref<Recordable[]>([])
  onMounted(() => {
    tags.value = new Array(20).fill('').map((it) => {
      return {
        label: route.meta.title,
        name: route.name
      }
    })
  })
</script>

<template>
  <div class="pear-admin-tabs">
    <NScrollbar x-scrollable style="width: calc(100% - 50px)">
      <div class="pear-admin-tabs-left">
        <NTag closable class="pear-admin-tabs-left-item" v-for="tag in tags" :key="tag.name">
          <div class="pear-admin-tabs-left-item-content">
            {{ tag.label }}
          </div>
        </NTag>
      </div>
    </NScrollbar>
    <div class='pear-admin-tabs-right-menu'>
      <Icon class='pear-admin-tabs-right-menu-icon' name="mdi:refresh" :size='20'></Icon>
      <Icon class='pear-admin-tabs-right-menu-icon' name="mdi:arrow-down-drop-circle-outline" :size="18"></Icon>
    </div>
  </div>
</template>

<style scoped lang="less">
  .pear-admin-tabs {
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-left {
      padding: 0 5px;
      white-space: nowrap;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      &-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 5px;
        }
        &-content {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          align-content: center;
        }
        &-icon {
          cursor: pointer;
          margin-left: 5px;
        }
      }
    }
    &-right-menu {
      width: auto;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 0 5px;
      &-icon {
        &:not(:first-child) {
          margin-left: 5px;
        }
      }
    }
  }
</style>
