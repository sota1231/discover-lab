import { businessItems, businessSection } from '../../content/business'
import { SectionHeading } from '../ui/SectionHeading'
import { BusinessCard } from './BusinessCard'

export function Business() {
  return (
    <section id="business" aria-labelledby="business-heading" className="relative py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="business-heading"
          index="01"
          label={businessSection.label}
          title={businessSection.title}
          lead={businessSection.lead}
        />

        <ul className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {businessItems.map((item, index) => (
            <li key={item.id} className={index === 2 ? 'md:col-span-2 lg:col-span-1' : undefined}>
              <BusinessCard item={item} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
