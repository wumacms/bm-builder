/**
 * API 层 - 站点数据
 *
 * 封装所有数据获取逻辑，Vue 组件通过此模块访问数据，
 * 而不直接依赖具体的文件路径或 import.meta.glob 等 Vite 特性。
 */

import type { WebsiteData, PagesData, SiteResources } from './types';

// ── 静态资源导入（仅在 API 层可见） ──────────────────────────────────────────

import _websiteData from '../site/kangtai_medical/data/website.json';
import _pagesData from '../site/kangtai_medical/data/pages.json';
import _indexTemplate from '../site/kangtai_medical/data/index.html?raw';

const _rawBlockTemplates = import.meta.glob(
    '../site/kangtai_medical/pages/blocks/template/*.html',
    { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

// ── 公开 API ──────────────────────────────────────────────────────────────────

/**
 * 获取站点全局配置数据
 */
export function getWebsiteData(): WebsiteData {
    return _websiteData as WebsiteData;
}

/**
 * 获取所有页面数据列表
 */
export function getPagesData(): PagesData {
    return _pagesData as PagesData;
}

/**
 * 获取首页数据（默认页）
 */
export function getHomePage(): PagesData[number] {
    return getPagesData()[0];
}

/**
 * 获取主 HTML 模板字符串
 */
export function getIndexTemplate(): string {
    return _indexTemplate;
}

/**
 * 获取所有 Block 局部模板（键为原始 glob 路径，值为 HTML 字符串）
 */
export function getBlockTemplates(): Record<string, string> {
    return _rawBlockTemplates;
}

/**
 * 一次性获取渲染所需的全部资源
 * 组件只需调用此函数，无需关心内部文件结构
 */
export function getSiteResources(): SiteResources {
    return {
        websiteData: getWebsiteData(),
        homePage: getHomePage(),
        indexTemplate: getIndexTemplate(),
        blockTemplates: getBlockTemplates(),
    };
}
