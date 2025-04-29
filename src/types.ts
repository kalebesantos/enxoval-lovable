
export interface Item {
  id: string;
  name: string;
  category: string;
  isPurchased: boolean;
  purchasedBy?: string;
}

export interface DatabaseItem {
  id: string;
  name: string;
  category: string;
  isPurchased: boolean;
  purchasedBy?: string;
}
