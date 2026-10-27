/**
 * サイト全体の基本設定。
 * 屋号・SEO 情報・公開 URL などはこのファイルだけを編集すれば反映されます。
 * （vite.config.ts からも読み込まれ、index.html のメタタグ生成に使われます）
 *
 * ブランドカラーは src/styles/theme.css で管理しています。
 */
export const siteConfig = {
  /** 屋号 */
  name: 'Discover Lab',
  /** ロゴ表示用：屋号を前半・後半に分けて表示ウェイトを変えます */
  logo: {
    primary: 'Discover',
    secondary: 'Lab',
  },
  /** <title> */
  title: 'Discover Lab | Technology × Global Business',
  /** meta description / OGP description */
  description:
    'Discover Labは、Webシステム・アプリケーション開発と、輸出・海外取引、海外商品の国内展開を手がける個人事業です。技術と世界をつなぎ、新たな価値を創造します。',
  /**
   * 公開 URL（末尾スラッシュなし）。例: 'https://example.com'
   * 独自ドメイン確定後に設定してください。空の場合 canonical / og:url / sitemap は出力されません。
   * 環境変数 SITE_URL が設定されている場合はそちらが優先されます。
   */
  url: 'https://discoverlab-jp.com',
  /** OGP 画像（public/ 配下のパス） */
  ogImage: '/og-image.jpg',
  locale: 'ja_JP',
  lang: 'ja',
  /**
   * 配色テーマ：'dark'（黒ベース）または 'light'（白ベース）
   * 色の定義は src/styles/theme.css
   */
  theme: 'light' as 'dark' | 'light',
  /** ブラウザ UI の色（theme-color）。テーマごとに指定 */
  themeColor: {
    dark: '#05070d',
    light: '#fbfcfe',
  },
} as const

export type SiteConfig = typeof siteConfig

/** ページ内ナビゲーション（ヘッダー・フッター共通） */
export const navItems = [
  { id: 'business', label: '事業内容', labelEn: 'Business' },
  { id: 'profile', label: '事業者概要', labelEn: 'Profile' },
] as const

export type NavItem = (typeof navItems)[number]
export type SectionId = NavItem['id']
