import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  autoIcons: {
    baseIconPath: "assets/icon.webp",
  },
  manifest: {
    name: "SearchThing",
    chrome_settings_overrides: {
      search_provider: {
        name: "SearchThing",
        keyword: "st",
        search_url: "https://searchthing.xyz/search?q={searchTerms}",
        favicon_url: "https://searchthing.xyz/favicon.ico",
        encoding: "UTF-8",
        is_default: true,
      },
    },
  }
});
