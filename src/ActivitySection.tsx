import { useState } from 'react'
import type { ConferenceView } from './ConferenceModal'

const activities = [
  {
    id: 'activity-gamejam',
    code: '01',
    title: 'GAME JAM',
    subtitle: '1박 2일 집중 게임 제작',
    desc: '같은 주제로 현장에서 팀을 꾸려 제한 시간 안에 플레이할 수 있는 게임을 완성합니다.',
    when: '12.18–12.19',
    open: false,
  },
  {
    id: 'activity-conference',
    code: '02',
    title: 'CONFERENCE',
    subtitle: '정기 밋업 · 발표 · 네트워킹',
    desc: '부원 발표와 데모 시연, 자유 네트워킹으로 개발 경험과 실무 이야기를 나눕니다.',
    when: 'EVERY LAST WEDNESDAY',
    open: true,
  },
  {
    id: 'activity-review',
    code: '03',
    title: 'REVIEW',
    subtitle: '주간 빌드 공유 및 피드백',
    desc: '매주 진행 중인 게임 빌드와 기획을 직접 플레이해 보며 완성도를 끌어올립니다.',
    when: 'EVERY WEDNESDAY',
    open: false,
  },
] as const

const editions = {
  vol2: {
    tag: 'VOL.02 · UPCOMING',
    label: '제2회 밋업',
    date: '2026. 11. 25. (수) 18:00–20:00',
    place: '국민대학교 미래관 611호 · 누구나 참여 가능',
    poster: '/meetup-poster-vol2.jpg',
    width: 1080,
    height: 1527,
    alt: '제2회 이게모임 밋업 포스터, 11월 25일 수요일 18시부터 20시, 국민대학교 미래관 611호',
  },
  vol1: {
    tag: 'VOL.01 · ARCHIVE',
    label: '1회 밋업',
    date: '2026. 9. 30. (수) 18:00–20:00',
    place: '발표 5건 · 29명 참여 완료',
    poster: '/meetup-poster.png?v=2',
    width: 724,
    height: 1024,
    alt: '1회 이게모임 밋업 포스터, 9월 30일 수요일 18시부터 20시, 국민대학교 미래관 611호',
  },
} as const

type EditionKey = keyof typeof editions

type ActivitySectionProps = {
  onOpenConference: (view: ConferenceView) => void
}

export function ActivitySection({ onOpenConference }: ActivitySectionProps) {
  const [selectedEdition, setSelectedEdition] = useState<EditionKey>('vol2')
  const active = editions[selectedEdition]

  return (
    <section
      id="activity"
      className="relative border-t border-white/[0.08] py-24 md:py-32"
      aria-labelledby="activity-h"
    >
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#38d6f5]">
              02 / ACTIVITY
            </p>
            <h2
              id="activity-h"
              className="font-display mt-3 text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
            >
              매주 만들고,
              <br className="hidden sm:inline" /> 매달 무대에 올립니다.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-[#8b95a7]">
            리뷰에서 다듬고, 밋업에서 공유하고, 게임잼에서 끝까지 완성합니다.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {activities.map((item) => (
              <li key={item.id} id={item.id}>
                {item.open ? (
                  <button
                    type="button"
                    onClick={() => onOpenConference('overview')}
                    className="group flex w-full flex-col gap-4 py-8 text-left transition-colors duration-200 hover:bg-white/[0.025] md:px-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono-tech text-[11px] text-[#38d6f5]">
                          {item.code}
                        </span>
                        <span className="font-display text-[clamp(24px,2.4vw,34px)] font-semibold tracking-[-0.025em] text-white transition-colors group-hover:text-[#38d6f5]">
                          {item.title}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#38d6f5]/35 bg-[#38d6f5]/10 px-3.5 py-1.5 font-mono-tech text-[11px] text-[#7ce7fb] transition-all group-hover:border-[#38d6f5] group-hover:bg-[#38d6f5] group-hover:text-[#06070a]">
                        {item.when}
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </span>
                    </div>
                    <div className="pl-0 md:pl-9">
                      <p className="text-[14px] font-medium text-white/85">
                        {item.subtitle}
                      </p>
                      <p className="mt-1.5 max-w-lg text-[15px] leading-7 text-[#8b95a7]">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ) : (
                  <div className="flex flex-col gap-4 py-8 md:px-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono-tech text-[11px] text-white/40">
                          {item.code}
                        </span>
                        <span className="font-display text-[clamp(24px,2.4vw,34px)] font-semibold tracking-[-0.025em] text-white">
                          {item.title}
                        </span>
                      </div>
                      <span className="font-mono-tech text-[11px] tracking-[0.06em] text-[#8b95a7]">
                        {item.when}
                      </span>
                    </div>
                    <div className="pl-0 md:pl-9">
                      <p className="text-[14px] font-medium text-white/80">
                        {item.subtitle}
                      </p>
                      <p className="mt-1.5 max-w-lg text-[15px] leading-7 text-[#8b95a7]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div id="activity-vol2" className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono-tech text-[11px] tracking-[0.14em] text-[#38d6f5]">
                {active.tag}
              </span>
              <div
                className="inline-flex rounded-full border border-white/[0.1] bg-white/[0.03] p-1"
                role="tablist"
                aria-label="밋업 회차 선택"
              >
                {(['vol2', 'vol1'] as const).map((key) => {
                  const isCurrent = selectedEdition === key
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      onClick={() => setSelectedEdition(key)}
                      className={`rounded-full px-3.5 py-1 font-mono-tech text-[11px] transition-colors ${
                        isCurrent
                          ? 'bg-white text-[#06070a]'
                          : 'text-[#8b95a7] hover:text-white'
                      }`}
                    >
                      {key === 'vol2' ? 'VOL.02' : 'VOL.01'}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenConference(selectedEdition)}
              aria-label={`${active.label} 상세 보기`}
              className="group relative mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#090c14] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#38d6f5]/50 hover:shadow-[0_24px_60px_-20px_rgb(56_214_245/0.25)] lg:mx-0 lg:ml-auto"
            >
              <div className="overflow-hidden">
                <img
                  src={active.poster}
                  alt={active.alt}
                  width={active.width}
                  height={active.height}
                  loading="lazy"
                  className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] bg-[#0b0e16] px-5 py-4">
                <div className="min-w-0">
                  <p className="font-mono-tech text-[11px] text-[#38d6f5]">
                    {active.date}
                  </p>
                  <p className="mt-0.5 truncate text-[14px] text-white/85">
                    {active.place}
                  </p>
                </div>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-sm text-white transition-all group-hover:border-[#38d6f5] group-hover:bg-[#38d6f5] group-hover:text-[#06070a]">
                  ↗
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
