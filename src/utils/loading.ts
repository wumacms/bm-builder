import { ElLoading } from 'element-plus'

let loadingInstance: ReturnType<typeof ElLoading.service> | null = null
let requestCount = 0

// 暴露给控制台进行调试：window.__LOADING_COUNT__
if (typeof window !== 'undefined') {
  (window as any).__LOADING_COUNT__ = () => requestCount
}

/**
 * 开启全局 Loading
 */
export const startLoading = (text: string = '加载中...') => {
  if (requestCount === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text,
      background: 'rgba(0, 0, 0, 0.7)',
      svg: '<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>',
      svgViewBox: '0 0 50 50'
    })
  }
  requestCount++
}

/**
 * 关闭全局 Loading
 */
export const endLoading = () => {
  if (requestCount <= 0) return
  
  requestCount--
  if (requestCount === 0) {
    loadingInstance?.close()
    loadingInstance = null
  }
}
