import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Business } from './components/sections/Business'
import { Hero } from './components/sections/Hero'
import { Profile } from './components/sections/Profile'
import { BackgroundGlow } from './components/ui/BackgroundGlow'
import { SectionDivider } from './components/ui/SectionDivider'

export default function App() {
  return (
    // LazyMotion で必要な機能だけを読み込み、バンドルを軽量化。
    // reducedMotion="user" で OS の「視差効果を減らす」設定時は移動系アニメーションを無効化。
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-5 focus:py-2 focus:text-sm focus:text-canvas"
        >
          本文へスキップ
        </a>
        <BackgroundGlow />
        <Header />
        <main id="main">
          <Hero />
          <Business />
          <SectionDivider />
          <Profile />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
