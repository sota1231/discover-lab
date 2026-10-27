import { useId } from 'react'
import { siteConfig } from '../../config/site'

interface LogoMarkProps {
  className?: string
}

/**
 * Discover Lab のシンボル。
 * 視野（レンズ）を表す円弧と、その軌道上で「発見」された一点を組み合わせた抽象マーク。
 */
export function LogoMark({ className = 'size-7' }: LogoMarkProps) {
  const gradientId = `logo-${useId().replace(/[^\w-]/g, '')}`

  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-cyan)" />
        </linearGradient>
      </defs>
      <path d="M26.5 11A11.5 11.5 0 1 0 27.5 16" stroke={`url(#${gradientId})`} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4.2" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.6" />
      <circle cx="27" cy="13.5" r="2.4" fill="var(--color-cyan)" />
    </svg>
  )
}

interface LogoProps {
  className?: string
}

/** 文字主体のロゴ（シンボル＋ワードマーク） */
export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-fg ${className}`}>
      <LogoMark />
      <span className="font-display text-[1.05rem] leading-none tracking-tight">
        <span className="font-semibold">{siteConfig.logo.primary}</span>
        <span className="ml-1 font-light text-fg-soft">{siteConfig.logo.secondary}</span>
      </span>
    </span>
  )
}
