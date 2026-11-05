// @ts-check
import { defineConfig } from 'astro/config';


import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';


export default defineConfig({
  trailingSlash: 'always',
  site: 'https://toolvector.io',

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/go/')
    })
  ]
});