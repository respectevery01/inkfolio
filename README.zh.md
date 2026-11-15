# Inkfolio

给写作者与独立开发者的编辑风 Astro 博客主题。暖纸白、近黑正文、一个强调色、波浪下划线、零 webfont、不带前端框架。

[English](./README.md) · 中文

在线演示：https://inkfolio.jask.dev

![Inkfolio 首页](./docs/screenshot-home.png)

## 为什么又一个博客主题

Astro 的博客主题大多两极化：要么是套着博客外壳的 SaaS 落地页，要么是完全没有主张的脚手架。Inkfolio 反过来——看起来像一页杂志，只有五个真实页面，所有开关收在一个 YAML 文件里。

- **默认可双语**：英文在 `/`，中文在 `/zh/`，`hreflang` 正确，每种语言一份 RSS。文章按文件名配对；没有对应译文的文章直接不显示切换按钮，而不是把读者送到 404。
- **配置驱动**：站名、标语、导航、社交链接、强调色、页脚小字、顶部横幅，全在 `site.config.yaml`。常规改动不用打开任何组件。
- **一次设置两种主题**：亮色与暗色，默认跟随系统，按访客记忆，且在首次绘制前应用，不会闪。
- **靠减法变快**：纯静态、零 webfont、无统计脚本、无 cookie 弹窗、无前端框架。全站脚本就是约 40 行内联 JS：主题切换、移动菜单、横幅。
- **能读**：正文 632px、行高 1.75，表格和代码块有正经样式；不加动画，天然尊重「减少动态效果」的系统设置。

## 快速开始

需要 Node.js 20 或更新版本。

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
```

然后打开 `site.config.yaml`，至少改这三行：

```yaml
site:
  url: https://your-domain.com
  name: 你的站名
  author: 你的名字
```

部署：Cloudflare Pages、Netlify、Vercel 都行。构建命令 `npm run build`，输出目录 `dist`，没有别的配置。

## 关于顶部横幅

主题自带一条横幅：

> 本站的 SEO 用 ZensInk 跑 — [去看看](https://zens.ink)

这是它持续维护的方式，同时也是**一行就能关掉**的东西，不用改代码：

```yaml
promoBanner:
  enabled: false
```

访客也可以自己关（`dismissible: true`），选择会被记住。想换文案、把链接指向你自己的项目都行——它就是个普通配置项。完整说明见 `src/content/posts-zh/turn-off-the-banner.md`。

## 包含哪些页面

| 页面 | 路径 |
| --- | --- |
| 首页（各栏目最新） | `/` 与 `/zh/` |
| 文章索引 / 正文 | `/posts/`、`/posts/<slug>/` |
| 周更系列 | `/weekly/`、`/weekly/<slug>/` |
| 研究 | `/research/`、`/research/<slug>/` |
| 项目 | `/projects/` |
| 活跃度（热力图） | `/log/` |
| 工具箱 | `/nav/` |
| 友链 | `/friends/` |
| 联系 | `/contact/` |
| 订阅 | `/newsletter/` |
| 关于 | `/about/` |
| RSS | `/rss.xml` 与 `/zh/rss.xml` |
| 404 | `/404.html` |
| sitemap / robots | 由 `site.url` 生成 |

以上每一页都有 `/zh/` 版本，并用 `hreflang` 互指。

内容都是 Markdown 和 YAML：

```
src/content/posts/         英文文章
src/content/posts-zh/      中文文章（同名自动配对）
src/content/weekly/        周更（frontmatter 带期号）
src/content/research/      长篇调查
src/content/pages/         about.md / about-zh.md
src/data/projects.yaml     项目列表
src/data/tools.yaml        工具箱，按分类分组
src/data/friends.yaml      友链
src/data/log.json          活跃度数据（一天一条）
```

主题自带六篇文章即文档：上手、每个配置项、横幅、写文章、改外观、统计与 SEO。

## 怎么改

- **强调色**：`site.config.yaml` 的 `theme.accent`。
- **默认亮/暗**：`theme.defaultMode: auto | light | dark`。
- **导航**：`nav` 列表；`labelZh` 可选，不写就不出现在中文站。
- **字体与间距**：`src/styles/global.css` 顶部的 CSS 变量。
- **页脚**：`footer.note` 与 `social` 列表。


## 图标、统计与 SEO

图标全部来自 [Font Awesome Free](https://fontawesome.com)，本地打包，不走 CDN、不需要 kit token。

- 界面图标：`<Icon name="sun" />`、`<Icon name="chevron-down" />`、`<Icon name="arrow-right" />`——默认 solid，品牌图标自动识别（`github`、`bluesky`、`ethereum` 等）。
- `/nav` 页用独立的图标文件。把一个 SVG 放进 `public/icons/`，然后在 `src/data/tools.yaml` 里写文件名：

```yaml
- name: Astro
  url: https://astro.build
  icon: astro        # 对应 public/icons/astro.svg
