import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import PyramidVisualizer from './components/PyramidVisualizer';
import ArcanoResult from './components/ArcanoResult';
import TimeCycles from './components/TimeCycles';
import BioRhythmChart from './components/BioRhythmChart';
import Sinastria from './components/Sinastria';
import FullNumerologyMap from './components/FullNumerologyMap';
import { generatePyramid, findNegativeSequences } from './utils/numerology';
import { CalculationTab, NegativeSequence } from './types';
import { Triangle, Activity, Calendar, Settings, Search, Heart, AlertTriangle, Map } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculationTab>(CalculationTab.PYRAMID);
  
  // Data State
  const [inputName, setInputName] = useState('');
  const [birthDate, setBirthDate] = useState(''); // Shared birth date state for ease of use across tabs
  
  // Pyramid State
  const [calculatedLayers, setCalculatedLayers] = useState<number[][]>([]);
  const [calculatedName, setCalculatedName] = useState('');
  const [negativeSequences, setNegativeSequences] = useState<NegativeSequence[]>([]);

  // Refs for auto-scrolling nav
  const navRef = useRef<HTMLElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const handleCalculatePyramid = () => {
    if (!inputName.trim()) return;
    const layers = generatePyramid(inputName);
    const sequences = findNegativeSequences(layers);
    
    setCalculatedLayers(layers);
    setCalculatedName(inputName);
    setNegativeSequences(sequences);
  };

  // Handle shared URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedName = params.get('name');
    if (sharedName) {
      setInputName(sharedName);
      const layers = generatePyramid(sharedName);
      const sequences = findNegativeSequences(layers);
      
      setCalculatedLayers(layers);
      setCalculatedName(sharedName);
      setNegativeSequences(sequences);
      setActiveTab(CalculationTab.PYRAMID);
    }
  }, []);

  // Auto-scroll mobile nav to active item
  useEffect(() => {
    if (activeTabRef.current && navRef.current) {
      const nav = navRef.current;
      const active = activeTabRef.current;
      
      const navWidth = nav.offsetWidth;
      const activeLeft = active.offsetLeft;
      const activeWidth = active.offsetWidth;
      
      // Center the active item
      nav.scrollTo({
        left: activeLeft - (navWidth / 2) + (activeWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  const getBaseNumber = (): number | null => {
    if (calculatedLayers.length === 0) return null;
    const lastLayer = calculatedLayers[calculatedLayers.length - 1];
    return lastLayer.length > 0 ? lastLayer[0] : null;
  };

  const baseNumber = getBaseNumber();

  const navItems = [
    { id: CalculationTab.PYRAMID, label: 'Pirâmide', icon: Triangle },
    { id: CalculationTab.FULL_MAP, label: 'Mapa', icon: Map },
    { id: CalculationTab.CHART, label: 'Ciclos', icon: Calendar },
    { id: CalculationTab.BIO_RHYTHM, label: 'Bio', icon: Activity },
    { id: CalculationTab.SINASTRIA, label: 'Sinastria', icon: Heart },
    { id: CalculationTab.SETTINGS, label: 'Config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-28 lg:pb-10">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Page Title & Global Input */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Estúdio Numerológico</h1>
            <p className="text-sm text-gray-500 mt-1">Análise profissional de vibrações e ciclos.</p>
          </div>
          {/* Global Date Input */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
             {activeTab === CalculationTab.PYRAMID && (
               <div className="text-xs text-gray-400 px-2 italic hidden sm:block">
                 Para ciclos e mapa completo, insira a data:
               </div>
             )}
              <label className="text-xs font-bold text-gray-500 uppercase px-2 sm:hidden">Data de Nascimento:</label>
              <input 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full sm:w-auto text-sm border-gray-300 rounded-md focus:ring-mystic-500 focus:border-mystic-500"
              />
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar (Hidden on Mobile) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
             <nav className="space-y-2 sticky top-24">
                {navItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? 'bg-mystic-600 text-white shadow-md transform scale-[1.02]' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  >
                    <item.icon size={18} className={activeTab === CalculationTab.PYRAMID && item.id === CalculationTab.PYRAMID ? "fill-current" : ""} />
                    {item.label}
                  </button>
                ))}
             </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6 min-w-0">
            
            {activeTab === CalculationTab.PYRAMID && (
              <>
                {/* Input Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo (Conforme Certidão)</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="Ex: Ana Maria Silva"
                      className="flex-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-mystic-500 focus:ring-mystic-500 text-base p-3 border"
                      onKeyDown={(e) => e.key === 'Enter' && handleCalculatePyramid()}
                    />
                    <button 
                      onClick={handleCalculatePyramid}
                      className="bg-mystic-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-mystic-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Search size={18} />
                      <span>Analisar</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">A análise utiliza a tabela pitagórica (A=1, B=2...) e redução a 9.</p>
                </div>

                {/* Results Area */}
                {calculatedLayers.length > 0 && (
                  <div className="animate-fade-in space-y-6">
                    
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                      <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Triangle className="text-mystic-600 fill-current rotate-180" size={20} />
                        Pirâmide Invertida
                      </h2>
                      <PyramidVisualizer 
                        layers={calculatedLayers} 
                        originalName={calculatedName} 
                        negativeSequences={negativeSequences}
                      />
                    </div>
                    
                    {/* Negative Sequences Alert Section */}
                    {negativeSequences.length > 0 && (
                      <div className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="text-red-500" size={24} />
                          <h3 className="text-lg font-bold text-red-900">Sequências Negativas Detectadas</h3>
                        </div>
                        <p className="text-sm text-red-700 mb-4">
                          Foram identificadas repetições numéricas na sua pirâmide. Na numerologia, isso indica bloqueios ou desafios que precisam de atenção consciente.
                        </p>
                        <div className="space-y-3">
                          {negativeSequences.map((seq, idx) => (
                            <div key={`seq-${idx}`} className="bg-white p-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-900 text-lg tracking-widest">
                                  {Array(3).fill(seq.number).join('')}...
                                </span>
                                <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                  Camada {seq.layerIndex + 1}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {seq.meaning}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {baseNumber !== null && (
                      <ArcanoResult baseNumber={baseNumber} />
                    )}

                  </div>
                )}
                 
                 {calculatedLayers.length === 0 && (
                   <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-white/50">
                      <Triangle className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma análise gerada</h3>
                      <p className="mt-1 text-sm text-gray-500">Digite um nome acima para gerar a Pirâmide Pitagórica.</p>
                   </div>
                 )}
              </>
            )}

            {activeTab === CalculationTab.FULL_MAP && (
              <FullNumerologyMap 
                fullName={inputName || calculatedName} 
                birthDate={birthDate} 
              />
            )}

            {activeTab === CalculationTab.CHART && (
              <TimeCycles birthDate={birthDate} />
            )}

            {activeTab === CalculationTab.BIO_RHYTHM && (
              <BioRhythmChart birthDate={birthDate} />
            )}

            {activeTab === CalculationTab.SINASTRIA && (
               <Sinastria />
            )}

            {activeTab === CalculationTab.SETTINGS && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                 <p className="text-gray-500">Configurações de conta e assinatura (Em Breve).</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation (Fixed Footer) */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <nav 
          ref={navRef}
          className="flex items-center gap-1 px-2 py-2 overflow-x-auto hide-scrollbar"
        >
           {navItems.map(item => (
              <button 
                key={item.id}
                ref={activeTab === item.id ? activeTabRef : null}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center min-w-[4.5rem] flex-shrink-0 px-1 py-1 rounded-lg transition-all active:scale-95 ${activeTab === item.id ? 'text-mystic-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className={`p-1.5 rounded-full mb-1 transition-colors ${activeTab === item.id ? 'bg-mystic-100' : 'bg-transparent'}`}>
                   <item.icon size={22} className={activeTab === CalculationTab.PYRAMID && item.id === CalculationTab.PYRAMID ? "fill-current" : ""} />
                </div>
                <span className={`text-[10px] font-medium truncate max-w-full ${activeTab === item.id ? 'font-bold' : ''}`}>{item.label}</span>
              </button>
           ))}
        </nav>
      </div>

    </div>
  );
};

export default App;