
import React from 'react';
import { Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-green-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Home className="h-5 w-5" />
        <h1 className="text-xl font-semibold">Lista de Itens para Casa</h1>
      </div>
      <div>
        <button className="text-sm hover:underline">
          Organize seu novo lar
        </button>
      </div>
    </header>
  );
};

export default Header;
