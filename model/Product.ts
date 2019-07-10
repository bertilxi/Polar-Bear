export type ProductColor = "" | string;
export type ProductSize = "";

export interface Product {
  id: string;
  name: string;
  color: ProductColor;
  size: ProductSize;
  description: string;
  available: number;
  sold: number;
}
