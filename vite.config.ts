/*
 * @Author: mowenyan mowenyan@bjklb.com
 * @Date: 2023-06-28 22:39:11
 * @LastEditors: mowenyan mowenyan@bjklb.com
 * @LastEditTime: 2023-06-29 22:58:03
 * @FilePath: \lego-vue3\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint' // 导入包
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: 'localhost',
    https: false,
    cors: true,
    open: true,
    hmr: true
  }
})
