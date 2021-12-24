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
        name: 'BasicForm',
        component: () => import('@/views/demo/form/BasicFormDemo.vue'),
        meta: {
          title: '基础表单',
          icon: 'ant-design:form-outlined'
        }
      },
      {
        path: 'useForm',
        name: 'SseForm',
        component: () => import('@/views/demo/form/UseFormDemo.vue'),
        meta: {
          title: 'UseForm',
          icon: 'ant-design:form-outlined'
        }
      },
      {
        path: 'useFormRef',
        name: 'UseFormRef',
        component: () => import('@/views/demo/form/UseFormRefDemo.vue'),
        meta: {
          title: 'UseFormRef',
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
