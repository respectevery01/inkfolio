---
title: Writing and translations
order: 1
description: Posts, the weekly series and research all work the same way — Markdown in, page out. Translations pair by filename.
---

## Three collections, one shape

| Collection | Folder | URL |
| --- | --- | --- |
| Posts | `src/content/posts/` | `/posts/<slug>/` |
| Weekly | `src/content/weekly/` | `/weekly/<slug>/` |
| Research | `src/content/research/` | `/research/<slug>/` |

All three take the same frontmatter (`title`, `description`, `date`, `tags`, `draft`), plus one field each: `issue` for weekly, `type` for research.

## How translations pair

A Chinese file with the **same filename** in the matching `-zh` folder (`posts-zh`, `weekly-zh`, `research-zh`) is treated as the translation of the English one:

```
src/content/posts/hello.md
src/content/posts-zh/hello.md   ← same name, paired
```

Paired pages link to each other and emit reciprocal `hreflang` tags. Unpaired pages simply do not show a language switch — better than sending a reader to a 404.

> [!NOTE]
> You do not have to translate everything. A common split: short notes in one language, long pieces in both.

## Drafts

`draft: true` keeps a file in the repository but out of every list, the RSS feed, the sitemap and the translation pairing.

## Images

Files go in `public/` and are referenced from the site root:

```markdown
![Alt text](/images/photo.jpg)
```

The prose styles add a border and rounded corners. There is no image pipeline; compress before committing.
