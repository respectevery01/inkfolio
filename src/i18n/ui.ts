import { en } from './locales/en';
import { zh } from './locales/zh';
import { zhHant } from './locales/zh-hant';

export const ui = { en, zh, zhHant } as const;

export type UiKey = keyof typeof en;

export function t(lang: string, key: UiKey): string {
  const dict = (ui as Record<string, Record<string, string>>)[lang] ?? ui.en;
  return dict[key] ?? (ui.en as Record<string, string>)[key] ?? String(key);
}
