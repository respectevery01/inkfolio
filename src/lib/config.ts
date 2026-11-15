import raw from '../../site.config.yaml?raw';
import { parse } from 'yaml';

export type Lang = 'en' | 'zh' | 'zh-hant';

export interface NavLeaf {
  label: string;
  labelZh?: string | null;
  href: string;
  sub?: string;
  subZh?: string;
}

export interface NavItem extends NavLeaf {
  items?: NavLeaf[];
}

export interface FooterColumn {
  title: string;
  titleZh?: string;
  links: NavLeaf[];
}

export interface BannerConfig {
  enabled: boolean;
  dismissible: boolean;
  text: string;
  textZh?: string;
  link: string;
  linkText: string;
  linkTextZh?: string;
}

const parsed = parse(raw) as Record<string, any>;

export const weather = (parsed.weather ?? {}) as Record<string, any>;

export const site = {
  name: parsed.site.name as string,
  nameZh: (parsed.site.nameZh as string) ?? parsed.site.name,
  tagline: (parsed.site.tagline as string) ?? '',
  taglineZh: (parsed.site.taglineZh as string) ?? parsed.site.tagline ?? '',
  description: (parsed.site.description as string) ?? '',
  descriptionZh: (parsed.site.descriptionZh as string) ?? parsed.site.description ?? '',
  url: (import.meta.env.SITE || (parsed.site.url as string)).replace(/\/$/, ''),
  author: (parsed.site.author as string) ?? '',
  authorZh: (parsed.site.authorZh as string) ?? parsed.site.author ?? '',
  greeting: (parsed.site.greeting as string) ?? '',
  greetingZh: (parsed.site.greetingZh as string) ?? parsed.site.greeting ?? '',
  avatar: (parsed.site.avatar as string) ?? '',
  telegram: (parsed.site.telegram as string) ?? '',
  contactEndpoint: (parsed.site.contactEndpoint as string) ?? '',
  email: (parsed.site.email as string) ?? '',
  defaultLanguage: ((parsed.site.defaultLanguage as string) ?? 'en') as Lang,
  showLanguageSwitcher: parsed.site.showLanguageSwitcher !== false,
};

const asLeaf = (item: NavLeaf): NavLeaf => ({
  label: item.label,
  labelZh: item.labelZh ?? null,
  href: item.href,
  sub: item.sub,
  subZh: item.subZh,
});

export const nav: NavItem[] = ((parsed.nav ?? []) as NavItem[]).map((item) => ({
  ...asLeaf(item),
  ...(item.items ? { items: item.items.map(asLeaf) } : {}),
}));

export const navCta = {
  label: (parsed.navCta?.label as string) ?? '',
  labelZh: (parsed.navCta?.labelZh as string) ?? parsed.navCta?.label ?? '',
  href: (parsed.navCta?.href as string) ?? '',
};

export const social = ((parsed.social ?? []) as { label: string; href: string; icon?: string }[]).map((item) => ({
  label: item.label,
  href: item.href,
  icon: item.icon ?? 'link',
}));

export const footerColumns: FooterColumn[] = ((parsed.footerColumns ?? []) as FooterColumn[]).map((col) => ({
  title: col.title,
  titleZh: col.titleZh ?? col.title,
  links: (col.links ?? []).map(asLeaf),
}));

export const banner: BannerConfig = {
  enabled: parsed.promoBanner?.enabled !== false,
  dismissible: parsed.promoBanner?.dismissible !== false,
  text: parsed.promoBanner?.text ?? '',
  textZh: parsed.promoBanner?.textZh ?? null,
  link: parsed.promoBanner?.link ?? '',
  linkText: parsed.promoBanner?.linkText ?? '',
  linkTextZh: parsed.promoBanner?.linkTextZh ?? null,
};

export const theme = {
  accent: (parsed.theme?.accent as string) ?? '#ff6b01',
  defaultMode: ((parsed.theme?.defaultMode as string) ?? 'auto') as 'auto' | 'light' | 'dark',
  radius: (parsed.theme?.radius as string) ?? '12px',
};

export const footer = {
  note: (parsed.footer?.note as string) ?? '',
  noteZh: (parsed.footer?.noteZh as string) ?? parsed.footer?.note ?? '',
  copyrightName: (parsed.footer?.copyrightName as string) ?? site.name,
  authorUrl: (parsed.footer?.authorUrl as string) ?? '',
  authorLabel: (parsed.footer?.authorLabel as string) ?? '',
  artLight: (parsed.footer?.artLight as string) ?? '',
  artDark: (parsed.footer?.artDark as string) ?? '',
};

