---
title: 写作与翻译配对
order: 1
description: 文章、周更、研究三类内容写法一样：Markdown 进，页面出。中英按文件名配对。
---

## 三个集合，一个形状

| 集合 | 目录                    | URL                 |
| ---- | ----------------------- | ------------------- |
| 文章 | `src/content/posts/`    | `/posts/<slug>/`    |
| 周更 | `src/content/weekly/`   | `/weekly/<slug>/`   |
| 研究 | `src/content/research/` | `/research/<slug>/` |

三者 frontmatter 相同（`title`、`description`、`date`、`tags`、`draft`），只多一个字段：周更用 `issue`，研究用 `type`。文章还多两个：`updated`（多印一个更新日期）和 `toc`（默认 `true`，设 `false` 这篇文章就不出右侧目录）。

## 翻译怎么配对

同一个文件名放在对应的 `-zh` 目录（`posts-zh`、`weekly-zh`、`research-zh`），就当成英文那篇的译文：

```
src/content/posts/hello.md
src/content/posts-zh/hello.md   ← 同名，已配对
```

配对的页面互链，并输出互相指向的 `hreflang`。没配对的页面不显示语言切换——比把人送到 404 好。

> [!NOTE]
> 不必每篇都翻。常见做法：短笔记用一种语言，长文两版都写。

## 草稿

`draft: true` 时文件留在仓库里，但不进列表、RSS、sitemap，也不参与翻译配对。

## 图片

放 `public/`，在正文里从站点根引：

```markdown
![说明文字](/images/photo.jpg)
```

正文样式会自动加边框和圆角。没有图片管线，提交前自己压。

## 封面图

任何文章都可以带封面；不写也不会破坏布局。

```yaml
cover: /og/posts/zh/my-post.png
coverAlt: 重写之后的看板
```

图片放 `public/` 下，用路径引用。中文文章在 `src/content/posts-zh/`，配图就该放在 `public/og/posts/zh/`——每种语言的图各放各的目录，翻译页才不会显示另一种语言的画面。

显示位置在 `site.config.yaml` 里配：

```yaml
covers:
  list: true      # 列表页缩略图
  article: true   # 文章页顶部大图
```

封面保持原图比例，宽度以阅读栏为上限，细长或方图都不会被裁。`coverAlt` 要描述图片内容；纯装饰的卡片可以留空，但截图不算装饰。
