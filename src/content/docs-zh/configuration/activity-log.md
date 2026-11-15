---
title: 活跃度
order: 5
description: /log 那张提交热力图。真实 GitHub 数据，一个脚本刷新。
---

`/log/` 读的是 `src/data/log.json`：

```json
{
  "updated": "2026-11-16",
  "repos": ["owner/name"],
  "repoStats": [{ "name": "owner/name", "commits": 425, "last": "2026-11-11" }],
  "days": [{ "date": "2026-11-16", "count": 3 }]
}
```

## 刷新

```bash
GITHUB_TOKEN=ghp_xxx node scripts/fetch-log.mjs
```

仓库列表在脚本顶部：

```js
export const REPOS = [
  'owner/repo-one',
  'owner/repo-two',
];
```

一行一个 `owner/name`。私有仓库需要带 `repo` scope 的 token；公开仓库随便一个 token 都行，但匿名限流 60 次/小时很快就不够。

## 它写什么

- 365 天的按日计数，按 `Asia/Shanghai` 分桶——否则深夜提交会落到前一个 UTC 日，续更天数看着就断了
- 每个仓库的提交总数和最后提交日期
- `updated`，显示在页面底部

> [!IMPORTANT]
> 脚本不包含在 `npm run build` 里。失败时保留旧文件并非 0 退出，网络抽风不会搞坏部署。放 cron 或手动跑，之后把 JSON 提交上去。
