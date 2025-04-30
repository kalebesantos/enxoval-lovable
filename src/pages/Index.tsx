
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import AddItemModal from '../components/AddItemModal';
import { Item } from '../types';
import { getItems, addItem as addItemToDb, updateItemPurchaseStatus as updateItemInDb, deleteItem as deleteItemFromDb } from '../services/supabaseService';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPurchased, setShowPurchased] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load items from Supabase on component mount
    const loadItems = async () => {
      setIsLoading(true);
      try {
        const loadedItems = await getItems();
        setItems(loadedItems);
      } catch (error) {
        console.error('Failed to load items:', error);
        toast.error('Falha ao carregar os itens');
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(items.map(item => item.category)));

  // Filter items based on search, category, and purchased status
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    const matchesPurchased = showPurchased ? true : !item.is_purchased;
    
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
  const purchasedItems = items.filter(item => item.is_purchased).length;

  const handleTogglePurchased = async (id: string, is_purchased: boolean, purchased_by?: string) => {
    try {
      const updatedItem = await updateItemInDb(id, is_purchased, purchased_by);
      
      if (updatedItem) {
        // Update local state with the updated item
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === id ? { ...item, is_purchased, purchased_by } : item
          )
        );
        
        if (is_purchased) {
          toast.success('Item marcado como comprado', {
            description: `${purchased_by ? `Comprado por ${purchased_by}` : ''}`,
          });
        }
      }
    } catch (error) {
      console.error('Failed to update item:', error);
      toast.error('Falha ao atualizar o item');
    }
  };

  const handleAddItem = async (newItem: Omit<Item, 'id'>) => {
    try {
      const item = await addItemToDb(newItem);
      if (item) {
        setItems(prev => [...prev, item]);
        toast.success('Item adicionado com sucesso');
      }
    } catch (error) {
      console.error('Failed to add item:', error);
      toast.error('Falha ao adicionar o item');
    }
  };
  
  const handleDeleteItem = async (id: string) => {
    try {
      const success = await deleteItemFromDb(id);
      
      if (success) {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast.error('Falha ao excluir o item');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600">Carregando itens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
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
              onDeleteItem={handleDeleteItem}
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
