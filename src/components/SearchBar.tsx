
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showPurchased: boolean;
  setShowPurchased: (show: boolean) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
}

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm,
  showPurchased,
  setShowPurchased,
  categoryFilter,
  setCategoryFilter,
  categories
}: SearchBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Buscar item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border rounded-lg border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <label className="flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer bg-white">
          <input
            type="checkbox"
            checked={showPurchased}
            onChange={() => setShowPurchased(!showPurchased)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <span className="text-sm">Mostrar comprados</span>
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
