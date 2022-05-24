import React, { useState, useContext } from "react";
import { Button, Container, Text, Image, Flex, Box } from "@chakra-ui/react";
import constants from "../../../util/Constants";
import SpecificationTable from "./SpecificationTable";
import { SpecTableContext } from "../../../context/SpecTableContext";
import ImageGallery from "../Product/ImageGallery";
import DragUpload from "../../Custom/DragUpload";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { getProductInfo } from "../../../util/ProductInfo";
import CustomContainer from "../../Custom/CustomContainer";
import OptionsTable from "../../Admin/OptionsTable";
import api from "../../../util/AxiosApi";
import UpdateProductValueForm from "./UpdateProductValueForm";
import { addProductImages } from "../../../services/ProductService";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

const ProductSpec: React.FC = () => {
  const [specTableHeading, setSpecTableHeading] = useState<any[]>([]);
  const [tableExists, setTableExists] = useState<boolean>(
    specTableHeading.length !== 0
  );
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [modifyAddRowModal, setModifyAddRowModal] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [clearUploadedFiles, setClearUploadedFiles] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const [width] = useWindowDimensions();

  const createTableHeading = () => {
    if (specTableHeading.length === 0)
      setSpecTableHeading([
        ...specTableHeading,
        <Text key={specTableHeading.length + 1} fontWeight="bold">
          Specification
        </Text>,
        <Text key={specTableHeading.length + 2} fontWeight="bold">
          Details
        </Text>,
      ]);
  };

  const createTable = async () => {
    await api.post(`/shop/createtable/${product.id}`, {
      withCredentials: true,
    });
    setTableExists(true);
  };

  const CreateSpecificationTableBtn: React.FC = () => {
    if (!tableExists)
      return (
        !tableExists && (
          <Button
            size="lg"
            mb="2em"
            width="100%"
            variant="primarySolid"
            onClick={() => {
              createTableHeading();
              createTable();
            }}
          >
            Create Specification Table
          </Button>
        )
      );
    else return <></>;
  };

  const uploadAllImages = async () => {
    let formData = new FormData();
    formData.append("productId", product.id.toString());
    uploadedImages.forEach((img, indx) => {
      formData.append(`file[${indx}]`, img);
    });
    await addProductImages(formData);
    getProductInfo(product.id)
      .then((newProduct) => {
        setProduct(newProduct);
      })
      .catch((err) => console.error(err));
    setClearUploadedFiles(true);
  };

  if (product)
    return (
      <SpecTableContext.Provider
        value={{
          headings: [specTableHeading, setSpecTableHeading],
          tableExist: [tableExists, setTableExists],
          openRowModal: [openAddRowModal, setOpenAddRowModal],
          modifyRowModal: [modifyAddRowModal, setModifyAddRowModal],
        }}
      >
        <Flex
          marginLeft={width > 525 ? "7%" : "1%"}
          marginRight={width > 525 ? "7%" : "1%"}
          justifyContent="center"
          alignContent="center"
          flexDirection="row"
          flexWrap="wrap"
          gridGap="0"
          pb="5%"
        >
          <Container margin="0" marginTop="2em" height="inherit">
            {product && (
              <CustomContainer
                borderRadius="2xl"
                height="55vh"
                padding="5%"
                position="relative"
                interactive
                transition="all ease-in-out 0.2s"
              >
                {product.image.map((curImg, indx) => (
                  <Image
                    position="absolute"
                    key={indx}
                    objectFit="scale-down"
                    src={`${constants.url?.substring(
                      0,
                      constants?.url.lastIndexOf("/")
                    )}${curImg.image}
                    `}
                    opacity={
                      curImg.image === product.image[selectedImage].image
                        ? 1
                        : 0
                    }
                    width="90%"
                    height="inherit"
                    maxH="50vh"
                    transition="all ease-in-out 0.5s"
                  />
                ))}
              </CustomContainer>
            )}
            <ImageGallery
              marginTop="2em"
              width="100%"
              selectCb={(indx) => {
                setSelectedImage(indx);
              }}
              allowEdit
            />
            <DragUpload
              marginTop="10%"
              clearUpload={[clearUploadedFiles, setClearUploadedFiles]}
              onFileUpload={(files) => {
                if (files.length !== 0) {
                  setUploadedImages(files);
                }
              }}
            />
            <Button
              variant="primarySolid"
              margin="3vh 0"
              position="relative"
              size="lg"
              width="100%"
              onClick={uploadAllImages}
            >
              Upload Additional Images
            </Button>
            <CreateSpecificationTableBtn />
          </Container>
          <Container marginTop="3vh" width="100%" justifyContent="center">
            <CustomContainer
              padding="2rem 2rem 0.01rem 2rem"
              width="100%"
              borderRadius="lg"
            >
              <UpdateProductValueForm />
            </CustomContainer>
            <Box position="relative" w="100%" mt="2.5rem">
              <SpecificationTable />
              <OptionsTable mt="5%" borderRadius="lg" />
            </Box>
          </Container>
        </Flex>
      </SpecTableContext.Provider>
    );
  else return <></>;
};

export default ProductSpec;
