import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/style.css'
import 'material-icons/iconfont/material-icons.css';

createApp(App).use(router).mount('#app')
