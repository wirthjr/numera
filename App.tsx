import React, { useState, useEffect } from 'react';
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

  const getBaseNumber = (): number | null => {
    if (calculatedLayers.length === 0) return null;
    const lastLayer = calculatedLayers[calculatedLayers.length - 1];
    return lastLayer.length > 0 ? lastLayer[0] : null;
  };

  const baseNumber = getBaseNumber();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 md:pb-0">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Estúdio Numerológico</h1>
            <p className="text-gray-500 mt-1">Análise profissional de vibrações e ciclos.</p>
          </div>
          {/* Global Date Input for User Convenience */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
             {activeTab === CalculationTab.PYRAMID && (
               <div className="text-xs text-gray-400 px-2 italic hidden sm:block">
                 Para ciclos e mapa completo, insira a data:
               </div>
             )}
              <label className="text-xs font-bold text-gray-500 uppercase px-2">Sua Data de Nascimento:</label>
              <input 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="text-sm border-gray-300 rounded-md focus:ring-mystic-500 focus:border-mystic-500"
              />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Mobile Tabs */}
          <div className="lg:col-span-3">
             <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
                <button 
                  onClick={() => setActiveTab(CalculationTab.PYRAMID)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === CalculationTab.PYRAMID ? 'bg-mystic-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Triangle size={18} className={activeTab === CalculationTab.PYRAMID ? "fill-current" : ""} />
                  Pirâmide Pitagórica
                </button>
                <button 
                  onClick={() => setActiveTab(CalculationTab.FULL_MAP)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === CalculationTab.FULL_MAP ? 'bg-mystic-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Map size={18} />
                  Mapa Completo
                </button>
                <button 
                  onClick={() => setActiveTab(CalculationTab.CHART)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === CalculationTab.CHART ? 'bg-mystic-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Calendar size={18} />
                  Ciclos de Tempo
                </button>
                <button 
                  onClick={() => setActiveTab(CalculationTab.BIO_RHYTHM)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === CalculationTab.BIO_RHYTHM ? 'bg-mystic-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Activity size={18} />
                  Bio-Ritmo
                </button>
                <button 
                  onClick={() => setActiveTab(CalculationTab.SINASTRIA)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === CalculationTab.SINASTRIA ? 'bg-mystic-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Heart size={18} />
                  Sinastria
                </button>
                <button 
                  onClick={() => setActiveTab(CalculationTab.SETTINGS)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === CalculationTab.SETTINGS ? 'bg-mystic-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Settings size={18} />
                  Configurações
                </button>
             </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {activeTab === CalculationTab.PYRAMID && (
              <>
                {/* Input Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo (Conforme Certidão)</label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="Ex: Ana Maria Silva"
                      className="flex-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-mystic-500 focus:ring-mystic-500 sm:text-sm p-3 border"
                      onKeyDown={(e) => e.key === 'Enter' && handleCalculatePyramid()}
                    />
                    <button 
                      onClick={handleCalculatePyramid}
                      className="bg-mystic-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-mystic-700 transition-colors flex items-center gap-2"
                    >
                      <Search size={18} />
                      <span className="hidden sm:inline">Analisar</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">A análise utiliza a tabela pitagórica (A=1, B=2...) e redução a 9.</p>
                </div>

                {/* Results Area */}
                {calculatedLayers.length > 0 && (
                  <div className="animate-fade-in space-y-6">
                    
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                   <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
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
    </div>
  );
};

export default App;