---
title: Activity log
order: 5
description: The commit heatmap at /log. Real data from GitHub, refreshed by one script.
---

The `/log/` page reads `src/data/log.json`:

```json
{
  "updated": "2026-11-16",
  "repos": ["owner/name"],
  "repoStats": [{ "name": "owner/name", "commits": 425, "last": "2026-11-11" }],
  "days": [{ "date": "2026-11-16", "count": 3 }]
}
```

## Refresh it

```bash
GITHUB_TOKEN=ghp_xxx node scripts/fetch-log.mjs
```

The repository list lives at the top of that script:

```js
export const REPOS = [
  'owner/repo-one',
  'owner/repo-two',
];
```

One `owner/name` per line. Private repositories need a token with `repo` scope; public ones work with any token but still hit the 60-requests-per-hour anonymous limit quickly.

## What it writes

- 365 days of per-day counts, bucketed in `Asia/Shanghai` so late-night commits do not land on the previous UTC day and look like a broken streak
- per-repository totals and the last commit date
- `updated`, shown at the bottom of the page

> [!IMPORTANT]
> The script is not part of `npm run build`. On failure it keeps the existing file and exits non-zero, so a flaky network never breaks a deploy. Run it from cron or by hand, then commit the JSON.
