import React, { useState, useMemo } from 'react';
import { getArcanoInfo } from '../data/arcanos';
import { Share2, Check, Clock, Crown, ArrowRight } from 'lucide-react';
import { NegativeSequence } from '../types';
import { calculateLifeCycles } from '../utils/numerology';

interface PyramidVisualizerProps {
  layers: number[][];
  originalName: string;
  negativeSequences: NegativeSequence[];
}

const PyramidVisualizer: React.FC<PyramidVisualizerProps> = ({ layers, originalName, negativeSequences }) => {
  const [copied, setCopied] = useState(false);
  const cleanName = originalName.replace(/[^a-zA-Z\s]/g, '').toUpperCase().replace(/\s+/g, '');
  
  // Calculate Life Cycles (0-90 years)
  const lifeCycles = useMemo(() => calculateLifeCycles(originalName), [originalName]);

  if (layers.length === 0) return null;

  const handleShare = async () => {
    // Construct URL with query parameter
    const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(originalName)}`;
    const shareData = {
      title: 'NumeraSaaS - Minha Pirâmide',
      text: `Confira a análise numerológica de ${originalName}!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Helper to check if a number at layer/index is part of a negative sequence
  const isNegativeSequence = (layerIdx: number, numIdx: number): boolean => {
    return negativeSequences.some(seq => 
      seq.layerIndex === layerIdx && 
      numIdx >= seq.startIndex && 
      numIdx < seq.startIndex + seq.length
    );
  };

  return (
    <div className="relative w-full space-y-8">
      
      {/* 1. Pyramid Visualization Section */}
      <div className="relative">
        {/* Share Button absolute positioned */}
        <div className="absolute top-0 right-0 z-10">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-medium transition-colors border border-gray-200"
            title="Compartilhar análise"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-600" />
                <span className="text-green-600">Copiado!</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>Compartilhar</span>
              </>
            )}
          </button>
        </div>

        {/* Container with scroll capability and padding for tooltips */}
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-inner border border-mystic-200 overflow-x-auto min-h-[300px]">
          <div className="min-w-fit flex flex-col items-center space-y-1 pt-12"> {/* pt-12 allows space for top row tooltips inside the scroll area */}
            
            {/* Cycle Age Markers (Above Letters) */}
            <div className="flex space-x-1 mb-1">
              {cleanName.split('').map((_, idx) => (
                <div 
                  key={`age-${idx}`}
                  className="w-8 md:w-10 text-[10px] md:text-xs text-gray-400 font-medium text-center"
                >
                  {(idx + 1) * 9}
                </div>
              ))}
            </div>

            {/* Render Original Letters */}
            <div className="flex space-x-1 mb-2">
              {cleanName.split('').map((char, idx) => (
                <div 
                  key={`char-${idx}`}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-100 text-gray-700 font-bold rounded shadow-sm border border-gray-200 text-sm md:text-base cursor-default select-none"
                >
                  {char}
                </div>
              ))}
            </div>

            {/* Render Pyramid Layers */}
            {layers.map((layer, layerIdx) => (
              <div key={`layer-${layerIdx}`} className="flex space-x-1">
                {layer.map((num, numIdx) => {
                  const isBase = layer.length === 1;
                  const isNegative = isNegativeSequence(layerIdx, numIdx);
                  
                  // Styling logic
                  let bgColor = '';
                  let borderColor = '';
                  let textColor = '';

                  if (isNegative) {
                    bgColor = 'bg-red-50 ring-2 ring-red-500 ring-offset-1 z-10';
                    textColor = 'text-red-600';
                    borderColor = 'border-red-200';
                  } else if (isBase) {
                    bgColor = 'bg-gold-500';
                    textColor = 'text-white';
                    borderColor = 'border-gold-600';
                  } else if (layerIdx === 0) {
                    bgColor = 'bg-mystic-100';
                    textColor = 'text-mystic-800';
                    borderColor = 'border-mystic-200';
                  } else {
                    bgColor = 'bg-mystic-500';
                    textColor = 'text-white';
                    borderColor = 'border-mystic-600';
                  }
                  
                  const arcano = getArcanoInfo(num);

                  return (
                    <div 
                      key={`num-${layerIdx}-${numIdx}`}
                      className={`group relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold rounded shadow-sm border ${bgColor} ${textColor} ${borderColor} text-sm md:text-base transition-all hover:scale-110 hover:z-20 cursor-help`}
                    >
                      {num}
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                        <div className="font-bold text-gold-400 mb-1 border-b border-gray-700 pb-1">{arcano.numero} - {arcano.nome}</div>
                        {isNegative && (
                          <div className="mb-2 text-red-300 font-bold text-[10px] uppercase border border-red-900/50 bg-red-900/20 p-1 rounded">
                            Parte de Sequência Negativa
                          </div>
                        )}
                        <div className="mb-1 text-gray-300">
                          <span className="font-semibold text-gray-400">Arcanjo:</span> {arcano.arcanjo}
                        </div>
                        <div className="text-gray-300 leading-tight">
                          <span className="font-semibold text-gray-400">Atributo:</span> {arcano.atributo}
                        </div>
                        
                        {/* Triangle/Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-gray-400 mt-2">
          <span>Passe o mouse sobre os números para ver os Arcanos.</span>
          {negativeSequences.length > 0 && (
            <span className="flex items-center gap-1 text-red-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
              Sequências Negativas Detectadas
            </span>
          )}
        </div>
      </div>

      {/* 2. Life Cycles Section */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="text-mystic-600" size={20} />
          <h3 className="text-lg font-bold text-gray-900">Ciclos de Vida (9 Anos)</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {lifeCycles.map((cycle, idx) => {
            const arcano = getArcanoInfo(cycle.rulerNumber);
            return (
              <div key={`cycle-${idx}`} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col hover:border-mystic-300 transition-colors">
                
                {/* Header: Cycle & Arcano Side-by-Side */}
                <div className="flex justify-between items-start border-b border-gray-50 pb-2 mb-2">
                  <div className="text-left">
                    <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Ciclo {cycle.cycleIndex}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{cycle.startAge} - {cycle.endAge} anos</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-xs font-bold text-mystic-700">
                      <Crown size={12} className="text-gold-500" />
                      <span>{arcano.nome}</span>
                    </div>
                    <div className="text-[10px] text-gray-500">Arcanjo {arcano.arcanjo}</div>
                  </div>
                </div>
                
                {/* Body: Regentes */}
                <div className="flex items-center justify-center gap-3 mb-3 bg-gray-50 rounded py-2">
                   <div className="flex flex-col items-center">
                     <span className="text-[9px] text-gray-400 uppercase font-bold">Letra</span>
                     <div className="w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs">
                       {cycle.rulerChar}
                     </div>
                   </div>
                   <ArrowRight size={12} className="text-gray-300" />
                   <div className="flex flex-col items-center">
                     <span className="text-[9px] text-gray-400 uppercase font-bold">Num</span>
                     <div className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold text-xs">
                       {cycle.rulerNumber}
                     </div>
                   </div>
                </div>

                <p className="text-[10px] text-gray-500 leading-tight text-center mt-auto">
                  {cycle.meaning}
                </p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4 italic">
          * Os números acima das letras na pirâmide indicam a idade de término de cada ciclo.
        </p>
      </div>

    </div>
  );
};

export default PyramidVisualizer;