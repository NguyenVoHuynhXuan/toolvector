// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeEnhanceTables from './src/utils/rehypeEnhanceTables.mjs';
import rehypeSponsoredLinks from './src/utils/rehypeSponsoredLinks.mjs';

export default defineConfig({
  trailingSlash: 'always',
  site: 'https://toolvector.io',

  markdown: {
    rehypePlugins: [rehypeEnhanceTables, rehypeSponsoredLinks],
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/go/')
    })
  ]
});
