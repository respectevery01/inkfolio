import type { Lang } from '../lib/config';

/**
 * Every string the theme itself renders. Page content lives in src/content/.
 * Adding a language: add a key here, add the folder under src/content/,
 * then set `site.defaultLanguage` in site.config.yaml.
 */
export const ui = {
  en: {
    latestPosts: 'Latest posts',
    allPosts: 'All posts',
    readMore: 'Read',
    minRead: 'min read',
    published: 'Published',
    updated: 'Updated',
    backToPosts: 'All posts',
    related: 'Related',
    toc: 'On this page',
    home: 'Home',
    about: 'About',
    posts: 'Posts',
    notFoundTitle: 'Page not found',
    notFoundBody: 'That link is dead or was never here. The posts index is a good place to restart.',
    notFoundCta: 'Browse the posts',
    languageLabel: 'Language',
    themeLabel: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeAuto: 'Auto',
    bannerDismiss: 'Dismiss',
    rss: 'RSS',
    builtWith: 'Built with',
    tags: 'Tags',
    previous: 'Previous',
    next: 'Next',
  },
  zh: {
    latestPosts: '最新文章',
    allPosts: '全部文章',
    readMore: '阅读',
    minRead: '分钟读完',
    published: '发布于',
    updated: '更新于',
    backToPosts: '全部文章',
    related: '相关文章',
    toc: '本页目录',
    home: '首页',
    about: '关于',
    posts: '文章',
    notFoundTitle: '页面不存在',
    notFoundBody: '这个链接失效了，或者本来就没有。可以回到文章索引重新找。',
    notFoundCta: '去看文章',
    languageLabel: '语言',
    themeLabel: '主题',
    themeLight: '浅色',
    themeDark: '深色',
    themeAuto: '跟随系统',
    bannerDismiss: '关闭',
    rss: 'RSS',
    builtWith: '由',
    tags: '标签',
    previous: '上一篇',
    next: '下一篇',
  },
} as const;

export type UiKey = keyof typeof ui.en;

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}
