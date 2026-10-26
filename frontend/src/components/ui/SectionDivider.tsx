import { m } from 'motion/react'

/** セクション同士を視覚的につなぐ縦ライン */
export function SectionDivider() {
  return (
    <div aria-hidden="true" className="relative mx-auto flex h-24 w-px justify-center sm:h-32">
      <m.span
        className="absolute inset-0 origin-top bg-gradient-to-b from-transparent via-cyan/50 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_16px_var(--color-cyan)]" />
    </div>
  )
}
