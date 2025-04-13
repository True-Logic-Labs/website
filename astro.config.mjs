// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import node from '@astrojs/node'; // Uncommented
import netlify from "@astrojs/netlify";
import tailwindcss from '@tailwindcss/vite';
import 'dotenv/config'; // Top of file

// Set adapter based on environment
const adapter = process.env.DEPLOY_ENV === 'prod' 
  ? netlify() 
  : node( { mode: 'standalone' } );
  
console.log("Building with >>>>>> ",adapter)

export default defineConfig({
  devToolbar: {
    enabled: false
  },
  site: 'https://truelogiclabs.com',
  integrations: [mdx(), sitemap(), alpinejs()],
  adapter: adapter, // Dynamic adapter
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
  },
});