export const analytics = {
  umami: {
    enabled: parsed.analytics?.umami?.enabled === true,
    scriptUrl: (parsed.analytics?.umami?.scriptUrl as string) ?? '',
    websiteId: (parsed.analytics?.umami?.websiteId as string) ?? '',
  },
  googleAnalytics: {
    enabled: parsed.analytics?.googleAnalytics?.enabled === true,
    measurementId: (parsed.analytics?.googleAnalytics?.measurementId as string) ?? '',
  },
  clarity: {
    enabled: parsed.analytics?.clarity?.enabled === true,
    projectId: (parsed.analytics?.clarity?.projectId as string) ?? '',
  },
};

export const consent = {
  enabled: parsed.consent?.enabled !== false,
  storageKey: (parsed.consent?.storageKey as string) ?? 'inkfolio-consent',
  text: (parsed.consent?.text as string) ?? '',
  textZh: (parsed.consent?.textZh as string) ?? parsed.consent?.text ?? '',
  link: (parsed.consent?.link as string) ?? '',
  linkLabel: (parsed.consent?.linkLabel as string) ?? '',
  linkLabelZh: (parsed.consent?.linkLabelZh as string) ?? parsed.consent?.linkLabel ?? '',
  accept: (parsed.consent?.accept as string) ?? 'Accept',
  acceptZh: (parsed.consent?.acceptZh as string) ?? parsed.consent?.accept ?? '接受',
  reject: (parsed.consent?.reject as string) ?? 'Decline',
  rejectZh: (parsed.consent?.rejectZh as string) ?? parsed.consent?.reject ?? '拒绝',
};

export const seo = {
  titleTemplate: (parsed.seo?.titleTemplate as string) ?? '{title}',
  defaultDescription: (parsed.seo?.defaultDescription as string) ?? site.description,
  ogImage: (parsed.seo?.ogImage as string) ?? '',
  twitterHandle: (parsed.seo?.twitterHandle as string) ?? '',
  locale: (parsed.seo?.locale as string) ?? 'en_US',
  localeZh: (parsed.seo?.localeZh as string) ?? 'zh_CN',
  keywords: (parsed.seo?.keywords as string[]) ?? [],
  structuredData: parsed.seo?.structuredData !== false,
  robots: (parsed.seo?.robots as string) ?? 'index,follow',
};

export function titleFor(title: string, lang: Lang): string {
  const siteName = lang === 'zh' ? site.nameZh : site.name;
  if (!title || title === siteName) return siteName;
  return seo.titleTemplate.replace('{title}', title).replace('{site}', siteName);
}

export function pickLang<T>(value: { en: T; zh: T; 'zh-hant'?: T }, lang: Lang): T {
  if (lang === 'zh-hant') return value['zh-hant'] ?? value.zh;
  return lang === 'zh' ? value.zh : value.en;
}

/** Prefix a path for the requested language: ('/posts/', 'zh') → '/zh/posts/' */
export function langPath(path: string, lang: Lang): string {
  if (lang === 'en') return path;
  const prefix = lang === 'zh-hant' ? '/zh-Hant' : '/zh';
  return path === '/' ? `${prefix}/` : `${prefix}${path}`;
}

export interface McpSource {
  host: string;
  items?: number;
  desc: { en: string; zh: string };
}
export interface McpTool {
  name: string;
  args?: string;
  desc: { en: string; zh: string };
}

export const mcp = {
  enabled: process.env.MCP_ENABLED === 'true' || parsed.mcp?.enabled === true,
  endpoint: (parsed.mcp?.endpoint as string) ?? '',
  name: (parsed.mcp?.name as string) ?? `${site.name} MCP`,
  sources: ((parsed.mcp?.sources ?? []) as McpSource[]).map((src) => ({
    host: src.host,
    items: typeof src.items === 'number' ? src.items : undefined,
    desc: src.desc,
  })),
  tools: ((parsed.mcp?.tools ?? []) as McpTool[]).map((tool) => ({
    name: tool.name,
    args: tool.args ?? '',
    desc: tool.desc,
  })),
};
