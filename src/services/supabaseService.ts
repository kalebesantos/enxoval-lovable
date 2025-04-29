
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';
import { Item } from '../types';

// Get items from Supabase
export const getItems = async (): Promise<Item[]> => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*');
    
    if (error) {
      console.error('Error fetching items:', error);
      toast.error('Erro ao carregar os itens');
      return [];
    }
    
    // Transform database fields to match our application's field names
    return data.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      isPurchased: item.is_purchased,
      purchasedBy: item.purchased_by
    }));
  } catch (error) {
    console.error('Exception fetching items:', error);
    toast.error('Erro ao carregar os itens');
    return [];
  }
};

// Add a new item
export const addItem = async (item: Omit<Item, 'id'>): Promise<Item | null> => {
  try {
    // Transform field names to match database schema
    const dbItem = {
      name: item.name,
      category: item.category,
      is_purchased: item.isPurchased,
      purchased_by: item.purchasedBy
    };
    
    const { data, error } = await supabase
      .from('items')
      .insert(dbItem)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding item:', error);
      toast.error('Erro ao adicionar o item');
      return null;
    }
    
    // Transform back to application field names
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      isPurchased: data.is_purchased,
      purchasedBy: data.purchased_by
    };
  } catch (error) {
    console.error('Exception adding item:', error);
    toast.error('Erro ao adicionar o item');
    return null;
  }
};

// Update item purchase status
export const updateItemPurchaseStatus = async (
  id: string, 
  isPurchased: boolean, 
  purchasedBy?: string
): Promise<Item | null> => {
  try {
    const updateData = {
      is_purchased: isPurchased,
      purchased_by: isPurchased ? purchasedBy : null,
      updated_at: new Date()
    };
    
    const { data, error } = await supabase
      .from('items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating item:', error);
      toast.error('Erro ao atualizar o item');
      return null;
    }
    
    // Transform back to application field names
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      isPurchased: data.is_purchased,
      purchasedBy: data.purchased_by
    };
  } catch (error) {
    console.error('Exception updating item:', error);
    toast.error('Erro ao atualizar o item');
    return null;
  }
};
