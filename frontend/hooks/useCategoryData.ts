import { useState, useEffect } from "react";
import { Category } from "../types/shop";
import { CategoryTree, convertToCustomTree } from "../util/Tree";
import { getAllCategory } from "../services/CategoryService";

interface useCategoryDataProps {
  refetch?: boolean;
  returnTree?: boolean;
}

export const useCategoryData = ({
  refetch,
  returnTree,
}: useCategoryDataProps = {}): [
  categoryData: Category[],
  setCategoryData: (_: Category[]) => void,
  categoryTree?: CategoryTree
] => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<CategoryTree>();

  useEffect(() => {
    getAllCategory()
      .then((categoryData) => {
        setCategoryData(categoryData);
        if (returnTree) {
          const customTree = convertToCustomTree(categoryData);
          setCategoryTree(customTree);
        }
      })
      .catch((err) => console.error(err));
  }, [refetch]);

  return [categoryData, setCategoryData, returnTree ? categoryTree : undefined];
};
