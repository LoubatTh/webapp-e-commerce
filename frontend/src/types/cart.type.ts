export type CartItem = {
  id: string;
  name: string;
  description: string;
  photo?: string;
  price: number;
  type?: string;
  size?: string;
  gender?: string;
  color?: string;
  brand?: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};
