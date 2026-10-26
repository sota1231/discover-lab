/**
 * 事業者概要のデータ。
 * 未確定の項目は value を null のままにしてください。
 *  - hideWhenEmpty: false → 「未設定」と表示
 *  - hideWhenEmpty: true  → 項目ごと非表示
 */

export interface ProfileItem {
  label: string
  value: string | null
  hideWhenEmpty?: boolean
}

export const profileSection = {
  label: 'Profile',
  title: '事業者概要',
  lead: '技術とビジネスの両輪で、国内外の新しい可能性に挑戦しています。',
  emptyLabel: '未設定',
} as const

export const profileItems: readonly ProfileItem[] = [
  { label: '事業者名', value: 'Discover Lab' },
  { label: '事業形態', value: '個人事業主' },
  { label: '所在地', value: null },
  {
    label: '事業内容',
    value: 'Webシステム開発\n輸出・海外取引\n海外商品の国内展開',
  },
  { label: '開業年月', value: null, hideWhenEmpty: true },
]
