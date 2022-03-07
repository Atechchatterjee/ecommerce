import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/input";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Button, Text, useToast, ContainerProps } from "@chakra-ui/react";
import { Category } from "../../types/shop";
import SelectCategory from "./SelectCategory";
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

  useEffect(() => {
    getAllCategory().then((categories) => {
      const customTree = convertToCustomTree(categories);
      console.log({ customTree });
      setCustomTreeRoot(customTree.root);
      console.log({ customTree });
    });
  }, []);

  return (
    <CustomContainer height="33em" padding="1em" {...props} borderRadius="lg">
      {customTreeRoot ? <CustomTree root={customTreeRoot} /> : <></>}
      <Box height="full" />
    </CustomContainer>
  );
};

const AddCategory = ({ ...props }) => {
  const toast = useToast();
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <>
      <CustomContainer
        height="33em"
        width="60em"
        padding="3em"
        borderRadius="lg"
        {...props}
      >
        <Center>
          <Heading
            size="xl"
            color="gray.600"
            fontFamily="Sora"
            fontWeight="bold"
          >
            Add Category
          </Heading>
        </Center>
        <Input
          borderRadius="lg"
          placeholder="Category Name"
          marginBottom="1em"
          top="2em"
          size="lg"
          onChange={(event: any) => setCategoryName(event.target.value)}
        />
        <SelectCategory
          borderRadius="lg"
          marginTop="4em"
          bgColor="#9D84B7"
          variant="pinkSolid"
          onSelect={({ selectedCategory }) => {
            setSelectedCategory(selectedCategory);
          }}
          includeNone
        />
        <Button
          borderRadius="lg"
          width="full"
          variant="blueSolid"
          marginTop="1em"
          onClick={() => {
            createCategory({
              category_name: categoryName,
              sub_category: selectedCategory,
            })
              .then(() => {
                toast({
                  title: "Created",
                  description: `Category: '${categoryName}' was successfully added`,
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              })
              .catch(() => {
                toast({
                  title: "Sorry for the inconvenience",
                  description: `Category: '${categoryName}' could not be added`,
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                });
              });
          }}
          bg="#091353"
        >
          Add
        </Button>
      </CustomContainer>
      <ListCategories marginTop="3em" />
    </>
  );
};

export default AddCategory;
