---
title: 站点设置
order: 1
description: 站名、标语、作者、语言和域名，都在一个块里。
---

这一节全部在 `site.config.yaml` 的 `site:` 下。

```yaml
site:
  name: Inkfolio
  nameZh: Inkfolio
  tagline: 写下来，做出来
  taglineZh: 写下来，做出来
  description: 一句话介绍这个站。
  url: https://example.com
  author: 你的名字
  email: you@example.com
  defaultLanguage: zh
  showLanguageSwitcher: true
```

## 每个键干什么

- `name` / `nameZh`：导航里的品牌名和 `<title>` 后缀。中文名只在 `/zh/` 页面用。
- `tagline` / `taglineZh`：列表页标题下那句话。
- `description` / `descriptionZh`：meta 描述和首页标题下那段。
- `url`：canonical、sitemap、RSS。结尾不要斜杠。
- `author` / `authorZh`：每篇文章的署名。
- `email`：可选，填了才出现在页脚。
- `defaultLanguage`：`en` 或 `zh`，决定哪棵树在 `/`。
- `showLanguageSwitcher`：`false` 一次性隐藏所有语言入口。

> [!NOTE]
> 没有单独的「站点标题」：`name` 兼顾导航和浏览器标题。想改某页标题，直接改那一页的 `title`。

## 中文页

所有 `*Zh` 键不写就回落到英文值，所以单语言站只需要 `showLanguageSwitcher: false`，其他中文键全删也没关系。
