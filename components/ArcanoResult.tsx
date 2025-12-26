import React from 'react';
import { getArcanoInfo } from '../data/arcanos';
import { Sparkles, Crown, Feather } from 'lucide-react';

interface ArcanoResultProps {
  baseNumber: number;
}

const ArcanoResult: React.FC<ArcanoResultProps> = ({ baseNumber }) => {
  const arcanoData = getArcanoInfo(baseNumber);

  return (
    <div className="mt-8 bg-gradient-to-br from-mystic-700 to-mystic-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gold-400 opacity-20 rounded-full blur-xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 text-mystic-200 text-sm font-semibold uppercase tracking-wider">
          <Sparkles size={16} />
          <span>Sua Vibração Dominante</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          
          {/* Number Badge */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-gold-400 flex items-center justify-center backdrop-blur-sm">
              <span className="text-5xl font-bold text-gold-400 font-serif">{arcanoData.numero}</span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">{arcanoData.nome}</h3>
            <div className="flex items-center gap-2 text-gold-300 mb-3 font-medium">
              <Crown size={18} />
              <span>Regido por: Arcanjo {arcanoData.arcanjo}</span>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
               <div className="flex items-start gap-3">
                  <Feather className="mt-1 text-mystic-300 shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-mystic-200 mb-1">Atributo: {arcanoData.atributo}</h4>
                    <p className="text-sm leading-relaxed text-gray-100">
                      {arcanoData.descricao}
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcanoResult;