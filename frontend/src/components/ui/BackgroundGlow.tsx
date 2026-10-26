/** ページ背景のグロー（CSS アニメーションのみ・装飾用） */
export function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[20%] -left-[10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.16),transparent)] animate-drift will-change-transform" />
      <div className="absolute top-[30%] -right-[20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(34_211_238/0.09),transparent)] animate-drift-slow will-change-transform" />
      <div className="absolute -bottom-[30%] left-[20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(closest-side,rgb(129_140_248/0.08),transparent)] animate-drift will-change-transform" />
    </div>
  )
}
