import React, { useState } from "react";
import { Input } from "@chakra-ui/input";
import { Container, Center, Heading } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { Category } from "../../types/shop";
import SelectCategory from "./SelectCategory";
import constants from "../../util/Constants";
import axios from "axios";

const createCategory = async (data: Category): Promise<void> => {
  try {
    await axios.post(`${constants.url}/shop/createcategory/`, data);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

const AddCategory = ({ ...props }) => {
  const toast = useToast();
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <>
      <Container
        boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
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
          onSelect={({ selectedCategory }) => {
            setSelectedCategory(selectedCategory);
          }}
          includeNone
        />
        <Button
          borderRadius="lg"
          colorScheme="facebook"
          width="full"
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
      </Container>
    </>
  );
};

export default AddCategory;
