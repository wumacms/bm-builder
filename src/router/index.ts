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

/**
 * 修复 Loading 泄露 Bug：
 * Vue Router 在重定向（return path）时不会触发 afterEach。
 * 我们必须在 beforeEach 内部确保 endLoading 被调用。
 */
router.beforeEach(async (to) => {
  startLoading()
  
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (to.meta.requiresAuth && !session) {
      return '/login'
    }

    if ((to.name === 'Login' || to.name === 'Register') && session) {
      return '/'
    }
  } finally {
    // 只有在没有返回重定向地址的情况下，或者在重定向发生前，
    // 我们需要通过逻辑控制来释放计数。
    // 实际上，最简单的办法是：由于 afterEach 不触发，我们直接在 beforeEach 结束时关闭。
    endLoading()
  }
})

// 移除 afterEach 中的 endLoading，避免重复计数
router.afterEach(() => {
  // 导航成功完成时，不需要额外处理，因为 beforeEach 的 finally 已经处理了
})

router.onError(() => {
  endLoading()
})

export default router
