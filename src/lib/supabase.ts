import { createClient } from '@supabase/supabase-js'
import { startLoading, endLoading } from '../utils/loading'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

/**
 * 企业级最佳实践：通过拦截 Supabase 内部使用的 fetch 方法，
 * 实现对所有数据库请求和身份验证请求的“零侵入”全局加载状态管理。
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: async (url, options) => {
      try {
        startLoading() // 自动开启 Loading
        return await fetch(url, options)
      } finally {
        endLoading()   // 无论请求成功还是失败，都自动结束 Loading
      }
    }
  }
})
