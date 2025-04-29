
import { Item } from '../types';

// Generate a simple unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initial demo data
const initialItems: Item[] = [
  { id: generateId(), name: 'Bacias', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Kit Cochas', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Coador de Café', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Colheres de Medida', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Colheres de Pau', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Copo Medidor', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Cortador de Pizza', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Descascador de Legumes', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Escorredor de Arroz', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Escorredor de Louça e Talheres', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Escorredor de Macarrão', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Espremedor de Alho', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Espremedor de Limão', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Kit Facas', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Faqueiro', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Forma para Pizza', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Concha para Sorvete', category: 'Cozinha', isPurchased: false },
  { id: generateId(), name: 'Cuscuzeira', category: 'Cozinha', isPurchased: false },
  
  { id: generateId(), name: 'Sofá', category: 'Sala', isPurchased: false },
  { id: generateId(), name: 'Mesa de Centro', category: 'Sala', isPurchased: false },
  { id: generateId(), name: 'Rack para TV', category: 'Sala', isPurchased: false },
  
  { id: generateId(), name: 'Cama Box', category: 'Quarto', isPurchased: false },
  { id: generateId(), name: 'Guarda-Roupa', category: 'Quarto', isPurchased: false },
  { id: generateId(), name: 'Cabeceira', category: 'Quarto', isPurchased: false },
  
  { id: generateId(), name: 'Box para Banheiro', category: 'Banheiro', isPurchased: false },
  { id: generateId(), name: 'Chuveiro', category: 'Banheiro', isPurchased: false },
  { id: generateId(), name: 'Tapete', category: 'Banheiro', isPurchased: false },
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
  isPurchased: boolean, 
  purchasedBy?: string
): Item[] => {
  const items = getItems();
  const updatedItems = items.map(item => {
    if (item.id === id) {
      return {
        ...item,
        isPurchased,
        purchasedBy: isPurchased ? purchasedBy || item.purchasedBy : undefined
      };
    }
    return item;
  });
  saveItems(updatedItems);
  return updatedItems;
};
