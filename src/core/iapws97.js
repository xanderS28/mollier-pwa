import { solvePH, solvePS, solvePT, solvePx } from 'iapws-if97';

const BAR_TO_MPA = 0.1;
const KELVIN_OFFSET = 273.15;
const MIN_PRESSURE_BAR = 0.00611657;

function clampPressure(pressureBar) {
  return Math.min(Math.max(pressureBar, MIN_PRESSURE_BAR), 80);
}

export function celsiusToKelvin(valueC) {
  return valueC + KELVIN_OFFSET;
}

export function saturationTemperatureC(pressureBar) {
  const pressure = clampPressure(pressureBar) * BAR_TO_MPA;
  const liquid = solvePx(pressure, 0);
  return liquid.temperature - KELVIN_OFFSET;
}

export function saturationProperties(pressureBar) {
  const pressure = clampPressure(pressureBar) * BAR_TO_MPA;
  const saturatedLiquid = solvePx(pressure, 0);
  const saturatedVapor = solvePx(pressure, 1);

  return {
    TSat: saturatedLiquid.temperature - KELVIN_OFFSET,
    hf: saturatedLiquid.enthalpy,
    hfg: saturatedVapor.enthalpy - saturatedLiquid.enthalpy,
    hg: saturatedVapor.enthalpy,
    sf: saturatedLiquid.entropy,
    sfg: saturatedVapor.entropy - saturatedLiquid.entropy,
    sg: saturatedVapor.entropy,
  };
}

export function steamStateAtTemperature(pressureBar, temperatureC) {
  const pressure = clampPressure(pressureBar) * BAR_TO_MPA;
  const state = solvePT(pressure, celsiusToKelvin(temperatureC));

  return {
    pressureBar: Number(pressureBar),
    temperatureC: Number(temperatureC),
    h: Number(state.enthalpy),
    s: Number(state.entropy),
    quality: Number.isFinite(state.quality) ? Number(state.quality) : null,
    phase: state.quality === null ? 'superheated' : 'wet',
  };
}

export function steamStateFromEnthalpy(pressureBar, enthalpy) {
  const pressure = clampPressure(pressureBar) * BAR_TO_MPA;
  const state = solvePH(pressure, enthalpy);

  return {
    pressureBar: Number(pressureBar),
    temperatureC: Number(state.temperature - KELVIN_OFFSET),
    h: Number(state.enthalpy),
    s: Number(state.entropy),
    quality: Number.isFinite(state.quality) ? Number(state.quality) : null,
    phase: state.quality === null ? 'superheated' : 'wet',
  };
}

export function stateAtEntropyForPressure(pressureBar, targetEntropy) {
  const pressure = clampPressure(pressureBar) * BAR_TO_MPA;
  const state = solvePS(pressure, targetEntropy);

  return {
    pressureBar: Number(pressureBar),
    temperatureC: Number(state.temperature - KELVIN_OFFSET),
    h: Number(state.enthalpy),
    s: Number(state.entropy),
    quality: Number.isFinite(state.quality) ? Number(state.quality) : null,
    phase: state.quality === null ? 'superheated' : 'wet',
  };
}
