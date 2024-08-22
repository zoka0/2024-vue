import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/week01',
      name: 'week01',
      component: () => import('../views/Week/Week01_View.vue')
    },
    {
      path: '/week02',
      name: 'week02',
      component: () => import('../views/Week/Week02_View.vue')
    },
    {
      path: '/week03',
      name: 'week03',
      component: () => import('../views/Week/Week03_View.vue')
    }
  ]
})

export default router
