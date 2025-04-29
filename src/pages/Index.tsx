
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import AddItemModal from '../components/AddItemModal';
import { Item } from '../types';
import { getItems, addItem as addItemToStorage, updateItemPurchaseStatus } from '../services/localStorage';

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPurchased, setShowPurchased] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    // Load items on component mount
    const loadedItems = getItems();
    setItems(loadedItems);
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(items.map(item => item.category)));

  // Filter items based on search, category, and purchased status
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    const matchesPurchased = showPurchased ? true : !item.isPurchased;
    
    return matchesSearch && matchesCategory && matchesPurchased;
  });

  // Group items by category
  const itemsByCategory: Record<string, Item[]> = {};
  filteredItems.forEach(item => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  });

  // Statistics
  const totalItems = items.length;
  const purchasedItems = items.filter(item => item.isPurchased).length;

  const handleTogglePurchased = (id: string, isPurchased: boolean, purchasedBy?: string) => {
    const updatedItems = updateItemPurchaseStatus(id, isPurchased, purchasedBy);
    setItems(updatedItems);
    
    if (isPurchased) {
      toast.success('Item marcado como comprado', {
        description: `${purchasedBy ? `Comprado por ${purchasedBy}` : ''}`,
      });
    }
  };

  const handleAddItem = (newItem: Omit<Item, 'id'>) => {
    const item = addItemToStorage(newItem);
    setItems(prev => [...prev, item]);
    toast.success('Item adicionado com sucesso');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <ProgressBar total={totalItems} purchased={purchasedItems} />
        </div>

        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showPurchased={showPurchased}
          setShowPurchased={setShowPurchased}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />

        {Object.keys(itemsByCategory).length > 0 ? (
          Object.entries(itemsByCategory).sort().map(([category, categoryItems]) => (
            <CategorySection 
              key={category}
              category={category}
              items={categoryItems}
              onTogglePurchased={handleTogglePurchased}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-700">Nenhum item encontrado</h3>
            <p className="text-gray-500">Tente mudar seus filtros ou adicione novos itens</p>
          </div>
        )}
        
        <AddItemModal categories={categories} onAddItem={handleAddItem} />
      </main>
    </div>
  );
};

export default Index;
