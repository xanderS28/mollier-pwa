export default function Header() {
  return (
    <header className="rounded-[20px] border border-slate-300/50 bg-[#0f2138] px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.18)] sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5cc9ff]/15 ring-1 ring-[#7dd3fc]/40">
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#6ee7ff] to-[#0ea5e9] shadow-[inset_0_0_6px_rgba(255,255,255,0.85)]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-200/80">
              UNMSM · Tema 5
            </p>
            <h1 className="mt-1 text-lg font-bold tracking-tight text-white sm:text-2xl">
              Expansión en el Diagrama de Mollier
            </h1>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-slate-300/20 bg-slate-900/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 sm:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          PWA
        </div>
      </div>
    </header>
  );
}
