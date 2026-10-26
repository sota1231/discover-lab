import type { BusinessVariant } from '../../content/business'

/** 事業ごとのアクセントカラー（theme.css の CSS 変数を参照） */
export const variantAccent: Record<BusinessVariant, string> = {
  system: 'var(--color-accent-soft)',
  trade: 'var(--color-cyan)',
  product: 'var(--color-indigo)',
}
