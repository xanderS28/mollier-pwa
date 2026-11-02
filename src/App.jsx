function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_26%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-4xl overflow-hidden rounded-[30px] border border-sky-400/20 bg-white/5 shadow-[0_30px_80px_rgba(14,165,233,0.22)] backdrop-blur-sm">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-200">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                En proceso
              </div>

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-slate-300">
                UNMSM · Tema 5
              </p>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                # Expansión en el Diagrama de Mollier
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Estamos trabajando en la versión interactiva de esta app para presentar el estudio
                termodinámico con claridad, rigor académico y una experiencia visual moderna.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-sky-100">
                  En mantenimiento
                </span>
                <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200">
                  Próximamente disponible
                </span>
              </div>
            </div>

            <div className="relative flex items-center justify-center border-t border-sky-400/20 bg-slate-900/40 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="relative h-[300px] w-full max-w-[330px] rounded-[28px] border border-sky-300/20 bg-[linear-gradient(135deg,rgba(15,23,42,0.9),rgba(8,47,73,0.7))] p-5 shadow-[0_20px_45px_rgba(2,132,199,0.28)]">
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="rounded-2xl border border-sky-300/20 bg-slate-950/60 p-4">
                  <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-sky-200/80">
                    h-s diagram
                  </div>

                  <div className="relative h-44 overflow-hidden rounded-xl bg-slate-900/80">
                    <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />

                    <svg viewBox="0 0 260 180" className="absolute inset-0 h-full w-full">
                      <path
                        d="M25 150 C 65 120, 82 60, 130 35 S 195 45, 228 90 L 228 150 L 25 150 Z"
                        fill="rgba(56,189,248,0.28)"
                        stroke="rgba(125,211,252,0.8)"
                        strokeWidth="1.3"
                      />
                      <path d="M130 35 L 130 150" stroke="rgba(96,165,250,0.75)" strokeDasharray="4 5" />
                      <path d="M25 110 C 90 90, 105 60, 130 35" stroke="rgba(250,204,21,0.9)" strokeWidth="2" fill="none" />
                      <path d="M130 35 L 228 100" stroke="rgba(248,113,113,0.9)" strokeWidth="2" fill="none" />
                      <circle cx="130" cy="35" r="5" fill="#38bdf8" />
                      <circle cx="130" cy="125" r="5" fill="#fbbf24" />
                      <circle cx="195" cy="90" r="5" fill="#f87171" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
