import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Text, ContainerProps } from "@chakra-ui/react";
import { Category } from "../../types/shop";
import constants from "../../util/Constants";
import axios from "axios";
import CustomTree from "../Custom/CustomTree";
import { convertToCustomTree } from "../../util/Tree";
import CustomContainer from "../Custom/CustomContainer";
import { CategoryNode } from "../../util/Tree";

const createCategory = async (data: Category): Promise<void> => {
  try {
    await axios.post(`${constants.url}/shop/createcategory/`, data);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteCategory = async (node: CategoryNode): Promise<void> => {
  axios
    .delete(`${constants.url}/shop/delete-category/${node.val.id}/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};

const getAllCategory = async (): Promise<Category[]> => {
  try {
    const res = await axios.get(`${constants.url}/shop/getallcategory/`, {
      withCredentials: true,
    });
    return Promise.resolve(res.data.categories);
  } catch (err) {
    return Promise.reject(err);
  }
};

const AddCategory = ({ ...props }: ContainerProps) => {
  const [customTreeRoot, setCustomTreeRoot] = useState<any>([]);
  const [reRender, setReRender] = useState<boolean>(false);

  useEffect(() => {
    getAllCategory().then((categories) => {
      const customTree = convertToCustomTree(categories);
      console.log({ customTree });
      setCustomTreeRoot(customTree.root);
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
        textColor="secondaryBlue.200"
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
