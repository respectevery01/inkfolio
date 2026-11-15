import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import remarkCallouts from './src/lib/remark-callouts.mjs';
import transformerFilename from './src/lib/shiki-filename.mjs';
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers';

const config = parse(readFileSync(new URL('./site.config.yaml', import.meta.url), 'utf8'));

export default defineConfig({
  // SITE_URL lets a demo/host build override the canonical domain without
  // editing site.config.yaml (e.g. SITE_URL=https://inkfolio.pages.dev).
  site: process.env.SITE_URL || config.site.url,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkCallouts],
    shikiConfig: {
      // ```yaml title="site.config.yaml"  → labelled block
      // // [!code highlight]              → highlighted line
      // // [!code ++] / // [!code --]     → diff lines
      transformers: [transformerFilename(), transformerNotationHighlight(), transformerNotationDiff()],
    },
  },
  integrations: [sitemap()],
});
