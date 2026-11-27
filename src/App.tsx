import { useEffect, useState } from 'react'
import { ActivitySection } from './ActivitySection'
import { ConferenceModal, type ConferenceView } from './ConferenceModal'
import { GamesSection } from './GamesSection'
import { ReviewModal } from './ReviewModal'

const CONTACT_EMAIL = 'igemoimu@gmail.com'
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`

const navItems = [
  { href: '#about', label: 'ABOUT' },
  { href: '#activity', label: 'ACTIVITY' },
  { href: '#games', label: 'GAMES' },
  { href: '#crew', label: 'CREW' },
] as const

const clubSpecs = [
  { label: 'AFFILIATION', value: '국민대학교 소프트웨어융합대학' },
  { label: 'WEEKLY REVIEW', value: '매주 수요일' },
  { label: 'MONTHLY MEETUP', value: '매달 마지막 수요일' },
  { label: 'WINTER GAME JAM', value: '12.18–12.19' },
] as const

const tracks = [
  {
    code: '01',
    role: 'DESIGN',
    title: 'PLANNER',
    body: '이 게임이 왜 재미있는지를 먼저 고민해요. 세계관이든 시스템이든, 플레이어가 뭘 하게 될지부터 같이 그려봅니다.',
  },
  {
    code: '02',
    role: 'ENGINEERING',
    title: 'PROGRAMMER',
    body: '상상했던 내용을 실제로 움직이게 만들어요. 구현하고, 테스트하고, 다시 고치면서 게임을 만듭니다.',
  },
  {
    code: '03',
    role: 'VISUAL',
    title: 'ARTIST',
    body: '게임의 분위기를 담당해요. 캐릭터, UI, 이펙트까지, 이 게임이 어떤 느낌인지 눈으로 보이게 합니다.',
  },
  {
    code: '04',
    role: 'GROWTH',
    title: 'MARKETER',
    body: '만든 게임이 묻히지 않게 밖으로 내보내는 역할이에요. 소개 글이든 영상이든, 사람들에게 게임을 접하게 만듭니다.',
  },
] as const

function App() {
  const [conferenceView, setConferenceView] = useState<ConferenceView | null>(
    null,
  )
  const [reviewOpen, setReviewOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!conferenceView && !reviewOpen && !menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [conferenceView, reviewOpen, menuOpen])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = CONTACT_MAILTO
    }
  }

  return (
    <div className="relative min-h-svh bg-[#06070a] text-[#f4f7fb]">
      <div className="film-grain" aria-hidden="true" />

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#06070a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:px-10">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
          >
            <img
              src="/icon-mark.webp"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="font-display text-[15px] font-semibold tracking-[-0.02em]">
              이게모임
            </span>
            <span className="hidden font-mono-tech text-[10px] tracking-[0.16em] text-white/35 sm:inline">
              / KMU
            </span>
          </a>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="주요 메뉴"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-underline font-mono-tech text-[11px] tracking-[0.18em] text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT_MAILTO}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-[#06070a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#38d6f5]"
            >
              모집 문의
              <span aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.14] text-white md:hidden"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <path d="M3.5 3.5 12.5 12.5" />
                    <path d="M12.5 3.5 3.5 12.5" />
                  </>
                ) : (
                  <>
                    <path d="M2.5 5h11" />
                    <path d="M2.5 11h11" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/[0.08] bg-[#06070a] px-5 py-6 md:hidden">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-[22px] font-semibold text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    setConferenceView('vol2')
                  }}
                  className="inline-flex items-center gap-2 font-mono-tech text-[12px] text-[#38d6f5]"
                >
                  ● 제2회 밋업 · 11.25 보기 ↗
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="relative flex flex-col justify-between overflow-hidden pb-14 md:min-h-[calc(100svh-4rem)] md:pb-20">
          <div className="animate-hero-media relative mx-auto w-full max-w-[1600px]">
            <img
              src="/banner.jpg?v=2"
              alt="이게모임 마스코트와 하늘 도시가 담긴 동아리 키 아트 배너"
              width={1024}
              height={341}
              fetchPriority="high"
              className="hero-banner-mask block h-auto w-full"
            />
          </div>

          <div className="relative z-10 mx-auto mt-6 w-full max-w-[1320px] px-5 sm:mt-4 md:-mt-16 md:px-10">
            <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
              <div className="animate-hero-1">
                <button
                  type="button"
                  onClick={() => setConferenceView('vol2')}
                  className="group mb-5 inline-flex items-center gap-2.5 border-l-2 border-[#38d6f5] bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md transition-colors hover:bg-white/[0.08]"
                >
                  <span className="font-mono-tech text-[11px] text-[#38d6f5]">
                    VOL.02 ARCHIVE
                  </span>
                  <span className="text-[12px] text-white/85">
                    11.25 미래관 611호
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs text-[#38d6f5] transition-transform group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </button>

                <h1 className="font-display text-[clamp(38px,5.6vw,78px)] font-bold leading-[1.03] tracking-[-0.035em] text-white">
                  PLAY. CREATE.
                  <br />
                  TOGETHER.
                </h1>
              </div>

              <div className="animate-hero-2 flex flex-col items-start gap-6 lg:pb-2">
                <p className="max-w-md text-[15px] leading-7 text-[#a4b0c2] md:text-[16px]">
                  국민대학교 소프트웨어융합대학 게임개발 동아리{' '}
                  <strong className="font-semibold text-white">이게모임</strong>
                  입니다. 기획, 코드, 아트, 마케팅이 모여 직접 플레이할 수 있는
                  게임을 만듭니다.
                </p>

                <div className="animate-hero-3 flex flex-wrap items-center gap-3">
                  <a
                    href="#activity"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-[#06070a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#38d6f5]"
                  >
                    활동 일정 보기
                    <span aria-hidden="true">↓</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setConferenceView('overview')}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.03] px-6 text-[14px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.08]"
                  >
                    컨퍼런스 아카이브
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="relative border-t border-white/[0.08] py-24 md:py-32"
          aria-labelledby="about-h"
        >
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#38d6f5]">
              01 / ABOUT
            </p>
            <h2
              id="about-h"
              className="font-display mt-4 max-w-4xl text-[clamp(28px,4.2vw,54px)] font-semibold leading-[1.15] tracking-[-0.03em] text-white"
            >
              같이 만들고 끝까지 완성합니다.{' '}
              <span className="text-[#8b95a7]">
                아이디어만 쌓아두지 않고, 직접 해볼 수 있는 게임을 남깁니다.
              </span>
            </h2>

            <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
              <div className="relative flex items-center justify-center py-4">
                <div
                  className="mascot-glow pointer-events-none absolute inset-0"
                  aria-hidden="true"
                />
                <img
                  src="/logo-mark.webp"
                  alt="헤드폰을 쓴 흰 토끼 마스코트와 이게모임 로고"
                  width={960}
                  height={540}
                  loading="lazy"
                  className="mascot-blend relative z-10 h-auto w-full max-w-[480px]"
                />
              </div>

              <div>
                <p className="max-w-xl text-[16px] leading-8 text-[#a4b0c2]">
                  기획자, 프로그래머, 아티스트, 마케터가 한 팀으로 호흡을
                  맞춥니다. 매주 작업 중인 빌드를 함께 플레이하며 피드백을
                  나누고, 한 학기가 끝날 때 손에 잡히는 게임을 남깁니다.
                </p>

                <dl className="mt-10 grid grid-cols-1 border-t border-white/[0.08] sm:grid-cols-2">
                  {clubSpecs.map((spec, idx) => (
                    <div
                      key={spec.label}
                      className={`border-b border-white/[0.08] py-5 ${
                        idx % 2 === 1 ? 'sm:border-l sm:pl-6' : 'sm:pr-6'
                      }`}
                    >
                      <dt className="font-mono-tech text-[10px] tracking-[0.18em] text-[#38d6f5]">
                        {spec.label}
                      </dt>
                      <dd className="mt-2 text-[16px] font-medium text-white">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <ActivitySection
          onOpenConference={setConferenceView}
          onOpenReview={() => setReviewOpen(true)}
        />

        <GamesSection />

        <section
          id="crew"
          className="relative border-t border-white/[0.08] py-24 md:py-32"
          aria-labelledby="crew-h"
        >
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#38d6f5]">
                  04 / CREW
                </p>
                <h2
                  id="crew-h"
                  className="font-display mt-3 text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
                >
                  네 개의 파트가 하나의 게임을 만듭니다.
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-7 text-[#8b95a7]">
                기획, 코드, 그림, 홍보 중 하나만 좋아해도 팀의 핵심 역할로 함께
                할 수 있어요.
              </p>
            </div>

            <div className="mt-14 grid border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
              {tracks.map((track, index) => (
                <article
                  key={track.code}
                  className={`crew-cell flex flex-col justify-between border-b border-white/[0.08] p-7 hover:bg-white/[0.025] md:p-8 ${
                    index > 0 ? 'lg:border-l' : ''
                  } ${index % 2 === 1 ? 'sm:border-l' : ''}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[11px] tracking-[0.16em] text-[#38d6f5]">
                        {track.role}
                      </span>
                      <span className="font-display text-[36px] font-semibold leading-none tracking-[-0.04em] text-white/[0.12]">
                        {track.code}
                      </span>
                    </div>
                    <h3 className="font-display mt-10 text-[26px] font-semibold leading-none tracking-[-0.025em] text-white">
                      {track.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-7 text-[#9aa5b8]">
                      {track.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="relative overflow-hidden border-t border-white/[0.08] pt-24 pb-10 md:pt-32"
        aria-labelledby="join-h"
      >
        <div
          className="closing-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-10">
          <div className="max-w-3xl">
            <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#38d6f5]">
              05 / JOIN US
            </p>
            <h2
              id="join-h"
              className="font-display mt-4 text-[clamp(34px,5.2vw,68px)] font-bold leading-[1.06] tracking-[-0.035em] text-white"
            >
              학기 초,
              <br />
              함께 만들 사람을 찾습니다.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#a4b0c2]">
              게임 개발을 좋아하기만 하면 됩니다. 기획이든 코드든 그림이든
              홍보든, 한 학기 동안 같이 무언가 남기고 싶은 사람이면 환영해요.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={CONTACT_MAILTO}
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-semibold text-[#06070a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#38d6f5]"
              >
                학기 초 모집 문의
                <span aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-white/[0.16] bg-white/[0.03] px-6 font-mono-tech text-[12px] text-white/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
              >
                <span>{copied ? '이메일 복사됨 ✓' : CONTACT_EMAIL}</span>
              </button>
            </div>
          </div>

          <div className="mt-20 border-t border-white/[0.08] pt-10">
            <p
              aria-hidden="true"
              className="font-display select-none text-[clamp(48px,13vw,180px)] font-bold leading-[0.86] tracking-[-0.055em] text-white/[0.06]"
            >
              IGEMOIM
            </p>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-[12px] text-[#8b95a7] md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="/icon-mark.webp"
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                  className="h-5 w-5 object-contain"
                />
                <span className="font-mono-tech text-[11px] tracking-[0.14em] text-white/60">
                  © {new Date().getFullYear()} IGEMOIM / KMU GAME DEV CLUB
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href={CONTACT_MAILTO}
                  className="font-mono-tech text-[11px] text-white/60 transition-colors hover:text-[#38d6f5]"
                >
                  {CONTACT_EMAIL}
                </a>
                <span>국민대학교 소프트웨어융합대학 게임개발 동아리</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {conferenceView ? (
        <ConferenceModal
          initialView={conferenceView}
          onClose={() => setConferenceView(null)}
        />
      ) : null}

      {reviewOpen ? (
        <ReviewModal onClose={() => setReviewOpen(false)} />
      ) : null}
    </div>
  )
}

export default App
