import { useEffect, useId, useState } from 'react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const ACTIVITY_CLICKABLE = false

const activities = [
  {
    id: 'gamejam',
    code: '01',
    title: 'GAME JAM',
    when: 'OCT 30 — NOV 1',
  },
  {
    id: 'conference',
    code: '02',
    title: 'CONFERENCE',
    when: 'LAST WEDNESDAY',
  },
  {
    id: 'review',
    code: '03',
    title: 'REVIEW',
    when: 'EVERY WEDNESDAY',
  },
] as const

type ActivityId = (typeof activities)[number]['id']

export function ActivitySection() {
  const [openId, setOpenId] = useState<ActivityId | null>(null)
  const titleId = useId()
  const open = activities.find((item) => item.id === openId) ?? null

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenId(null)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <section id="activity" className="relative border-t border-cyan-300/15 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading index="02" label="ACTIVITY" />
        </Reveal>

        <div className="mt-12 divide-y divide-cyan-300/15 border-y border-cyan-300/15">
          {activities.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <div className="flex flex-col gap-2 py-6 md:flex-row md:items-end md:justify-between md:py-7">
                <div className="min-w-0">
                  <p className="font-tech text-[10px] tracking-[0.28em] text-cyan-300">
                    {item.code}
                  </p>
                  <h3 className="font-display mt-2 text-[22px] leading-none text-white md:text-[28px]">
                    {item.title}
                  </h3>
                </div>
                <p className="font-tech text-[10px] tracking-[0.2em] text-cyan-100/55 md:text-[11px]">
                  {item.when}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {ACTIVITY_CLICKABLE && open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          role="presentation"
        >
          <button
            type="button"
            aria-label="닫기"
            className="modal-veil absolute inset-0 bg-[#05060a]/80 backdrop-blur-sm"
            onClick={() => setOpenId(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="modal-panel relative z-10 w-full max-w-md border border-cyan-300/30 bg-[#0a0d14] p-8 shadow-[0_0_40px_rgb(0_212_255/0.12)]"
          >
            <p className="font-tech text-[11px] tracking-[0.24em] text-cyan-300">
              {open.code}
            </p>
            <h3 id={titleId} className="font-tech mt-3 text-3xl tracking-[0.12em]">
              {open.title}
            </h3>
            <p className="mt-2 font-tech text-sm tracking-[0.14em] text-cyan-100">
              {open.when}
            </p>
            <p className="font-tech mt-8 text-center text-lg tracking-[0.18em] text-cyan-200">
              COMING SOON
            </p>
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="btn-breathe hud-frame mt-8 w-full bg-cyan-400 px-4 py-3 text-[14px] font-semibold tracking-wide text-black transition hover:bg-white"
            >
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
