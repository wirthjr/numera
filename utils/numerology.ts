import { NegativeSequence, LifeCycle, NumerologyMap, PinnaclesData, ChallengesData, FrequencyData } from '../types';
import { getArcanoInfo } from '../data/arcanos';

// Tabela Pitagórica
const LETTER_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1, 
  Á: 1, Ã: 1, Â: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3, Ç: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5, É: 5, Ê: 5,
  F: 6, O: 6, X: 6, Ó: 6, Õ: 6, Ô: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9, Í: 9
};

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Á', 'Ã', 'Â', 'É', 'Ê', 'Í', 'Ó', 'Õ', 'Ô', 'Ú'];

const NEGATIVE_SEQUENCES_MEANINGS: Record<number, string> = {
  1: "Bloqueio de iniciativa. Indica medo de começar, falta de autoconfiança, egoísmo ou tendência a se isolar. A pessoa pode sentir que suas ideias nunca saem do papel.",
  2: "Bloqueio de associação. Indica insegurança, baixa autoestima, dependência emocional excessiva ou timidez que impede o relacionamento saudável com os outros.",
  3: "Bloqueio de expressão. Dificuldade em se comunicar, tendência a fofocas, dispersão ou incapacidade de expressar os próprios sentimentos e criatividade.",
  4: "Bloqueio de trabalho. Rigidez mental, teimosia excessiva, dificuldade em aceitar mudanças ou instabilidade na vida profissional e financeira.",
  5: "Bloqueio de liberdade. Impulsividade destrutiva, instabilidade emocional, tendência a vícios ou medo profundo de perder a liberdade (ou medo de assumir compromissos).",
  6: "Bloqueio de afeto. Perfeccionismo exagerado, cobrança excessiva sobre a família, ciúmes ou negligência das próprias necessidades em prol dos outros.",
  7: "Bloqueio de espiritualidade. Ceticismo excessivo, frieza emocional, medo de traição, isolamento social ou dificuldade em confiar na própria intuição.",
  8: "Bloqueio de poder. Medo do sucesso, materialismo excessivo, abuso de poder ou autoritarismo. Problemas recorrentes com justiça ou dinheiro.",
  9: "Bloqueio de finalização. Dificuldade em encerrar ciclos, apego ao passado, acumulação de mágoas ou tendência ao martírio e vitimização."
};

const CYCLE_MEANINGS: Record<number, string> = {
  1: "Ciclo de Descoberta: Fase de individuação, independência e novos inícios.",
  2: "Ciclo de Associação: Fase de parcerias, paciência e desenvolvimento emocional.",
  3: "Ciclo de Expressão: Fase de criatividade, socialização e aprendizado leve.",
  4: "Ciclo de Estruturação: Fase de ordem, trabalho duro e construção de bases.",
  5: "Ciclo de Expansão: Fase de mudanças, viagens, liberdade e instabilidade.",
  6: "Ciclo de Responsabilidade: Fase focada na família, no lar e no amor.",
  7: "Ciclo de Introspecção: Fase de estudo, espiritualidade e análise interior.",
  8: "Ciclo de Poder: Fase de conquistas materiais, carreira e justiça.",
  9: "Ciclo de Humanitarismo: Fase de conclusões, desapego e visão universal."
};

export const PINNACLE_MEANINGS: Record<number, string> = {
  1: "Período de desenvolver a individualidade, liderança e autoconfiança. O mundo exige que você se destaque e tome a frente em seus projetos.",
  2: "Período focado em parcerias, cooperação e detalhes. O progresso vem através da diplomacia, da paciência e da sensibilidade com o outro.",
  3: "Período de forte expressão criativa, socialização e alegria. Oportunidades surgem através da comunicação, das artes e da autoexpressão.",
  4: "Período de construção e trabalho árduo. Exige disciplina, ordem e economia para criar uma base sólida e duradoura para o futuro.",
  5: "Período de liberdade, mudanças constantes e viagens. É necessário ser flexível, aceitar o inesperado e promover a própria liberdade.",
  6: "Período centrado no lar, família e responsabilidades comunitárias. O sucesso vem do serviço, do aconselhamento e do cuidado com os outros.",
  7: "Período de introspecção, estudo e desenvolvimento espiritual. O mundo material fica em segundo plano; busque sabedoria e especialização.",
  8: "Período de colheita material, poder e autoridade. É hora de assumir o comando nos negócios, gerenciar finanças e buscar reconhecimento.",
  9: "Período de finalizações, humanitarismo e drama emocional. O sucesso vem da compaixão, do desapego pessoal e de servir a uma causa maior.",
  11: "Período de iluminação espiritual e inspiração. Você pode se tornar uma figura pública, visionária ou inspirar outros (Vibração Mestra).",
  22: "Período de grandes realizações materiais com propósitos elevados. Construção de legados para a humanidade em larga escala (Vibração Mestra)."
};

