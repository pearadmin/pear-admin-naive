<script setup lang="ts">
  import { ref } from 'vue'
  import { useIntervalFn } from '@vueuse/core'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const timeRef = ref<number>(10)

  const { pause } = useIntervalFn(() => {
    if (timeRef.value > 1) {
      timeRef.value--
    } else {
      pause()
      router.push('/')
    }
  }, 1000)
</script>

<template>
  <div class="flex h-full flex-col items-center mt-20">
    <n-result status="404" title="404 资源不存在" size="huge">
      <template #footer>
        <n-button @click="$router.push('/')">返回首页</n-button>
      </template>
      <div class="text-center">{{ timeRef }} 秒后返回首页</div>
    </n-result>
  </div>
</template>
