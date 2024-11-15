import { createApp } from 'vue'
import './assets/css/main.css'
import router from './router/index.js'
import axiosInstance from './plugins/axios.js'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$axios = axiosInstance
const pinia = createPinia()

app.use(router).use(pinia).mount('#app')
