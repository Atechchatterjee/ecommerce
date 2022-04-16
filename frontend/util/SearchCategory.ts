import { CategoryTree, CategoryNode } from "./Tree";

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

export const searchCategory = (tree: CategoryTree, searchTerm: string) => {
  const categoryArray = flattenTree(tree.root);
  console.log({categoryArray});
}