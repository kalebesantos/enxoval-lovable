
import React, { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Item } from '../types';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';

interface ItemCardProps {
  item: Item;
  onTogglePurchased: (id: string, is_purchased: boolean, purchased_by?: string) => void;
  onDeleteItem: (id: string) => void;
}

const ItemCard = ({ item, onTogglePurchased, onDeleteItem }: ItemCardProps) => {
  const [purchasedBy, setPurchasedBy] = useState<string>(item.purchased_by || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleToggle = () => {
    if (item.is_purchased) {
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
    <div className={`border rounded-md p-4 ${item.is_purchased ? 'bg-gray-50' : 'bg-white'} relative`}>
      <div className="flex items-center justify-between">
        <h3 className={`font-medium ${item.is_purchased ? 'text-gray-500' : 'text-gray-800'}`}>{item.name}</h3>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-100">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir item</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir "{item.name}"? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDeleteItem(item.id)} 
                  className="bg-red-600 hover:bg-red-700"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div 
            onClick={isEditing ? undefined : handleToggle}
            className={`h-6 w-6 rounded-full border flex items-center justify-center cursor-pointer
              ${item.is_purchased ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}
          >
            {item.is_purchased && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </div>
      
      {item.is_purchased && item.purchased_by && (
        <div className="mt-1 text-xs text-gray-500">
          Comprado por: {item.purchased_by}
        </div>
      )}

      {isEditing && (
        <div className="mt-2 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Quem comprou?"
            value={purchasedBy}
            onChange={(e) => setPurchasedBy(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 min-w-[150px] px-3 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <div className="flex gap-2">
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
        </div>
      )}
    </div>
  );
};

export default ItemCard;
