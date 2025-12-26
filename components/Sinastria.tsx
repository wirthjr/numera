import React, { useState } from 'react';
import { calculateLifePath, calculateCompatibility } from '../utils/numerology';
import { Heart, UserPlus, Sparkles, ArrowRight } from 'lucide-react';

const Sinastria: React.FC = () => {
  const [p1Name, setP1Name] = useState('');
  const [p1Date, setP1Date] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [p2Date, setP2Date] = useState('');
  
  const [result, setResult] = useState<{score: number, description: string, lp1: number, lp2: number} | null>(null);

  const handleCompare = () => {
    if (!p1Date || !p2Date) return;
    
    const lp1 = calculateLifePath(p1Date);
    const lp2 = calculateLifePath(p2Date);
    const comp = calculateCompatibility(lp1, lp2);
    
    setResult({
      ...comp,
      lp1,
      lp2
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Heart className="text-rose-500 fill-current" />
          Sinastria de Almas
        </h2>
        <p className="text-gray-500 mt-2">
          Descubra a compatibilidade vibracional entre dois caminhos de destino.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
        {/* Person 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
            <UserPlus size={16} className="text-mystic-600" /> Pessoa A
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nome</label>
              <input 
                type="text" 
                value={p1Name}
                onChange={e => setP1Name(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mystic-500 focus:ring-mystic-500 text-sm p-2 border"
                placeholder="Nome da pessoa"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Data de Nascimento</label>
              <input 
                type="date" 
                value={p1Date}
                onChange={e => setP1Date(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mystic-500 focus:ring-mystic-500 text-sm p-2 border"
              />
            </div>
          </div>
        </div>

        {/* Vs Badge (Absolute center on desktop, static on mobile) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex z-10">
          <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-50 flex items-center justify-center shadow-lg text-gray-400 font-bold text-xs">
            VS
          </div>
        </div>

        {/* Person 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
            <UserPlus size={16} className="text-rose-500" /> Pessoa B
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nome</label>
              <input 
                type="text" 
                value={p2Name}
                onChange={e => setP2Name(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-sm p-2 border"
                placeholder="Nome do parceiro(a)"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Data de Nascimento</label>
              <input 
                type="date" 
                value={p2Date}
                onChange={e => setP2Date(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-sm p-2 border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleCompare}
          disabled={!p1Date || !p2Date}
          className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Sparkles size={18} />
          Calcular Compatibilidade
        </button>
      </div>

      {result && (
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-8 border border-rose-200 relative overflow-hidden">
          <div className="relative z-10 text-center">
             <div className="flex justify-center items-center gap-8 mb-6 text-gray-800 font-serif">
                <div className="text-center">
                  <span className="block text-4xl font-bold">{result.lp1}</span>
                  <span className="text-xs uppercase tracking-wider opacity-60">Destino A</span>
                </div>
                <ArrowRight className="text-rose-400" />
                <div className="text-center">
                  <span className="block text-4xl font-bold">{result.lp2}</span>
                  <span className="text-xs uppercase tracking-wider opacity-60">Destino B</span>
                </div>
             </div>

             <div className="mb-4">
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold shadow-sm ${result.score >= 80 ? 'bg-green-100 text-green-700' : result.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {result.score}% de Compatibilidade
                </span>
             </div>
             
             <h3 className="text-xl font-bold text-gray-900 mb-2">
               {result.description}
             </h3>
             <p className="text-gray-600 max-w-lg mx-auto text-sm">
               A combinação dos números de Destino ({result.lp1} e {result.lp2}) revela a dinâmica energética natural entre vocês.
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sinastria;