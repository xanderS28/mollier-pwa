import {
  stateAtEntropyForPressure,
  steamStateAtTemperature,
  steamStateFromEnthalpy,
} from './iapws97.js';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const defaultInputs = {
  P1: 40,
  T1: 450,
  P2: 5,
  etaS: 82,
};

export function calculateMollierExpansion({ P1, T1, P2, etaS }) {
  const inletPressure = clamp(Number(P1) || defaultInputs.P1, 1, 80);
  const inletTemperature = clamp(Number(T1) || defaultInputs.T1, 100, 600);
  const outletPressure = clamp(Number(P2) || defaultInputs.P2, 0.5, 35);
  const eta = clamp(Number(etaS) || defaultInputs.etaS, 0.1, 100);

  const state1 = steamStateAtTemperature(inletPressure, inletTemperature);
  const state2s = stateAtEntropyForPressure(outletPressure, state1.s);

  const idealDeltaH = state1.h - state2s.h;
  const actualDeltaH = (eta / 100) * idealDeltaH;
  const h2 = state1.h - actualDeltaH;
  const state2 = steamStateFromEnthalpy(outletPressure, h2);

  const x2 = Number.isFinite(state2.quality) ? state2.quality : 1;
  const work = state1.h - state2.h;

  return {
    state1,
    state2s,
    state2,
    h1: state1.h,
    s1: state1.s,
    h2s: state2s.h,
    s2s: state2s.s,
    h2: state2.h,
    s2: state2.s,
    x2,
    work,
    etaS: eta,
  };
}
