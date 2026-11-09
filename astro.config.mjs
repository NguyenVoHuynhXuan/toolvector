// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeEnhanceTables from './src/utils/rehypeEnhanceTables.mjs';

export default defineConfig({
  trailingSlash: 'always',
  site: 'https://toolvector.io',

  markdown: {
    rehypePlugins: [rehypeEnhanceTables],
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/go/')
    })
  ]
});
