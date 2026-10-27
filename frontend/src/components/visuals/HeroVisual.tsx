import { m } from 'motion/react'

const longitudes = [0, 30, 60, 90, 120, 150]
const latitudes = [-60, -30, 0, 30, 60]
/** 地球儀上のノード（[経度方向の x, y]）と、それらを結ぶ取引ルートの弧 */
const nodes: ReadonlyArray<readonly [number, number]> = [
  [172, 196],
  [318, 152],
  [356, 296],
  [214, 352],
  [270, 238],
]
const routes = [
  'M172 196 Q 240 120 318 152',
  'M318 152 Q 380 220 356 296',
  'M214 352 Q 200 260 270 238',
  'M270 238 Q 300 170 318 152',
]

const R = 160
const C = 260

/**
 * ヒーローの抽象ビジュアル。
 * 「Global」を表すワイヤーフレームの地球儀と、「Technology」を表す回路的な軌道・ノードを重ねています。
 */
export function HeroVisual() {
  return (
    <svg viewBox="0 0 520 520" fill="none" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="hv-core" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hv-stroke" x1="0" y1="0" x2="520" y2="520" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-cyan)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="hv-route" x1="160" y1="140" x2="360" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-cyan)" />
          <stop offset="1" stopColor="var(--color-indigo)" />
        </linearGradient>
        <clipPath id="hv-sphere">
          <circle cx={C} cy={C} r={R} />
        </clipPath>
      </defs>

      <circle cx={C} cy={C} r={250} fill="url(#hv-core)" />

      {/* 外周の目盛りリング（ゆっくり回転） */}
      <g className="animate-spin-slow origin-center [transform-box:view-box]">
        <circle cx={C} cy={C} r={232} stroke="var(--color-line)" strokeOpacity="0.06" />
        {Array.from({ length: 72 }, (_, i) => {
          const angle = (i * 5 * Math.PI) / 180
          const inner = i % 6 === 0 ? 222 : 227
          return (
            <line
              key={i}
              x1={C + Math.cos(angle) * inner}
              y1={C + Math.sin(angle) * inner}
              x2={C + Math.cos(angle) * 232}
              y2={C + Math.sin(angle) * 232}
              stroke="var(--color-line)"
              strokeOpacity={i % 6 === 0 ? 0.28 : 0.1}
            />
          )
        })}
      </g>

      {/* 傾いた軌道 */}
      <m.ellipse
        cx={C}
        cy={C}
        rx={215}
        ry={70}
        transform={`rotate(-24 ${C} ${C})`}
        stroke="url(#hv-stroke)"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <ellipse
        cx={C}
        cy={C}
        rx={215}
        ry={70}
        transform={`rotate(-24 ${C} ${C})`}
        stroke="var(--color-cyan)"
        strokeOpacity="0.7"
        strokeDasharray="2 198"
        className="animate-dash"
      />

      {/* 地球儀 */}
      <circle cx={C} cy={C} r={R} fill="var(--color-canvas-soft)" fillOpacity="0.6" stroke="url(#hv-stroke)" strokeOpacity="0.7" />
      <g clipPath="url(#hv-sphere)" stroke="var(--color-line)" strokeOpacity="0.1">
        {longitudes.map((deg) => (
          <ellipse key={`lon-${deg}`} cx={C} cy={C} rx={Math.abs(Math.cos((deg * Math.PI) / 180)) * R} ry={R} />
        ))}
        {latitudes.map((deg) => {
          const rad = (deg * Math.PI) / 180
          return <ellipse key={`lat-${deg}`} cx={C} cy={C + Math.sin(rad) * R} rx={Math.cos(rad) * R} ry={Math.cos(rad) * R * 0.18} />
        })}
      </g>

      {/* 取引ルート */}
      {routes.map((d, i) => (
        <m.path
          key={d}
          d={d}
          stroke="url(#hv-route)"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 1 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* ノード */}
      {nodes.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={9} fill="var(--color-cyan)" fillOpacity="0.12" className="animate-pulse-dot" style={{ animationDelay: `${i * 0.6}s` }} />
          <m.circle
            cx={x}
            cy={y}
            r={3}
            fill="var(--color-cyan-soft)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        </g>
      ))}

      {/* 回路的なアクセント */}
      <g stroke="var(--color-accent-soft)" strokeOpacity="0.45" strokeLinecap="round">
        <path d="M420 120 h36 l14 14 v40" />
        <path d="M84 400 h-30 l-12 -12 v-46" />
      </g>
      <circle cx="470" cy="174" r="3" fill="var(--color-accent-soft)" />
      <circle cx="42" cy="342" r="3" fill="var(--color-accent-soft)" />
    </svg>
  )
}
