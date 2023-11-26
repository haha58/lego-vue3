import { createRouter, createWebHashHistory } from 'vue-router'
const Editor = () => import('@//views/editor/index.vue')
const TemplateDetail = () => import('@/views/template-detail/index.vue')
const Home = () => import('@/views/home/index.vue')
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        // 嵌套路由
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
            withFooter: true
          }
        }
      ]
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
      meta: {}
    },
    {
      path: '/template/:id',
      name: 'template',
      component: TemplateDetail,
      meta: {}
    }
  ]
})

export default router
