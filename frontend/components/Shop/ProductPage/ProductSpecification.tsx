import React, { useState, useContext } from "react";
import { Button, Container, Text, Image, Flex, Box } from "@chakra-ui/react";
import axios from "axios";
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
  const [dropDownStatus, setDropDownStatus] = useState<boolean>(false);

  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

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
          marginLeft="7%"
          marginRight="7%"
          justifyContent="center"
          alignContent="center"
          flexDirection="row"
          flexWrap="wrap"
          gridGap="1"
          pb="5%"
        >
          <Container margin="0" marginTop="2em" height="110vh">
            {product && (
              <CustomContainer
                borderRadius="2xl"
                height="55vh"
                padding="5%"
                position="relative"
                interactive
                transition="all ease-in-out 0.5s"
              >
                {product.image.map((curImg, indx) => (
                  <Image
                    position="absolute"
                    key={indx}
                    objectFit="contain"
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
                    height="30em"
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
              marginLeft="-3%"
              width="106%"
              height="14vh"
              clearUpload={[clearUploadedFiles, setClearUploadedFiles]}
              onFileUpload={(files) => {
                if (files.length !== 0) {
                  setUploadedImages(files);
                }
              }}
            />
            <Button
              variant="primarySolid"
              margin="3em 0"
              size="lg"
              width="100%"
              onClick={uploadAllImages}
            >
              Upload Additional Images
            </Button>
            <CreateSpecificationTableBtn />
          </Container>
          <Container marginTop="2em" width="100%" justifyContent="center">
            <CustomContainer
              padding="2rem 2rem 0.01rem 2rem"
              width="100%"
              borderRadius="lg"
            >
              <UpdateProductValueForm
                getDropDownStatus={(status: any) => {
                  setDropDownStatus(status);
                }}
              />
            </CustomContainer>
            <Box
              position="relative"
              zIndex={dropDownStatus ? "-1" : "11"}
              w="100%"
              mt="2.5rem"
            >
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
