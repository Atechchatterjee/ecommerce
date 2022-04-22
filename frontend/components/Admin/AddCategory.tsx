import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Text, ContainerProps } from "@chakra-ui/react";
import CustomTree from "../Custom/CustomTree";
import { CategoryTree, convertToCustomTree } from "../../util/Tree";
import CustomContainer from "../Custom/CustomContainer";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../../services/CategoryService";
import CategorySearch from "../Widgets/CategorySearch";

const AddCategory = ({ ...props }: ContainerProps) => {
  const [customTree, setCustomTree] = useState<CategoryTree>();
  const [reRender, setReRender] = useState<boolean>(false);

  useEffect(() => {
    getAllCategory().then((categories) => {
      const customTree = convertToCustomTree(categories);
      setCustomTree(customTree);
    });
    setReRender(false);
  }, [reRender]);

  return (
    <CustomContainer
      marginTop="3em"
      height="inherit"
      padding="2em 1em 5em 1em"
      marginBottom="5em"
      borderRadius="lg"
      {...props}
    >
      <Text
        fontWeight="bold"
        fontSize="2em"
        textColor="primary.900"
        textAlign="center"
      >
        Categories
      </Text>
      {customTree && <CategorySearch categoryTree={customTree} />}
      {customTree && customTree.root && (
        <CustomTree
          marginTop="2em"
          root={customTree.root}
          addCb={(parentNode, newNodeName) => {
            createCategory({
              sub_category: parentNode.val.id,
              category_name: newNodeName,
            }).then(() => setReRender(true));
          }}
          deleteCb={(node) =>
            deleteCategory(node).then(() => setReRender(true))
          }
        />
      )}
      <Box height="full" />
    </CustomContainer>
  );
};

export default AddCategory;
