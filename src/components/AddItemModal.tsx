
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Item } from '../types';

interface AddItemModalProps {
  categories: string[];
  onAddItem: (item: Omit<Item, 'id'>) => void;
}

const AddItemModal = ({ categories, onAddItem }: AddItemModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Cozinha');
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategory = isAddingCategory ? newCategory : category;
    
    if (name.trim() && selectedCategory.trim()) {
      onAddItem({
        name: name.trim(),
        category: selectedCategory.trim(),
        isPurchased: false
      });
      setName('');
      setIsOpen(false);
      setIsAddingCategory(false);
      setNewCategory('');
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 p-0"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Item</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome do Item
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: Bacias, Kit Copos, etc."
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              
              {!isAddingCategory ? (
                <div className="flex gap-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsAddingCategory(true)}
                    className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
                  >
                    Nova
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nome da nova categoria"
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsAddingCategory(false)}
                    className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={!name.trim() || (isAddingCategory && !newCategory.trim())}
              >
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddItemModal;
