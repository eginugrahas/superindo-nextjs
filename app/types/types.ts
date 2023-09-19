export type ProductType = {
  id?: number;
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
  id?: number;
  name: string;
  product_id: number | undefined;
  code: string;
  price: number;
  qty: number;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

export type ProductCategoryType = {
  id?: number;
  name: string;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string; 
}

export interface ProductCategoryPropsType {
  category: ProductCategoryType
};

export type TransactionType = {
  id?: number;
  name: string;
  active: boolean;
  transaction_no: string,
  total_amount: number,
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string; 
}

export type TransactionDetailType = {
  id?: number;
  transaction_id: number;
  product_variant_id: number;
  qty: number;
  price: number;
  subtotal: number;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string; 
}

export interface TransactionDetailPropsType {
  transaction: TransactionDetailType
};
