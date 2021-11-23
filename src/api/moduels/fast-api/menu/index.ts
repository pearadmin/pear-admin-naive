import { useApi } from '@/api/http'
import { Ref } from 'vue'
import { MenuModel } from '@/api/moduels/fast-api/menu/model/menuModel'

export enum MenuApiEnum {
  menuRecords = 'menu/menusList'
}

export const getMenuRecords = (data: Recordable) => {
  return useApi<MenuModel[]>(MenuApiEnum.menuRecords, {
    data,
    method: 'post'
  }, { immediate: false })
}
