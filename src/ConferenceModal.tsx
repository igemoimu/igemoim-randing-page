import { useEffect, useId, useRef, useState } from 'react'
import { meetupNetworking, meetupTalks } from './conference'

type ConferenceView = 'overview' | 'vol1'

type ConferenceModalProps = {
  onClose: () => void
}

export function ConferenceModal({ onClose }: ConferenceModalProps) {
  const titleId = useId()
  const scrollRef = useRef<HTMLDivElement>(null)
  const pendingView = useRef<ConferenceView | null>(null)
  const [view, setView] = useState<ConferenceView>('overview')
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  const [dir, setDir] = useState<'forward' | 'back'>('forward')
  const [moved, setMoved] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [view])

  const requestClose = () => {
    if (leaving) return
    setLeaving(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(onClose, reduce ? 0 : 220)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [leaving, onClose])

  const goTo = (next: ConferenceView) => {
    if (leaving || next === view || phase === 'out') return
    pendingView.current = next
    setMoved(true)
    setDir(next === 'vol1' ? 'forward' : 'back')
    setPhase('out')
  }

  const onViewAnimEnd = () => {
    if (phase !== 'out' || !pendingView.current) return
    setView(pendingView.current)
    pendingView.current = null
    setPhase('in')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 md:px-5"
      role="presentation"
    >
      <button
        type="button"
        aria-label="닫기"
        className={`modal-veil absolute inset-0 bg-[#05060a]/80 backdrop-blur-sm${leaving ? ' is-leave' : ''}`}
        onClick={requestClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`modal-panel relative z-10 flex max-h-[min(88vh,900px)] w-full max-w-5xl flex-col overflow-hidden border border-cyan-300/30 bg-[#0a0d14] shadow-[0_0_40px_rgb(0_212_255/0.12)]${leaving ? ' is-leave' : ''}`}
      >
        <div className="flex items-center justify-between border-b border-cyan-300/15 px-5 py-4 md:px-7">
          {view === 'vol1' ? (
            <button
              type="button"
              onClick={() => goTo('overview')}
              className="font-tech text-[11px] tracking-[0.18em] text-cyan-200 transition hover:text-white"
            >
              ← 목록
            </button>
          ) : (
            <p className="font-tech text-[11px] tracking-[0.24em] text-cyan-300">
              CONFERENCE
            </p>
          )}
          <button
            type="button"
            onClick={requestClose}
            className="font-tech text-[11px] tracking-[0.18em] text-white/50 transition hover:text-white"
          >
            CLOSE
          </button>
        </div>

        <div ref={scrollRef} className="overflow-y-auto overflow-x-hidden">
          <div
            className={moved ? `modal-view is-${phase} dir-${dir}` : undefined}
            onAnimationEnd={onViewAnimEnd}
          >
            {view === 'overview' ? (
              <Overview titleId={titleId} onOpenVol1={() => goTo('vol1')} />
            ) : (
              <VolumeOne titleId={titleId} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Overview({
  titleId,
  onOpenVol1,
}: {
  titleId: string
  onOpenVol1: () => void
}) {
  return (
    <div className="grid items-start gap-8 p-5 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-10 md:p-8">
      <figure className="border border-cyan-300/15 bg-[#070b12]">
        <img
          src="/meetup-poster.png?v=2"
          alt="이게모임 MEETUP 포스터"
          className="block h-auto w-full"
        />
      </figure>

      <div>
        <p className="font-tech text-[10px] tracking-[0.28em] text-cyan-300">
          MEETUP SERIES
        </p>
        <h3
          id={titleId}
          className="font-display mt-3 text-[42px] leading-none text-white md:text-[56px]"
        >
          MEETUP
        </h3>
        <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#b7c8d8]">
          부원 발표와 자유 네트워킹으로, 개발하면서 쌓인 경험과 실무 이야기를
          나누는 자립니다. 게임 개발에 관심 있으면 누구나 올 수 있어요.
        </p>
        <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#b7c8d8]">
          1회는 2026년 9월 30일 미래관 611호에서 열렸습니다. 이게모임 부원
          26명과 동아리 밖 재학생 3명까지, 모두 29명이 모였습니다. 발표 다섯 건을
          마친 뒤 팀 매칭, 포트폴리오 공유, 게임 토론으로 이어졌습니다.
        </p>

        <div className="mt-8 divide-y divide-cyan-300/15 border-y border-cyan-300/15">
          <button
            type="button"
            onClick={onOpenVol1}
            className="card-lift group flex w-full items-end justify-between gap-4 py-5 text-left hover:bg-cyan-300/[0.03]"
          >
            <div>
              <p className="font-tech text-[10px] tracking-[0.24em] text-cyan-300">
                01
              </p>
              <p className="mt-2 text-[24px] font-medium leading-none tracking-tight text-white group-hover:text-cyan-100">
                1회
              </p>
              <p className="mt-2 text-sm text-[#9fb3c6]">
                2026. 9. 30. (수) 18:00–20:00 · 미래관 611호
              </p>
            </div>
            <svg
              aria-hidden
              viewBox="0 0 12 12"
              className="mb-1 h-3 w-3 shrink-0 text-cyan-200/75 transition group-hover:text-cyan-100"
            >
              <path
                d="M3.2 8.8 8.8 3.2M4.6 3.2H8.8V7.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <div className="flex items-end justify-between gap-4 py-5">
            <div>
              <p className="font-tech text-[10px] tracking-[0.24em] text-white/30">
                02
              </p>
              <p className="mt-2 text-[24px] font-medium leading-none tracking-tight text-white/45">
                2회
              </p>
              <p className="mt-2 text-sm text-white/30">다음 일정이 정해지면 올라갑니다.</p>
            </div>
            <p className="font-tech shrink-0 text-[10px] tracking-[0.2em] text-white/28">
              COMING SOON
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function VolumeOne({ titleId }: { titleId: string }) {
  return (
    <div className="p-5 md:p-8">
      <p className="font-tech text-[10px] tracking-[0.28em] text-cyan-300">
        VOL.01
      </p>
      <h3
        id={titleId}
        className="mt-3 text-[34px] font-medium leading-none tracking-tight text-white md:text-[42px]"
      >
        1회 MEETUP
      </h3>
      <p className="mt-3 font-tech text-[11px] tracking-[0.16em] text-cyan-100/70">
        2026. 9. 30. (수) 18:00–20:00 · 국민대학교 미래관 611호
      </p>
      <div className="mt-5 max-w-2xl space-y-2 text-[15px] leading-6 text-[#b7c8d8]">
        <p>이게모임이 주관한 첫번째 밋업으로 성황리에 마무리되었습니다.</p>
        <p>사전 접수와 현장 접수 포함 5건의 발표 및 시연이 있었습니다.</p>
        <p>
          부원분들이 자유롭게 팀을 구하거나, 작업물들을 나눠보고 경험을 공유하는
          좋은 자리가 마련되어 모두가 만족스러운 행사가 되었을거라 생각합니다!
        </p>
      </div>

      <p className="font-tech mt-10 text-[10px] tracking-[0.24em] text-cyan-300">
        TALKS
      </p>
      <ol className="mt-4 divide-y divide-cyan-300/15 border-y border-cyan-300/15">
        {meetupTalks.map((talk, index) => (
          <li key={talk.speaker} className="flex gap-4 py-5 md:gap-6">
            <p className="font-tech w-8 shrink-0 pt-1 text-[11px] tracking-[0.18em] text-cyan-300">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-5">
              <p className="text-[17px] leading-7 text-white md:text-[20px] md:leading-8">
                {talk.title}
              </p>
              <p className="shrink-0 pt-1 text-[12px] text-white/45">{talk.speaker}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="font-tech mt-10 text-[10px] tracking-[0.24em] text-cyan-300">
        NETWORKING
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {meetupNetworking.map((item) => (
          <li
            key={item}
            className="border border-cyan-300/15 bg-[#070b12] px-4 py-3 text-sm text-[#c5d4e2]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
