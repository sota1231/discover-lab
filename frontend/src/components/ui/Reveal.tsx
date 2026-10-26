import type { ReactNode } from 'react'
import { m, type Variants } from 'motion/react'

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'header' | 'article'
}

/** スクロールで画面内に入ったときにフェードイン（一度だけ） */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = m[as]
  return (
    <Component
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </Component>
  )
}
