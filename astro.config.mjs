// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';

// import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig( {devToolbar: {
    enabled: false
  },
  site: 'https://truelogiclabs.com',
  integrations: [ mdx(), sitemap(), alpinejs() ],

  adapter: netlify(),
  output: 'server',

  // adapter: node({
  //   mode: 'standalone',
  // }),

  vite: {
    plugins: [tailwindcss()],
  },
} );