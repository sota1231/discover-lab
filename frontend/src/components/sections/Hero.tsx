import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import { heroContent } from '../../content/hero'
import { HeroVisual } from '../visuals/HeroVisual'

const ease = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const line: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1.1, ease } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // スクロールに合わせた控えめなパララックス
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '18%'])
  const visualOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-10%'])

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-heading"
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      {/* 背景：グリッド＋光 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]" />
        <div className="absolute top-1/2 right-[-10%] h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(34_211_238/0.14),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
        <m.div style={{ y: textY }} variants={container} initial="hidden" animate="visible" className="relative z-10">
          <m.p
            variants={fadeUp}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-display text-[0.7rem] tracking-[0.28em] text-mist-300 uppercase"
          >
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]" aria-hidden="true" />
            {heroContent.eyebrow}
          </m.p>

          <h1
            id="hero-heading"
            className="mt-8 font-display text-[clamp(3rem,10.5vw,7.25rem)] leading-[0.95] font-semibold tracking-[-0.035em]"
          >
            {heroContent.headline.map((row) => (
              <span key={row.text} className="block overflow-hidden pb-[0.08em]">
                <m.span variants={line} className={`block ${row.accent ? 'text-gradient' : 'text-mist-100'}`}>
                  {row.text}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p variants={fadeUp} className="mt-9 text-lg font-medium tracking-wider text-mist-100 sm:text-2xl">
            {heroContent.lead}
          </m.p>
          <m.p variants={fadeUp} className="mt-4 max-w-xl text-sm leading-loose text-mist-400 sm:text-base">
            {heroContent.body}
          </m.p>

          <m.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={heroContent.primaryCta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-mist-100 px-6 py-3 text-sm font-medium text-ink-950 transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-[0_0_40px_-6px_var(--color-cyan)]"
            >
              {heroContent.primaryCta.label}
              <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">
                <path d="M8 3v10m0 0 4-4m-4 4-4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm text-mist-300 transition-colors duration-300 hover:border-white/30 hover:text-mist-100"
            >
              {heroContent.secondaryCta.label}
            </a>
          </m.div>
        </m.div>

        <m.div
          style={{ y: visualY, opacity: visualOpacity }}
          className="pointer-events-none absolute top-1/2 right-[-30%] w-[110vw] max-w-[40rem] -translate-y-1/2 sm:right-[-15%] lg:relative lg:top-auto lg:right-auto lg:w-full lg:translate-y-0"
        >
          <div className="opacity-40 lg:opacity-100">
          <m.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease }}
            className="aspect-square"
          >
            <HeroVisual />
          </m.div>
          </div>
        </m.div>
      </div>

      {/* スクロールインジケーター */}
      <m.a
        href="#business"
        aria-label="事業内容へスクロール"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-display text-[0.65rem] tracking-[0.3em] text-mist-500 uppercase sm:flex"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-cyan animate-[scroll-line_2.4s_ease-in-out_infinite]" />
        </span>
      </m.a>
    </section>
  )
}
