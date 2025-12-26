import React, { useState, useMemo } from 'react';
import { calculateFullMap, PINNACLE_MEANINGS, CHALLENGE_MEANINGS } from '../utils/numerology';
import { getArcanoInfo } from '../data/arcanos';
import { 
  User, 
  Sparkles, 
  Map, 
  Mountain, 
  AlertOctagon, 
  BarChart2, 
  Feather, 
  Compass,
  Star,
  Shield,
  ArrowRight
} from 'lucide-react';

interface FullNumerologyMapProps {
  fullName: string;
  birthDate: string;
}

type SectionKey = 'triangulo' | 'caminho' | 'ciclos' | 'analise';

const FullNumerologyMap: React.FC<FullNumerologyMapProps> = ({ fullName, birthDate }) => {
  const [activeSection, setActiveSection] = useState<SectionKey>('triangulo');

  const mapData = useMemo(() => {
    return calculateFullMap(fullName, birthDate);
  }, [fullName, birthDate]);

  if (!fullName || !birthDate) {
    return (
      <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-sm">
        <Map className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Mapa Numerológico Completo</h3>
        <p className="text-gray-500 mt-2">Por favor, insira seu Nome Completo e Data de Nascimento no topo da página para gerar o relatório.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeSection) {
      case 'triangulo':
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold uppercase text-xs tracking-wider">
                    <User size={16} /> Motivação
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Alma</h3>
                  <div className="text-5xl font-black text-purple-600 mb-4">{mapData.alma}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Representa o seu "Eu Interior", o que você realmente deseja e o que motiva suas ações mais profundas. É a soma das vogais do seu nome.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold uppercase text-xs tracking-wider">
                    <Feather size={16} /> Impressão
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Aparência</h3>
                  <div className="text-5xl font-black text-blue-600 mb-4">{mapData.aparencia}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Representa a sua personalidade externa, como os outros te veem e a primeira impressão que você causa. É a soma das consoantes.
                  </p>
                </div>

                <div className="bg-gold-50 rounded-xl p-6 border border-gold-100 md:col-span-1 ring-1 ring-gold-200">
                  <div className="flex items-center gap-2 mb-2 text-gold-700 font-bold uppercase text-xs tracking-wider">
                    <Star size={16} /> Missão
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Destino</h3>
                  <div className="text-5xl font-black text-gold-600 mb-4">{mapData.destino}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Representa a sua expressão total no mundo. Seus talentos naturais e o que você veio realizar. É a soma de todo o seu nome.
                  </p>
                </div>
             </div>
             
             <div className="bg-white border border-gray-200 rounded-xl p-6">
               <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <Sparkles size={18} className="text-mystic-500" />
                 Significado do Arcano de Destino ({mapData.destino})
               </h4>
               <p className="text-gray-600 text-sm leading-relaxed">
                 {getArcanoInfo(mapData.destino).descricao}
               </p>
             </div>
          </div>
        );

      case 'caminho':
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                   <div className="flex justify-between items-start">
                     <div>
                       <h3 className="text-lg font-bold text-gray-900">Lição de Vida</h3>
                       <p className="text-xs text-gray-500 mt-1">A estrada que você percorre</p>
                     </div>
                     <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                       {mapData.licaoVida}
                     </div>
                   </div>
                   <div className="mt-4 pt-4 border-t border-gray-100">
                     <p className="text-sm text-gray-600">
                       Calculado a partir da sua data de nascimento, este é o número mais importante do mapa. Ele descreve as oportunidades, desafios e lições que você encontrará ao longo da vida.
                     </p>
                   </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                   <div className="flex justify-between items-start">
                     <div>
                       <h3 className="text-lg font-bold text-gray-900">Dia Natalício</h3>
                       <p className="text-xs text-gray-500 mt-1">Seu talento especial</p>
                     </div>
                     <div className="w-12 h-12 bg-gray-100 text-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold border border-gray-200">
                       {mapData.diaNatalicio}
                     </div>
                   </div>
                   <div className="mt-4 pt-4 border-t border-gray-100">
                     <p className="text-sm text-gray-600">
                       O dia do seu nascimento revela um talento específico ou ferramenta que você possui para auxiliar na sua Lição de Vida.
                     </p>
                   </div>
                </div>
                
                <div className="bg-gradient-to-r from-mystic-800 to-mystic-900 text-white rounded-xl p-8 md:col-span-2 shadow-lg relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="text-center">
                        <div className="text-xs font-bold text-mystic-300 uppercase tracking-widest mb-2">Vibração da Maturidade</div>
                        <div className="text-6xl font-black text-gold-400">{mapData.numeroPoderoso}</div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">Número Poderoso</h3>
                        <p className="text-mystic-100 leading-relaxed">
                           A soma do Destino e da Lição de Vida. Esta vibração torna-se mais ativa na segunda metade da vida (geralmente após os 40 anos), representando o objetivo final da sua existência e o legado que você deixará.
                        </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'ciclos':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Pináculos Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mountain size={20} className="text-green-600" />
                Pináculos (Ciclos de Realização)
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Os Pináculos representam quatro períodos distintos de desenvolvimento e oportunidade em sua vida.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { l: '1º Pináculo', v: mapData.pinaculos.p1, d: 'Juventude (0-28 anos aprox.)' },
                  { l: '2º Pináculo', v: mapData.pinaculos.p2, d: 'Maturidade (28-37 anos aprox.)' },
                  { l: '3º Pináculo', v: mapData.pinaculos.p3, d: 'Meia Idade (37-46 anos aprox.)' },
                  { l: '4º Pináculo', v: mapData.pinaculos.p4, d: 'Sabedoria (46+ anos)' },
                ].map((p, idx) => (
                  <div key={idx} className="bg-green-50 rounded-xl p-5 border border-green-100 transition-colors hover:bg-green-100/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="block text-xs font-bold text-green-700 uppercase tracking-wide">{p.l}</span>
                        <span className="text-[10px] text-green-600 font-medium">{p.d}</span>
                      </div>
                      <span className="block text-3xl font-black text-green-800 bg-white w-12 h-12 flex items-center justify-center rounded-lg shadow-sm">{p.v}</span>
                    </div>
                    <p className="text-sm text-green-900 leading-relaxed border-t border-green-200 pt-3">
                      {PINNACLE_MEANINGS[p.v] || "Período de grandes oportunidades."}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desafios Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertOctagon size={20} className="text-rose-600" />
                Desafios (Lições a Superar)
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Os Desafios mostram os obstáculos específicos que você escolheu enfrentar para evoluir.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                   { l: '1º Desafio', v: mapData.desafios.c1, t: 'Primeira Etapa' },
                   { l: '2º Desafio', v: mapData.desafios.c2, t: 'Segunda Etapa' },
                   { l: 'Desafio Maior', v: mapData.desafios.main, t: 'Vida Toda', main: true }
                ].map((c, idx) => (
                   <div key={idx} className={`rounded-xl p-5 border transition-colors hover:shadow-sm ${c.main ? 'bg-white border-rose-300 shadow-sm ring-1 ring-rose-100' : 'bg-rose-50 border-rose-100'}`}>
                      <div className="flex items-center justify-between mb-3">
                         <div>
                            <span className="block text-xs font-bold text-rose-700 uppercase tracking-wide">{c.l}</span>
                            <span className="text-[10px] text-rose-600 font-medium">{c.t}</span>
                         </div>
                         <span className={`block text-3xl font-black flex items-center justify-center rounded-lg w-12 h-12 shadow-sm ${c.main ? 'bg-rose-600 text-white' : 'bg-white text-rose-800'}`}>
                            {c.v}
                         </span>
                      </div>
                      <p className={`text-sm leading-relaxed border-t pt-3 ${c.main ? 'text-gray-700 border-rose-200' : 'text-rose-900 border-rose-200'}`}>
                         {CHALLENGE_MEANINGS[c.v] || "Desafio de crescimento intenso."}
                      </p>
                   </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analise':
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart2 size={20} className="text-gray-500" />
                  Frequência Numérica do Nome
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  A contagem de quantas vezes cada número aparece no seu nome revela excessos (potenciais talentos ou exageros) e ausências (lições cármicas ou aprendizados necessários).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Ausências */}
                   <div>
                     <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                       <Shield size={14} /> Lições Cármicas (Ausências)
                     </h4>
                     {mapData.ausencias.length > 0 ? (
                       <div className="space-y-2">
                         {mapData.ausencias.map(num => (
                           <div key={num} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                             <span className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 font-bold rounded">
                               {num}
                             </span>
                             <span className="text-sm text-gray-600">
                               Falta a energia do {num}. É necessário desenvolvê-la conscientemente.
                             </span>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <div className="p-4 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100">
                         Seu nome contém todos os números de 1 a 9! Você é uma "Alma Velha" com ferramentas completas.
                       </div>
                     )}
                   </div>

                   {/* Excessos */}
                   <div>
                     <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                       <Sparkles size={14} /> Talentos Intensos (Excessos)
                     </h4>
                     {mapData.excessos.length > 0 ? (
                       <div className="space-y-2">
                         {mapData.excessos.map(item => (
                           <div key={item.number} className="flex items-center gap-3 bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                             <span className="w-8 h-8 flex items-center justify-center bg-indigo-200 text-indigo-800 font-bold rounded">
                               {item.number}
                             </span>
                             <div className="flex-1">
                               <div className="h-2 bg-indigo-100 rounded-full mt-1 overflow-hidden">
                                 <div className="h-full bg-indigo-400" style={{ width: `${Math.min(item.count * 20, 100)}%` }}></div>
                               </div>
                             </div>
                             <span className="text-xs font-bold text-indigo-600">
                               {item.count}x
                             </span>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <div className="text-sm text-gray-500 italic">
                         Nenhum número aparece em excesso exagerado (3+ vezes).
                       </div>
                     )}
                   </div>
                </div>
             </div>
          </div>
        );
    }
  };

  const menuItems: { id: SectionKey, label: string, icon: React.ElementType }[] = [
    { id: 'triangulo', label: 'Triângulo da Vida', icon: User },
    { id: 'caminho', label: 'Seu Caminho', icon: Compass },
    { id: 'ciclos', label: 'Ciclos Maiores', icon: Mountain },
    { id: 'analise', label: 'Análise do Nome', icon: BarChart2 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Navigation - Responsive */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky lg:top-24">
          <div className="hidden lg:block p-4 bg-gray-50 border-b border-gray-200">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estudos</h4>
          </div>
          
          {/* Navigation Container */}
          <nav className="flex lg:flex-col overflow-x-auto p-2 space-x-2 lg:space-x-0 lg:space-y-1 hide-scrollbar">
            {menuItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex-shrink-0 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeSection === item.id ? 'bg-mystic-100 text-mystic-800' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default FullNumerologyMap;