```

加一条链接不需要改任何 Astro 文件。目前自带：`jask`、`astro`、`fontawesome`、`github`；不写 `icon` 就用首字母。

## 文档

主题自带 `/docs/`（中文 `/zh/docs/`）：侧边栏由目录结构自动生成、右侧本页目录、上下篇、GitHub 风格提示框、每个代码块带复制按钮。加一页就是往 `src/content/docs/<分区>/` 里放一个 Markdown，侧边栏自己会多一项。

```
src/content/docs/getting-started/installation.md
src/content/docs/configuration/mcp.md
src/content/docs-zh/…   （同样的 id，中文）
```

## 回到顶部与 cookie 同意

- 滚动超过 600px 出现回到顶部按钮（尊重 prefers-reduced-motion），和同意卡片同时出现时会自动上移避开。
- 同意卡片是右下角浮动样式。`consent.enabled: false` 就关掉。GA4 和 Clarity 在访客点接受之前不会加载；Umami 不写 cookie，始终加载。

`/privacy/` 隐私页是同意文案默认指向的地方，改 `src/content/pages/privacy.md`（和 `-zh`）。

## 页脚

三栏来自 `site.config.yaml` 的 `footerColumns`——加一栏或加一条链接都不用改代码。底部一行是版权、作者链接和你的小字：

```yaml
footer:
  copyrightName: Inkfolio
  authorUrl: https://jask.dev
  authorLabel: jask.dev
```

三栏上方那张宽图是两个文件，一个主题一张：

- `public/footer/footer-light.webp`
- `public/footer/footer-dark.webp`
- 尺寸 **1600 × 529**，WebP，透明或纸色背景，能和页面融为一体

直接替换这两个文件、文件名不变就行，别的都不用动。想换名字就改 `footer.artLight` / `footer.artDark`。两个都设成 `""` 就不要这张图了。

## MCP 页面

这个示例站是开着的。把 `mcp.enabled` 改成 false，`/mcp/` 页面会变成 `noindex`，导航入口也会被过滤掉。

```yaml
mcp:
  enabled: true
  endpoint: https://mcp.your-domain.com/mcp
  name: Your MCP
  sources:
    - host: your-site.com
      items: 42
      desc: { en: Articles and notes, zh: 文章与笔记 }
  tools:
    - name: search
      args: query, source?
      desc: { en: Keyword search across all sources., zh: 跨源关键词搜索。 }
```

不用改代码：页面会自己渲染端点、三种客户端的接法、工具列表和内容源列表。它只给已经在跑的 MCP 服务写说明页——主题是静态的，不托管服务。演示构建可以设 `MCP_ENABLED=true` 临时打开，不用改 YAML。

## 活跃度

`/log/` 读的是 `src/data/log.json`，用真实 GitHub 提交刷新：

```bash
GITHUB_TOKEN=ghp_xxx node scripts/fetch-log.mjs
```

仓库列表在脚本顶部的 `REPOS` 里，一行一个 `owner/name`。脚本写最近 365 天的按日计数，外加每个仓库的提交数和最后提交日期。失败时保留旧文件，网络抽风不会搞坏部署。

## 统计与 SEO

三家统计默认全关，不开 `enabled: true` 并填 id 就不会注入任何脚本。

```yaml
analytics:
  umami:
    enabled: true
    scriptUrl: https://analytics.your-domain.com/script.js
    websiteId: 1a2b3c4d-...
  googleAnalytics:
    enabled: false
    measurementId: G-XXXXXXXXXX
  clarity:
    enabled: false
    projectId: abcdefghij
```

SEO 默认值在 `seo` 一节：`titleTemplate`、`defaultDescription`、`ogImage`（1200×630）、`twitterHandle`、`keywords`、`structuredData`（WebSite + BlogPosting 的 JSON-LD，日期取自 frontmatter）。每页自己的标题和描述来自各自的 Markdown。

## 许可证

GPL-3.0-or-later。说人话：

- 自己用，包括商业站点，免费。
- 想怎么改都行。
- 二次分发——不管是发主题、发分支，还是打包成模板卖——衍生作品必须继续用 GPL-3.0。不能拿这个主题改个名当闭源产品卖。

如果这个条件对你的用法太严，开个 issue 问一声，作者挺好说话。

## 致谢

用 [Astro](https://astro.build) 构建。设计令牌与布局为本主题原创。无埋点、无第三方脚本。
