import React, { useEffect, useState } from "react";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Text, useToast, ContainerProps } from "@chakra-ui/react";
import { Category } from "../../types/shop";
import constants from "../../util/Constants";
import axios from "axios";
import CustomTree from "../Custom/CustomTree";
import { convertToCustomTree } from "../../util/Tree";
import CustomContainer from "../Custom/CustomContainer";

const createCategory = async (data: Category): Promise<void> => {
  try {
    await axios.post(`${constants.url}/shop/createcategory/`, data);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
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

const ListCategories = ({ ...props }: ContainerProps) => {
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
      height="inherit"
      padding="2em 1em 5em 1em"
      marginBottom="5em"
      {...props}
      borderRadius="lg"
    >
      <Text
        fontWeight="bold"
        fontSize="1.5em"
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
        />
      ) : (
        <></>
      )}
      <Box height="full" />
    </CustomContainer>
  );
};

const AddCategory = ({ ...props }) => {
  const toast = useToast();
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return <ListCategories marginTop="3em" />;
};

export default AddCategory;