export const CHALLENGE_MEANINGS: Record<number, string> = {
  0: "Desafio da Escolha. Indica uma alma velha que pode enfrentar qualquer desafio ou nenhum, dependendo inteiramente de suas escolhas conscientes e evolução.",
  1: "Desafio da Vontade. A lição é desenvolver a autoconfiança e a independência sem se tornar arrogante, dominador ou egoísta.",
  2: "Desafio da Sensibilidade. A lição é equilibrar as emoções, superar a timidez e aprender a trabalhar com outros sem se tornar dependente.",
  3: "Desafio da Expressão. A lição é focar a energia criativa, evitando a dispersão, a superficialidade, a fofoca ou o medo de se expor.",
  4: "Desafio da Disciplina. A lição é aprender a trabalhar com ordem e método, superando tanto a preguiça quanto a rigidez mental excessiva.",
  5: "Desafio da Mudança. A lição é lidar com a liberdade de forma responsável, evitando a impulsividade, a instabilidade e a busca incessante por prazeres.",
  6: "Desafio da Aceitação. A lição é aceitar as pessoas como são, evitando o perfeccionismo, a cobrança excessiva e a intromissão na vida alheia.",
  7: "Desafio da Fé. A lição é superar o ceticismo, o orgulho intelectual e o isolamento, aprendendo a confiar na vida e na própria intuição.",
  8: "Desafio do Equilíbrio. A lição é lidar com o dinheiro e o poder de forma ética, sem cair no materialismo, na ganância ou no medo da escassez.",
  9: "Desafio do Desapego. A lição é aprender a encerrar ciclos sem drama, perdoar o passado e desenvolver amor universal sem esperar retribuição."
};

// Helper: Normalize string (remove accents, to upper)
export const normalizeName = (name: string): string => {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
};

// Helper: Get number for a character
export const getCharNumber = (char: string): number => {
  const normalized = normalizeName(char);
  return LETTER_MAP[normalized] || 0;
};

// Helper: Reduce a number to a single digit (Pythagorean logic)
export const reduceNumber = (num: number): number => {
  if (num === 0) return 0; // Guard
  let sum = num;
  while (sum > 9 && sum !== 11 && sum !== 22) { // Preserving master numbers locally if needed, but standard logic reduces
      let tempSum = 0;
      while (sum > 0) {
          tempSum += sum % 10;
          sum = Math.floor(sum / 10);
      }
      sum = tempSum;
  }
  // If we want strict 1-9 for cycles:
  if (sum > 9 && sum !== 11 && sum !== 22) {
      // recursive fail safe
       return reduceNumber(sum);
  }
  return sum;
};

// Strict reduction to single digit (1-9) for cycles
export const reduceToSingleDigit = (num: number): number => {
  if (num === 0) return 0;
  let res = num % 9;
  return res === 0 ? 9 : res;
};

// --- Full Map Calculations ---

