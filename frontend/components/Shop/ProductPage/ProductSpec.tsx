import React, { useState, useContext, useReducer } from "react";
import {
  Spinner,
  Box,
  Button,
  Container,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
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

const productValueReducer = (state: any, action: any) => {
  switch (action.type) {
    case "set-product-name":
      return { ...state, name: action.payload };
    case "set-product-description":
      return { ...state, description: action.payload };
    case "set-product-price":
      return { ...state, price: action.payload };
    default:
      return state;
  }
};

const UpdateProductValueForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

  const [productValues, dispatchProductValues] = useReducer(
    productValueReducer,
    {
      name: product.name,
      description: product.description,
      price: product.price,
    }
  );

  const updateProduct = () => {
    setLoading(true);
    axios
      .post(
        `${constants.url}/shop/updateproduct/`,
        {
          id: product.id,
          ...productValues,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        getProductInfo(product.id)
          .then((newProduct) => {
            setTimeout(() => setLoading(false), 500);
            setProduct(newProduct);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e: any, type: string) => {
    dispatchProductValues({
      type,
      payload: e.target.value,
    });
  };

  return (
    <Flex flexDirection="column" gridGap={5} w="100%" mb="5%">
      <CustomField
        w="100%"
        label="Product Name"
        value={productValues.name}
        onChange={(e: any) => handleChange(e, "set-product-name")}
      />
      <CustomField
        w="100%"
        h="10em"
        padding="2%"
        as="textarea"
        label="Product Description"
        value={productValues.description}
        onChange={(e: any) => handleChange(e, "set-product-description")}
      />
      <CustomField
        w="100%"
        label="Product Price"
        value={productValues.price}
        type="number"
        onChange={(e: any) => handleChange(e, "set-product-price")}
      />
      <Button mt="3%" mb="5%" variant="primarySolid" onClick={updateProduct}>
        {loading ? <Spinner size="sm" /> : "Save"}
      </Button>
    </Flex>
  );
};

const ProductSpec: React.FC = () => {
  const [specTableHeading, setSpecTableHeading] = useState<any[]>([]);
  const [tableExists, setTableExists] = useState<boolean>(
    specTableHeading.length !== 0
  );
  const [openAddRowModal, setOpenAddRowModal] = useState<boolean>(false);
  const [modifyAddRowModal, setModifyAddRowModal] = useState<boolean>(false);
  const [isOpenOptionModal, setIsOpenOptionModal] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [clearUploadedFiles, setClearUploadedFiles] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const { productInfo } = useContext(ProductInfoContext);
  const [product, setProduct] = productInfo;

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
        !tableExists && (
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
        )
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
          marginLeft="12em"
          position="absolute"
          flexDirection="row"
          gridGap="100"
          pb="5%"
        >
          <Container margin="0" marginTop="2em" marginBottom="2em">
            {product && (
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
              height="14vh"
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
          <Container marginTop="2em" width="40em">
            <UpdateProductValueForm />
            <SpecificationTable />
            <OptionsTable
              product={product}
              triggerOpen={[isOpenOptionModal, setIsOpenOptionModal]}
            />
          </Container>
        </Flex>
      </SpecTableContext.Provider>
    );
  else return <></>;
};

export default ProductSpec;
