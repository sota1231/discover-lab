import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { m } from 'motion/react'
import type { BusinessItem } from '../../content/business'
import { BusinessIcon, BusinessPattern } from '../visuals/BusinessGraphics'
import { variantAccent } from '../visuals/variantAccent'

interface BusinessCardProps {
  item: BusinessItem
  index: number
}

export function BusinessCard({ item, index }: BusinessCardProps) {
  const ref = useRef<HTMLElement>(null)
  const accent = variantAccent[item.variant]

  // カーソル位置に追従するスポットライト（CSS 変数のみ更新し、再レンダリングしない）
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <m.article
      ref={ref}
      onPointerMove={handlePointerMove}
      aria-labelledby={`${item.id}-title`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] } }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ '--accent': accent } as CSSProperties}
      className="card-surface group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/[0.07] bg-gradient-to-b from-surface/90 to-canvas-soft/90 p-7 transition-[border-color,box-shadow] duration-500 hover:border-[color-mix(in_oklab,var(--accent)_40%,transparent)] hover:shadow-[0_30px_80px_-40px_var(--accent)] sm:p-9"
    >
      {/* スポットライト */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), color-mix(in oklab, var(--accent) 14%, transparent), transparent 65%)',
        }}
      />
      {/* 上辺のライン */}
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between">
        <span
          className="flex size-12 items-center justify-center rounded-2xl border border-line/10 bg-line/[0.03] text-[var(--accent)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
        >
          <BusinessIcon variant={item.variant} />
        </span>
        <span className="font-display text-sm tracking-[0.2em] text-fg-subtle">{item.number}</span>
      </div>

      <BusinessPattern
        variant={item.variant}
        className="relative mx-auto my-8 h-32 w-full max-w-[15rem] opacity-60 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-100"
      />

      <div className="relative mt-auto">
        <h3 id={`${item.id}-title`} className="font-display text-xl leading-snug font-semibold tracking-tight text-fg sm:text-[1.4rem]">
          {item.title}
        </h3>
        <p className="mt-2 text-sm font-medium text-[var(--accent)]">{item.titleJa}</p>
        <p className="mt-5 text-[0.94rem] leading-loose text-fg-soft">{item.description}</p>
        <ul className="mt-7 flex flex-wrap gap-2" aria-label="キーワード">
          {item.keywords.map((keyword) => (
            <li key={keyword} className="rounded-full border border-line/10 px-3 py-1 text-xs text-fg-muted">
              {keyword}
            </li>
          ))}
        </ul>
      </div>
    </m.article>
  )
}
