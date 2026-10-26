import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { siteConfig } from './src/config/site.ts'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * src/config/site.ts の内容から index.html の SEO / OGP タグを生成し、
 * 公開 URL が設定されていれば robots.txt と sitemap.xml も出力する。
 */
function siteMeta(siteUrl: string): Plugin {
  const url = siteUrl.replace(/\/$/, '')
  const absolute = (path: string) => (url ? `${url}${path}` : path)

  const seoTags = [
    url && `<link rel="canonical" href="${url}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(siteConfig.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(siteConfig.description)}" />`,
    `<meta property="og:locale" content="${siteConfig.locale}" />`,
    url && `<meta property="og:url" content="${url}/" />`,
    `<meta property="og:image" content="${absolute(siteConfig.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(siteConfig.name)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(siteConfig.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(siteConfig.description)}" />`,
    `<meta name="twitter:image" content="${absolute(siteConfig.ogImage)}" />`,
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      description: siteConfig.description,
      ...(url && { url: `${url}/`, logo: `${url}/apple-touch-icon.png` }),
    })}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ')

  const replacements: Record<string, string> = {
    '%SITE_LANG%': siteConfig.lang,
    '%SITE_TITLE%': escapeHtml(siteConfig.title),
    '%SITE_NAME%': escapeHtml(siteConfig.name),
    '%SITE_DESCRIPTION%': escapeHtml(siteConfig.description),
    '%SITE_THEME_COLOR%': siteConfig.themeColor,
    '<!-- SITE_SEO_TAGS -->': seoTags,
  }

  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        Object.entries(replacements).reduce((result, [key, value]) => result.replaceAll(key, value), html),
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', url && `Sitemap: ${url}/sitemap.xml`].filter(Boolean).join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` })

      if (url) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc></url>\n</urlset>\n`,
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.SITE_URL || siteConfig.url

  return {
    plugins: [react(), tailwindcss(), siteMeta(siteUrl)],
    // サブディレクトリに公開する場合は BASE_PATH=/sub/ を指定
    base: env.BASE_PATH || '/',
    build: {
      target: 'es2020',
      cssMinify: true,
      assetsInlineLimit: 4096,
    },
    server: {
      // 将来 Express API を追加した場合、開発時は /api をバックエンドへ転送
      proxy: {
        '/api': {
          target: env.API_PROXY_TARGET || 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  }
})
