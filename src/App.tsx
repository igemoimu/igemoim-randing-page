import logoMark from './assets/Logo.png'
import { ActivitySection } from './ActivitySection'
import { GamesSection } from './GamesSection'
import { Reveal, RevealGroup } from './Reveal'
import { SectionHeading } from './SectionHeading'

const CONTACT_EMAIL = 'igemoimu@gmail.com'
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`

const nav = [
  { href: '#about', label: 'ABOUT' },
  { href: '#activity', label: 'ACTIVITY' },
  { href: '#games', label: 'GAMES' },
  { href: '#crew', label: 'CREW' },
  { href: CONTACT_MAILTO, label: 'CONTACT' },
]

const tracks = [
  {
    code: '01',
    title: 'PLANNER',
    body: [
      '이 게임이 왜 재미있는지를 먼저 고민해요.',
      '세계관이든 시스템이든, 플레이어가 뭘 하게 될지부터 같이 그려봅니다.',
    ],
  },
  {
    code: '02',
    title: 'PROGRAMMER',
    body: [
      '상상했던 내용을 실제로 움직이게 만들어요.',
      '구현하고, 테스트하고, 다시 고치면서 게임을 만듭니다.',
    ],
  },
  {
    code: '03',
    title: 'ARTIST',
    body: [
      '게임의 분위기를 담당해요.',
      '캐릭터, UI, 이펙트까지, 이 게임이 어떤 느낌인지 눈으로 보이게 합니다.',
    ],
  },
  {
    code: '04',
    title: 'MARKETER',
    body: [
      '만든 게임이 묻히지 않게 밖으로 내보내는 역할이에요.',
      '소개 글이든 영상이든, 사람들에게 게임을 접하게 만듭니다.',
    ],
  },
]

function App() {
  return (
    <div className="relative min-h-svh overflow-x-hidden bg-[#05060a] text-[#eef6ff]">
      <div className="pointer-events-none fixed inset-0 grid-glow opacity-40" />
      <div className="pointer-events-none fixed inset-0 scanlines" />

      <header className="enter-header sticky top-0 z-40 border-b border-cyan-300/15 bg-[#05060a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center">
            <img
              src="/icon.png"
              alt="이게모임"
              className="h-12 w-12 object-contain"
            />
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-tech text-[11px] tracking-[0.22em] text-white/70 transition hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#join"
              className="btn-breathe font-tech hud-frame bg-cyan-400 px-4 py-2 text-[11px] tracking-[0.18em] text-black transition hover:bg-white"
            >
              JOIN US
            </a>
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            <a
              href="#activity"
              className="font-tech text-[11px] tracking-[0.2em] text-white/70"
            >
              ACTIVITY
            </a>
            <a
              href="#join"
              className="font-tech text-[11px] tracking-[0.2em] text-cyan-300"
            >
              JOIN US
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative">
          <div className="banner-art enter-banner">
            <img
              src="/banner.png"
              alt="이게모임 시네마틱 배너"
              width={1024}
              height={328}
              className="block h-auto w-full"
            />
          </div>
          <div className="banner-edge" aria-hidden />
          <div className="relative z-10 mx-auto max-w-2xl px-5 pb-14 pt-6 text-center md:pb-16">
            <h1 className="sr-only">이게모임</h1>
            <a
              href="#about"
              className="enter-up inline-flex flex-col items-center gap-1 text-[14px] font-semibold tracking-wide text-cyan-100/85 transition hover:text-white"
            >
              스크롤 하여 보기
              <span className="scroll-arrow text-cyan-300" aria-hidden>
                ↓
              </span>
            </a>
          </div>
        </section>

        <section id="about" className="relative border-y border-cyan-300/15 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup>
              <Reveal>
                <SectionHeading index="01" label="ABOUT" />
              </Reveal>
              <div className="mt-12 grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
                <Reveal delay={120} className="relative isolate">
                  <figure className="relative mx-auto max-w-sm md:mx-0">
                    <div className="logo-aura" aria-hidden />
                    <img
                      src={logoMark}
                      alt="이게모임 로고와 마스코트"
                      className="relative w-full"
                    />
                    <figcaption className="font-tech mt-3 text-right text-[10px] tracking-[0.22em] text-cyan-200/80">
                      MASCOT // UNIT-00
                    </figcaption>
                  </figure>
                </Reveal>
                <Reveal delay={240}>
                  <p className="font-tech text-[10px] tracking-[0.28em] text-cyan-300">
                    THE CLUB
                  </p>
                  <h3 className="font-display mt-3 text-[42px] leading-[0.86] text-white md:text-[56px]">
                    PLAY
                    <br />
                    CREATE
                    <br />
                    TOGETHER.
                  </h3>
                  <p className="mt-6 max-w-md text-[15px] leading-8 text-[#b7c8d8]">
                    국민대학교 소프트웨어학부의 게임 개발 동아리입니다.
                    <br />
                    혼자 뚝딱하기보다, 같이 만들고 진짜로 플레이할 수 있는 걸
                    남기려고 합니다.
                  </p>
                </Reveal>
              </div>
            </RevealGroup>
          </div>
        </section>

        <ActivitySection />

        <GamesSection />

        <section id="crew" className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <SectionHeading index="04" label="CREW" />
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {tracks.map((track, index) => (
                <Reveal key={track.code} delay={index * 80}>
                <article
                  className="card-lift border border-cyan-300/15 bg-[#0a0d14] p-6 hover:border-cyan-300/40"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-tech text-xs tracking-[0.24em] text-cyan-300">
                      {track.code}
                    </p>
                    <span className="h-2 w-2 bg-cyan-400 shadow-[0_0_10px_#00d4ff]" />
                  </div>
                  <h3 className="font-display mt-4 text-[34px] leading-none md:text-[40px]">
                    {track.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#9fb3c6]">
                    {track.body[0]}
                    <br />
                    {track.body[1]}
                  </p>
                </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="relative border-t border-cyan-300/15 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
            <div className="relative overflow-hidden neon-border">
              <img
                src="/banner.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-[#05060a]/75" />
              <div className="relative px-6 py-12 md:px-12 md:py-16">
                <SectionHeading index="05" label="JOIN" />
                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#c5d4e2]">
                  게임 개발을 좋아하기만 하면 됩니다. 기획이든 코드든 그림이든
                  홍보든, 한 학기 동안 같이 뭔가 같이하고 싶은 사람이면 환영해요.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={CONTACT_MAILTO}
                    className="btn-breathe hud-frame bg-cyan-400 px-5 py-3 text-[15px] font-semibold tracking-wide text-black transition hover:bg-white"
                  >
                    학기 초 모집 오픈
                  </a>
                  <a
                    href={CONTACT_MAILTO}
                    className="font-tech text-[12px] tracking-[0.08em] text-cyan-200 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-300/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-[11px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p className="font-tech tracking-[0.18em]">
            © {new Date().getFullYear()} IGEMOIM / KMU GAME DEV CLUB
          </p>
          <p>국민대학교 소프트웨어학부 게임개발 동아리</p>
        </div>
      </footer>
    </div>
  )
}

export default App
