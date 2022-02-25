import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import Product from "../Product/index";
import axios from "axios";
import constants from "../../../util/Constants";
import SpecificationTable from "./SpecificationTable";
import { SpecTableContext } from "../../../context/SpecTableContext";
import OptionsTable from "./OptionsTable";
import ImageGallery from "../Product/ImageGallery";
import DragUpload from "../../Custom/DragUpload";
import { ProductInfoContext } from "../../../context/ProductInfoContext";
import { getProductInfo } from "../../../util/ProductInfo";

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
          variant="blueSolid"
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
      <Box marginLeft="12em">
        <Container margin="0" marginTop="2em" marginBottom="2em" float="left">
          {product ? (
            <Product
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ) : (
            <></>
          )}
          <ImageGallery marginTop="2em" />
          <DragUpload
            marginTop="2em"
            width="32em"
            clearUpload={[clearUploadedFiles, setClearUploadedFiles]}
            onFileUpload={(files) => {
              console.log({ files });
              if (files.length !== 0) {
                setUploadedImages(files);
              }
            }}
          />
          <Button
            marginLeft="10.5%"
            variant="blueSolid"
            marginTop="1em"
            width="30em"
            onClick={uploadAllImages}
          >
            Upload Additional Images
          </Button>
          <CreateSpecificationTableBtn />
          <Button
            width="30em"
            marginLeft="10.5%"
            marginTop="1.5em"
            variant="blueSolid"
            onClick={() => setIsOpenOptionModal(true)}
          >
            Add Options
          </Button>
        </Container>
        <Container float="left" marginTop="2em" marginLeft="2em" width="40em">
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
