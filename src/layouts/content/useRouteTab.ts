import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, unref, watch } from 'vue'
import { useAppStore } from '@/store/modules/app'

export default function useRouteTab () {

  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()

  watch(() => route.path, () => {
    appStore.addTag({...route})
  }, { immediate: true })

  const tags = computed(() => appStore.tags)

  function refreshRoute () {
  }

  function handleClickTag (tag) {
    router.replace(tag.fullPath).catch(err => console.error(err))
  }

  function handleCloseTag (tag) {
    // 最后一个不删除
    if (tags.value.length === 1) {
      return
    }
    // 删除操作
    appStore.removeTag(tag)
    // 删除的跟当前页面是同一个, 路由回退上一个
    if (tag.name === route.name) {
      const last = tags.value[tags.value.length - 1]
      router.replace(last.fullPath).then(() => {}).catch(err => console.error(err))
    }
  }

  return {
    tags,
    handleCloseTag,
    handleClickTag
  }
}
