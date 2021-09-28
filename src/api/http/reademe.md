### http 请求模块

FetchRequest.ts

> 该文件导出的模块可做为常见的普通的请求方式

eg:

```ts
import api from '@/api/http/FetchRequest'

// get:
// 参数类型
// url: string
// fetchOptions: DefaultCreateFetchOptions
// useFetchCofig: UserFetchConfig // UseFetchConfig['showErrorType']效果待实现

export const getFn = (parmas) => {
  return api.get<ResponseType>('/api/getXXX', { params: { a: 1, b: 'str' })
}

// post:
// 参数类型
// url: string
// fetchOptions: DefaultCreateFetchOptions
// useFetchCofig: UserFetchConfig // UseFetchConfig['showErrorType']效果待实现

export const getFn = (parmas) => {
  return api.get<ResponseType>('/api/getXXX', { params: { a: 1, b: 'str' })
}

// delete
// put
// patch
// head
//
// 新增 .request方法
// eg
api.request(url, { method: 'get', data: {} }, { transform: 'text' })
```

useApi.ts

> 请求 hook 用法

eg:

```vue
// 参数类型 // options: UseApiFetchOption // hookConfig?: HookConfig // index.vue
<script setup lang="ts">
  const { loading, data, execute } = useApi(
    {
      url: '/api/postXX',
      method: 'post',
      data: {}
    },
    { immediate: true, refetch: false }
  )
</script>
```

也可以抽成模块后调用

```ts
// http/modules/xx.ts
interface RequestData {
  merchantId: string
}
const getProductList = (data: RequestDataWrapper<RequestData>) => {
  return useApi('/user/getProductList', { data }, { immediate: false, refetch: true })
}
```

```vue
// use in .vue
<script setup lang="ts">
  import { ref } from 'vue'

  const requestData = ref({
    merchantId: 'merchant_id'
  })
  const {
    loading: fetchProdLoading,
    data: products,
    execute: handleFetchProduct
  } = getProductList(requestData)
</script>
```
