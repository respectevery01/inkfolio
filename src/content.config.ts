import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Two collections, one per language. Files pair by filename:
 *   src/content/posts/hello.md  ⇄  src/content/posts-zh/hello.md
 * Paired files get a language switcher link; unpaired ones do not.
 */
const postSchema = ({ defaultLang }: { defaultLang?: 'en' | 'zh' } = {}) =>
  z.object({
    title: z.string(),
    description: z.string().default(''),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.enum(['en', 'zh']).default(defaultLang ?? 'en'),
  });

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: postSchema({ defaultLang: 'en' }),
});

const postsZh = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts-zh' }),
  schema: postSchema({ defaultLang: 'zh' }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
  }),
});

export const collections = { posts, postsZh, pages };
