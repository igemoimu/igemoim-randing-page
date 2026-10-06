import { useEffect, useState } from 'react'
import { ConferenceModal } from './ConferenceModal'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const activities = [
  {
    id: 'gamejam',
    code: '01',
    title: 'GAME JAM',
    when: 'OCT 30 — NOV 1',
    open: false,
  },
  {
    id: 'conference',
    code: '02',
    title: 'CONFERENCE',
    when: 'EVERY LAST WEDNESDAY',
    open: true,
  },
  {
    id: 'review',
    code: '03',
    title: 'REVIEW',
    when: 'EVERY WEDNESDAY',
    open: false,
  },
] as const

export function ActivitySection() {
  const [conferenceOpen, setConferenceOpen] = useState(false)

  useEffect(() => {
    if (!conferenceOpen) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [conferenceOpen])

  return (
    <section id="activity" className="relative border-t border-cyan-300/15 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading index="02" label="ACTIVITY" />
        </Reveal>

        <div className="mt-12 divide-y divide-cyan-300/15 border-y border-cyan-300/15">
          {activities.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              {item.open ? (
                <button
                  type="button"
                  onClick={() => setConferenceOpen(true)}
                  className="card-lift group flex w-full flex-col gap-2 py-6 text-left md:flex-row md:items-end md:justify-between md:py-7"
                >
                  <ActivityTitle item={item} />
                  <div className="flex items-center gap-3">
                    <p className="font-tech text-[10px] tracking-[0.2em] text-cyan-100/55 md:text-[11px]">
                      {item.when}
                    </p>
                    <ArrowOut />
                  </div>
                </button>
              ) : (
                <div className="flex flex-col gap-2 py-6 md:flex-row md:items-end md:justify-between md:py-7">
                  <ActivityTitle item={item} />
                  <p className="font-tech text-[10px] tracking-[0.2em] text-cyan-100/55 md:text-[11px]">
                    {item.when}
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {conferenceOpen ? (
        <ConferenceModal onClose={() => setConferenceOpen(false)} />
      ) : null}
    </section>
  )
}

function ArrowOut() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className="h-3 w-3 shrink-0 text-cyan-200/75 transition group-hover:text-cyan-100"
    >
      <path
        d="M3.2 8.8 8.8 3.2M4.6 3.2H8.8V7.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="square"
      />
    </svg>
  )
}

function ActivityTitle({
  item,
}: {
  item: (typeof activities)[number]
}) {
  return (
    <div className="min-w-0">
      <p className="font-tech text-[10px] tracking-[0.28em] text-cyan-300">
        {item.code}
      </p>
      <h3 className="font-display mt-2 text-[22px] leading-none text-white transition group-hover:text-cyan-100 md:text-[28px]">
        {item.title}
      </h3>
    </div>
  )
}
