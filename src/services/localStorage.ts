
import { Item } from '../types';

// Generate a simple unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initial demo data
const initialItems: Item[] = [
  { id: generateId(), name: 'Bacias', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Kit Cochas', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Coador de Café', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Colheres de Medida', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Colheres de Pau', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Copo Medidor', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Cortador de Pizza', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Descascador de Legumes', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Escorredor de Arroz', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Escorredor de Louça e Talheres', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Escorredor de Macarrão', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Espremedor de Alho', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Espremedor de Limão', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Kit Facas', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Faqueiro', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Forma para Pizza', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Concha para Sorvete', category: 'Cozinha', is_purchased: false },
  { id: generateId(), name: 'Cuscuzeira', category: 'Cozinha', is_purchased: false },
  
  { id: generateId(), name: 'Sofá', category: 'Sala', is_purchased: false },
  { id: generateId(), name: 'Mesa de Centro', category: 'Sala', is_purchased: false },
  { id: generateId(), name: 'Rack para TV', category: 'Sala', is_purchased: false },
  
  { id: generateId(), name: 'Cama Box', category: 'Quarto', is_purchased: false },
  { id: generateId(), name: 'Guarda-Roupa', category: 'Quarto', is_purchased: false },
  { id: generateId(), name: 'Cabeceira', category: 'Quarto', is_purchased: false },
  
  { id: generateId(), name: 'Box para Banheiro', category: 'Banheiro', is_purchased: false },
  { id: generateId(), name: 'Chuveiro', category: 'Banheiro', is_purchased: false },
  { id: generateId(), name: 'Tapete', category: 'Banheiro', is_purchased: false },
];

// Get items from localStorage or use initial data
export const getItems = (): Item[] => {
  const storedItems = localStorage.getItem('homeItemsList');
  if (storedItems) {
    return JSON.parse(storedItems);
  }
  
  // Initialize with demo data on first load
  localStorage.setItem('homeItemsList', JSON.stringify(initialItems));
  return initialItems;
};

// Save items to localStorage
export const saveItems = (items: Item[]): void => {
  localStorage.setItem('homeItemsList', JSON.stringify(items));
};

// Add a new item
export const addItem = (item: Omit<Item, 'id'>): Item => {
  const newItem = { ...item, id: generateId() };
  const items = getItems();
  const updatedItems = [...items, newItem];
  saveItems(updatedItems);
  return newItem;
};

// Toggle item purchase status
export const updateItemPurchaseStatus = (
  id: string, 
  is_purchased: boolean, 
  purchased_by?: string
): Item[] => {
  const items = getItems();
  const updatedItems = items.map(item => {
    if (item.id === id) {
      return {
        ...item,
        is_purchased,
        purchased_by: is_purchased ? purchased_by || item.purchased_by : undefined
      };
    }
    return item;
  });
  saveItems(updatedItems);
  return updatedItems;
};
