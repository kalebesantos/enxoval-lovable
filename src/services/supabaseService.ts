
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
    
    return data as Item[];
  } catch (error) {
    console.error('Exception fetching items:', error);
    toast.error('Erro ao carregar os itens');
    return [];
  }
};

// Add a new item
export const addItem = async (item: Omit<Item, 'id'>): Promise<Item | null> => {
  try {
    const { data, error } = await supabase
      .from('items')
      .insert(item)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding item:', error);
      toast.error('Erro ao adicionar o item');
      return null;
    }
    
    return data as Item;
  } catch (error) {
    console.error('Exception adding item:', error);
    toast.error('Erro ao adicionar o item');
    return null;
  }
};

// Update item purchase status
export const updateItemPurchaseStatus = async (
  id: string, 
  is_purchased: boolean, 
  purchased_by?: string
): Promise<Item | null> => {
  try {
    const updateData = {
      is_purchased,
      purchased_by: is_purchased ? purchased_by : null,
      updated_at: new Date().toISOString()
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
    
    return data as Item;
  } catch (error) {
    console.error('Exception updating item:', error);
    toast.error('Erro ao atualizar o item');
    return null;
  }
};
