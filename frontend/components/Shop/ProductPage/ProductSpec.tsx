import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Container, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import constants from "../../../util/Constants";
import SpecificationTable from "./SpecificationTable";
import { SpecTableContext } from "../../../context/SpecTableContext";
import OptionsTable from "./OptionsTable";
import ImageGallery from "../Product/ImageGallery";
import DragUpload from "../../Custom/DragUpload";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { getProductInfo } from "../../../util/ProductInfo";
import CustomContainer from "../../Custom/CustomContainer";
import { CustomField } from "../../Custom/CustomField";

const ProductSpec: React.FC = () => {
  const [specTableHeading, setSpecTableHeading] = useState<any[]>([]);
  const [tableExists, setTableExists] = useState<boolean>(
    specTableHeading.length !== 0
  );
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [modifyAddRowModal, setModifyAddRowModal] = useState<boolean>(false);
  const [isOpenOptionModal, setIsOpenOptionModal] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;
  const [clearUploadedFiles, setClearUploadedFiles] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const createTableHeading = () => {
    if (specTableHeading.length === 0)
      setSpecTableHeading([
        ...specTableHeading,
        <Text key={specTableHeading.length + 1}>Specification</Text>,
        <Text key={specTableHeading.length + 2}>Details</Text>,
      ]);
  };

  const createTable = async () => {
    await axios
      .post(
        `${constants.url}/shop/createtable/`,
        {
          product_id: product.id,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setTableExists(true);
      })
      .catch((err) => console.error(err));
  };

  const CreateSpecificationTableBtn: React.FC = () => {
    if (!tableExists)
      return (
        <Button
          marginTop="1.5em"
          marginLeft="4em"
          width="30em"
          variant="primarySolid"
          onClick={() => {
            createTableHeading();
            createTable();
          }}
        >
          Create Specification Table
        </Button>
      );
    else return <></>;
  };

  const uploadAllImages = () => {
    let formData = new FormData();
    formData.append("productId", product.id.toString());
    uploadedImages.forEach((img, indx) => {
      formData.append(`file[${indx}]`, img);
    });
    axios
      .post(`${constants.url}/shop/addproductimages/`, formData, {
        withCredentials: true,
      })
      .then(() => {
        getProductInfo(product.id)
          .then((newProduct) => {
            setProduct(newProduct);
          })
          .catch((err) => console.error(err));
        setClearUploadedFiles(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return product ? (
    <SpecTableContext.Provider
      value={{
        headings: [specTableHeading, setSpecTableHeading],
        tableExist: [tableExists, setTableExists],
        openRowModal: [openAddRowModal, setOpenAddRowModal],
        modifyRowModal: [modifyAddRowModal, setModifyAddRowModal],
      }}
    >
      <Box marginLeft="12em" position="absolute">
        <Container margin="0" marginTop="2em" marginBottom="2em" float="left">
          {product ? (
            <CustomContainer
              borderRadius="2xl"
              width="100%"
              height="80%"
              maxHeight="38em"
              padding="2em"
              interactive
              transition="all ease-in-out 0.5s"
            >
              <Image
                objectFit="contain"
                src={`${constants.url?.substring(
                  0,
                  constants?.url.lastIndexOf("/")
                )}${product.image[selectedImage].image}
                `}
                width="100%"
                height="30em"
              />
            </CustomContainer>
          ) : (
            <></>
          )}
          <ImageGallery
            marginTop="2em"
            width="100%"
            selectCb={(indx) => {
              setSelectedImage(indx);
            }}
          />
          <DragUpload
            marginTop="10%"
            marginLeft="-3%"
            width="110%"
            clearUpload={[clearUploadedFiles, setClearUploadedFiles]}
            onFileUpload={(files) => {
              console.log({ files });
              if (files.length !== 0) {
                setUploadedImages(files);
              }
            }}
          />
          <Button
            variant="primarySolid"
            marginTop="2em"
            size="lg"
            width="100%"
            onClick={uploadAllImages}
          >
            Upload Additional Images
          </Button>
          <CreateSpecificationTableBtn />
          <Button
            width="100%"
            size="lg"
            marginTop="1.5em"
            variant="primarySolid"
            onClick={() => setIsOpenOptionModal(true)}
          >
            Add Options
          </Button>
        </Container>
        <Container float="left" marginTop="2em" marginLeft="5em" width="40em">
          <CustomField
            w="95%"
            mt="2%"
            label="Product Name"
            value={product.name}
            placeholder="Product Name"
            isRequired={false}
          />
          <CustomField
            w="95%"
            mt="4%"
            padding="2%"
            h="10em"
            label="Product Description"
            value={product.description}
            placeholder="Product Description"
            isRequired={false}
            as="textarea"
          />
          <CustomField
            w="95%"
            mt="2%"
            mb="5%"
            label="Product Price"
            value={product.price}
            type="number"
            isRequired={false}
            placeholder="Product Price"
          />
          <SpecificationTable />
          <OptionsTable
            product={product}
            triggerOpen={[isOpenOptionModal, setIsOpenOptionModal]}
          />
        </Container>
      </Box>
    </SpecTableContext.Provider>
  ) : (
    <></>
  );
};

export default ProductSpec;
