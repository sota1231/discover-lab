/** 事業内容セクションのデータ */

export type BusinessVariant = 'system' | 'trade' | 'product'

export interface BusinessItem {
  id: string
  /** アイコン・ビジュアル・アクセントカラーの種類 */
  variant: BusinessVariant
  number: string
  title: string
  titleJa: string
  description: string
  keywords: readonly string[]
}

export const businessSection = {
  label: 'Business',
  title: '事業内容',
  lead: 'テクノロジーとグローバルビジネス。異なる領域を横断しながら、価値が生まれる接点をつくります。',
} as const

export const businessItems: readonly BusinessItem[] = [
  {
    id: 'web-development',
    variant: 'system',
    number: '01',
    title: 'Web System & Application Development',
    titleJa: 'Webシステム・アプリケーション開発',
    description:
      'Webシステムやアプリケーションの設計・開発を通じて、業務の効率化やサービスの価値向上を支援します。',
    keywords: ['設計', '開発', '業務効率化'],
  },
  {
    id: 'international-trade',
    variant: 'trade',
    number: '02',
    title: 'Export & International Trade',
    titleJa: '輸出・海外取引',
    description:
      '国内外の商品や市場をつなぐ取引事業を展開しています。海外市場を視野に入れた商品流通や輸出関連業務を通じ、新たな販路とビジネス機会の創出を目指します。',
    keywords: ['輸出', '商品流通', '販路開拓'],
  },
  {
    id: 'global-product',
    variant: 'product',
    number: '03',
    title: 'Global Product Development',
    titleJa: '海外商品の国内展開',
    description:
      '海外メーカーとの連携を通じ、独自性のある商品を日本市場へ展開します。独占販売契約や国内向けの商品展開を通じ、新しい価値を消費者へ届けます。',
    keywords: ['海外メーカー連携', '独占販売', '国内展開'],
  },
]
