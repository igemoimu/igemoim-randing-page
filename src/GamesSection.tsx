import { useCallback, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

const TRANSCEND_LIGHTS = {
  code: '01',
  title: 'Transcend Lights',
  award: '2026 게임인재원 AI 해커톤 대상',
  tagline: '아멜리아의 금빛과 녹스의 푸른빛, 두 개의 빛이 하나가 될 때 저주가 풀린다.',
  meta: '2026 · 협동 액션 · PC + Android',
  summary:
    '휴대폰이 지팡이가 되는 2인 협동 마법학교 액션입니다. AR 이미지 인식과 자이로로 화면을 가리키고 누르는 것만으로 룬 교실, 암흑 복도, 공명 보스전까지 세 교시를 함께 클리어합니다.',
  cover: '/games/transcend-cover.webp',
  githubUrl: 'https://github.com/Team-Waaang/transcend-lights',
  youtubeUrl: 'https://youtu.be/V0PtipGv1Rg?si=ScTvuoYnzpyDtYRY',
  releasesUrl: 'https://github.com/Team-Waaang/transcend-lights/releases/latest',
  specs: [
    { label: 'GENRE', value: '2인 협동 캐주얼 액션 (로컬 멀티플레이)' },
    { label: 'CONTROL', value: '휴대폰 지팡이 (AR / 자이로) · 마우스 대체' },
    { label: 'PLATFORM', value: 'Windows · macOS + Android 지팡이 앱' },
    { label: 'ENGINE', value: 'Unity 6 (URP 17 · Cinemachine 3 · Timeline)' },
  ],
  chapters: [
    {
      code: '1교시 · 룬',
      image: '/games/transcend-p1.webp',
      alt: 'Transcend Lights 1교시 룬 따라 그리기 화면',
      desc: '햇살 드는 룬 교실에서 두 사람이 각자 지팡이로 화면 속 룬을 따라 그립니다.',
    },
    {
      code: '2교시 · 암흑',
      image: '/games/transcend-p2.webp',
      alt: 'Transcend Lights 2교시 어둠 속 돌정령 찾기 화면',
      desc: '불 꺼진 복도에서 지팡이 빛으로 어둠 속에 숨은 돌정령을 비춰 석화시킵니다.',
    },
    {
      code: '3교시 · 보스전',
      image: '/games/transcend-p3.webp',
      alt: 'Transcend Lights 3교시 보스전 공명 레이저 화면',
      desc: '두 레이저가 만나면 1.5배 공명 피해가 발동하며, 결계와 공명 QTE를 넘어 저주를 정화합니다.',
    },
  ],
  highlights: [
    'ARCore 이미지 인식·자이로 에어마우스 기반 휴대폰 지팡이 LAN 컨트롤러 (최대 2대 동시 연결)',
    '휴대폰이 없어도 1P 좌클릭 · 2P 우클릭 마우스로 즉시 플레이 가능',
    '조준점에 맞춰 팔·손목·머리가 실시간 반응하는 IK 캐스터 리그',
    'Timeline 컷신, 실시간 공명 QTE, AI 보이스 더빙 및 사운드(효과음 50종 · BGM 6종)',
  ],
  team: '팀~원 · 강현준, 김한결, 배시현, 성도윤',
} as const

const upcomingGames = [
  {
    id: '02',
    code: '02',
    title: 'PROJECT 02',
    stage: 'PROTOTYPING',
    summary: '주간 리뷰와 플레이테스트를 거쳐 다듬고 있는 프로젝트입니다.',
    surface: 'game-surface-2',
  },
  {
    id: '03',
    code: '03',
    title: 'PROJECT 03',
    stage: 'GAME JAM SLOT',
    summary: '12월 게임잼과 학기 말 시연 결과물이 이곳에 아카이브됩니다.',
    surface: 'game-surface-3',
  },
] as const

export function GamesSection() {
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    if (!detailOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [detailOpen])

  return (
    <section
      id="games"
      className="relative border-t border-white/[0.08] py-24 md:py-32"
      aria-labelledby="games-h"
    >
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#38d6f5]">
              03 / GAMES
            </p>
            <h2
              id="games-h"
              className="font-display mt-3 text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
            >
              프로젝트
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-[#8b95a7]">
            아이디어에 머물지 않고, 완성된 빌드를 이곳에 하나씩 쌓아갑니다.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            aria-label="Transcend Lights 상세 보기"
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c0e14] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#38d6f5]/50 hover:shadow-[0_24px_60px_-24px_rgb(56_214_245/0.25)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#060810]">
              <img
                src={TRANSCEND_LIGHTS.cover}
                alt="Transcend Lights 타이틀 화면. 마법진 위에 선 두 마법소녀"
                width={1280}
                height={720}
                loading="lazy"
                className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-[#06070a]/45"
                aria-hidden="true"
              />
              <div className="absolute left-3.5 top-3.5">
                <span className="rounded-[4px] bg-[#06070a]/80 px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.14em] text-[#38d6f5] backdrop-blur-sm">
                  01
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono-tech text-[10px] tracking-[0.06em] text-[#8b95a7]">
                    {TRANSCEND_LIGHTS.meta}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[-0.01em] text-[#f3ca63]">
                    <span
                      className="h-1.5 w-1.5 rotate-45 bg-[#f3ca63]"
                      aria-hidden="true"
                    />
                    AI 해커톤 대상
                  </span>
                </div>
                <h3 className="font-display mt-2 text-[22px] font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-[#38d6f5]">
                  {TRANSCEND_LIGHTS.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-6 text-[#9aa5b8]">
                  {TRANSCEND_LIGHTS.summary}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="font-mono-tech text-[11px] text-[#38d6f5]">
                  자세히 보기
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm text-white/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#38d6f5]"
                >
                  ↗
                </span>
              </div>
            </div>
          </button>

          {upcomingGames.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c0e14]"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden ${item.surface}`}
              >
                <div
                  className="game-surface-grid absolute inset-0 opacity-65"
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -right-3 -bottom-6 select-none text-[120px] font-bold leading-none tracking-[-0.06em] text-white/[0.05]"
                >
                  {item.code}
                </span>
                <div className="relative z-10 flex h-full flex-col justify-between p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tech text-[11px] text-[#38d6f5]">
                      BUILD {item.code}
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono-tech text-[10px] tracking-[0.08em] text-white/65">
                      <span
                        className="h-1.5 w-1.5 bg-[#38d6f5]"
                        aria-hidden="true"
                      />
                      {item.stage}
                    </span>
                  </div>
                  <p className="font-display text-[22px] font-semibold tracking-[-0.02em] text-white/95">
                    {item.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <p className="text-[14px] leading-6 text-[#8b95a7]">
                  {item.summary}
                </p>
                <p className="mt-5 font-mono-tech text-[11px] text-white/40">
                  COMING SOON
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {detailOpen ? (
        <TranscendLightsModal onClose={() => setDetailOpen(false)} />
      ) : null}
    </section>
  )
}

function TranscendLightsModal({ onClose }: { onClose: () => void }) {
  const titleId = useId()
  const [leaving, setLeaving] = useState(false)

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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="게임 상세 창 닫기"
        onClick={requestClose}
        className={`absolute inset-0 bg-[#040508]/80 backdrop-blur-md ${leaving ? 'modal-veil-out' : 'modal-veil-in'}`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 flex max-h-[min(88svh,880px)] w-full max-w-[980px] flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0a0c12] shadow-[0_32px_90px_-20px_rgb(0_0_0/0.85)] ${leaving ? 'modal-panel-out' : 'modal-panel-in'}`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 md:px-7">
          <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#38d6f5]">
            01 / GAME SHOWCASE
          </p>
          <button
            type="button"
            onClick={requestClose}
            className="inline-flex min-h-[36px] items-center rounded-full border border-white/[0.1] px-3.5 font-mono-tech text-[11px] tracking-[0.12em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            CLOSE
          </button>
        </div>

        <div className="overflow-y-auto overflow-x-hidden p-5 md:p-8">
          <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#060810]">
            <img
              src={TRANSCEND_LIGHTS.cover}
              alt="Transcend Lights 타이틀 화면"
              width={1280}
              height={720}
              className="block h-auto w-full"
            />
          </div>

          <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 border-l-2 border-[#f3ca63] pl-3 text-[13px] font-semibold tracking-[-0.01em] text-[#f3ca63]">
                {TRANSCEND_LIGHTS.award}
              </p>
              <h3
                id={titleId}
                className="font-display mt-3 text-[32px] font-bold leading-tight tracking-[-0.03em] text-white md:text-[42px]"
              >
                {TRANSCEND_LIGHTS.title}
              </h3>
              <p className="mt-2 text-[15px] text-white/80">
                {TRANSCEND_LIGHTS.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={TRANSCEND_LIGHTS.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-[#06070a] transition-colors hover:bg-[#38d6f5]"
              >
                플레이 영상
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={TRANSCEND_LIGHTS.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.03] px-4 text-[13px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/[0.08]"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={TRANSCEND_LIGHTS.releasesUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.03] px-4 text-[13px] font-medium text-white transition-colors hover:border-white/40 hover:bg-white/[0.08]"
              >
                다운로드
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#9aa5b8]">
            {TRANSCEND_LIGHTS.summary}
          </p>

          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            {TRANSCEND_LIGHTS.specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"
              >
                <dt className="font-mono-tech text-[10px] tracking-[0.16em] text-[#38d6f5]">
                  {spec.label}
                </dt>
                <dd className="mt-1.5 text-[14px] font-medium text-white">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="font-mono-tech mt-9 text-[11px] tracking-[0.18em] text-[#38d6f5]">
            3 CLASSES · GAMEPLAY
          </p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {TRANSCEND_LIGHTS.chapters.map((chapter) => (
              <article
                key={chapter.code}
                className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]"
              >
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  width={960}
                  height={540}
                  loading="lazy"
                  className="block aspect-video w-full object-cover"
                />
                <div className="p-4">
                  <p className="font-mono-tech text-[11px] text-[#38d6f5]">
                    {chapter.code}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-6 text-[#9aa5b8]">
                    {chapter.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="font-mono-tech mt-9 text-[11px] tracking-[0.18em] text-[#38d6f5]">
            KEY FEATURES
          </p>
          <ul className="mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {TRANSCEND_LIGHTS.highlights.map((line, index) => (
              <li key={line} className="flex gap-3 py-3.5 text-[14px] leading-6 text-white/85">
                <span className="font-mono-tech shrink-0 text-[11px] text-[#38d6f5]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-mono-tech text-[11px] text-[#8b95a7]">
            {TRANSCEND_LIGHTS.team}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
