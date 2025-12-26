export interface ArcanoData {
  numero: number;
  nome: string;
  arcanjo: string;
  atributo: string;
  descricao: string;
}

export interface UserProfile {
  name: string;
  birthDate: string;
}

export interface PyramidLayer {
  values: number[];
  color?: string; // For UI styling hints
}

export interface NegativeSequence {
  number: number;
  layerIndex: number;
  startIndex: number;
  length: number;
  meaning: string;
}

export interface LifeCycle {
  cycleIndex: number;
  startAge: number;
  endAge: number;
  rulerNumber: number;
  rulerChar: string;
  meaning: string;
}

export enum CalculationTab {
  PYRAMID = 'piramide',
  FULL_MAP = 'mapa_completo',
  BIO_RHYTHM = 'biorritmo',
  CHART = 'ciclos', // Maps to Time Cycles
  SINASTRIA = 'sinastria',
  SETTINGS = 'config',
}

export interface CycleData {
  year: number;
  personalYear: number;
  phase: 'Plantio' | 'Gestão' | 'Colheita';
  description: string;
}

export interface DailyVibration {
  day: number;
  month: number;
  year: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
}

export interface PinnaclesData {
  p1: number; // Late Spring
  p2: number; // Summer
  p3: number; // Autumn
  p4: number; // Winter
}

export interface ChallengesData {
  c1: number;
  c2: number;
  main: number;
}

export interface FrequencyData {
  number: number;
  count: number;
}

export interface NumerologyMap {
  alma: number;
  aparencia: number;
  destino: number;
  licaoVida: number;
  diaNatalicio: number;
  numeroPoderoso: number;
  pinaculos: PinnaclesData;
  desafios: ChallengesData;
  excessos: FrequencyData[];
  ausencias: number[];
  karmicDebts: number[]; // 13, 14, 16, 19
}