import axios from "axios";
import { useState, useEffect } from "react";
import { Category } from "../types/shop";
import constants from "../util/Constants";
import { CategoryTree, convertToCustomTree } from "../util/Tree";

interface useCategoryDataProps {
  refetch?: boolean;
  returnTree?: boolean;
}

export const useCategoryData = ({refetch, returnTree}: useCategoryDataProps={}): [
  categoryData: Category[],
  setCategoryData: (_: Category[]) => void,
  categoryTree?: CategoryTree,
] => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<CategoryTree>();

  const getAllCategory = async (): Promise<Category[]> => (
    new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${constants.url}/shop/getallcategory/`, {
          withCredentials: true,
        });
        resolve(res.data.categories);
      } catch (err) {
        reject(err);
      }
    })
  );

  useEffect(() => {
    getAllCategory().then(
      (categoryData) => {
        setCategoryData(categoryData);
        if(returnTree) {
          const customTree = convertToCustomTree(categoryData);
          setCategoryTree(customTree);
        }
      }).catch((err) => console.error(err));
  }, [refetch]);

  return [categoryData, setCategoryData, returnTree ? categoryTree : undefined];
}