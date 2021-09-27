###  http 请求模块

FetchRequest.ts
> 该文件导出的模块可做为常见的普通的请求方式

eg: 
```
import api from '@/api/http/FetchRequest'

get:
参数类型
url: string
fetchOptions: DefaultCreateFetchOptions
useFetchCofig: UserFetchConfig // UseFetchConfig['showErrorType']效果待实现

export const getFn = (parmas) => {
  return api.get<ResponseType>('/api/getXXX', { params: { a: 1, b: 'str' })
}

post:
参数类型
url: string
fetchOptions: DefaultCreateFetchOptions
useFetchCofig: UserFetchConfig // UseFetchConfig['showErrorType']效果待实现

export const getFn = (parmas) => {
  return api.get<ResponseType>('/api/getXXX', { params: { a: 1, b: 'str' })
}

delete
put
patch
head
```

useApi.ts
> 该文件为hooks用法

eg:

```

参数类型
options: UseApiFetchOption
hookConfig?: HookConfig

// index.vue
<script setup lang="ts">
  const { loading, data, execute } = useApi({
    url: '/api/postXX',
    method: 'post',
    data: {}
  }, { immediate: true, refetch: false, })
</script>
```
