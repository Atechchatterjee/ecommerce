import {
  Container,
  Center,
  Heading,
  ContainerProps,
  Input,
  Button,
  useToast,
  Textarea,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import constants from "../../util/Constants";
import SelectCategory from "./SelectCategory";
import CustomFileInput from "../Custom/CustomFileInput";
import { Formik } from "formik";

interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: string;
  categoryId: number | null;
  productImage: File | null;
}

const createProduct = async ({
  productName,
  productDescription,
  productPrice,
  categoryId,
  productImage,
}: ProductData): Promise<void> => {
  let formData = new FormData();

  formData.append("productName", productName);
  formData.append("productDescription", productDescription);
  formData.append("productPrice", productPrice);

  if (typeof categoryId === "number")
    formData.append("categoryId", categoryId.toString());
  else formData.append("categoryId", "");
  if (productImage) formData.append("productImage", productImage);

  try {
    console.log({ formData });
    axios
      .post(`${constants.url}/shop/createProduct/`, formData, {
        withCredentials: true,
      })
      .then(() => Promise.resolve());
  } catch (err) {
    Promise.reject(err);
  }
};

const AddProduct = (props: ContainerProps) => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);

  const toast = useToast();

  return (
    <Center>
      <Container
        boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
        height="inherit"
        width="60em"
        padding="2em 4em 7em 4em"
        borderRadius="md"
        {...props}
      >
        <Heading size="xl" color="gray.600" marginLeft="initial">
          Add Product
        </Heading>
        <Container marginTop="2em" padding="0">
          <Formik
            initialValues={{
              productName: "",
              productDescription: "",
              productPrice: "",
            }}
            onSubmit={(values: any, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              values["categoryId"] = categoryId;
              values["productImage"] = productImage;
              console.log({ values });
              createProduct(values)
                .then(() => {
                  toast({
                    title: "Created",
                    description: `Product: '${values.productName}' has been created`,
                    duration: 2000,
                    isClosable: true,
                    status: "success",
                  });
                  setSubmitting(false);
                })
                .catch(() => {
                  toast({
                    title: "Sorry for the inconvenience",
                    description: `Product: '${values.productName}' could not be created`,
                    duration: 2000,
                    isClosable: true,
                    status: "error",
                  });
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  name="productName"
                  placeholder="Product Name"
                  value={values.productName}
                  borderRadius="none"
                  onChange={handleChange}
                  top="2em"
                />
                <Textarea
                  name="productDescription"
                  placeholder="Product Description"
                  value={values.productDescription}
                  borderRadius="none"
                  onChange={handleChange}
                  top="3em"
                />
                <NumberInput
                  top="4em"
                  precision={2}
                  step={1}
                  onReset={() => alert("reseting")}
                >
                  <NumberInputField
                    value={values.productPrice}
                    placeholder="Prodcut Price"
                    borderRadius="none"
                    name="productPrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <SelectCategory
                  bgColor="#9D84B7"
                  colorScheme=""
                  marginTop="5em"
                  text="Category"
                  borderRadius="none"
                  onSelect={({ selectedCategory }) =>
                    setCategoryId(selectedCategory)
                  }
                />
                <CustomFileInput
                  bgColor="#9D84B7"
                  borderRadius="none"
                  colorScheme=""
                  width="full"
                  marginTop="1em"
                  customText="Upload Image"
                  onChange={(file) => {
                    setProductImage(file);
                  }}
                />
                <Button
                  borderRadius="none"
                  size="md"
                  colorScheme="facebook"
                  bgColor="#091353"
                  top="3em"
                  width="full"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Container>
      </Container>
    </Center>
  );
};

export default AddProduct;
