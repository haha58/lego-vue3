import { createApp } from 'vue'
import '@/styles/global.css'
import LegoBricks from 'lego-momy'
import 'ant-design-vue/dist/antd.css'
import 'lego-momy/dist/lego-momy.esm.css'
import App from './App.vue'
import router from '@/routes/index'
import store from '@/store/index'
import Antd from 'ant-design-vue'
import axios from '@/utils/axios'
const app = createApp(App)
// 全局配置axios
app.provide('$axios', axios)
app.use(Antd).use(LegoBricks).use(router).use(store).mount('#app')
