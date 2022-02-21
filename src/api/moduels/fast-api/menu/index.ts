import { useApi } from '@/api/http'
import type { MenuModel } from '@/api/moduels/fast-api/menu/model/menuModel'

export enum MenuApiEnum {
  menuRecords = 'menu/menusList'
}

export const getMenuRecords = (data: Recordable) => {
  return useApi<MenuModel[]>(
    {
      url: MenuApiEnum.menuRecords,
      data,
      method: 'post'
    },
    { immediate: false }
  )
}
