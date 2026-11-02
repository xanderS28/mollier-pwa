export default function ResultsCards({ results }) {
  const cards = [
    {
      label: 'h1',
      value: `${results.h1.toFixed(1)} kJ/kg`,
      description: 'Entalpía inicial',
    },
    {
      label: 's1',
      value: `${results.s1.toFixed(3)} kJ/kg·K`,
      description: 'Entropía inicial',
    },
    {
      label: 'h2 real',
      value: `${results.h2.toFixed(1)} kJ/kg`,
      description: 'Estado de salida',
    },
    {
      label: 'x2',
      value: `${(results.x2 ?? 0).toFixed(3)}`,
      description: 'Calidad de salida',
    },
    {
      label: 'Trabajo',
      value: `${results.work.toFixed(1)} kJ/kg`,
      description: 'h1 - h2',
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-[#f6f8fa] p-4 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {card.label}
          </p>
          <p className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">{card.value}</p>
          <p className="mt-1 text-xs text-slate-500">{card.description}</p>
        </article>
      ))}
    </section>
  );
}
