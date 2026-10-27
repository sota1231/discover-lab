/** ページ背景のグロー（CSS アニメーションのみ・装飾用） */
export function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[20%] -left-[10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent)] animate-drift will-change-transform" />
      <div className="absolute top-[30%] -right-[20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-cyan)_9%,transparent),transparent)] animate-drift-slow will-change-transform" />
      <div className="absolute -bottom-[30%] left-[20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-indigo)_8%,transparent),transparent)] animate-drift will-change-transform" />
    </div>
  )
}
