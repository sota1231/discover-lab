/**
 * 事業者概要のデータ。
 * 未確定の項目は value を null のままにしてください。
 *  - hideWhenEmpty: false → 「未設定」と表示
 *  - hideWhenEmpty: true  → 項目ごと非表示
 * href を指定するとリンクとして表示します（例: 'mailto:...'）
 */

export interface ProfileItem {
  label: string
  value: string | null
  hideWhenEmpty?: boolean
  href?: string
}

export const profileSection = {
  label: 'Profile',
  title: '事業者概要',
  lead: '技術とビジネスの両輪で、国内外の新しい可能性に挑戦しています。',
  emptyLabel: '未設定',
} as const

export const profileItems: readonly ProfileItem[] = [
  { label: '屋号名', value: 'Discover Lab' },
  { label: '事業者名', value: '加藤 聡太' },
  { label: '事業形態', value: '個人事業主' },
  { label: '連絡先', value: 'info@discoverlab-jp.com', href: 'mailto:info@discoverlab-jp.com' },
  {
    label: '事業内容',
    value: 'Webシステム開発\n輸出・海外取引・オンラインショップ販売\n海外商品の国内展開',
  },
  { label: '開業年月', value: null, hideWhenEmpty: true },
]
