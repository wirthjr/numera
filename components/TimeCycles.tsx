import React, { useRef, useState } from 'react';
import { calculatePersonalYear, calculatePersonalMonth, calculatePersonalDay } from '../utils/numerology';
import { Calendar, Sun, Moon, Info, Target, ShieldAlert, Sparkles, Share2, Loader2 } from 'lucide-react';
// @ts-ignore
import { toPng } from 'html-to-image';

interface TimeCyclesProps {
  birthDate: string;
}

interface CycleDetail {
  title: string;
  general: string;
  opportunity: string;
  challenge: string;
}

const TimeCycles: React.FC<TimeCyclesProps> = ({ birthDate }) => {
  const dayCardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  if (!birthDate) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
        <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <p className="text-gray-500">Insira sua data de nascimento para ver seus ciclos de tempo.</p>
      </div>
    );
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const personalYear = calculatePersonalYear(birthDate, currentYear);
  const personalMonth = calculatePersonalMonth(personalYear, currentMonth);
  const personalDay = calculatePersonalDay(personalMonth, currentDay);

  const handleShareDay = async () => {
    if (!dayCardRef.current) return;
    
    setIsSharing(true);
    try {
      const dataUrl = await toPng(dayCardRef.current, {
        cacheBust: true, 
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        filter: (node: HTMLElement) => {
            return !node.classList?.contains('no-share-capture');
        }
      });
      
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'vibracao-dia.png', { type: 'image/png' });

      // Check for native share support
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'NumeraSaaS - Minha Vibração',
          text: `Hoje meu dia é regido pelo número ${personalDay}: ${DAY_MEANINGS[personalDay]}`,
          files: [file],
        });
      } else {
        // Fallback: Download
        const link = document.createElement('a');
        link.download = 'vibracao-dia.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Failed to share card', err);
    } finally {
      setIsSharing(false);
    }
  };

  // --- Data Definitions ---

  const YEAR_DATA: Record<number, CycleDetail> = {
    1: {
      title: "O Plantio (Início)",
      general: "Este é o início de um ciclo de 9 anos. Uma energia de alta octanagem voltada para a independência e a individualidade. O universo está lhe dando um 'cheque em branco' energético para começar algo novo.",
      opportunity: "Iniciar projetos ousados, mudar de carreira ou assumir posições de liderança. A sorte favorece a iniciativa.",
      challenge: "Vencer a inércia e o medo de agir sozinho. Cuidado com o egoísmo ou a arrogância ao perseguir suas metas."
    },
    2: {
      title: "A Gestação (Associação)",
      general: "Após o plantio, a semente precisa de tempo e cuidado no escuro da terra. É um ano de ritmo mais lento, focado nos detalhes, na paciência e nas parcerias.",
      opportunity: "Desenvolver a diplomacia, formar alianças estratégicas e resolver conflitos antigos. A intuição estará afiada.",
      challenge: "A hipersensibilidade. Você pode se sentir dependente da aprovação alheia. Não force as coisas; deixe fluir."
    },
    3: {
      title: "A Expressão (Crescimento)",
      general: "A semente rompe o solo. É um ano de visibilidade, criatividade e socialização. A vida parece mais leve e as oportunidades surgem através da comunicação.",
      opportunity: "Expressar seus talentos artísticos ou comunicativos. Viajar, divertir-se e expandir sua rede de contatos.",
      challenge: "A dispersão de energia. Tentar fazer tudo ao mesmo tempo pode resultar em nada feito. Cuidado com a superficialidade."
    },
    4: {
      title: "A Fundação (Segurança)",
      general: "Hora de podar e fortalecer a planta. Ano de trabalho duro, disciplina e construção de bases sólidas para o futuro. Exige ordem e praticidade.",
      opportunity: "Organizar finanças, cuidar da saúde e consolidar a carreira. O esforço aplicado agora trará estabilidade duradoura.",
      challenge: "A rigidez mental e a sensação de limitação. Pode parecer um ano de muito esforço e pouca recompensa imediata."
    },
    5: {
      title: "A Mudança (Liberdade)",
      general: "A planta cresce livremente. Ano de movimento, versatilidade e o inesperado. A rotina é quebrada para dar espaço a novas experiências.",
      opportunity: "Viajar, aprender coisas novas, mudar de casa ou trabalho e vender ideias. O magnetismo pessoal está em alta.",
      challenge: "A impulsividade e os excessos (comida, gastos, prazeres). A falta de foco pode levar ao desperdício de energia."
    },
    6: {
      title: "A Harmonia (Responsabilidade)",
      general: "A planta floresce. O foco se volta para o lar, a família e a comunidade. É um ano de 'ninho', exigindo responsabilidade afetiva e ajustes domésticos.",
      opportunity: "Harmonizar relacionamentos, casar, ter filhos ou reformar a casa. Ótimo momento para atividades de cura e aconselhamento.",
      challenge: "A intromissão na vida alheia e o perfeccionismo excessivo. Cuidado para não carregar o mundo nas costas."
    },
    7: {
      title: "A Análise (Sabedoria)",
      general: "A planta busca a luz interior. O ritmo externo desacelera para permitir o crescimento espiritual e intelectual. É um período de introspecção.",
      opportunity: "Estudar, especializar-se, meditar e buscar autoconhecimento. A qualidade é mais importante que a quantidade.",
      challenge: "A melancolia e o isolamento frio. Pode haver uma sensação de solidão se não houver conexão espiritual."
    },
    8: {
      title: "A Conquista (Poder)",
      general: "A colheita material. Ano de colher o que foi plantado e gerido nos últimos 7 anos. Foco total em carreira, dinheiro, autoridade e justiça.",
      opportunity: "Expandir negócios, buscar promoções e gerenciar grandes recursos. A eficiência executiva é recompensada.",
      challenge: "O materialismo desmedido e o abuso de poder. Lembre-se que a colheita é justa: você recebe exatamente o que plantou."
    },
    9: {
      title: "A Transição (Finalização)",
      general: "A limpeza do terreno. Ano de encerrar ciclos, desapegar do que não serve mais e fazer um balanço geral. Preparação para o próximo ciclo (Ano 1).",
      opportunity: "Finalizar projetos pendentes, perdoar mágoas antigas e praticar o altruísmo. Doe o que não usa mais.",
      challenge: "O apego ao passado e a vitimização. Resistir às finalizações necessárias só trará sofrimento desnecessário."
    }
  };

  const MONTH_MEANINGS: Record<number, string> = {
    1: "Energia de Liderança. Ótimo para iniciar dietas, projetos ou tomar decisões difíceis que vinha adiando.",
    2: "Energia de Diplomacia. O ritmo cai um pouco. Bom para resolver mal-entendidos e trabalhar em equipe.",
    3: "Energia de Criatividade. Mês favorável para festas, apresentações e para expressar o que sente.",
    4: "Energia de Trabalho. Mês para colocar a contabilidade em dia, consertar coisas em casa e ser pontual.",
    5: "Energia de Mudança. Imprevistos podem acontecer. Seja flexível e aproveite para divulgar seu trabalho.",
    6: "Energia de Afeto. A família pedirá atenção. Mês propício para resolver questões domésticas e cuidar da saúde.",
    7: "Energia de Análise. Você pode se sentir mais reservado. Use o tempo para planejar estrategicamente o futuro.",
    8: "Energia de Negócios. O foco vai para o dinheiro e a carreira. Momento de ser racional e buscar resultados.",
    9: "Energia de Conclusão. Faça uma faxina física e emocional. Evite começar coisas novas importantes agora."
  };

  const DAY_MEANINGS: Record<number, string> = {
    1: "Inicie algo novo. Confie no seu taco.",
    2: "Seja paciente e ouça o outro lado.",
    3: "Comunique-se e divirta-se.",
    4: "Organize, limpe e trabalhe duro.",
    5: "Quebre a rotina e seja ousado.",
    6: "Cuide da família e do seu bem-estar.",
    7: "Reflita, estude e mantenha a calma.",
    8: "Foque nas finanças e na eficiência.",
    9: "Ajude alguém e desapegue do supérfluo."
  };

  const yearInfo = YEAR_DATA[personalYear];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Year Card - Highly Detailed */}
        <div className="md:col-span-3 bg-gradient-to-br from-mystic-800 to-mystic-950 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-mystic-500 opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-10">
            {/* Year Number Column */}
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
               <div className="flex items-center gap-2 mb-3 text-gold-400 text-sm font-bold uppercase tracking-widest">
                 <Sun size={18} /> Ano Pessoal
               </div>
               <div className="flex items-baseline gap-2">
                 <span className="text-8xl font-black text-white tracking-tighter">{personalYear}</span>
                 <span className="text-2xl text-mystic-400 font-light">/ 9</span>
               </div>
               <div className="mt-4 text-xs font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/5 uppercase tracking-wide">
                 Vigente em {currentYear}
               </div>
            </div>
            
            {/* Description Column */}
            <div className="flex-1 lg:border-l lg:border-white/10 lg:pl-10 pt-4 lg:pt-0">
               <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 mb-4">
                 {yearInfo.title}
               </h3>
               <p className="text-mystic-100 leading-relaxed text-lg mb-8 font-light">
                 {yearInfo.general}
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 text-green-300 font-bold mb-2 text-sm uppercase">
                      <Sparkles size={16} /> Oportunidades
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {yearInfo.opportunity}
                    </p>
                 </div>
                 
                 <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 text-red-300 font-bold mb-2 text-sm uppercase">
                      <ShieldAlert size={16} /> Desafios
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {yearInfo.challenge}
                    </p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Month Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden group hover:border-mystic-300 transition-colors">
          <div className="absolute right-0 top-0 w-24 h-24 bg-mystic-50 rounded-bl-full -mr-4 -mt-4 group-hover:bg-mystic-100 transition-colors"></div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs font-bold uppercase tracking-wide">
              <Moon size={14} /> Mês Pessoal
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-gray-800">{personalMonth}</span>
              <div className="text-sm text-gray-500 leading-tight">
                <span className="block font-bold text-gray-700">{today.toLocaleString('pt-BR', { month: 'long' })}</span>
                Vibração mensal
              </div>
            </div>
            <div className="flex-grow">
               <h4 className="text-sm font-bold text-gray-900 mb-2">Foco do Mês:</h4>
               <p className="text-sm text-gray-600 leading-relaxed">
                  {MONTH_MEANINGS[personalMonth]}
               </p>
            </div>
          </div>
        </div>

        {/* Day Card */}
        <div ref={dayCardRef} className="bg-white rounded-xl p-6 shadow-sm border border-gold-200 relative overflow-hidden group">
          {/* Share Button */}
          <button 
            onClick={handleShareDay}
            disabled={isSharing}
            className="no-share-capture absolute top-4 right-4 p-2 bg-white/80 hover:bg-gold-100 text-gold-600 rounded-full shadow-sm border border-gold-200 transition-all z-20 cursor-pointer"
            title="Compartilhar Card"
          >
            {isSharing ? <Loader2 size={16} className="animate-spin text-gold-600" /> : <Share2 size={16} />}
          </button>

          <div className="absolute right-0 top-0 w-20 h-20 bg-gold-50 rounded-bl-full -mr-4 -mt-4"></div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gold-600 text-xs font-bold uppercase tracking-wide">
              <Target size={14} /> Vibração de Hoje
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-gray-800">{personalDay}</span>
              <div className="text-sm text-gray-500 leading-tight">
                <span className="block font-bold text-gray-700">{currentDay}/{currentMonth}</span>
                Foco diário
              </div>
            </div>
            <div className="p-4 bg-gold-50 rounded-lg border border-gold-100 mt-auto">
              <p className="text-sm font-medium text-gold-800 italic text-center">
                "{DAY_MEANINGS[personalDay]}"
              </p>
            </div>
            <div className="mt-4 text-[10px] text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              NumeraSaaS
            </div>
          </div>
        </div>

        {/* Context Info */}
        <div className="md:col-span-1 bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center">
           <div className="flex items-start gap-3">
              <Info className="text-gray-400 mt-1 shrink-0" size={20} />
              <div className="text-sm text-gray-500">
                <p className="mb-2"><strong>Entenda os Ciclos:</strong></p>
                <ul className="list-disc ml-4 space-y-1 text-xs">
                  <li><strong>Ano Pessoal:</strong> O cenário principal do seu ano.</li>
                  <li><strong>Mês Pessoal:</strong> O 'clima' de curto prazo.</li>
                  <li><strong>Dia Pessoal:</strong> A melhor atitude para hoje.</li>
                </ul>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
};

export default TimeCycles;