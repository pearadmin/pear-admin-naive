import type { RouteRecordRaw } from 'vue-router'

const tableDateRoutes: RouteRecordRaw[] = [
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/layouts/index'),
    redirect: '/table/basicTable',
    meta: {
      title: '表格',
      icon: 'ph:table-light'
    },
    children: [
      {
        path: 'basicTable',
        name: 'basicTable',
        component: () => import('@/views/demo/table/BasicTableDemo.vue'),
        meta: {
          title: '基础表格',
          icon: 'la:table'
        }
      },
      {
        path: 'searchTable',
        name: 'SearchTable',
        component: () => import('@/views/demo/table/SearchTableDemo.vue'),
        meta: {
          title: '查询表格',
          icon: 'mdi:table-search'
        }
      },
      {
        path: 'customHeader',
        name: 'CustomHeader',
        component: () => import('@/views/demo/table/DefTableHead.vue'),
        meta: {
          title: '自定义表头',
          icon: 'system-uicons:table-header'
        }
      }
    ]
  }
]

export default {
  sort: 3,
  routes: tableDateRoutes
}
