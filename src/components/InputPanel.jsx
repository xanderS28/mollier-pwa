const controlDefinitions = [
  { key: 'P1', label: 'Presión 1', unit: 'bar', min: 5, max: 80, step: 1 },
  { key: 'T1', label: 'Temperatura 1', unit: '°C', min: 150, max: 600, step: 5 },
  { key: 'P2', label: 'Presión 2', unit: 'bar', min: 0.5, max: 35, step: 0.5 },
  { key: 'etaS', label: 'Eficiencia isentrópica', unit: '%', min: 40, max: 100, step: 1 },
];

export default function InputPanel({ inputs, onChange }) {
  const handleValueChange = (key, rawValue) => {
    const nextValue = Number(rawValue);

    if (!Number.isFinite(nextValue)) {
      return;
    }

    onChange(key, nextValue);
  };

  return (
    <aside className="rounded-[22px] border border-slate-200/70 bg-[#f2f4f6] p-4 text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.1)] sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">Entradas</h2>
        <span className="rounded-full border border-sky-200 bg-sky-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700">
          h-s
        </span>
      </div>

      <div className="space-y-4">
        {controlDefinitions.map((control) => (
          <div
            key={control.key}
            className="rounded-2xl border border-slate-300 bg-white/70 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
          >
            <div className="mb-2 flex items-center justify-between gap-4">
              <label className="text-sm font-medium text-slate-700" htmlFor={control.key}>
                {control.label}
              </label>
              <div className="flex items-center gap-1 rounded-md border border-slate-300 bg-slate-50 px-2 py-1">
                <input
                  id={control.key}
                  type="number"
                  className="w-16 bg-transparent text-right text-sm font-semibold text-slate-900 outline-none"
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={inputs[control.key]}
                  onChange={(event) => handleValueChange(control.key, event.target.value)}
                />
                <span className="text-[11px] text-slate-500">{control.unit}</span>
              </div>
            </div>

            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={inputs[control.key]}
              onChange={(event) => handleValueChange(control.key, event.target.value)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-sky-600"
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
