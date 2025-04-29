
import React from 'react';

interface ProgressBarProps {
  total: number;
  purchased: number;
}

const ProgressBar = ({ total, purchased }: ProgressBarProps) => {
  const percentage = total > 0 ? Math.floor((purchased / total) * 100) : 0;

  return (
    <div className="bg-green-800 rounded-lg p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">Progresso da Lista</h2>
          <p className="text-sm opacity-90">Acompanhe o progresso da sua lista de itens para casa</p>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <div className="flex gap-1 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-todo">
                <rect x="3" y="5" width="6" height="6" rx="1" />
                <path d="m3 17 2 2 4-4" />
                <path d="M13 6h8" />
                <path d="M13 12h8" />
                <path d="M13 18h8" />
              </svg>
              <span className="font-medium">{total}</span>
            </div>
            <span className="text-xs">Total</span>
          </div>
          <div className="text-center">
            <div className="flex gap-1 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <span className="font-medium">{purchased}</span>
            </div>
            <span className="text-xs">Comprados</span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-2 bg-green-900/50 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-white rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-end mt-2">
        <div className="relative bg-white/20 px-4 py-1 rounded-full">
          <span className="text-sm font-medium">{percentage}%</span>
          <span className="text-xs block text-center">Concluído</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
