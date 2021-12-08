import type { RouteRecordRaw } from 'vue-router'

const formDemoRoutes: RouteRecordRaw[] = [
  {
    path: '/form',
    name: 'Form',
    // component: BasicLayout,
    component: () => import('@/layouts/index'),
    redirect: '/form/basicForm',
    meta: {
      title: '表单',
      icon: 'clarity:form-line'
    },
    children: [
      {
        path: 'basicForm',
        name: 'basicForm',
        component: () => import('@/views/demo/form/basicFormDemo.vue'),
        meta: {
          title: '基础表单',
          icon: 'ant-design:form-outlined'
        }
      }
    ]
  }
]

export default {
  sort: 2,
  routes: formDemoRoutes
}
