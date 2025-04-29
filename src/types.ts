
export interface Item {
  id: string;
  name: string;
  category: string;
  is_purchased: boolean;
  purchased_by?: string;
}

export interface DatabaseItem {
  id: string;
  name: string;
  category: string;
  is_purchased: boolean;
  purchased_by?: string;
}
