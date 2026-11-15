import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const config = parse(readFileSync(new URL('./site.config.yaml', import.meta.url), 'utf8'));

export default defineConfig({
  site: config.site.url,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
