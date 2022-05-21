import { createApp } from 'vue'
import App from './App.vue'
import '@purge-icons/generated'
import 'uno.css'
import '@/style/global.less'
import { useAppRouter } from '@/router'

import { useAppStore } from '@/store'

const app = createApp(App)

useAppRouter(app)
useAppStore(app)

app.mount('#app')
