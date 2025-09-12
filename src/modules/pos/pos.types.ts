export interface MenuItem {
  id?: number;
  name: string;
  price: number;
}

export interface OrderItem {
  menuId: number;
  name: string;
  price: number;
  count: number;
}

export interface Order {
  id?: number;
  items: OrderItem[];
  total: number;
  createdAt?: string;
}
