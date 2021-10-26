export interface Category {
  category_id?: number | null;
  category_name: string;
  sub_category: number | null;
}

export interface CategoryMap {
  [key: number]: string;
}