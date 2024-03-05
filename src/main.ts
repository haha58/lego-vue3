/*
 * @Author: mowenyan mowenyan@bjklb.com
 * @Date: 2023-06-28 22:39:11
 * @LastEditors: mowenyan mowenyan@bjklb.com
 * @LastEditTime: 2023-06-28 23:28:26
 * @FilePath: \lego-vue3\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import '@/styles/global.css'
import LegoBricks from 'lego-momy'
import 'ant-design-vue/dist/antd.css'
import 'lego-momy/dist/lego-momy.esm.css'
import App from './App.vue'
import router from '@/routes/index'
import store from '@/store/index'
import Antd from 'ant-design-vue'
createApp(App).use(Antd).use(LegoBricks).use(router).use(store).mount('#app')
