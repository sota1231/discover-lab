import { navItems, siteConfig } from '../../config/site'
import { Logo } from '../brand/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.06]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#top" className="inline-block rounded-md" aria-label={`${siteConfig.name} トップへ戻る`}>
            <Logo />
          </a>
          <p className="mt-4 text-sm text-mist-500">Technology × Global Business</p>
        </div>

        <nav aria-label="フッターナビゲーション">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <li>
              <a href="#top" className="text-mist-400 transition-colors hover:text-mist-100">
                トップ
              </a>
            </li>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-mist-400 transition-colors hover:text-mist-100">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/[0.04]">
        <p className="mx-auto max-w-7xl px-5 py-6 font-display text-xs tracking-wider text-mist-500 sm:px-8">
          <small className="text-xs">
            &copy; {year} {siteConfig.name}
          </small>
        </p>
      </div>
    </footer>
  )
}
