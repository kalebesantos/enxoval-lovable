
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onTogglePurchased: (id: string, isPurchased: boolean, purchasedBy?: string) => void;
}

const ItemCard = ({ item, onTogglePurchased }: ItemCardProps) => {
  const [purchasedBy, setPurchasedBy] = useState<string>(item.purchasedBy || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleToggle = () => {
    if (item.isPurchased) {
      onTogglePurchased(item.id, false);
    } else {
      setIsEditing(true);
    }
  };

  const handleConfirmPurchase = () => {
    if (purchasedBy.trim()) {
      onTogglePurchased(item.id, true, purchasedBy);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirmPurchase();
    }
  };

  return (
    <div className={`border rounded-md p-4 ${item.isPurchased ? 'bg-gray-50' : 'bg-white'} relative`}>
      <div className="flex items-center justify-between">
        <h3 className={`font-medium ${item.isPurchased ? 'text-gray-500' : 'text-gray-800'}`}>{item.name}</h3>
        <div 
          onClick={isEditing ? undefined : handleToggle}
          className={`h-6 w-6 rounded-full border flex items-center justify-center cursor-pointer
            ${item.isPurchased ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}
        >
          {item.isPurchased && <Check className="h-4 w-4 text-white" />}
        </div>
      </div>
      
      {item.isPurchased && item.purchasedBy && (
        <div className="mt-1 text-xs text-gray-500">
          Comprado por: {item.purchasedBy}
        </div>
      )}

      {isEditing && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Quem comprou?"
            value={purchasedBy}
            onChange={(e) => setPurchasedBy(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-3 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button 
            onClick={handleConfirmPurchase}
            disabled={!purchasedBy.trim()}
            className={`px-3 py-1 text-sm rounded text-white ${purchasedBy.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300'}`}
          >
            Confirmar
          </button>
          <button 
            onClick={() => {
              setIsEditing(false);
              setPurchasedBy('');
            }}
            className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
