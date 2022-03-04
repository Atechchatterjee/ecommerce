import { Category } from "../types/shop";

export class CategoryNode {
  val: any = null;
  children: CategoryNode[] = [];

  constructor(val: Category|null, children: CategoryNode[]) {
    this.val = val;
    this.children = children;
  }
}

// stores the categories list (coming from db) in a tree
export class CategoryTree {
  root: CategoryNode = {val: null, children:[]}
  leaveNodes: CategoryNode[] = [];

  constructor(val: Category | null) {
    this.root = {val, children: []}
  }

  isLeaf(node: CategoryNode): boolean {
    return node.children.length === 0;
  }

  createNode(value: any): CategoryNode {
    return new CategoryNode(value, []);
  }

  add(val: any, parentId: number) {
    this.addRec(val, parentId, this.root);
  }

  addCustomTreeNode(val: any, parentId: number) {
    this.addCustomTreeNodeRec(val, parentId, this.root);
  }

  addCustomTreeNodeRec(value: any, parentId: number, cur: CategoryNode) {
    if(cur.children === null) 
      return;

    // finding the parent node and adding the new node to its children
    if(cur.val?.id === parentId) {
      cur.children.push(this.createNode(value));
    }
    for(const child of cur.children) {
      this.addCustomTreeNodeRec(value, parentId, child);
    }
  }

  addRec(value: Category, parentId: number, cur: CategoryNode) {
    if(cur.children === null) 
      return;

    // finding the parent node and adding the new node to its children
    if(cur.val?.category_id === parentId) {
      cur.children.push(this.createNode(value));
    }

    for(const child of cur.children) {
      this.addRec(value, parentId, child);
    }
  }

  getAllLeaveNodes(cur: CategoryNode) {
    if(cur.children.length === 0) {
      this.leaveNodes.push(cur);
      return;
    }

    for(const child of cur.children) {
      this.getAllLeaveNodes(child);
    }
  }

  traversal(cur: CategoryNode) {
    if(!cur && cur !== this.root) return;
    console.log(cur.val?.category_name);
    for(const child of cur.children) {
      this.traversal(child);
    }
  }
}

export const convertToCategoryTree = (categoryList: Category[]): CategoryTree => {
  let tree = new CategoryTree(null);

  // adding the root categories (that do not belong to any sub category)
  for(const category of categoryList) {
    if(!category.sub_category) {
      tree.root.children.push(tree.createNode(category));
    } else {
      tree.add(category, category.sub_category);
    }
  }

  return tree;
}

export const convertToCustomTree = (categoryList: Category[]): CategoryTree => {
  let tree = new CategoryTree(null);

  for(const category of categoryList) {
    // val of each node
    const categoryNode = { 
      name: category.category_name,
      id: category.category_id,
      parentId: category.sub_category
    }
    if(!category.sub_category) { // root nodes
      tree.root.children.push(
        tree.createNode(categoryNode)
      );
    } else {
      tree.addCustomTreeNode(categoryNode, category.sub_category);
    }
  }

  return tree;
}

interface TreeNode {
  label: string;
  id: number;
  parentId: number | null;
  items: TreeNode[] | null;
}

const nodesToTreeNodes = (cur: CategoryNode, tree: CategoryTree, output: TreeNode[]) => {
  if(!cur && cur !== tree.root) return;
  
  if(cur.val) {
    const {category_id: id, category_name: label, sub_category: parentId} = cur.val;

    // creating a new tree node
    const newNode: TreeNode = {
      label: label,
      id: id ? id : -1,
      parentId: parentId ? parentId : null,
      items: null
    }

    // adding the leave nodes to the items list of the newNode
    for(const child of cur.children) {
      if(tree.isLeaf(child) && child.val) {
        const {category_id: id, category_name: label, sub_category: parentId} = child.val;

        if(newNode.items) {
          newNode.items.push({
            label: label,
            id: id ? id : -1,
            parentId: parentId ? parentId : null,
            items: null
          });
        } else {
          newNode.items = [{
            label: label,
            id: id ? id : -1,
            parentId: parentId ? parentId : null,
            items: null
          }];
        }
      }  
    }

    output.push(newNode);

    // recursing through the non-leaf items
    for(const child of cur.children) {
      if(child.val) {
        if(!tree.isLeaf(child)) {
          nodesToTreeNodes(child, tree, output);
        }
      }
    }
  } 
}

export const getRootNodes = (tree: CategoryTree): CategoryNode[] => 
  tree.root.children;

// converts the category tree nodes into the actual tree nodes which would be displayed
export const convertToTree = (tree: CategoryTree): TreeNode[] | null => {
  const output: TreeNode[] = [];
  for(const child of tree.root.children) {
    nodesToTreeNodes(child, tree, output);
  }
  return output;
}
