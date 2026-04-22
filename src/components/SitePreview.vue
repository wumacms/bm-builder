<script setup>
import { ref, onMounted, watch } from 'vue';
import Handlebars from 'handlebars';

// 全局样式 (组件级依赖，保留在此处)
import globalCss from '../style.css?inline';

/**
 * API 层：所有数据获取均通过 API 模块完成
 * 组件无需感知具体的文件路径或 Vite 特性
 */
import { getSiteResources } from '../api/site';

const { websiteData, homePage, indexTemplate, blockTemplates } = getSiteResources();

const renderedHtml = ref('');

/**
 * 核心渲染函数
 */
const renderSite = (website, page, mainTpl, blockTemplates, css) => {
    // 注册 Partials
    Object.entries(blockTemplates).forEach(([path, content]) => {
        const templateName = path.split('/').pop().replace('.html', '');
        Handlebars.registerPartial(templateName, content);
    });

    try {
        const compileTemplate = Handlebars.compile(mainTpl);
        
        /**
         * 优化 2: 自动处理 ID 安全前缀
         * 确保 UUID 不会因为数字开头导致 CSS 选择器失效
         */
        const prefixId = (obj) => {
            if (!obj || typeof obj !== 'object') return obj;
            const newObj = { ...obj };
            if (newObj.id && typeof newObj.id === 'string' && !newObj.id.startsWith('block-')) {
                newObj.id = `block-${newObj.id}`;
            }
            return newObj;
        };

        const processedWebsite = {
            ...website,
            navbar: prefixId(website.navbar),
            footer: prefixId(website.footer),
            'mobile-menu': prefixId(website['mobile-menu'])
        };

        const processedPage = {
            ...page,
            blocks: (page.blocks || []).map(prefixId)
        };

        // 注入全局 CSS
        return compileTemplate({ 
            website: processedWebsite, 
            page: processedPage,
            globalCss: css
        });
    } catch (error) {
        console.error('Handlebars 渲染出错:', error);
        return `<div style="padding: 20px; color: red;">渲染失败: ${error.message}</div>`;
    }
};

// 封装更新函数
const updatePreview = () => {
    renderedHtml.value = renderSite(
        websiteData,
        homePage,
        indexTemplate,
        blockTemplates,
        globalCss
    );
};

onMounted(updatePreview);

/**
 * 优化 3: 实时预览响应式
 * 深度监听数据变化，只要 JSON 修改，预览立即更新
 */
watch([() => websiteData, () => homePage], updatePreview, { deep: true });

</script>

<template>
    <div class="render-container w-full h-full overflow-hidden bg-gray-50 dark:bg-gray-900">
        <!-- Iframe 提供完美的样式和脚本隔离 -->
        <iframe 
            v-if="renderedHtml"
            :srcdoc="renderedHtml" 
            class="w-full h-full border-none shadow-inner"
            title="可视化建站预览"
        ></iframe>
        
        <!-- 加载状态 -->
        <div v-else class="flex flex-col items-center justify-center h-full space-y-4">
            <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p class="text-gray-500 font-medium">准备实时预览界面...</p>
        </div>
    </div>
</template>

<style scoped>
/* 确保容器占满全屏，移除任何可能导致滚动条的间隙 */
.render-container {
    padding: 0;
    margin: 0;
}

iframe {
    display: block;
}
</style>
