import { useEffect, useState } from 'react'

/** 指定量以上スクロールしているかどうか */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])

  return scrolled
}
