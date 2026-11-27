import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { reviewSessions, type ReviewSession } from './review'

type ReviewView = 'overview' | ReviewSession['id']

type ReviewModalProps = {
  initialView?: ReviewView
  onClose: () => void
}

export function ReviewModal({
  initialView = 'overview',
  onClose,
}: ReviewModalProps) {
  const titleId = useId()
  const scrollRef = useRef<HTMLDivElement>(null)
  const pendingView = useRef<ReviewView | null>(null)
  const [view, setView] = useState<ReviewView>(initialView)
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

  const goTo = (next: ReviewView, direction?: 'forward' | 'back') => {
    if (leaving || next === view || phase === 'out') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setView(next)
      return
    }
    pendingView.current = next
    setMoved(true)
    setDir(direction ?? (next === 'overview' ? 'back' : 'forward'))
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

  const activeIndex =
    view === 'overview'
      ? -1
      : reviewSessions.findIndex((session) => session.id === view)
  const activeSession = activeIndex >= 0 ? reviewSessions[activeIndex] : null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="리뷰 창 닫기"
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
              WEEKLY REVIEW
            </p>
          ) : (
            <button
              type="button"
              onClick={() => goTo('overview', 'back')}
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
            {activeSession ? (
              <SessionDetail
                titleId={titleId}
                session={activeSession}
                prevSession={
                  activeIndex > 0 ? reviewSessions[activeIndex - 1] : null
                }
                nextSession={
                  activeIndex < reviewSessions.length - 1
                    ? reviewSessions[activeIndex + 1]
                    : null
                }
                onSelect={(id, direction) => goTo(id, direction)}
              />
            ) : (
              <Overview
                titleId={titleId}
                onSelect={(id) => goTo(id, 'forward')}
              />
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
  onSelect,
}: {
  titleId: string
  onSelect: (id: ReviewSession['id']) => void
}) {
  return (
    <div className="p-5 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#38d6f5]">
            WEEKLY REVIEW · 2026 FALL
          </p>
          <h3
            id={titleId}
            className="font-display mt-3 text-[34px] font-semibold leading-none tracking-[-0.03em] text-white md:text-[44px]"
          >
            REVIEW
          </h3>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#9aa5b8]">
            매주 수요일에 열리는 이게모임 정기 모임 기록입니다. 게임 시스템 분석과
            개발 발표를 나누고, 진행 중인 프로젝트의 피드백을 주고받습니다.
          </p>
        </div>

        <dl className="grid shrink-0 grid-cols-2 gap-3 sm:w-auto">
          <div className="rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3">
            <dt className="font-mono-tech text-[10px] tracking-[0.16em] text-[#38d6f5]">
              SESSIONS
            </dt>
            <dd className="mt-1 text-[16px] font-semibold text-white">
              {reviewSessions.length}회차
            </dd>
          </div>
          <div className="rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3">
            <dt className="font-mono-tech text-[10px] tracking-[0.16em] text-[#38d6f5]">
              SCHEDULE
            </dt>
            <dd className="mt-1 text-[16px] font-semibold text-white">
              매주 수요일
            </dd>
          </div>
        </dl>
      </div>

      <ol className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {reviewSessions.map((session) => {
          const hasTopics = session.topics.length > 0
          return (
            <li key={session.id}>
              <button
                type="button"
                onClick={() => onSelect(session.id)}
                className="group grid w-full grid-cols-[32px_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2 py-5 text-left transition-colors hover:bg-white/[0.025] md:px-3"
              >
                <span className="font-mono-tech pt-1 text-[11px] text-[#38d6f5]">
                  {session.code}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono-tech text-[11px] text-white/75">
                      {session.date}
                    </span>
                    {session.time ? (
                      <span className="font-mono-tech text-[11px] text-[#8b95a7]">
                        {session.time}
                      </span>
                    ) : null}
                    <span className="font-mono-tech text-[11px] text-[#38d6f5]/85">
                      {session.venue}
                    </span>
                  </div>

                  {hasTopics ? (
                    <ul className="mt-2 space-y-1">
                      {session.topics.map((topic) => (
                        <li
                          key={topic.title}
                          className="text-[16px] font-semibold leading-6 text-white transition-colors group-hover:text-[#38d6f5]"
                        >
                          {session.topics.length > 1 ? '· ' : ''}
                          {topic.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-[16px] font-semibold leading-6 text-white/85 transition-colors group-hover:text-[#38d6f5]">
                      <span>정기 모임</span>
                      <span className="rounded-full border border-white/[0.12] px-2.5 py-0.5 font-mono-tech text-[10px] font-normal tracking-[0.08em] text-[#8b95a7]">
                        내용 · 자료 추후 업데이트
                      </span>
                    </p>
                  )}

                  <p className="mt-1.5 text-[14px] leading-6 text-[#8b95a7]">
                    {session.summary}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="pt-1 text-lg text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-[#38d6f5]"
                >
                  ↗
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function SessionDetail({
  titleId,
  session,
  prevSession,
  nextSession,
  onSelect,
}: {
  titleId: string
  session: ReviewSession
  prevSession: ReviewSession | null
  nextSession: ReviewSession | null
  onSelect: (id: ReviewSession['id'], direction: 'forward' | 'back') => void
}) {
  return (
    <div className="p-5 md:p-8">
      <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#38d6f5]">
        SESSION {session.code}
      </p>
      <h3
        id={titleId}
        className="font-display mt-2.5 text-[28px] font-semibold leading-tight tracking-[-0.03em] text-white md:text-[36px]"
      >
        {session.date} 정기 모임
      </h3>
      <p className="mt-2 font-mono-tech text-[11px] text-[#8b95a7]">
        {session.time ? `${session.time} · ` : ''}국민대학교 {session.venue}
      </p>

      <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#9aa5b8]">
        {session.summary}
      </p>

      <p className="font-mono-tech mt-8 text-[11px] tracking-[0.18em] text-[#38d6f5]">
        TOPICS
      </p>
      {session.topics.length > 0 ? (
        <ol className="mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {session.topics.map((topic, index) => (
            <li
              key={topic.title}
              className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 gap-y-1 py-4"
            >
              <span className="font-mono-tech text-[11px] text-[#38d6f5]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="text-[16px] font-medium leading-6 text-white">
                  {topic.title}
                </p>
                {topic.note ? (
                  <p className="mt-1 text-[13px] leading-5 text-[#8b95a7]">
                    {topic.note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] px-5 py-6">
          <p className="text-[14px] font-medium text-white/80">
            발표 주제 및 세부 내용이 아직 등록되지 않았습니다.
          </p>
          <p className="mt-1 text-[13px] text-[#8b95a7]">
            회차별 진행 내용과 요약이 정리되는 대로 이곳에 추가됩니다.
          </p>
        </div>
      )}

      <p className="font-mono-tech mt-8 text-[11px] tracking-[0.18em] text-[#38d6f5]">
        MATERIALS
      </p>
      {session.materials && session.materials.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2.5">
          {session.materials.map((item) => (
            <li key={item.label}>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.14] bg-white/[0.03] px-4 py-2 text-[13px] text-white transition-colors hover:border-[#38d6f5]/50 hover:text-[#38d6f5]"
                >
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="inline-flex items-center rounded-lg border border-white/[0.1] bg-white/[0.02] px-4 py-2 text-[13px] text-[#8b95a7]">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[13px] text-[#8b95a7]">
          PPT 및 발표 자료는 추후 업로드될 예정입니다.
        </div>
      )}

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        <li className="rounded-xl border border-white/[0.09] bg-white/[0.03] p-5">
          <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[#38d6f5]">
            VENUE
          </p>
          <p className="mt-2 text-[18px] font-semibold text-white">
            {session.venue}
          </p>
          <p className="mt-0.5 text-[14px] text-[#8b95a7]">국민대학교</p>
        </li>
        <li className="rounded-xl border border-white/[0.09] bg-white/[0.03] p-5">
          <p className="font-mono-tech text-[10px] tracking-[0.18em] text-[#38d6f5]">
            WHEN
          </p>
          <p className="mt-2 text-[18px] font-semibold text-white">
            {session.date}
          </p>
          <p className="mt-0.5 text-[14px] text-[#8b95a7]">
            {session.time ? `${session.time} 시작` : '정기 모임'}
          </p>
        </li>
      </ul>

      {prevSession || nextSession ? (
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
          {prevSession ? (
            <button
              type="button"
              onClick={() => onSelect(prevSession.id, 'back')}
              className="inline-flex items-center gap-2 font-mono-tech text-[11px] text-white/75 transition-colors hover:text-[#38d6f5]"
            >
              ← {prevSession.code} · {prevSession.date}
            </button>
          ) : (
            <span />
          )}
          {nextSession ? (
            <button
              type="button"
              onClick={() => onSelect(nextSession.id, 'forward')}
              className="inline-flex items-center gap-2 font-mono-tech text-[11px] text-white/75 transition-colors hover:text-[#38d6f5]"
            >
              {nextSession.code} · {nextSession.date} →
            </button>
          ) : (
            <span />
          )}
        </div>
      ) : null}
    </div>
  )
}
