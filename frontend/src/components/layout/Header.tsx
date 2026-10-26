import { useState } from 'react'
import { m } from 'motion/react'
import { navItems } from '../../config/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { Logo } from '../brand/Logo'
import { MobileNav } from './MobileNav'

const sectionIds = navItems.map((item) => item.id)

export function Header() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <m.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || menuOpen
            ? 'border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-500 sm:px-8 ${
            scrolled || menuOpen ? 'h-16' : 'h-20'
          }`}
        >
          <a href="#top" className="rounded-md" aria-label="Discover Lab トップへ戻る">
            <Logo />
          </a>

          <nav aria-label="メインナビゲーション" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`group relative block px-4 py-2 text-sm transition-colors duration-300 ${
                        isActive ? 'text-mist-100' : 'text-mist-400 hover:text-mist-100'
                      }`}
                    >
                      <span className="mr-2 font-display text-[0.65rem] tracking-[0.2em] text-mist-500 uppercase">
                        {item.labelEn}
                      </span>
                      {item.label}
                      <m.span
                        aria-hidden="true"
                        className="absolute inset-x-4 -bottom-px h-px origin-left bg-gradient-to-r from-accent to-cyan"
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <MobileNav open={menuOpen} onOpenChange={setMenuOpen} active={active} />
        </div>
      </div>
    </m.header>
  )
}
