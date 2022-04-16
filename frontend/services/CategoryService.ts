import axios from "axios";
import { Category } from "../types/shop";
import { CategoryNode } from "../util/Tree";
import constants from "../util/Constants";

export const createCategory = async (data: Category): Promise<void> => {
  try {
    await axios.post(`${constants.url}/shop/createcategory/`, data);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCategory = async (node: CategoryNode): Promise<void> => {
  axios
    .delete(`${constants.url}/shop/delete-category/${node.val.id}/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};

export const getAllCategory = async (): Promise<Category[]> => {
  try {
    const res = await axios.get(`${constants.url}/shop/getallcategory/`, {
      withCredentials: true,
    });
    return Promise.resolve(res.data.categories);
  } catch (err) {
    return Promise.reject(err);
  }
};