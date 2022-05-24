import {
  Container,
  Center,
  Heading,
  ContainerProps,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import { Formik } from "formik";
import DragUpload from "../Custom/DragUpload";
import { CustomField } from "../Custom/CustomField";
import CustomContainer from "../Custom/CustomContainer";
import { fetchUnits } from "../../services/UnitService";
import SelectUnitMenu from "../Widgets/SelectUnitMenu";
import GSTSelectorModal from "../Widgets/GSTSelectorModal";
import { addProduct } from "../../services/ProductService";
import { GSTSelectorContext } from "../../context/GSTSelectorContext";
import EnterPrice from "../Widgets/EnterPrice";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: string;
  categoryId: number | null;
  productImages: File[] | null;
  unitId: number;
  gstId: number;
}

const createProduct = async (values: ProductData): Promise<void> => {
  let formData = new FormData();

  Object.keys(values).forEach((valKey: any) => {
    if (valKey === "productImages") {
      values.productImages?.forEach((productImage, indx) => {
        if (productImage) formData.append(`images[${indx}]`, productImage);
      });
    } else {
      formData.append(valKey, (values as any)[valKey].toString());
    }
  });

  if (await addProduct(formData)) return Promise.resolve();
  else return Promise.reject();
};

const AddProduct = (props: ContainerProps) => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [productImages, setProductImages] = useState<File[] | null>(null);
  const [clearUploadFiles, setClearUploadFiles] = useState<boolean>(false);
  const [allUnits, setAllUnits] = useState<any[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<any>();
  const [selectedGSTData, setSelectedGSTData] = useState<any>();
  const [allPriceData, setAllPriceData] = useState<any[]>([]);

  const toast = useToast();

  const [width] = useWindowDimensions();

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

  const handleSumbit = (values: any, { setSubmitting }: any) => {
    if (!categoryId) {
      showErrorToast("Please select a category");
      setSubmitting(false);
    } else {
      setSubmitting(true);
      values = {
        ...values,
        categoryId,
        productImages,
        unitId: selectedUnit ? selectedUnit.unit_id : -1,
        gstId: selectedGSTData ? selectedGSTData.id : -1,
        productPrice: JSON.stringify(allPriceData),
      };
      createProduct(values)
        .then(() => {
          showSuccessToast(values);
          setSubmitting(false);
          setTimeout(() => window.location.reload(), 300);
        })
        .catch(() => {
          showErrorToast("Product could not be created!");
          setSubmitting(false);
        });
    }
  };

  return (
    <Center marginBottom="2%">
      <CustomContainer
        height="inherit"
        maxW="90vw"
        padding={width > 540 ? "2em 4rem 7em 4rem" : "2em 2rem 7em 2rem"}
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
              productPrice: [],
            }}
            onSubmit={handleSumbit}
          >
            {({ values, handleSubmit, handleChange, isSubmitting }) => (
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
                  <EnterPrice {...{ allPriceData, setAllPriceData }} />
                  <DragUpload
                    onFileUpload={(files) => setProductImages(files)}
                    clearUpload={[clearUploadFiles, setClearUploadFiles]}
                  />
                  <Flex
                    flexDirection={width < 490 ? "column" : "row"}
                    gridGap={width < 490 ? "2" : "0"}
                  >
                    <SelectCategory
                      {...(width > 490 ? { ...{ flex: "0.7" } } : {})}
                      borderRightRadius={width < 490 ? "md" : "none"}
                      borderLeftRadius="md"
                      text="Select Category"
                      variant="primaryLightSolid"
                      width="100%"
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
                    <GSTSelectorContext.Provider
                      value={{
                        selectedRows: selectedGSTData,
                        setSelectedRows: setSelectedGSTData,
                      }}
                    >
                      <GSTSelectorModal
                        borderRadius={width < 490 ? "md" : "none"}
                        {...(width > 490 ? { ...{ flex: "1" } } : {})}
                        variant="primaryLightSolid"
                        selectCb={(data: any) => {
                          setSelectedGSTData(data);
                        }}
                      />
                    </GSTSelectorContext.Provider>
                    <SelectUnitMenu
                      size="lg"
                      {...(width > 490 ? { ...{ flex: "1.2" } } : {})}
                      w={width < 490 ? "100%" : "initial"}
                      borderLeftRadius={width < 490 ? "md" : "none"}
                      variant="primaryLightSolid"
                      allUnits={allUnits}
                      selectedUnit={selectedUnit}
                      setSelectedUnit={setSelectedUnit}
                    />
                  </Flex>
                  <Button
                    variant="primarySolid"
                    borderRadius="sm"
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