export const calculateFullMap = (fullName: string, birthDate: string): NumerologyMap => {
    // 1. Alma, Aparência, Destino
    let soulSum = 0;
    let personalitySum = 0;
    const frequency: Record<number, number> = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};

    const upperOriginal = fullName.toUpperCase().trim();
    
    // We iterate the original name to detect vowels correctly (before normalization strips accents sometimes needed for visual context, though here map handles it)
    for (let i = 0; i < upperOriginal.length; i++) {
        const char = upperOriginal[i];
        if (!/[A-ZÁÃÂÉÊÍÓÕÔÚÇ]/.test(char)) continue; // Skip spaces/symbols

        const normalizedChar = normalizeName(char);
        const val = LETTER_MAP[normalizedChar];
        
        if (val) {
            frequency[val] = (frequency[val] || 0) + 1;
            
            // Basic Vowel Logic (Y is usually consonant in standard PT Numerology unless specfied otherwise)
            if (VOWELS.includes(char)) {
                soulSum += val;
            } else {
                personalitySum += val;
            }
        }
    }

    const alma = reduceNumber(soulSum);
    const aparencia = reduceNumber(personalitySum);
    const destino = reduceNumber(soulSum + personalitySum);

    // 2. Lição de Vida e Data
    let licaoVida = 0;
    let diaNatalicio = 0;
    let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    let c1 = 0, c2 = 0, mainChallenge = 0;

    if (birthDate) {
      const parts = birthDate.split('-').map(Number); // YYYY-MM-DD
      if (parts.length === 3) {
        const birthYear = parts[0];
        const birthMonth = parts[1];
        const birthDay = parts[2];
        
        // Calculations for Pinnacles/Challenges require reduced components
        const rDay = reduceNumber(birthDay);
        const rMonth = reduceNumber(birthMonth);
        const rYear = reduceNumber(birthYear);

        licaoVida = calculateLifePath(birthDate); 
        diaNatalicio = reduceNumber(birthDay);
        
        // 4. Pináculos
        // P1 = Month + Day
        p1 = reduceNumber(rMonth + rDay);
        // P2 = Day + Year
        p2 = reduceNumber(rDay + rYear);
        // P3 = P1 + P2
        p3 = reduceNumber(p1 + p2);
        // P4 = Month + Year
        p4 = reduceNumber(rMonth + rYear);

        // 5. Desafios (Subtractions)
        // C1 = |Month - Day|
        c1 = reduceNumber(Math.abs(rMonth - rDay));
        // C2 = |Day - Year|
        c2 = reduceNumber(Math.abs(rDay - rYear));
        // Main = |C1 - C2|
        mainChallenge = reduceNumber(Math.abs(c1 - c2));
      }
    }
    
    // 3. Número Poderoso (Destino + Lição de Vida)
    const numeroPoderoso = reduceNumber(destino + licaoVida);

    // 6. Excessos e Ausências
    const excessos: FrequencyData[] = [];
    const ausencias: number[] = [];

    for (let i = 1; i <= 9; i++) {
        if (frequency[i] === 0) {
            ausencias.push(i);
        } else if (frequency[i] >= 3) {
            // > 2 is often considered prominent/excess depending on name length
            excessos.push({ number: i, count: frequency[i] });
        }
    }

    return {
        alma,
        aparencia,
        destino,
        licaoVida,
        diaNatalicio,
        numeroPoderoso,
        pinaculos: { p1, p2, p3, p4 },
        desafios: { c1, c2, main: mainChallenge },
        excessos,
        ausencias,
        karmicDebts: [] 
    };
};


// Core Logic: Generate Pyramid Layers
export const generatePyramid = (fullName: string): number[][] => {
  const cleanName = normalizeName(fullName);
  if (!cleanName) return [];

  // Layer 1: The name numbers
  let currentLayer: number[] = cleanName.split('').map(char => LETTER_MAP[char] || 0);
  
  const pyramid: number[][] = [currentLayer];

  // Generate subsequent layers
  while (currentLayer.length > 1) {
    const nextLayer: number[] = [];
    for (let i = 0; i < currentLayer.length - 1; i++) {
      let sum = currentLayer[i] + currentLayer[i + 1];
      // Reduce logic for pyramid usually allows intermediate master numbers but let's stick to simple reduction 1-9 for standard pyramid
      let reduced = sum;
      while(reduced > 9) {
          reduced = reduced.toString().split('').reduce((a,b) => a + parseInt(b), 0);
      }
      nextLayer.push(reduced);
    }
    pyramid.push(nextLayer);
    currentLayer = nextLayer;
  }

  return pyramid;
};

// Core Logic: Calculate 9-Year Life Cycles based on Name
export const calculateLifeCycles = (fullName: string): LifeCycle[] => {
  const cleanName = normalizeName(fullName);
  if (!cleanName) return [];

  const cycles: LifeCycle[] = [];
  const maxAge = 90;
  const cycleDuration = 9;
  const numberOfCycles = Math.ceil(maxAge / cycleDuration);

  for (let i = 0; i < numberOfCycles; i++) {
    // Loop through name characters
    const charIndex = i % cleanName.length;
    const char = cleanName[charIndex];
    const number = LETTER_MAP[char] || 0;
    
    cycles.push({
      cycleIndex: i + 1,
      startAge: i * cycleDuration,
      endAge: (i + 1) * cycleDuration,
      rulerChar: char,
      rulerNumber: number,
      meaning: CYCLE_MEANINGS[number] || "Ciclo de Transformação"
    });
  }

  return cycles;
};

