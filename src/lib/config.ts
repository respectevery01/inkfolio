import raw from '../../site.config.yaml?raw';
import { parse } from 'yaml';

export type Lang = 'en' | 'zh';

export interface NavItem {
  label: string;
  labelZh?: string;
  href: string;
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

const parsed = parse(raw);

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
  email: (parsed.site.email as string) ?? '',
  defaultLanguage: ((parsed.site.defaultLanguage as string) ?? 'en') as Lang,
  showLanguageSwitcher: parsed.site.showLanguageSwitcher !== false,
};

export const nav = ((parsed.nav ?? []) as NavItem[]).map((item) => ({
  label: item.label,
  labelZh: item.labelZh ?? null,
  href: item.href,
}));

export const social = ((parsed.social ?? []) as { label: string; href: string }[]).map((item) => ({
  label: item.label,
  href: item.href,
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
};

export function pickLang<T>(value: { en: T; zh: T }, lang: Lang): T {
  return lang === 'zh' ? value.zh : value.en;
}

/** Prefix a path for the requested language: ('/posts/', 'zh') → '/zh/posts/' */
export function langPath(path: string, lang: Lang): string {
  if (lang === 'en') return path;
  return path === '/' ? '/zh/' : `/zh${path}`;
}
