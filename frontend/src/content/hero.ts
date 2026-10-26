/** ヒーローセクションの文言 */
export const heroContent = {
  eyebrow: 'Engineering & Global Trade',
  /** 見出しは行ごとに表示。accent: true の行はグラデーションで強調 */
  headline: [
    { text: 'Technology', accent: false },
    { text: '× Global', accent: true },
    { text: 'Business.', accent: false },
  ],
  lead: '技術と世界をつなぎ、新たな価値を創造する。',
  body: 'システム開発で培った設計力と、国境を越えた取引の経験。ふたつの視点を掛け合わせ、まだ見ぬ可能性を発見していきます。',
  primaryCta: { label: '事業内容を見る', href: '#business' },
  secondaryCta: { label: '事業者概要', href: '#profile' },
} as const
