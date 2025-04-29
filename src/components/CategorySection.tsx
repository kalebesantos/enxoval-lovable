
import React from 'react';
import ItemCard from './ItemCard';
import { Item } from '../types';

interface CategorySectionProps {
  category: string;
  items: Item[];
  onTogglePurchased: (id: string, isPurchased: boolean, purchasedBy?: string) => void;
}

const CategorySection = ({ category, items, onTogglePurchased }: CategorySectionProps) => {
  const totalItems = items.length;
  const purchasedItems = items.filter(item => item.isPurchased).length;
  const percentage = totalItems > 0 ? Math.floor((purchasedItems / totalItems) * 100) : 0;
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 flex items-center justify-center">
          {category === 'Cozinha' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2v20M8 7v15M15 7H8a6 6 0 0 1 0-12h7v1"/>
            </svg>
          )}
          {category === 'Sala' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="9" width="16" height="10" rx="2" />
              <path d="M8 5c0-1 1-2 2-2h4c1 0 2 1 2 2v4H8V5z" />
              <path d="M10 19v3" />
              <path d="M14 19v3" />
            </svg>
          )}
          {category === 'Quarto' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
              <path d="M2 19v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
              <path d="M4 9v10" />
              <path d="M20 9v10" />
              <path d="M12 4v15" />
            </svg>
          )}
          {category === 'Banheiro' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
              <line x1="10" y1="4" x2="16" y2="4" />
              <line x1="15" y1="8" x2="20" y2="3" />
              <line x1="13" y1="9" x2="4" y2="18" />
              <line x1="16" y1="12" x2="11" y2="17" />
            </svg>
          )}
          {!['Cozinha', 'Sala', 'Quarto', 'Banheiro'].includes(category) && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          )}
        </div>
        <h2 className="text-lg font-medium text-gray-800">{category}</h2>
        <span className="text-sm text-gray-500">{purchasedItems}/{totalItems}</span>
      </div>
      
      <div className="mb-4 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onTogglePurchased={onTogglePurchased} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
