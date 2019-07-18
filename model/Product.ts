export type ProductSize = "";

export interface Product {
  id: string;
  name: string;
  size: ProductSize;
  description: string;
  available: number;
  sold: number;
}
