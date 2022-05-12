export interface Category {
  category_id?: number | null;
  category_name: string;
  sub_category: number | null;
}

export interface CategoryMap {
  [key: number]: string;
}

export type OptionsData = {
  id: number;
  name: string;
  values: {
    id: number;
    value: string;
  }[];
}[];

export type ProductType = {
  id: number;
  name: string;
  price: any[];
  description: string;
  category: any;
  image: any[]
  unit?: any;
  gst?: any;
}