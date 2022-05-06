import { Category } from "../types/shop";
import { CategoryNode } from "../util/Tree";
import api from "../util/AxiosApi";

export const createCategory = async (data: Category): Promise<void> => {
  if(data.category_name.length === 0) return;
  await api.post('/shop/createcategory/', data, {withCredentials: true});
};

export const deleteCategory = async (
  categoryId: CategoryNode
): Promise<void> => {
  await api.delete(`/shop/delete-category/${categoryId}/`, {withCredentials: true})
};

export const getAllCategory = async (): Promise<Category[]> => {
  const res = await api.get("/shop/getallcategory/");
  return Promise.resolve(res.data.categories);
};
