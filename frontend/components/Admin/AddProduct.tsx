import {
  Container,
  Center,
  Heading,
  ContainerProps,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import constants from "../../util/Constants";
import SelectCategory from "./SelectCategory";

interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: string;
  categoryId: number | null;
}

const createProduct = async (data: ProductData): Promise<void> => {
  try {
    axios
      .post(`${constants.url}/shop/createProduct/`, data, {
        withCredentials: true,
      })
      .then(() => Promise.resolve());
  } catch (err) {
    Promise.reject(err);
  }
};

const AddProduct = (props: ContainerProps) => {
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const toast = useToast();

  return (
    <Center>
      <Container
        boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
        height="33em"
        width="60em"
        padding="3em"
        borderRadius="md"
        {...props}
      >
        <Center>
          <Heading size="xl" color="gray.600">
            Add Product
          </Heading>
        </Center>
        <Input
          placeholder="Product Name"
          value={productName}
          top="2em"
          onChange={(event: any) => setProductName(event.target.value)}
        />
        <Input
          placeholder="Product Description"
          value={productDescription}
          top="3em"
          onChange={(event: any) => setProductDescription(event.target.value)}
        />
        <Input
          placeholder="Product Price"
          value={productPrice}
          top="4em"
          onChange={(event: any) => setProductPrice(event.target.value)}
        />
        <SelectCategory
          marginTop="5em"
          onSelect={({ selectedCategory }) => setCategoryId(selectedCategory)}
        />
        <Button
          size="lg"
          colorScheme="teal"
          top="1em"
          width="full"
          onClick={() => {
            createProduct({
              productName,
              productDescription,
              productPrice,
              categoryId,
            })
              .then(() => {
                toast({
                  title: "Created",
                  description: `Product: '${productName}' has been created`,
                  duration: 2000,
                  isClosable: true,
                  status: "success",
                });
              })
              .catch(() => {
                toast({
                  title: "Sorry for the inconvenience",
                  description: `Product: '${productName}' could not be created`,
                  duration: 2000,
                  isClosable: true,
                  status: "error",
                });
              });
            // reseting values
            setProductName("");
            setProductDescription("");
            setProductPrice("");
            setCategoryId(null);
          }}
        >
          Submit
        </Button>
      </Container>
    </Center>
  );
};

export default AddProduct;
