// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gezicilabs.github.io',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
