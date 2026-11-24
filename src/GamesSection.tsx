const games = [
  {
    id: '01',
    code: '01',
    title: 'PROJECT 01',
    stage: 'IN DEVELOPMENT',
    summary: '이번 학기 팀 빌드로 제작 중입니다. 플레이 가능한 빌드가 완성되면 공개됩니다.',
    surface: 'game-surface-1',
  },
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
              직접 플레이할 수 있는 결과물.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-[#8b95a7]">
            아이디어에 머물지 않고, 완성된 빌드를 이곳에 하나씩 쌓아갑니다.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {games.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c0e14]"
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
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#06070a]/60 px-2.5 py-1 font-mono-tech text-[10px] text-white/75 backdrop-blur-sm">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#38d6f5]"
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
    </section>
  )
}