// Core Logic: Detect Negative Sequences
export const findNegativeSequences = (pyramid: number[][]): NegativeSequence[] => {
  const sequences: NegativeSequence[] = [];

  pyramid.forEach((layer, layerIdx) => {
    // Need at least 3 items to form a sequence
    if (layer.length < 3) return;

    let i = 0;
    while (i <= layer.length - 3) {
      const current = layer[i];
      
      // Check for triple sequence
      if (layer[i+1] === current && layer[i+2] === current) {
        // Found a sequence of at least 3. Let's find how long it is.
        let length = 3;
        while (i + length < layer.length && layer[i + length] === current) {
          length++;
        }

        sequences.push({
          number: current,
          layerIndex: layerIdx,
          startIndex: i,
          length: length,
          meaning: NEGATIVE_SEQUENCES_MEANINGS[current] || "Sequência de intensidade vibracional."
        });

        // Skip ahead
        i += length; 
      } else {
        i++;
      }
    }
  });

  return sequences;
};

// --- Time Cycle Logic ---

export const calculateLifePath = (birthDate: string): number => {
  // birthDate format YYYY-MM-DD
  if (!birthDate) return 0;
  const parts = birthDate.split('-');
  if (parts.length !== 3) return 0;
  
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  // Sum all components
  let sum = year + month + day;
  return reduceNumber(sum);
};

export const calculatePersonalYear = (birthDate: string, targetYear: number): number => {
  const parts = birthDate.split('-');
  if (parts.length !== 3) return 0;
  const day = parseInt(parts[2]);
  const month = parseInt(parts[1]);
  
  // Personal Year = Day + Month + Current Year
  return reduceToSingleDigit(day + month + targetYear);
};

export const calculatePersonalMonth = (personalYear: number, month: number): number => {
  return reduceToSingleDigit(personalYear + month);
};

export const calculatePersonalDay = (personalMonth: number, day: number): number => {
  return reduceToSingleDigit(personalMonth + day);
};

export const getCyclePhase = (personalYear: number): { phase: 'Plantio' | 'Gestão' | 'Colheita', description: string } => {
  if (personalYear >= 1 && personalYear <= 3) {
    return { 
      phase: 'Plantio', 
      description: 'Anos de semear, iniciar novos projetos e agir com coragem.' 
    };
  } else if (personalYear >= 4 && personalYear <= 6) {
    return { 
      phase: 'Gestão', 
      description: 'Anos de cuidar, estruturar, trabalhar duro e harmonizar.' 
    };
  } else {
    return { 
      phase: 'Colheita', 
      description: 'Anos de colher resultados, refletir, finalizar e celebrar.' 
    };
  }
};

// --- Compatibility Logic ---

export const calculateCompatibility = (lp1: number, lp2: number): { score: number, description: string } => {
  // Simplified compatibility matrix
  const matrix: Record<string, number> = {
    // Same numbers often understand each other
    '1-1': 80, '2-2': 90, '3-3': 85, '4-4': 80, '5-5': 90, '6-6': 95, '7-7': 85, '8-8': 75, '9-9': 80,
    
    // Natural groups
    '1-5': 90, '1-7': 85, '1-3': 75, '1-9': 60,
    '2-4': 95, '2-8': 85, '2-6': 90, '2-3': 70,
    '3-6': 90, '3-9': 95, '3-5': 80,
    '4-8': 95, '4-1': 60, '4-7': 80,
    '5-1': 90, '5-7': 80, '5-3': 85,
    '6-2': 90, '6-3': 90, '6-9': 90,
    '7-1': 85, '7-5': 80, '7-4': 75,
    '8-2': 85, '8-4': 95,
    '9-3': 95, '9-6': 90,
  };
  
  // Normalize key
  const k1 = `${lp1}-${lp2}`;
  const k2 = `${lp2}-${lp1}`;
  
  const score = matrix[k1] || matrix[k2] || 60; // Default 60%
  
  let description = "";
  if (score >= 90) description = "Almas Gêmeas Vibracionais! Fluxo natural e alta harmonia.";
  else if (score >= 80) description = "Excelente Compatibilidade. Compartilham valores e ritmos.";
  else if (score >= 70) description = "Boa Compatibilidade. Requer alguns ajustes mas tem potencial.";
  else description = "Desafio de Crescimento. Vocês vieram aprender muito um com o outro através das diferenças.";
  
  return { score, description };
};