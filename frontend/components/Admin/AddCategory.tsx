import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Text, ContainerProps } from "@chakra-ui/react";
import CustomTree from "../Custom/CustomTree";
import { convertToCustomTree } from "../../util/Tree";
import CustomContainer from "../Custom/CustomContainer";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../../services/CategoryService";
import { searchCategory } from "../../util/SearchCategory";

const AddCategory = ({ ...props }: ContainerProps) => {
  const [customTreeRoot, setCustomTreeRoot] = useState<any>([]);
  const [reRender, setReRender] = useState<boolean>(false);

  useEffect(() => {
    getAllCategory().then((categories) => {
      const customTree = convertToCustomTree(categories);
      setCustomTreeRoot(customTree.root);
      searchCategory(customTree, "Laptop");
      console.log({ customTree });
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
      {customTreeRoot ? (
        <CustomTree
          marginTop="2em"
          root={customTreeRoot}
          addCb={(parentNode, newNodeName) => {
            console.log({
              sub_category: parentNode.val.id,
              category_name: newNodeName,
            });
            createCategory({
              sub_category: parentNode.val.id,
              category_name: newNodeName,
            }).then(() => setReRender(true));
          }}
          deleteCb={(node) =>
            deleteCategory(node).then(() => setReRender(true))
          }
        />
      ) : (
        <></>
      )}
      <Box height="full" />
    </CustomContainer>
  );
};

export default AddCategory;
