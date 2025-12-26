import { ArcanoData } from '../types';

export const ARCANOS_DB: Record<number, ArcanoData> = {
  1: {
    numero: 1,
    nome: "O Mago",
    arcanjo: "Metatron",
    atributo: "Vontade e Potencial",
    descricao: "Início de ciclos, poder de manifestação e liderança criativa."
  },
  2: {
    numero: 2,
    nome: "A Sacerdotisa",
    arcanjo: "Haniel",
    atributo: "Intuição e Mistério",
    descricao: "Sabedoria interior, paciência e conexão com o subconsciente."
  },
  3: {
    numero: 3,
    nome: "A Imperatriz",
    arcanjo: "Anael",
    atributo: "Fertilidade e Criatividade",
    descricao: "Expressão, comunicação, beleza e abundância material."
  },
  4: {
    numero: 4,
    nome: "O Imperador",
    arcanjo: "Miguel",
    atributo: "Estrutura e Proteção",
    descricao: "Ordem, estabilidade, realização material e autoridade."
  },
  5: {
    numero: 5,
    nome: "O Hierofante",
    arcanjo: "Rafael",
    atributo: "Sabedoria e Cura",
    descricao: "Espiritualidade, ensino, busca por conhecimento e liberdade."
  },
  6: {
    numero: 6,
    nome: "Os Enamorados",
    arcanjo: "Samuel",
    atributo: "Escolhas e Harmonia",
    descricao: "Amor, responsabilidade afetiva e conciliação de opostos."
  },
  7: {
    numero: 7,
    nome: "O Carro",
    arcanjo: "Gabriel",
    atributo: "Vitória e Movimento",
    descricao: "Direção, foco, triunfo sobre obstáculos e progresso espiritual."
  },
  8: {
    numero: 8,
    nome: "A Justiça",
    arcanjo: "Zadkiel",
    atributo: "Equilíbrio e Karma",
    descricao: "Ajuste de contas, retidão, racionalidade e poder pessoal."
  },
  9: {
    numero: 9,
    nome: "O Eremita",
    arcanjo: "Cassiel",
    atributo: "Prudência e Interiorização",
    descricao: "Finalização de ciclos, sabedoria solitária e altruísmo."
  },
  11: {
    numero: 11,
    nome: "A Força",
    arcanjo: "Uriel",
    atributo: "Domínio e Força Espiritual",
    descricao: "Coragem, compaixão e domínio dos instintos inferiores."
  },
  22: {
    numero: 22,
    nome: "O Mundo",
    arcanjo: "Jofiel",
    atributo: "Iluminação e Realização",
    descricao: "Conclusão perfeita, sucesso global e integração total."
  }
};

// Fallback for generic numbers not in the Major Arcana list directly
export const getArcanoInfo = (num: number): ArcanoData => {
  if (ARCANOS_DB[num]) return ARCANOS_DB[num];
  
  // Reduction for fallback (e.g., if we get a 10, it reduces to 1)
  let reduced = num;
  while (reduced > 9 && reduced !== 11 && reduced !== 22) {
    reduced = reduced.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  
  return ARCANOS_DB[reduced] || ARCANOS_DB[1]; // Default safeguard
};