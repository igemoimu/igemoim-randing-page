const CONTACT_EMAIL = 'igemoimu@gmail.com'
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`

const nav = [
  { href: '#about', label: 'ABOUT' },
  { href: '#crew', label: 'CREW' },
  { href: '#join', label: 'JOIN' },
  { href: CONTACT_MAILTO, label: 'CONTACT' },
]

const tracks = [
  {
    code: '01',
    title: 'PLAN',
    ko: '기획',
    body: '세계관, 시스템, 레벨. 재미가 되는 구조를 먼저 짠다.',
  },
  {
    code: '02',
    title: 'BUILD',
    ko: '개발',
    body: '엔진 위에서 움직이게 만들고, 끝까지 플레이 가능하게 만든다.',
  },
  {
    code: '03',
    title: 'STYLE',
    ko: '아트',
    body: '캐릭터, UI, 이펙트. 한 판의 분위기를 시각으로 고정한다.',
  },
  {
    code: '04',
    title: 'SHIP',
    ko: '출시',
    body: '테스트하고, 다듬고, 밖으로 내보낸다. 만든 걸로 끝내지 않는다.',
  },
]

function Corner({ className }: { className: string }) {
  return <span className={`pointer-events-none absolute h-5 w-5 border-cyan-300/80 ${className}`} />
}

function App() {
  return (
    <div className="relative min-h-svh overflow-x-hidden bg-[#05060a] text-[#eef6ff]">
      <div className="pointer-events-none fixed inset-0 grid-glow opacity-40" />
      <div className="pointer-events-none fixed inset-0 scanlines" />

      <header className="sticky top-0 z-40 border-b border-cyan-300/15 bg-[#05060a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center">
            <img
              src="/logo.png"
              alt="이게모임"
              className="h-14 w-auto max-w-[240px] object-contain object-left"
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
              className="font-tech hud-frame bg-cyan-400 px-4 py-2 text-[11px] tracking-[0.18em] text-black transition hover:bg-white"
            >
              JOIN US
            </a>
          </nav>
          <a
            href="#join"
            className="font-tech text-[11px] tracking-[0.2em] text-cyan-300 md:hidden"
          >
            JOIN
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative">
          <img
            src="/banner.png"
            alt="이게모임 시네마틱 배너"
            width={1024}
            height={328}
            className="block h-auto w-full"
          />
          <div className="banner-edge" aria-hidden />
        </section>

        <section className="relative -mt-10 border-b border-cyan-300/15 pb-16 pt-4 md:-mt-16 md:pb-20 md:pt-6">
          <div className="mx-auto max-w-6xl px-5">
            <div className="relative max-w-xl neon-border hud-frame bg-[#0a0d14] p-6 md:p-8">
              <Corner className="top-0 left-0 border-t-2 border-l-2" />
              <Corner className="top-0 right-0 border-t-2 border-r-2" />
              <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
              <Corner className="right-0 bottom-0 border-r-2 border-b-2" />

              <p className="font-tech text-[11px] tracking-[0.32em] text-cyan-300">
                KMU GAME DEV CLUB // SOFTWARE
              </p>
              <h1 className="font-display neon-text mt-3 text-5xl leading-none md:text-7xl">
                이게모임
              </h1>
              <p className="font-tech mt-3 text-sm tracking-[0.18em] text-white/80 md:text-base">
                PLAY CREATE TOGETHER
              </p>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/75 md:text-[15px]">
                국민대학교 소프트웨어학부 게임개발 동아리.
                <br />
                같이 기획하고, 만들고, 끝내 세상에 내보낸다.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#join"
                  className="font-tech hud-frame bg-cyan-400 px-5 py-3 text-[12px] tracking-[0.16em] text-black transition hover:bg-white"
                >
                  지금 합류하기
                </a>
                <a
                  href="#about"
                  className="font-tech hud-frame border border-cyan-300/40 px-5 py-3 text-[12px] tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200 hover:text-white"
                >
                  동아리 보기
                </a>
              </div>
            </div>

            <div className="font-tech mt-8 flex flex-wrap items-center gap-4 text-[10px] tracking-[0.28em] text-white/45">
              <span>KOOKMIN UNIV.</span>
              <span className="h-px w-8 bg-cyan-300/40" />
              <span>NEW ERIDU TONE</span>
              <span className="h-px w-8 bg-cyan-300/40" />
              <span>2026 SEASON</span>
            </div>
          </div>
        </section>

        <section id="about" className="relative border-y border-cyan-300/15 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-tech text-[11px] tracking-[0.3em] text-cyan-300">
                01 // ABOUT
              </p>
              <h2 className="font-display mt-3 text-4xl md:text-5xl">거리의 온도로 게임을 만든다</h2>
              <p className="mt-5 text-[15px] leading-8 text-[#b7c8d8]">
                이게모임은 국민대 소프트웨어학부 게임개발 동아리다. 네온이 번지는
                도시, 각진 UI, 한 방의 임팩트. 우리가 좋아하는 그 느낌을 화면
                밖으로 꺼내는 팀이다.
              </p>
              <p className="mt-4 text-[15px] leading-8 text-[#b7c8d8]">
                혼자 완성하지 않는다. 기획·개발·아트가 한 테이블에서 부딪히고,
                한 시즌 안에 플레이 가능한 결과물을 목표로 움직인다.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ['CLUB', 'GAME DEV'],
                  ['CAMPUS', 'KOOKMIN'],
                  ['MODE', 'CO-OP'],
                ].map(([k, v]) => (
                  <div key={k} className="hud-frame border border-cyan-300/20 bg-white/3 px-3 py-3">
                    <p className="font-tech text-[10px] tracking-[0.2em] text-cyan-300">{k}</p>
                    <p className="mt-1 text-sm font-bold">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 bg-cyan-400/10 blur-2xl" />
              <figure className="relative">
                <img
                  src="/logo.png"
                  alt="이게모임 로고와 마스코트"
                  className="relative w-full"
                />
                <figcaption className="font-tech mt-3 text-right text-[10px] tracking-[0.22em] text-cyan-200/80">
                  MASCOT // UNIT-00
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="crew" className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-tech text-[11px] tracking-[0.3em] text-cyan-300">
              02 // CREW TRACK
            </p>
            <h2 className="font-display mt-3 text-4xl md:text-5xl">한 판을 끝까지 가는 역할</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {tracks.map((track) => (
                <article
                  key={track.code}
                  className="hud-frame group border border-cyan-300/15 bg-[#0a0d14] p-6 transition hover:border-cyan-300/50 hover:bg-[#0d1520]"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-tech text-xs tracking-[0.24em] text-cyan-300">
                      {track.code} / {track.title}
                    </p>
                    <span className="h-2 w-2 bg-cyan-400 shadow-[0_0_10px_#00d4ff]" />
                  </div>
                  <h3 className="font-display mt-4 text-3xl">{track.ko}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#9fb3c6]">{track.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="relative border-t border-cyan-300/15 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="relative overflow-hidden neon-border hud-frame">
              <img
                src="/banner.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-[#05060a]/75" />
              <div className="relative px-6 py-12 md:px-12 md:py-16">
                <p className="font-tech text-[11px] tracking-[0.3em] text-cyan-300">
                  03 // RECRUIT
                </p>
                <h2 className="font-display mt-3 text-4xl md:text-6xl">같이 만들 사람 찾는다</h2>
                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#c5d4e2]">
                  게임 좋아하고, 한 시즌 동안 결과물을 책임질 준비가 되면 충분하다.
                  기획이든 코드든 그림이든, 손에 남는 걸 만들고 싶은 사람을 받는다.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={CONTACT_MAILTO}
                    className="font-tech hud-frame bg-cyan-400 px-5 py-3 text-[12px] tracking-[0.16em] text-black transition hover:bg-white"
                  >
                    학기 초 모집 오픈
                  </a>
                  <a
                    href={CONTACT_MAILTO}
                    className="font-tech text-[12px] tracking-[0.12em] text-cyan-200 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-300/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-[11px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p className="font-tech tracking-[0.18em]">
            © {new Date().getFullYear()} IGEMOIM / KMU GAME DEV CLUB
          </p>
          <div className="flex flex-col gap-2 md:items-end">
            <a
              href={CONTACT_MAILTO}
              className="font-tech tracking-[0.08em] transition hover:text-cyan-300"
            >
              {CONTACT_EMAIL}
            </a>
            <p>국민대학교 소프트웨어학부 게임개발 동아리</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
