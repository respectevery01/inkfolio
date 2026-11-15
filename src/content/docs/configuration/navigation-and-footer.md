---
title: Navigation and footer
order: 2
description: Menu items, dropdowns, the CTA, footer columns and the footer illustration.
---

## Top navigation

`nav` is a list. A plain item has `href`; an item with `items` becomes a dropdown:

```yaml
nav:
  - label: Weekly
    labelZh: 周更
    href: /weekly/
  - label: Writing
    labelZh: 写作
    items:
      - label: Posts
        labelZh: 文章
        href: /posts/
        sub: Long pieces and notes
        subZh: 长文与随手记
```

`sub` is the small line inside a dropdown. `labelZh` is optional: omit it and the item disappears from the Chinese navigation instead of pointing at a page that does not exist.

The button on the right is a separate block:

```yaml
navCta:
  label: Say hi
  labelZh: 打个招呼
  href: /contact/
```

## Footer columns

```yaml
footerColumns:
  - title: Writing
    titleZh: 写作
    links:
      - { label: Posts, labelZh: 文章, href: /posts/ }
```

Add a column by appending an entry; add a link by appending to `links`. No component changes.

## Footer bottom line and illustration

```yaml
footer:
  copyrightName: Inkfolio
  authorUrl: https://jask.dev
  authorLabel: jask.dev
  artLight: /footer/footer-light.webp
  artDark: /footer/footer-dark.webp
```

The illustration is **1600 × 529** WebP, one file per theme. Replace the two files in `public/footer/` keeping the names. Set both paths to `""` to drop it.

> [!TIP]
> The MCP entry in the footer is filtered out automatically while `mcp.enabled` is false.
