import { CategoryTree, CategoryNode } from "./Tree";
import Fuse from "fuse.js";

const flattenTree = (root: CategoryNode) => {
  if(root.children.length === 0) return [];
  let flattenedArr: any = [];
  root.children.forEach((child: any) => {
    flattenedArr = [
      ...flattenedArr,
      {
         id: child.val.id,
         name: child.val.name,
         parentId: child.val.parentId
      },
       ...flattenTree(child)
    ];
  })
  return flattenedArr;
}

export const searchCategory = (
  tree: CategoryTree,
  searchTerm: string,
  noOfOutputTerms:number = -1
) => {
  const searchedTerms = new Fuse(
    flattenTree(tree.root), {keys: ['name']}
  ).search(searchTerm)

  if(noOfOutputTerms !== -1) return searchedTerms;
  else return searchedTerms.slice(0, noOfOutputTerms);
}