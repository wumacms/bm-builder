<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { getErrorMessage } from '../utils/i18n'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    // 前端校验
    if (password.value.length < 8) {
      throw new Error('密码长度至少需要 8 位')
    }
    
    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#\.\-\^])[A-Za-z\d@$!%*?&_#\.\-\^]/
    if (!complexityRegex.test(password.value)) {
      throw new Error('密码必须包含大写字母、小写字母、数字和特殊字符')
    }
    
    if (password.value !== confirmPassword.value) {
      throw new Error('两次输入的密码不一致')
    }
    
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })

    if (error) throw error
    
    successMessage.value = '注册成功！请检查您的邮箱以确认账户。'
    setTimeout(() => {
      router.push({ name: 'Login' })
    }, 3000)
  } catch (error: any) {
    if (error.message && (error.message.includes('密码') || error.message.includes('输入'))) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = getErrorMessage(error)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen grid place-items-center bg-zinc-950 p-4 py-20 overflow-y-auto">
    <div class="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-white tracking-tight">创建新账号</h1>
        <p class="text-zinc-400 mt-2">加入我们，开始您的旅程</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-1.5">电子邮箱</label>
          <input 
            v-model="email"
            type="email" 
            required
            placeholder="name@example.com"
            class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-1.5">设置密码</label>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'" 
              required
              placeholder="8位以上，含大小写字母、数字和符号"
              class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all pr-12"
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.04m5.757-5.757A9.96 9.96 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21m-4.225-4.225L3 3m13.875 13.875L12 12m0 0L9.414 9.414" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-1.5">确认密码</label>
          <div class="relative">
            <input 
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'" 
              required
              placeholder="请再次输入密码"
              class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all pr-12"
              :class="{'border-red-500/50 focus:ring-red-500': confirmPassword && password !== confirmPassword}"
            />
            <button 
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
            >
              <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.04m5.757-5.757A9.96 9.96 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21m-4.225-4.225L3 3m13.875 13.875L12 12m0 0L9.414 9.414" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
          {{ successMessage }}
        </div>

        <button 
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-900/20"
        >
          {{ loading ? '注册中...' : '立即注册' }}
        </button>
      </form>

      <div class="text-center text-sm">
        <span class="text-zinc-500">已有账号？</span>
        <router-link to="/login" class="text-primary-400 hover:text-primary-300 font-medium ml-1">直接登录</router-link>
      </div>
    </div>
  </div>
</template>
