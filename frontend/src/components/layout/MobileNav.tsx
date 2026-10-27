import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'motion/react'
import { navItems } from '../../config/site'

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  active: string | null
}

const PANEL_ID = 'mobile-navigation'

/** スマートフォン用ナビゲーション（md 未満で表示） */
export function MobileNav({ open, onOpenChange, active }: MobileNavProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
        buttonRef.current?.focus()
      }
    }
    // 画面幅が広がったら閉じる
    const media = window.matchMedia('(min-width: 768px)')
    const onMediaChange = (event: MediaQueryListEvent) => event.matches && onOpenChange(false)

    window.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onMediaChange)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onMediaChange)
    }
  }, [open, onOpenChange])

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        onClick={() => onOpenChange(!open)}
        className="relative -mr-2 flex size-11 items-center justify-center rounded-full text-fg"
      >
        <span className="relative block h-3 w-5" aria-hidden="true">
          <m.span
            className="absolute inset-x-0 top-0 h-px bg-current"
            animate={open ? { top: '50%', rotate: 45 } : { top: '0%', rotate: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
          <m.span
            className="absolute inset-x-0 bottom-0 h-px bg-current"
            animate={open ? { bottom: '50%', rotate: -45 } : { bottom: '0%', rotate: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
      </button>

      {/* ヘッダーの backdrop-filter が fixed の基準にならないよう body 直下へ描画 */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <m.nav
            id={PANEL_ID}
            aria-label="モバイルナビゲーション"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line/[0.06] bg-canvas/95 px-5 pt-10 pb-16 backdrop-blur-xl"
          >
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <m.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => onOpenChange(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className="flex items-baseline justify-between border-b border-line/[0.06] py-5"
                  >
                    <span className="text-2xl font-medium text-fg">{item.label}</span>
                    <span className="font-display text-xs tracking-[0.25em] text-cyan uppercase">
                      {String(index + 1).padStart(2, '0')} / {item.labelEn}
                    </span>
                  </a>
                </m.li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
