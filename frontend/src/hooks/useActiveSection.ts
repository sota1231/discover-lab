import { useEffect, useState } from 'react'

/** 画面中央付近にあるセクションの id を返す（ナビゲーションの現在地表示用） */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        setActive(ids.find((id) => visible.get(id)) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
