import { RouteRecordRaw } from 'vue-router'

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
        component: () => import('@/views/demo/table/basicTableDemo.vue'),
        meta: {
          title: '基础表格',
          icon: 'la:table'
        }
      },
      {
        path: 'searchTable',
        name: 'SearchTable',
        component: () => import('@/views/demo/table/searchTableDemo.vue'),
        meta: {
          title: '查询表格',
          icon: 'mdi:table-search'
        }
      }
    ]
  }
]

export default tableDateRoutes
