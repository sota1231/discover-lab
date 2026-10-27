import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  index: string
  label: string
  title: string
  lead?: string
}

/** セクション見出し：英字ラベル＋日本語タイトル＋リード文 */
export function SectionHeading({ id, index, label, title, lead }: SectionHeadingProps) {
  return (
    <Reveal as="header" className="max-w-2xl">
      <p className="flex items-center gap-3 font-display text-xs font-medium tracking-[0.3em] text-cyan uppercase">
        <span className="text-fg-subtle">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
        {label}
      </p>
      <h2 id={id} className="mt-5 text-3xl font-semibold tracking-wide text-fg sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-5 text-base text-fg-soft sm:text-lg">{lead}</p>}
    </Reveal>
  )
}
