import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { renderHead } from './src/data/seo.js'
import { renderHomeHeroPreload } from './src/data/homeHero.js'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), {
    name: 'development-page-head',
    transformIndexHtml(html) {
      return command === 'serve' ? html.replace('<!--page-head-->', renderHead('/'))
        .replace('<!--page-resources-->', renderHomeHeroPreload('/')) : html
    },
  }],
}))
