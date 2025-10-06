import { createApp } from 'vue'
import App from './App.vue'
import i18n from '@/locales/index'
import 'element-plus/theme-chalk/el-message.css'

createApp(App).use(i18n).mount('#app')
