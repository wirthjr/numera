import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { calculatePersonalYear, getCyclePhase } from '../utils/numerology';
import { CycleData } from '../types';

interface BioRhythmChartProps {
  birthDate: string;
}

const BioRhythmChart: React.FC<BioRhythmChartProps> = ({ birthDate }) => {
  const data = useMemo(() => {
    if (!birthDate) return [];
    
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3;
    const endYear = currentYear + 6; // Show a 10 year span roughly
    
    const chartData: CycleData[] = [];
    
    for (let y = startYear; y <= endYear; y++) {
      const py = calculatePersonalYear(birthDate, y);
      const info = getCyclePhase(py);
      chartData.push({
        year: y,
        personalYear: py,
        phase: info.phase,
        description: info.description
      });
    }
    return chartData;
  }, [birthDate]);

  if (!birthDate) return (
    <div className="text-center p-8 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
      Insira sua data de nascimento para gerar o gráfico de Bio-Ritmo.
    </div>
  );

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Seu Ciclo de 9 Anos</h3>
      <p className="text-sm text-gray-500 mb-6">
        Visualize seus anos de Plantio (1-3), Gestão (4-6) e Colheita (7-9).
      </p>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
            <YAxis domain={[1, 9]} hide />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: number, name: string, props: any) => [
                `Ano Pessoal ${value}`, 
                props.payload.phase
              ]}
              labelStyle={{ color: '#4b5563', fontWeight: 'bold' }}
            />
            <ReferenceLine x={currentYear} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'top', value: 'Hoje', fill: '#f59e0b', fontSize: 10 }} />
            <Area 
              type="monotone" 
              dataKey="personalYear" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPy)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-center text-gray-500">
        <div className="flex flex-col items-center">
          <span className="w-3 h-3 rounded-full bg-mystic-300 mb-1"></span>
          Plantio (1-3)
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3 h-3 rounded-full bg-mystic-500 mb-1"></span>
          Gestão (4-6)
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3 h-3 rounded-full bg-mystic-700 mb-1"></span>
          Colheita (7-9)
        </div>
      </div>
    </div>
  );
};

export default BioRhythmChart;