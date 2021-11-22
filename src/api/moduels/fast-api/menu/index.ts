import { useApi } from '@/api/http'
import { Ref } from 'vue'
import { MenuModel } from '@/api/moduels/fast-api/menu/model/menuModel'

enum Api {
  menuRecords = 'menu/menuList'
}

export const getMenuRecords = (data: Recordable) => {
  return useApi<MenuModel[]>(Api.menuRecords, {
    data,
    method: 'post'
  }, { immediate: false })
}
