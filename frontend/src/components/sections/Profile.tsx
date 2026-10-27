import { profileItems, profileSection } from '../../content/profile'
import { LogoMark } from '../brand/Logo'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Profile() {
  const items = profileItems.filter((item) => item.value !== null || !item.hideWhenEmpty)

  return (
    <section id="profile" aria-labelledby="profile-heading" className="relative py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="profile-heading"
            index="02"
            label={profileSection.label}
            title={profileSection.title}
            lead={profileSection.lead}
          />
          <Reveal delay={0.15} className="mt-12 hidden lg:block">
            <div aria-hidden="true" className="relative size-40">
              <div className="absolute inset-0 rounded-full border border-line/[0.06]" />
              <div className="absolute inset-6 rounded-full border border-dashed border-line/10 animate-spin-slow" />
              <LogoMark className="absolute inset-0 m-auto size-14 text-fg" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass relative overflow-hidden rounded-3xl">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
            />
            <dl className="divide-y divide-line/[0.06]">
              {items.map((item) => (
                <div key={item.label} className="grid gap-2 px-7 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:px-10 sm:py-7">
                  <dt className="text-sm text-fg-subtle">{item.label}</dt>
                  <dd className={`whitespace-pre-line ${item.value === null ? 'text-fg-subtle' : 'text-fg'}`}>
                    {item.value !== null && item.href ? (
                      <a
                        href={item.href}
                        className="break-all underline decoration-line/20 underline-offset-4 transition-colors hover:text-cyan hover:decoration-cyan"
                      >
                        {item.value}
                      </a>
                    ) : (
                      (item.value ?? profileSection.emptyLabel)
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
