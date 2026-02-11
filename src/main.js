import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import router from '/router/'

const app = createApp(App)
const pinia = createPinia()

// 2. Diga à aplicação para usar o router
app.use(router)

app.mount('#app')
app.use(pinia)
