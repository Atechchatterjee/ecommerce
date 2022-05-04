import {
  Container,
  Center,
  Heading,
  ContainerProps,
  Button,
  useToast,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import constants from "../../util/Constants";
import SelectCategory from "./SelectCategory";
import { Formik } from "formik";
import DragUpload from "../Custom/DragUpload";
import { CustomField } from "../Custom/CustomField";
import CustomContainer from "../Custom/CustomContainer";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { fetchUnits } from "../../services/UnitService";
import SelectUnitMenu from "../Widgets/SelectUnitMenu";

interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: string;
  categoryId: number | null;
  productImages: File[] | null;
  unitId: number;
}

const createProduct = async ({
  productName,
  productDescription,
  productPrice,
  unitId,
  categoryId,
  productImages,
}: ProductData): Promise<void> => {
  let formData = new FormData();

  formData.append("productName", productName);
  formData.append("productDescription", productDescription);
  formData.append("productPrice", productPrice);
  formData.append("unitId", unitId.toString());

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
  const [allUnits, setAllUnits] = useState<any[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<any>();

  const toast = useToast();

  const showSuccessToast = (values?: any) => {
    toast({
      title: "Created",
      description: !values
        ? "Product was created"
        : `Product: '${values.productName}' has been created`,
      duration: 2000,
      isClosable: true,
      status: "success",
    });
  };
  const showErrorToast = (errorMsg: string) => {
    toast({
      title: "Sorry for the inconvenience",
      description: errorMsg,
      duration: 2000,
      isClosable: true,
      status: "error",
    });
  };

  useEffect(() => {
    fetchUnits().then((allUnits) => setAllUnits(allUnits));
  }, []);

  return (
    <Center marginBottom="2%">
      <CustomContainer
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
              if (!categoryId) {
                showErrorToast("Please select a category");
                setSubmitting(false);
              } else {
                setSubmitting(true);
                values["categoryId"] = categoryId;
                values["productImages"] = productImages;
                values["unitId"] = selectedUnit ? selectedUnit.unit_id : -1;
                createProduct(values)
                  .then(() => {
                    showSuccessToast(values);
                    setSubmitting(false);
                    setTimeout(() => window.location.reload());
                  })
                  .catch(() => {
                    showErrorToast("Product could not be created!");
                    setSubmitting(false);
                  });
              }
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
                <Flex flexDirection="column" gridGap={8}>
                  <CustomField
                    name="productName"
                    placeholder="Product Name"
                    value={values.productName}
                    borderRadius="sm"
                    onChange={handleChange}
                  />
                  <CustomField
                    name="productDescription"
                    placeholder="Product Description"
                    value={values.productDescription}
                    borderRadius="sm"
                    onChange={handleChange}
                    padding="0.5em"
                    minHeight="10em"
                    as="textarea"
                  />
                  <Flex flexDirection="row" position="relative" gridGap={3}>
                    <NumberInput
                      precision={2}
                      step={1}
                      borderRadius="lg"
                      onReset={() => alert("reseting")}
                      w="100%"
                    >
                      <CustomField
                        value={values.productPrice}
                        placeholder="Prodcut Price"
                        borderRadius="sm"
                        name="productPrice"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <SelectUnitMenu
                      allUnits={allUnits}
                      selectedUnit={selectedUnit}
                      setSelectedUnit={setSelectedUnit}
                    />
                  </Flex>
                  <SelectCategory
                    text="Select Category"
                    width="100%"
                    borderRadius="sm"
                    bgColor={categoryId ? "secondary.200" : ""}
                    _hover={
                      categoryId
                        ? { bgColor: "secondary.200", opacity: "0.8" }
                        : { opacity: "0.9" }
                    }
                    size="lg"
                    selectCb={({ selectedCategory }) => {
                      if (selectedCategory?.val)
                        setCategoryId(selectedCategory?.val.id);
                    }}
                  />
                  <DragUpload
                    marginLeft="-1em"
                    width="34em"
                    onFileUpload={(files) => {
                      console.log({ files });
                      setProductImages(files);
                    }}
                    clearUpload={[clearUploadFiles, setClearUploadFiles]}
                  />
                  <Button
                    borderRadius="sm"
                    variant="primarySolid"
                    size="lg"
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </Flex>
              </form>
            )}
          </Formik>
        </Container>
      </CustomContainer>
    </Center>
  );
};

export default AddProduct;
