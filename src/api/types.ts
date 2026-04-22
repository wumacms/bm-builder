/**
 * 类型定义
 *
 * 所有字段均贴合 pages.json / website.json 的实际结构。
 */

/**
 * Block 区块数据
 * JSON 中使用 `template` 字段（如 "hero"、"contact"）标识区块类型，
 * 而非 `type`，此处以实际数据为准。
 */
export interface BlockData {
    id: string;
    /** 对应 Handlebars partial 的模板名称，例如 "hero"、"contact" */
    template: string;
    [key: string]: unknown;
}

/** 单个页面数据 */
export interface PageData {
    id?: string;
    /** 页面显示名称，例如 "首页" */
    name?: string;
    /** 页面路由路径，例如 "/index" */
    path?: string;
    /** 所属站点 ID */
    siteId?: string;
    blocks: BlockData[];
    [key: string]: unknown;
}

/** 页面数据列表 */
export type PagesData = PageData[];

/** 站点全局导航配置 */
export interface NavbarData {
    id: string;
    [key: string]: unknown;
}

/** 站点全局页脚配置 */
export interface FooterData {
    id: string;
    [key: string]: unknown;
}

/** 站点全局配置 */
export interface WebsiteData {
    navbar?: NavbarData;
    footer?: FooterData;
    'mobile-menu'?: { id: string;[key: string]: unknown };
    [key: string]: unknown;
}

/**
 * 渲染所需的全部资源
 * 由 getSiteResources() 返回，供 Vue 组件直接消费
 */
export interface SiteResources {
    websiteData: WebsiteData;
    homePage: PageData;
    indexTemplate: string;
    /** 键为 glob 路径，值为 HTML 模板字符串 */
    blockTemplates: Record<string, string>;
}
