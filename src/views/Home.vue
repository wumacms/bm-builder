<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import KangtaiMedical from '../components/KangtaiMedical.vue'

const router = useRouter()
const loggingOut = ref(false)

const handleLogout = async () => {
  if (loggingOut.value) return
  try {
    loggingOut.value = true
    // 尝试调用 Supabase 登出接口
    await supabase.auth.signOut()
  } catch (error) {
    console.error('登出过程中发生网络错误:', error)
  } finally {
    // 无论网络请求是否成功（例如网络被代理拦截），都强制跳转回登录页
    // Supabase 客户端通常会自动清除本地的 auth token
    router.push({ name: 'Login' })
  }
}
</script>

<template>
  <div class="flex flex-col h-screen w-full overflow-hidden bg-slate-950">
    <!-- 顶部工具栏 -->
    <header class="h-12 w-full border-b border-white/10 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between px-4 z-50 shrink-0">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 class="text-white text-sm font-bold tracking-tight">BM Builder</h1>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="handleLogout"
          :disabled="loggingOut"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-white/70 hover:text-white transition-all duration-200 group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="text-xs font-medium">退出登录</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-1 w-full relative overflow-hidden">
      <KangtaiMedical />
    </main>
  </div>
</template>

<style scoped>
/* 可以在这里添加一些微调样式 */
</style>
