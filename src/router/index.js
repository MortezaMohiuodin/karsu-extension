import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '../store/app'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: '/', name: 'NotFound', component: Popover },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  },
})

router.beforeEach(async (to, from) => {
  const store = useAppStore()
  if (!store.isLoggedIn && to.fullPath !== '/login') return '/login'
  if (store.isLoggedIn && to.fullPath === '/login') return '/'
})

export default router
