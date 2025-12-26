import React from 'react';
import { User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-mystic-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Numera<span className="text-mystic-600">SaaS</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden md:block px-4 py-2 text-sm font-medium text-mystic-600 bg-mystic-50 rounded-full hover:bg-mystic-100 transition-colors">
              Upgrade Pro
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-300 transition">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;