import Plot from 'react-plotly.js';
import { useMemo } from 'react';
import { saturationProperties, steamStateAtTemperature } from '../core/iapws97.js';

function buildIsobar(pressureBar, startTemperatureC, endTemperatureC) {
  const x = [];
  const y = [];

  for (let temperature = startTemperatureC; temperature <= endTemperatureC; temperature += 5) {
    const state = steamStateAtTemperature(pressureBar, temperature);
    x.push(state.s);
    y.push(state.h);
  }

  return { x, y };
}

function buildSaturationDome() {
  const x = [];
  const y = [];

  for (let pressure = 0.5; pressure <= 80; pressure += 0.5) {
    const saturated = saturationProperties(pressure);
    x.push(saturated.sg);
    y.push(saturated.hg);
  }

  for (let pressure = 80; pressure >= 0.5; pressure -= 0.5) {
    const saturated = saturationProperties(pressure);
    x.push(saturated.sf);
    y.push(saturated.hf);
  }

  return { x, y };
}

export default function MollierChart({ results, inputs }) {
  const dome = useMemo(() => buildSaturationDome(), []);

  const p1SaturationT = useMemo(() => saturationProperties(inputs.P1).TSat, [inputs.P1]);
  const p2SaturationT = useMemo(() => saturationProperties(inputs.P2).TSat, [inputs.P2]);

  const isobarP1 = useMemo(
    () => buildIsobar(inputs.P1, p1SaturationT, 650),
    [inputs.P1, p1SaturationT],
  );

  const isobarP2 = useMemo(
    () => buildIsobar(inputs.P2, p2SaturationT, 500),
    [inputs.P2, p2SaturationT],
  );

  const xRange = [Math.min(...dome.x) * 0.92, Math.max(...dome.x) * 1.06];
  const yRange = [Math.min(...dome.y) * 0.8, Math.max(...dome.y) * 1.08];

  const traces = [
    {
      type: 'scatter',
      mode: 'lines',
      x: dome.x,
      y: dome.y,
      line: { color: '#94a3b8', width: 1.5 },
      fill: 'toself',
      fillcolor: 'rgba(59, 130, 246, 0.10)',
      name: 'Campana de saturación',
      hoverinfo: 'skip',
      showlegend: true,
    },
    {
      type: 'scatter',
      mode: 'lines',
      x: isobarP1.x,
      y: isobarP1.y,
      line: { color: '#2563eb', width: 2.2, dash: 'solid' },
      name: `P1 = ${inputs.P1} bar`,
      hoverinfo: 'skip',
    },
    {
      type: 'scatter',
      mode: 'lines',
      x: isobarP2.x,
      y: isobarP2.y,
      line: { color: '#8b5cf6', width: 2, dash: 'dash' },
      name: `P2 = ${inputs.P2} bar`,
      hoverinfo: 'skip',
    },
    {
      type: 'scatter',
      mode: 'lines',
      x: [results.state1.s, results.state2s.s],
      y: [results.state1.h, results.state2s.h],
      line: { color: '#f59e0b', width: 2.5, dash: 'solid' },
      name: '2s ideal',
      hoverinfo: 'skip',
    },
    {
      type: 'scatter',
      mode: 'lines',
      x: [results.state2s.s, results.state2.s],
      y: [results.state2s.h, results.state2.h],
      line: { color: '#ef4444', width: 2.8, dash: 'solid' },
      name: '2 real',
      hoverinfo: 'skip',
    },
    {
      type: 'scatter',
      mode: 'markers',
      x: [results.state1.s],
      y: [results.state1.h],
      marker: { size: 11, color: '#0ea5e9', symbol: 'circle' },
      name: 'P1',
      customdata: [[results.state1.h, results.state1.s]],
      hovertemplate:
        '<b>Punto 1</b><br>h = %{customdata[0]:.1f} kJ/kg<br>s = %{customdata[1]:.3f} kJ/kg·K<extra></extra>',
    },
    {
      type: 'scatter',
      mode: 'markers',
      x: [results.state2s.s],
      y: [results.state2s.h],
      marker: { size: 11, color: '#f59e0b', symbol: 'diamond' },
      name: '2s',
      customdata: [[results.state2s.h, results.state2s.s]],
      hovertemplate:
        '<b>Punto 2s</b><br>h = %{customdata[0]:.1f} kJ/kg<br>s = %{customdata[1]:.3f} kJ/kg·K<extra></extra>',
    },
    {
      type: 'scatter',
      mode: 'markers',
      x: [results.state2.s],
      y: [results.state2.h],
      marker: { size: 11, color: '#ef4444', symbol: 'square' },
      name: 'P2 real',
      customdata: [[results.state2.h, results.state2.s]],
      hovertemplate:
        '<b>Punto 2 real</b><br>h = %{customdata[0]:.1f} kJ/kg<br>s = %{customdata[1]:.3f} kJ/kg·K<extra></extra>',
    },
  ];

  return (
    <div className="rounded-[26px] border border-slate-200 bg-[#f8fafc] p-3 shadow-[0_14px_32px_rgba(15,23,42,0.10)] sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Diagrama h-s
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
            Expansión de turbina
          </h2>
        </div>
        <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700">
          ηs = {inputs.etaS}%
        </span>
      </div>

      <Plot
        data={traces}
        layout={{
          paper_bgcolor: '#f8fafc',
          plot_bgcolor: '#f8fafc',
          margin: { l: 60, r: 20, t: 18, b: 52 },
          font: { color: '#0f172a', family: 'Inter, sans-serif' },
          legend: {
            orientation: 'h',
            x: 0,
            y: 1.12,
            xanchor: 'left',
            yanchor: 'bottom',
            font: { size: 11, color: '#334155' },
            bgcolor: 'rgba(255,255,255,0.15)',
            bordercolor: 'rgba(148,163,184,0.35)',
            borderwidth: 1,
          },
          xaxis: {
            title: {
              text: 'Entropía s [kJ/kg·K]',
              font: { color: '#334155', size: 12 },
            },
            range: xRange,
            gridcolor: 'rgba(15, 23, 42, 0.08)',
            zerolinecolor: 'rgba(15, 23, 42, 0.12)',
            tickfont: { color: '#475569' },
          },
          yaxis: {
            title: {
              text: 'Entalpía h [kJ/kg]',
              font: { color: '#334155', size: 12 },
            },
            range: yRange,
            gridcolor: 'rgba(15, 23, 42, 0.08)',
            zerolinecolor: 'rgba(15, 23, 42, 0.12)',
            tickfont: { color: '#475569' },
          },
          dragmode: 'pan',
          hovermode: 'closest',
          clickmode: 'event+select',
        }}
        config={{
          responsive: true,
          displayModeBar: false,
          scrollZoom: false,
          doubleClick: 'reset',
        }}
        useResizeHandler
        style={{ width: '100%', height: '430px' }}
      />
    </div>
  );
}
