import { createRouter, createWebHashHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import { startLoading, endLoading } from '../utils/loading'

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

// 路由守卫：检查登录状态
router.beforeEach(async (to) => {
  startLoading()

  const { data: { session } } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    // 需要登录但未登录，跳转到登录页
    return '/login'
  }

  if ((to.name === 'Login' || to.name === 'Register') && session) {
    // 已登录但访问登录/注册页，跳转到首页
    return '/'
  }
})

router.afterEach(() => {
  endLoading()
})

router.onError(() => {
  endLoading()
})

export default router
