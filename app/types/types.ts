export type ProductType = {
  id: number;
  name: string;
  plu: string;
  product_category_id: number;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

export interface ProductPropsType {
  product: ProductType;
}

export interface ProductVariantPropsType {
  product: ProductVariantType;
}

export type ProductVariantType = {
  id: number;
  name: string;
  product_id: number;
  code: string;
  price: number;
  qty: number;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};
