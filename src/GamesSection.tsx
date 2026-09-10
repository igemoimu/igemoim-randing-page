import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const games = [
  { id: '01', code: '01', title: 'PROJECT 01' },
  { id: '02', code: '02', title: 'PROJECT 02' },
  { id: '03', code: '03', title: 'PROJECT 03' },
] as const

export function GamesSection() {
  return (
    <section id="games" className="relative border-t border-cyan-300/15 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading index="03" label="GAMES" />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {games.map((item, index) => (
            <Reveal key={item.id} delay={index * 90}>
              <article className="card-lift group cursor-pointer overflow-hidden border border-cyan-300/15 bg-[#0a0d14] hover:border-cyan-300/40">
                <div className="soon-stage">
                  <div className="soon-orb transition-[border-color,box-shadow] duration-250 group-hover:border-cyan-300/55 group-hover:shadow-[0_0_22px_rgb(0_212_255/0.18)]">
                    <p className="font-tech text-[10px] tracking-[0.22em] text-cyan-200/80">
                      COMING SOON
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-tech text-[10px] tracking-[0.22em] text-cyan-300">
                      {item.code}
                    </p>
                    <p className="font-tech text-[10px] tracking-[0.18em] text-white/35">
                      SOON
                    </p>
                  </div>
                  <h3 className="font-display mt-4 text-[28px] transition-colors group-hover:text-cyan-100">
                    {item.title}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
