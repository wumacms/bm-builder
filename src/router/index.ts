import { createRouter, createWebHashHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

/**
 * 路由守卫：检查登录状态
 * 注意：此处不再手动调用 startLoading，因为内部的 supabase.auth.getSession() 
 * 会自动触发我们在 src/lib/supabase.ts 中配置的 fetch 拦截器。
 */
router.beforeEach(async (to) => {
  const { data: { session } } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    return '/login'
  }

  if ((to.name === 'Login' || to.name === 'Register') && session) {
    return '/'
  }
})

export default router
