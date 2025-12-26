import React, { useState, useMemo } from 'react';
import { getArcanoInfo } from '../data/arcanos';
import { Share2, Check } from 'lucide-react';
import { NegativeSequence } from '../types';
import { calculateLifeCycles } from '../utils/numerology';

interface PyramidVisualizerProps {
  layers: number[][];
  originalName: string;
  negativeSequences: NegativeSequence[];
}

// Distinct colors for up to 10 cycles (repeats if name is longer)
const CYCLE_PALETTE = [
  { name: 'Blue', bg: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-800', light: 'bg-blue-50', ring: 'focus:ring-blue-500' },
  { name: 'Emerald', bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-800', light: 'bg-emerald-50', ring: 'focus:ring-emerald-500' },
  { name: 'Amber', bg: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-800', light: 'bg-amber-50', ring: 'focus:ring-amber-500' },
  { name: 'Rose', bg: 'bg-rose-100', border: 'border-rose-200', text: 'text-rose-800', light: 'bg-rose-50', ring: 'focus:ring-rose-500' },
  { name: 'Violet', bg: 'bg-violet-100', border: 'border-violet-200', text: 'text-violet-800', light: 'bg-violet-50', ring: 'focus:ring-violet-500' },
  { name: 'Cyan', bg: 'bg-cyan-100', border: 'border-cyan-200', text: 'text-cyan-800', light: 'bg-cyan-50', ring: 'focus:ring-cyan-500' },
  { name: 'Fuchsia', bg: 'bg-fuchsia-100', border: 'border-fuchsia-200', text: 'text-fuchsia-800', light: 'bg-fuchsia-50', ring: 'focus:ring-fuchsia-500' },
  { name: 'Lime', bg: 'bg-lime-100', border: 'border-lime-200', text: 'text-lime-800', light: 'bg-lime-50', ring: 'focus:ring-lime-500' },
  { name: 'Indigo', bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-800', light: 'bg-indigo-50', ring: 'focus:ring-indigo-500' },
  { name: 'Orange', bg: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-800', light: 'bg-orange-50', ring: 'focus:ring-orange-500' },
];

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
              {cleanName.split('').map((_, idx) => {
                const colorTheme = CYCLE_PALETTE[idx % CYCLE_PALETTE.length];
                return (
                  <div 
                    key={`age-${idx}`}
                    className={`w-8 md:w-10 text-[10px] md:text-xs font-bold text-center ${colorTheme.text}`}
                  >
                    {(idx + 1) * 9}
                  </div>
                );
              })}
            </div>

            {/* Render Original Letters (Colored by Cycle) */}
            <div className="flex space-x-1 mb-2">
              {cleanName.split('').map((char, idx) => {
                const colorTheme = CYCLE_PALETTE[idx % CYCLE_PALETTE.length];
                return (
                  <div 
                    key={`char-${idx}`}
                    className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold rounded shadow-sm border text-sm md:text-base cursor-default select-none ${colorTheme.bg} ${colorTheme.text} ${colorTheme.border}`}
                  >
                    {char}
                  </div>
                );
              })}
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
                    // Top Layer matches the cycle colors of the letters above
                    const colorTheme = CYCLE_PALETTE[numIdx % CYCLE_PALETTE.length];
                    bgColor = colorTheme.light; // Lighter background for numbers
                    textColor = colorTheme.text;
                    borderColor = colorTheme.border;
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
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
       {/* 2. Cycle Information Section */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lifeCycles.map((cycle) => (
          <div key={cycle.cycleIndex} className={`p-4 rounded-xl border ${CYCLE_PALETTE[(cycle.cycleIndex - 1) % CYCLE_PALETTE.length].bg} ${CYCLE_PALETTE[(cycle.cycleIndex - 1) % CYCLE_PALETTE.length].border}`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold px-2 py-1 rounded bg-white/50 ${CYCLE_PALETTE[(cycle.cycleIndex - 1) % CYCLE_PALETTE.length].text}`}>
                {cycle.startAge} - {cycle.endAge} anos
              </span>
              <span className={`text-2xl font-bold ${CYCLE_PALETTE[(cycle.cycleIndex - 1) % CYCLE_PALETTE.length].text}`}>
                {cycle.rulerNumber}
              </span>
            </div>
            <h4 className={`font-bold mb-1 ${CYCLE_PALETTE[(cycle.cycleIndex - 1) % CYCLE_PALETTE.length].text}`}>Ciclo {cycle.cycleIndex}</h4>
            <p className="text-xs text-gray-700">{cycle.meaning}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PyramidVisualizer;
