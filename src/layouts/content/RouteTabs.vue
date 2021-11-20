<script lang="ts">
  export default {
    name: 'RouteTabs'
  }
</script>

<script setup lang="ts">
  import { NScrollbar, NSpace, NTag, NElement, NBadge } from 'naive-ui'
  import Icon from '@/components/Icon'
  import { useRoute, useRouter } from 'vue-router'
  import userRouteTabs from './useRouteTab'
  import { onMounted, ref } from 'vue'

  const route = useRoute()
  const router = useRouter()

  const { tags, handleCloseTag, handleClickTag } = userRouteTabs()
</script>

<template>
  <NElement tag="div" class="pear-admin-tabs">
    <NScrollbar x-scrollable style="width: calc(100% - 50px)">
      <div class="pear-admin-tabs-left">
        <NTag
          class="pear-admin-tabs-left-item"
          v-for="tag in tags"
          :key="tag.name"
          :closable='tags.length > 1'
          @click="handleClickTag(tag)"
          :on-close="
            () => {
              handleCloseTag(tag)
            }
          "
        >
          <div class="pear-admin-tabs-left-item-content">
            <NBadge v-if="route.name === tag.name" dot type="success"></NBadge>
            <span class="ml-2">{{ tag.meta?.title }}</span>
          </div>
        </NTag>
      </div>
    </NScrollbar>
    <div class="pear-admin-tabs-right-menu">
      <Icon class="pear-admin-tabs-right-menu-icon" name="mdi:refresh" :size="20"></Icon>
      <Icon
        class="pear-admin-tabs-right-menu-icon"
        name="mdi:arrow-down-drop-circle-outline"
        :size="18"
      ></Icon>
    </div>
  </NElement>
</template>

<style scoped lang="less">
  .pear-admin-tabs {
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
    background: var(--hover-color);
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
          cursor: pointer;
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
        cursor: pointer;
        &:not(:first-child) {
          margin-left: 5px;
        }
      }
    }
  }
</style>
