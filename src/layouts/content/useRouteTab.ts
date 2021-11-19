import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

export default function useRouteTab () {

  const route = useRoute()
  const router = useRouter()

  const tags = ref<Recordable[]>([])
  onMounted(() => {
    tags.value = new Array(20).fill('').map((it) => {
      return {
        label: route.meta.title,
        name: route.name
      }
    })
  })

  function refreshRoute () {
  }
}
