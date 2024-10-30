import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar'
import App from './App.vue'
import router from './router'
import 'overlayscrollbars/overlayscrollbars.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PerfectScrollbarPlugin)
app.mount('#app')
