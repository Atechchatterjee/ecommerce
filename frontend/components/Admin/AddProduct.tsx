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
import { Formik } from "formik";
import DragUpload from "../Custom/DragUpload";

interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: string;
  categoryId: number | null;
  productImages: File[] | null;
}

const createProduct = async ({
  productName,
  productDescription,
  productPrice,
  categoryId,
  productImages,
}: ProductData): Promise<void> => {
  let formData = new FormData();

  formData.append("productName", productName);
  formData.append("productDescription", productDescription);
  formData.append("productPrice", productPrice);

  if (typeof categoryId === "number")
    formData.append("categoryId", categoryId.toString());
  else formData.append("categoryId", "");

  productImages?.forEach((productImage, indx) => {
    if (productImage) formData.append(`images[${indx}]`, productImage);
  });

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
  const [productImages, setProductImages] = useState<File[] | null>(null);
  const [clearUploadFiles, setClearUploadFiles] = useState<boolean>(false);

  const toast = useToast();

  return (
    <Center>
      <Container
        boxShadow="0.2em 0.2em 0.2em 0.2em #e1e1e1"
        height="inherit"
        width="60em"
        padding="2em 4em 7em 4em"
        borderRadius="lg"
        {...props}
      >
        <Heading
          size="xl"
          color="gray.600"
          marginLeft="initial"
          fontFamily="Sora"
          fontWeight="bold"
        >
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
              values["productImages"] = productImages;
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
                  borderRadius="lg"
                  onChange={handleChange}
                  top="2em"
                />
                <Textarea
                  name="productDescription"
                  placeholder="Product Description"
                  value={values.productDescription}
                  borderRadius="lg"
                  onChange={handleChange}
                  top="3em"
                />
                <NumberInput
                  top="4em"
                  precision={2}
                  step={1}
                  borderRadius="lg"
                  onReset={() => alert("reseting")}
                >
                  <NumberInputField
                    value={values.productPrice}
                    placeholder="Prodcut Price"
                    borderRadius="lg"
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
                  variant="pinkSolid"
                  bgColor="#9D84B7"
                  colorScheme=""
                  marginTop="5em"
                  text="Category"
                  borderRadius="lg"
                  selectCb={({ selectedCategory }) =>
                    setCategoryId(selectedCategory)
                  }
                />
                <DragUpload
                  marginTop="2em"
                  marginLeft="-1em"
                  width="34em"
                  onFileUpload={(files) => {
                    console.log({ files });
                    setProductImages(files);
                  }}
                  clearUpload={[clearUploadFiles, setClearUploadFiles]}
                />
                <Button
                  borderRadius="lg"
                  variant="blueSolid"
                  size="md"
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
