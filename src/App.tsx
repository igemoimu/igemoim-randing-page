function App() {
  return (
    <div className="min-h-svh bg-white text-neutral-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="text-lg font-semibold tracking-tight">igemoim</span>
        <nav className="flex gap-6 text-sm text-neutral-600">
          <a href="#about">소개</a>
          <a href="#contact">문의</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-24">
          <p className="text-sm font-medium text-neutral-500">Landing page</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            igemoim
          </h1>
          <p className="max-w-xl text-lg text-neutral-600">
            랜딩 페이지 초안입니다. 콘텐츠와 디자인을 이어서 채워 주세요.
          </p>
        </section>

        <section id="about" className="border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-semibold">소개</h2>
            <p className="mt-3 text-neutral-600">소개 문구를 작성할 자리입니다.</p>
          </div>
        </section>

        <section id="contact" className="border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-semibold">문의</h2>
            <p className="mt-3 text-neutral-600">연락처를 작성할 자리입니다.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} igemoim
        </div>
      </footer>
    </div>
  )
}

export default App
