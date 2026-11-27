import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { meetupTalks, meetupVol2Talks } from './conference'

export type ConferenceView = 'overview' | 'vol1' | 'vol2'

type ConferenceModalProps = {
  initialView?: ConferenceView
  onClose: () => void
}

export function ConferenceModal({
  initialView = 'overview',
  onClose,
}: ConferenceModalProps) {
  const titleId = useId()
  const scrollRef = useRef<HTMLDivElement>(null)
  const pendingView = useRef<ConferenceView | null>(null)
  const [view, setView] = useState<ConferenceView>(initialView)
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  const [dir, setDir] = useState<'forward' | 'back'>('forward')
  const [moved, setMoved] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [view])

  const requestClose = useCallback(() => {
    if (leaving) return
    setLeaving(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(onClose, reduce ? 0 : 180)
  }, [leaving, onClose])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [requestClose])

  const goTo = (next: ConferenceView) => {
    if (leaving || next === view || phase === 'out') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setView(next)
      return
    }
    pendingView.current = next
    setMoved(true)
    setDir(next === 'overview' ? 'back' : 'forward')
    setPhase('out')
  }

  const onViewAnimEnd = () => {
    if (phase !== 'out' || !pendingView.current) return
    setView(pendingView.current)
    pendingView.current = null
    setPhase('in')
  }

  const viewAnimClass = moved
    ? phase === 'in'
      ? dir === 'forward'
        ? 'modal-view-in-f'
        : 'modal-view-in-b'
      : dir === 'forward'
        ? 'modal-view-out-f'
        : 'modal-view-out-b'
    : undefined

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="컨퍼런스 창 닫기"
        onClick={requestClose}
        className={`absolute inset-0 bg-[#040508]/80 backdrop-blur-md ${leaving ? 'modal-veil-out' : 'modal-veil-in'}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 flex max-h-[min(88svh,860px)] w-full max-w-[980px] flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0a0c12] shadow-[0_32px_90px_-20px_rgb(0_0_0/0.85)] ${leaving ? 'modal-panel-out' : 'modal-panel-in'}`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 md:px-7">
          {view === 'overview' ? (
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#38d6f5]">
              CONFERENCE
            </p>
          ) : (
            <button
              type="button"
              onClick={() => goTo('overview')}
              className="inline-flex min-h-[36px] items-center gap-2 font-mono-tech text-[11px] tracking-[0.14em] text-[#38d6f5] transition-colors hover:text-white"
            >
              ← 목록
            </button>
          )}
          <button
            type="button"
            onClick={requestClose}
            className="inline-flex min-h-[36px] items-center rounded-full border border-white/[0.1] px-3.5 font-mono-tech text-[11px] tracking-[0.12em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            CLOSE
          </button>
        </div>

        <div ref={scrollRef} className="overflow-y-auto overflow-x-hidden">
          <div className={viewAnimClass} onAnimationEnd={onViewAnimEnd}>
            {view === 'overview' ? (
              <Overview
                titleId={titleId}
                onOpenVol1={() => goTo('vol1')}
                onOpenVol2={() => goTo('vol2')}
              />
            ) : view === 'vol1' ? (
              <VolumeOne titleId={titleId} />
            ) : (
              <VolumeTwo titleId={titleId} />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function Overview({
  titleId,
  onOpenVol1,
  onOpenVol2,
}: {
  titleId: string
  onOpenVol1: () => void
  onOpenVol2: () => void
}) {
  return (
    <div className="grid items-start gap-8 p-5 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-10 md:p-8">
      <figure className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#07090f]">
        <img
          src="/meetup-poster-vol2.jpg"
          alt="제2회 이게모임 MEETUP 포스터"
          width={1080}
          height={1527}
          className="block h-auto w-full"
        />
      </figure>

      <div>
        <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#38d6f5]">
          MEETUP SERIES
        </p>
        <h3
          id={titleId}
          className="font-display mt-3 text-[34px] font-semibold leading-none tracking-[-0.03em] text-white md:text-[44px]"
        >
          MEETUP
        </h3>
        <div className="mt-5 space-y-3 text-[15px] leading-7 text-[#9aa5b8]">
          <p>
            부원 발표와 자유 네트워킹으로, 개발하면서 쌓인 경험과 실무 이야기를
            나누는 자리입니다. 게임 개발에 관심 있으면 누구나 올 수 있어요.
          </p>
          <p>
            2회는 2026년 11월 25일 수요일, 국민대학교 미래관 611호에서 열립니다.
            18:00부터 20:00까지이며 참여 제한은 없습니다.
          </p>
        </div>

        <div className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          <button
            type="button"
            onClick={onOpenVol2}
            className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-white/[0.02]"
          >
            <div>
              <p className="font-mono-tech text-[11px] text-[#38d6f5]">
                VOL.02 · UPCOMING
              </p>
              <p className="font-display mt-1.5 text-[22px] font-semibold text-white transition-colors group-hover:text-[#38d6f5]">
                2회 MEETUP
              </p>
              <p className="mt-1 text-[14px] text-[#8b95a7]">
                2026. 11. 25. (수) 18:00–20:00 · 미래관 611호
              </p>
            </div>
            <span
              aria-hidden="true"
              className="text-lg text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-[#38d6f5]"
            >
              ↗
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenVol1}
            className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-white/[0.02]"
          >
            <div>
              <p className="font-mono-tech text-[11px] text-white/45">
                VOL.01 · ARCHIVE
              </p>
              <p className="font-display mt-1.5 text-[22px] font-semibold text-white transition-colors group-hover:text-[#38d6f5]">
                1회 MEETUP
              </p>
              <p className="mt-1 text-[14px] text-[#8b95a7]">
                2026. 9. 30. (수) 18:00–20:00 · 미래관 611호
              </p>
            </div>
            <span
              aria-hidden="true"
              className="text-lg text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-[#38d6f5]"
            >
              ↗
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

type MeetupTalk = {
  speaker: string
  title: string
  cancelled?: boolean
}

function TalkList({ talks }: { talks: readonly MeetupTalk[] }) {
  return (
    <>
      <p className="font-mono-tech mt-8 text-[11px] tracking-[0.18em] text-[#38d6f5]">
        TALKS
      </p>
      <ol className="mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {talks.map((talk, index) => (
          <li
            key={talk.title}
            className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 gap-y-1 py-4"
          >
            <span
              className={`font-mono-tech text-[11px] ${talk.cancelled ? 'text-white/35' : 'text-[#38d6f5]'}`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <p
                className={`text-[15px] leading-6 ${talk.cancelled ? 'text-white/40 line-through decoration-white/35' : 'text-white'}`}
              >
                {talk.title}
              </p>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[13px] leading-5">
                {talk.cancelled ? (
                  <span className="font-mono-tech text-[10px] tracking-[0.14em] text-[#8b95a7]">
                    취소
                  </span>
                ) : null}
                <span
                  className={
                    talk.cancelled
                      ? 'text-white/35 line-through decoration-white/25'
                      : 'text-[#8b95a7]'
                  }
                >
                  {talk.speaker}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

function VolumeOne({ titleId }: { titleId: string }) {
  return (
    <div className="grid items-start gap-8 p-5 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-10 md:p-8">
      <figure className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#07090f]">
        <img
          src="/meetup-poster.png?v=2"
          alt="1회 이게모임 MEETUP 포스터"
          width={724}
          height={1024}
          className="block h-auto w-full"
        />
      </figure>

      <div>
        <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#38d6f5]">
          VOL.01
        </p>
        <h3
          id={titleId}
          className="font-display mt-2.5 text-[30px] font-semibold leading-tight tracking-[-0.03em] text-white md:text-[38px]"
        >
          1회 MEETUP
        </h3>
        <p className="mt-2 font-mono-tech text-[11px] text-[#8b95a7]">
          2026. 9. 30. (수) 18:00–20:00 · 국민대학교 미래관 611호
        </p>
        <div className="mt-5 space-y-2.5 text-[15px] leading-7 text-[#9aa5b8]">
          <p>이게모임이 주관한 첫 번째 MEETUP으로 성황리에 마무리되었습니다.</p>
          <p>
            발표와 시연 5건 뒤, 팀 매칭과 동향 분석, 포트폴리오 공유, 게임
            토론으로 경험을 나눴습니다.
          </p>
        </div>

        <TalkList talks={meetupTalks} />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          <li className="rounded-xl border border-white/[0.09] bg-white/[0.03] p-5">
            <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[#38d6f5]">
              VENUE
            </p>
            <p className="mt-2 text-[18px] font-semibold text-white">
              미래관 611호
            </p>
            <p className="mt-0.5 text-[14px] text-[#8b95a7]">국민대학교</p>
          </li>
          <li className="rounded-xl border border-white/[0.09] bg-white/[0.03] p-5">
            <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[#38d6f5]">
              WHO
            </p>
            <p className="mt-2 text-[18px] font-semibold text-white">29명</p>
            <p className="mt-0.5 text-[14px] text-[#8b95a7]">
              부원 26명 · 외부 3명
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

function VolumeTwo({ titleId }: { titleId: string }) {
  return (
    <div className="grid items-start gap-8 p-5 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-10 md:p-8">
      <figure className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#07090f]">
        <img
          src="/meetup-poster-vol2.jpg"
          alt="제2회 이게모임 MEETUP 포스터"
          width={1080}
          height={1527}
          className="block h-auto w-full"
        />
      </figure>

      <div>
        <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#38d6f5]">
          VOL.02
        </p>
        <h3
          id={titleId}
          className="font-display mt-2.5 text-[30px] font-semibold leading-tight tracking-[-0.03em] text-white md:text-[38px]"
        >
          2회 MEETUP
        </h3>
        <p className="mt-2 font-mono-tech text-[11px] text-[#8b95a7]">
          2026. 11. 25. (수) 18:00–20:00 · 국민대학교 미래관 611호
        </p>
        <div className="mt-5 space-y-2.5 text-[15px] leading-7 text-[#9aa5b8]">
          <p>이게모임이 주관한 두 번째 MEETUP으로 마무리되었습니다.</p>
          <p>
            해커톤 경험, 바이럴 마케팅, 세컨드 브레인, 게임 스토리까지 발표
            4건으로 경험을 나눴습니다.
          </p>
        </div>

        <TalkList talks={meetupVol2Talks} />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          <li className="rounded-xl border border-white/[0.09] bg-white/[0.03] p-5">
            <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[#38d6f5]">
              VENUE
            </p>
            <p className="mt-2 text-[18px] font-semibold text-white">
              미래관 611호
            </p>
            <p className="mt-0.5 text-[14px] text-[#8b95a7]">국민대학교</p>
          </li>
          <li className="rounded-xl border border-white/[0.09] bg-white/[0.03] p-5">
            <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[#38d6f5]">
              WHO
            </p>
            <p className="mt-2 text-[18px] font-semibold text-white">누구나</p>
            <p className="mt-0.5 text-[14px] text-[#8b95a7]">
              제한 없이 참여 가능
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
