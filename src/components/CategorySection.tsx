
import React from 'react';
import ItemCard from './ItemCard';
import { Item } from '../types';

interface CategorySectionProps {
  category: string;
  items: Item[];
  onTogglePurchased: (id: string, is_purchased: boolean, purchased_by?: string) => void;
  onDeleteItem: (id: string) => void;
}

const CategorySection = ({ category, items, onTogglePurchased, onDeleteItem }: CategorySectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <ItemCard 
            key={item.id} 
            item={item} 
            onTogglePurchased={onTogglePurchased}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
