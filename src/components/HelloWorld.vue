<script setup lang="ts">
import { ref } from 'vue'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import vueLogo from '../assets/vue.svg'

const count = ref(0)
</script>

<template>
  <section class="flex flex-col gap-4 lg:gap-6 justify-center items-center grow px-5 pt-8 pb-6 lg:p-0">
    <div class="relative w-44 flex justify-center">
      <img :src="heroImg" class="w-44 relative z-0 mx-auto" width="170" height="179" alt="" />
      <img :src="vueLogo" class="absolute z-10 top-8 h-7 inset-x-0 mx-auto [transform:perspective(2000px)_rotateZ(300deg)_rotateX(44deg)_rotateY(39deg)_scale(1.4)]" alt="Vue logo" />
      <img :src="viteLogo" class="absolute z-0 top-28 h-7 w-auto inset-x-0 mx-auto [transform:perspective(2000px)_rotateZ(300deg)_rotateX(40deg)_rotateY(39deg)_scale(0.8)]" alt="Vite logo" />
    </div>
    <div class="text-center">
      <h1 class="font-medium text-4xl lg:text-6xl leading-tight tracking-tight my-5 lg:my-8 text-black dark:text-gray-100">开始使用</h1>
      <p class="m-0 text-slate-500 dark:text-gray-400">编辑 <code class="font-mono text-sm px-2 py-1 bg-stone-100 dark:bg-zinc-900 text-black dark:text-gray-100 rounded">src/App.vue</code> 并保存以测试 <code class="font-mono text-sm px-2 py-1 bg-stone-100 dark:bg-zinc-900 text-black dark:text-gray-100 rounded">HMR</code></p>
    </div>
    <button class="font-mono inline-flex rounded text-base px-2.5 py-1.5 text-purple-600 dark:text-purple-400 bg-purple-600/10 dark:bg-purple-400/15 border-2 border-transparent hover:border-purple-600/50 dark:hover:border-purple-400/50 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 dark:focus-visible:outline-purple-400 mb-6" @click="count++">计数为 {{ count }}</button>
    <button class="cursor-pointer transition-all duration-300 rounded-full hover:from-white dark:hover:from-zinc-800 dark:hover:to-zinc-700 hover:shadow-md flex items-center justify-center text-xl md:text-2xl p-2 group border-none bg-transparent" aria-label="切换暗黑模式" type="button" tabindex="0"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-amber-500 group-hover:text-amber-400 transition-colors duration-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M234 26h44v92h-44zm0 368h44v92h-44zm104.025-251.143 65.054-65.054 31.113 31.113-65.054 65.054zM77.815 403.074l65.054-65.054 31.113 31.113-65.054 65.054zM394 234h92v44h-92zm-368 0h92v44H26zm312.029 135.14 31.112-31.113 65.054 65.054-31.112 31.112zM77.802 108.92l31.113-31.113 65.054 65.054-31.113 31.112zM256 358a102 102 0 1 1 102-102 102.12 102.12 0 0 1-102 102z"></path></svg></button>
  </section>

  <div class="relative w-full before:content-[''] before:absolute before:-top-1 before:border-4 before:border-transparent before:left-0 before:border-l-gray-200 dark:before:border-l-slate-800 after:content-[''] after:absolute after:-top-1 after:border-4 after:border-transparent after:right-0 after:border-r-gray-200 dark:after:border-r-slate-800"></div>

  <section class="flex flex-col lg:flex-row border-t border-gray-200 dark:border-slate-800 text-center lg:text-left text-slate-500 dark:text-gray-400">
    <div class="flex-1 py-6 px-5 lg:p-8 lg:border-r border-b lg:border-b-0 border-gray-200 dark:border-slate-800">
      <svg class="w-6 h-6 mb-4 mx-auto lg:mx-0 fill-current" role="presentation" aria-hidden="true">
        <use href="/icons.svg#documentation-icon"></use>
      </svg>
      <h2 class="font-medium text-xl lg:text-2xl leading-tight tracking-tight mb-2 text-black dark:text-gray-100">文档</h2>
      <p class="m-0">解答你的疑问</p>
      <ul class="list-none p-0 grid grid-cols-2 lg:flex lg:flex-nowrap gap-2 mt-5 lg:mt-8">
        <li>
          <a href="https://vite.dev/" target="_blank" class="text-black dark:text-gray-100 text-base rounded-md bg-stone-100/50 dark:bg-slate-800/50 flex w-full items-center justify-center lg:justify-start py-1.5 px-3 gap-2 no-underline transition-shadow duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/40">
            <img class="h-4" :src="viteLogo" alt="" />
            探索 Vite
          </a>
        </li>
        <li>
          <a href="https://vuejs.org/" target="_blank" class="text-black dark:text-gray-100 text-base rounded-md bg-stone-100/50 dark:bg-slate-800/50 flex w-full items-center justify-center lg:justify-start py-1.5 px-3 gap-2 no-underline transition-shadow duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/40">
            <img class="h-4 w-4" :src="vueLogo" alt="" />
            了解更多
          </a>
        </li>
      </ul>
    </div>
    <div class="flex-1 py-6 px-5 lg:p-8">
      <svg class="w-6 h-6 mb-4 mx-auto lg:mx-0 fill-current" role="presentation" aria-hidden="true">
        <use href="/icons.svg#social-icon"></use>
      </svg>
      <h2 class="font-medium text-xl lg:text-2xl leading-tight tracking-tight mb-2 text-black dark:text-gray-100">联系我们</h2>
      <p class="m-0">加入 Vite 社区</p>
      <ul class="list-none p-0 grid grid-cols-2 lg:flex lg:flex-nowrap gap-2 mt-5 lg:mt-8">
        <li>
          <a href="https://github.com/vitejs/vite" target="_blank" class="text-black dark:text-gray-100 text-base rounded-md bg-stone-100/50 dark:bg-slate-800/50 flex w-full items-center justify-center lg:justify-start py-1.5 px-3 gap-2 no-underline transition-shadow duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/40">
            <svg class="h-4 w-4 dark:invert dark:brightness-200" role="presentation" aria-hidden="true">
              <use href="/icons.svg#github-icon"></use>
            </svg>
            GitHub
          </a>
        </li>
        <li>
          <a href="https://chat.vite.dev/" target="_blank" class="text-black dark:text-gray-100 text-base rounded-md bg-stone-100/50 dark:bg-slate-800/50 flex w-full items-center justify-center lg:justify-start py-1.5 px-3 gap-2 no-underline transition-shadow duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/40">
            <svg class="h-4 w-4 dark:invert dark:brightness-200" role="presentation" aria-hidden="true">
              <use href="/icons.svg#discord-icon"></use>
            </svg>
            Discord
          </a>
        </li>
        <li>
          <a href="https://x.com/vite_js" target="_blank" class="text-black dark:text-gray-100 text-base rounded-md bg-stone-100/50 dark:bg-slate-800/50 flex w-full items-center justify-center lg:justify-start py-1.5 px-3 gap-2 no-underline transition-shadow duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/40">
            <svg class="h-4 w-4 dark:invert dark:brightness-200" role="presentation" aria-hidden="true">
              <use href="/icons.svg#x-icon"></use>
            </svg>
            X.com
          </a>
        </li>
        <li>
          <a href="https://bsky.app/profile/vite.dev" target="_blank" class="text-black dark:text-gray-100 text-base rounded-md bg-stone-100/50 dark:bg-slate-800/50 flex w-full items-center justify-center lg:justify-start py-1.5 px-3 gap-2 no-underline transition-shadow duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/40">
            <svg class="h-4 w-4 dark:invert dark:brightness-200" role="presentation" aria-hidden="true">
              <use href="/icons.svg#bluesky-icon"></use>
            </svg>
            Bluesky
          </a>
        </li>
      </ul>
    </div>
  </section>

  <div class="relative w-full before:content-[''] before:absolute before:-top-1 before:border-4 before:border-transparent before:left-0 before:border-l-gray-200 dark:before:border-l-slate-800 after:content-[''] after:absolute after:-top-1 after:border-4 after:border-transparent after:right-0 after:border-r-gray-200 dark:after:border-r-slate-800"></div>
  <section class="h-12 lg:h-24 border-t border-gray-200 dark:border-slate-800"></section>
</template>
