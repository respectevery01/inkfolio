---
title: Site settings
order: 1
description: Name, tagline, author, language and the canonical URL — all in one block.
---

Everything in this section lives under `site:` in `site.config.yaml`.

```yaml
site:
  name: Inkfolio
  nameZh: Inkfolio
  tagline: Write it down, ship it
  taglineZh: 写下来，做出来
  description: One sentence about the site.
  url: https://example.com
  author: Your Name
  email: you@example.com
  defaultLanguage: en
  showLanguageSwitcher: true
```

## Which keys do what

- `name` / `nameZh` — navigation brand and the `<title>` suffix. The Chinese name is only used on `/zh/` pages.
- `tagline` / `taglineZh` — the sentence under the headline on list pages.
- `description` / `descriptionZh` — meta description and the paragraph under the home headline.
- `url` — canonical, sitemap, RSS. No trailing slash.
- `author` / `authorZh` — byline on every article.
- `email` — optional, appears in the footer only when set.
- `defaultLanguage` — `en` or `zh`; decides which tree sits at `/`.
- `showLanguageSwitcher` — `false` hides every language link at once.

> [!NOTE]
> There is no separate “site title” for search engines: `name` is used for both. If you want a different browser-tab title, per-page titles already override it.

## Chinese pages

Every optional `*Zh` key falls back to the English value when omitted, so a single-language site is just `showLanguageSwitcher: false` and no `*Zh` keys.
