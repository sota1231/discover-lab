import type { BusinessVariant } from '../../content/business'
import { variantAccent } from './variantAccent'

interface GraphicProps {
  variant: BusinessVariant
  className?: string
}

/** 事業アイコン（線画） */
export function BusinessIcon({ variant, className = 'size-6' }: GraphicProps) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {variant === 'system' && (
        <g {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 8h18M9.5 11.5 7.5 13.5l2 2M14.5 11.5l2 2-2 2" />
          <path d="M9 21h6" />
        </g>
      )}
      {variant === 'trade' && (
        <g {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
        </g>
      )}
      {variant === 'product' && (
        <g {...common}>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
        </g>
      )}
    </svg>
  )
}

/** カード背景の抽象ビジュアル。事業の性質を幾何学的に表現 */
export function BusinessPattern({ variant, className }: GraphicProps) {
  const color = variantAccent[variant]
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true">
      {variant === 'system' && (
        // モジュールが積み重なるグリッド＝システム設計
        <g stroke={color}>
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 6 }, (_, col) => {
              const on = (row * 7 + col * 3) % 5 === 0
              return (
                <rect
                  key={`${row}-${col}`}
                  x={20 + col * 28}
                  y={14 + row * 28}
                  width="18"
                  height="18"
                  rx="3"
                  strokeOpacity={on ? 0.9 : 0.18}
                  fill={on ? color : 'none'}
                  fillOpacity={on ? 0.15 : 0}
                />
              )
            }),
          )}
        </g>
      )}
      {variant === 'trade' && (
        // 地点を結ぶ弧＝国際取引
        <g stroke={color} strokeLinecap="round">
          <path d="M20 120 Q 100 -10 180 110" strokeOpacity="0.8" strokeDasharray="4 6" className="animate-dash" />
          <path d="M40 130 Q 110 40 170 70" strokeOpacity="0.4" />
          <path d="M10 80 Q 90 60 150 140" strokeOpacity="0.25" />
          {[
            [20, 120],
            [180, 110],
            [40, 130],
            [170, 70],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={color} fillOpacity="0.9" stroke="none" />
          ))}
        </g>
      )}
      {variant === 'product' && (
        // 外から内へ集まる同心円＝海外の価値を国内へ
        <g stroke={color}>
          {[64, 48, 32, 16].map((r, i) => (
            <circle key={r} cx="100" cy="80" r={r} strokeOpacity={0.15 + i * 0.2} />
          ))}
          <path d="M10 80h50M190 80h-50M100 0v30" strokeOpacity="0.5" strokeDasharray="2 4" />
          <circle cx="100" cy="80" r="5" fill={color} stroke="none" />
        </g>
      )}
    </svg>
  )
}
