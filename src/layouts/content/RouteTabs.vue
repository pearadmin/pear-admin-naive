<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import userRouteTabs from './useRouteTab'
  import { computed } from 'vue'
  import { useLayoutContextData } from '@/layouts/createLayoutContextData'

  const route = useRoute()

  const {
    tags,
    handleCloseTag,
    handleClickTag,
    handleCloseLeft,
    handleCloseOther,
    handleCloseRight
  } = userRouteTabs()

  const { provideState } = useLayoutContextData()
  const handleRefresh = computed(() => {
    return provideState.value.refreshRouterView
  })
</script>

<template>
  <NElement tag="div" class="pear-admin-tabs">
    <NScrollbar x-scrollable style="width: calc(100% - 60px)" class="p-2">
      <div class="pear-admin-tabs-left">
        <NTag
          v-for="tag in tags"
          :key="tag.path"
          class="pear-admin-tabs-left-item"
          :closable="tags.length > 1"
          :on-close="
            () => {
              handleCloseTag(tag)
            }
          "
        >
          <div class="pear-admin-tabs-left-item-content" @click="handleClickTag(tag)">
            <NBadge v-if="route.name === tag.name" dot type="success" />
            <span class="ml-2">{{ tag?.title }}</span>
          </div>
        </NTag>
      </div>
    </NScrollbar>
    <div class="pear-admin-tabs-right-menu">
      <NSpace justify="center" align="center" :wrap="false" item-style="display:flex;">
        <TabRefresh :refresh="handleRefresh" />
        <TabsAction
          :close-left="handleCloseLeft"
          :close-right="handleCloseRight"
          :close-other="handleCloseOther"
        />
      </NSpace>
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
    background: var(--hover-color);
    &-left {
      //padding: 0 5px;
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
    }
  }
</style>
