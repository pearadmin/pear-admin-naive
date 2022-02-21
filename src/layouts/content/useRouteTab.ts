import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { RouteTag } from '@/store/modules/app'
import { useAppStore } from '@/store/modules/app'
import { ErrorPageNames } from '@/router/modules/errors'

export interface ReturnUseRouteTab {
  tags: ComputedRef<RouteTag[]>
  handleCloseTag: (tag: RouteTag) => void
  handleClickTag: (tag: RouteTag) => void
  handleCloseLeft: () => void
  handleCloseRight: () => void
  handleCloseOther: () => void
}

export default function useRouteTab(): ReturnUseRouteTab {
  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()

  watch(
    () => route.path,
    () => {
      const { name } = route
      if (!ErrorPageNames.includes(name as string)) {
        appStore.addTag({
          path: route.path,
          fullPath: route.fullPath,
          name: route.name as string,
          title: route.meta.title
        })
      }
    },
    { immediate: true }
  )

  const tags = computed(() => appStore.tags)
  // const tags = ref<RouteTag[]>([])

  // watch(
  //   appStore.tags,
  //   (val) => {
  //     tags.value = val
  //   },
  //   { immediate: true }
  // )

  function handleClickTag(tag) {
    router.replace(tag.fullPath).catch((err) => console.error(err))
  }

  function handleCloseTag(tag) {
    // 最后一个不删除
    if (tags.value.length === 1) {
      return
    }
    // 删除操作
    appStore.removeTag(tag)
    // 删除的跟当前页面是同一个, 路由回退上一个
    if (tag.name === route.name) {
      const last = tags.value[tags.value.length - 1]
      router.replace(last.fullPath).catch((err) => console.error(err))
    }
  }

  function handleCloseLeft() {
    const currentName = route.name as string
    appStore.closeLeftTag(currentName)
  }

  function handleCloseRight() {
    const currentName = route.name as string
    appStore.closeRightTag(currentName)
  }

  function handleCloseOther() {
    const currentName = route.name as string
    appStore.closeOtherTag(currentName)
  }

  return {
    tags,
    handleCloseTag,
    handleClickTag,
    handleCloseLeft,
    handleCloseRight,
    handleCloseOther
  }
}
